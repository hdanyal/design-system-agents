import { existsSync, readdirSync, readFileSync } from "node:fs"
import path from "node:path"
import { paths } from "../lib/paths"
import { fail, readJson, writeJson, writeText } from "../lib/fs"

type Meta = {
  name: string
  title?: string
  type?: string
  status?: string
  owner?: string
  a11yStatus?: string
  introducedIn?: string
  lastReviewed?: string
  figmaNode?: string
}

type RegistryFile = {
  items?: Array<{ name: string; type?: string; title?: string; description?: string; meta?: Meta }>
  include?: string[]
}

const STOCK_RESERVED = new Set<string>()
const primitivesRel = paths.packPaths.primitives ?? "components/primitives"

function stockNames() {
  if (!existsSync(paths.uiDir)) return
  for (const file of readdirSync(paths.uiDir)) {
    if (file.endsWith(".tsx") && !file.endsWith(".stories.tsx")) {
      STOCK_RESERVED.add(file.replace(/\.tsx$/, ""))
    }
  }
}

function collectRegistryItems(file: string, acc: NonNullable<RegistryFile["items"]>) {
  const registry = readJson<RegistryFile>(file)
  for (const item of registry.items ?? []) acc.push(item)
  for (const include of registry.include ?? []) {
    collectRegistryItems(path.resolve(path.dirname(file), include), acc)
  }
}

function primitiveMetas(): Meta[] {
  if (!existsSync(paths.primitivesDir)) return []
  return readdirSync(paths.primitivesDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("_"))
    .map((entry) => {
      const metaPath = path.join(paths.primitivesDir, entry.name, "meta.json")
      if (!existsSync(metaPath)) fail(`Missing meta.json for primitive ${entry.name}`)
      return readJson<Meta>(metaPath)
    })
}

function blockMetas(): Meta[] {
  if (!existsSync(paths.blocksDir)) return []
  return readdirSync(paths.blocksDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const metaPath = path.join(paths.blocksDir, entry.name, "meta.json")
      if (!existsSync(metaPath)) fail(`Missing meta.json for block ${entry.name}`)
      return readJson<Meta>(metaPath)
    })
}

function buildCatalog() {
  stockNames()
  const items: NonNullable<RegistryFile["items"]> = []
  collectRegistryItems(paths.registry, items)

  const names = items.map((item) => item.name)
  const duplicates = names.filter((name, index) => names.indexOf(name) !== index)
  if (duplicates.length) fail(`Duplicate registry names: ${duplicates.join(", ")}`)

  for (const item of items) {
    if (STOCK_RESERVED.has(item.name) && item.type !== "registry:file") {
      fail(`Registry item "${item.name}" collides with a reserved stock UI name`)
    }
  }

  const primitives = primitiveMetas()
  const catalog = {
    generatedFrom: ["registry.json", primitivesRel, paths.packPaths.blocks ?? "registry/blocks"],
    stock: [...STOCK_RESERVED].sort(),
    primitives,
    blocks: blockMetas(),
    guidance: items.filter((item) => item.type === "registry:file"),
    items,
  }

  const md = `# Example catalog

GENERATED. Do not hand-edit. Run \`pnpm catalog\`.

## Stock UI

${catalog.stock.map((name) => `- \`${name}\``).join("\n")}

## Primitives

| Name | Status | Owner | a11y | Introduced |
| --- | --- | --- | --- | --- |
${catalog.primitives
  .map(
    (item) =>
      `| \`${item.name}\` | ${item.status ?? ""} | ${item.owner ?? ""} | ${item.a11yStatus ?? ""} | ${item.introducedIn ?? ""} |`
  )
  .join("\n")}

## Blocks

| Name | Status | Owner | a11y | Introduced |
| --- | --- | --- | --- | --- |
${catalog.blocks
  .map(
    (item) =>
      `| \`${item.name}\` | ${item.status ?? ""} | ${item.owner ?? ""} | ${item.a11yStatus ?? ""} | ${item.introducedIn ?? ""} |`
  )
  .join("\n")}
`

  return { catalog, md }
}

const check = process.argv.includes("--check")
const { catalog, md } = buildCatalog()

if (check) {
  if (readFileSync(paths.catalog, "utf8") !== md) fail("docs/catalog.md is stale. Run `pnpm catalog`.")
  if (readFileSync(paths.catalogJson, "utf8") !== `${JSON.stringify(catalog, null, 2)}\n`) {
    fail("generated/catalog.json is stale. Run `pnpm catalog`.")
  }
  console.log("catalog --check passed")
} else {
  writeText(paths.catalog, md)
  writeJson(paths.catalogJson, catalog)
  console.log(`catalog wrote ${catalog.items.length} items`)
}
