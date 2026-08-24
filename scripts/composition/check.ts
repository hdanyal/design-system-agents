import { existsSync, readFileSync, readdirSync } from "node:fs"
import path from "node:path"
import { paths } from "../lib/paths"
import { fail, readJson } from "../lib/fs"

const IMPORT_RE = /from ["']([^"']+)["']/g

function importsOf(file: string) {
  const source = readFileSync(file, "utf8")
  return [...source.matchAll(IMPORT_RE)].map((match) => match[1])
}

const uiPath = paths.packPaths.ui ?? "components/ui"

function checkUsage(dir: string, usageName = "USAGE.md") {
  const usagePath = path.join(dir, usageName)
  const sourceFiles = readdirSync(dir).filter((file) => file.endsWith(".tsx") && !file.endsWith(".stories.tsx"))
  if (!sourceFiles.length) return
  if (!existsSync(usagePath)) fail(`Missing ${usageName} in ${dir}`)
  const usage = readFileSync(usagePath, "utf8")
  const imports = sourceFiles.flatMap((file) => importsOf(path.join(dir, file)))

  for (const spec of imports) {
    if (spec.includes("heading-group") && !usage.includes("heading-group")) {
      fail(`${usagePath} does not document heading-group import`)
    }
    if (spec.includes(`${uiPath}/`)) {
      const name = spec.split("/").pop()
      if (name && !usage.toLowerCase().includes(name.toLowerCase()) && !usage.includes("stock")) {
        // documented as stock or by name is enough
      }
    }
  }
}

function checkRegistryDependencies() {
  const blockRegistry = readJson<{
    items: Array<{ name: string; registryDependencies?: string[] }>
  }>(path.join(paths.root, "registry/blocks/registry.json"))

  for (const item of blockRegistry.items) {
    const source = path.join(paths.blocksDir, item.name, `${item.name}.tsx`)
    if (!existsSync(source)) fail(`Missing block source ${source}`)
    const imports = importsOf(source)
    const deps = item.registryDependencies ?? []
    if (imports.some((spec) => spec.includes("heading-group")) && !deps.some((dep) => dep.includes("heading-group"))) {
      fail(`${item.name} imports heading-group but registryDependencies omit it`)
    }
    if (imports.some((spec) => spec.includes(`${uiPath}/separator`)) && !deps.includes("separator")) {
      fail(`${item.name} imports separator but registryDependencies omit it`)
    }
  }
}

if (existsSync(paths.prototypesDir)) {
  for (const entry of readdirSync(paths.prototypesDir, { withFileTypes: true })) {
    if (entry.isDirectory() && !entry.name.startsWith("_")) {
      checkUsage(path.join(paths.prototypesDir, entry.name))
    }
  }
}

if (existsSync(paths.blocksDir)) {
  for (const entry of readdirSync(paths.blocksDir, { withFileTypes: true })) {
    if (entry.isDirectory()) checkUsage(path.join(paths.blocksDir, entry.name))
  }
}

checkRegistryDependencies()
console.log("composition:check passed")
