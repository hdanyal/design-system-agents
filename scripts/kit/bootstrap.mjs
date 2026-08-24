import { existsSync } from "node:fs"
import {
  SCHEMA_VERSION,
  fail,
  kitRootFromScripts,
  loadKitManifest,
  path,
  readJson,
  isKitSource,
  scanHost,
  seedMemoryLayout,
  writeJson,
} from "./lib.mjs"

const args = process.argv.slice(2)
const dirIdx = args.indexOf("--dir")
const root = path.resolve(dirIdx >= 0 ? args[dirIdx + 1] : process.cwd())
const write = args.includes("--write")
const kit = loadKitManifest(existsSync(path.join(root, ".agents/kit/manifest.json")) ? root : kitRootFromScripts())
const scan = scanHost(root)
const packPath = path.join(root, ".agents/context.json")
const existing = existsSync(packPath) ? readJson(packPath) : null
const reviewed = new Set(existing?.reviewedFields || [])

function mergePath(key, guessed) {
  if (reviewed.has(`paths.${key}`) && existing?.paths?.[key]) return existing.paths[key]
  return guessed
}

const kitSource = isKitSource(root)

const pack = {
  $schemaVersion: SCHEMA_VERSION,
  kitVersion: kit.kitVersion,
  bootstrapStatus: existing?.bootstrapStatus || "draft",
  id: existing?.id || (kitSource ? "example" : null),
  paths: {
    tokens: mergePath("tokens", scan.guessed.tokens),
    ui: mergePath("ui", scan.guessed.ui),
    primitives: mergePath("primitives", scan.guessed.primitives),
    blocks: mergePath("blocks", scan.guessed.blocks),
    prototypes: mergePath("prototypes", scan.guessed.prototypes),
    docs: mergePath("docs", scan.guessed.docs),
  },
  figmaFileKey: reviewed.has("figmaFileKey") ? existing.figmaFileKey : scan.figmaFileKey,
  preview: reviewed.has("preview") ? existing.preview : scan.preview,
  commands: scan.commands,
  mcpAllowlistPath: existsSync(path.join(root, "agent-tooling.json")) ? "agent-tooling.json" : null,
  deferredGaps: existing?.deferredGaps || [],
  reviewedFields: existing?.reviewedFields || [],
  reviewedAt: existing?.reviewedAt || null,
  reviewedBy: existing?.reviewedBy || null,
}

if (kitSource && !existing) {
  pack.bootstrapStatus = "complete"
  pack.id = "example"
  pack.reviewedAt = new Date().toISOString().slice(0, 10)
  pack.reviewedBy = "example-ds-eng"
  pack.reviewedFields = ["id", "paths.tokens", "paths.ui", "preview"]
}

const inventory = {
  $schemaVersion: SCHEMA_VERSION,
  designSystemId: pack.id,
  generatedAt: new Date().toISOString(),
  entities: scan.entities,
}

const gaps = {
  $schemaVersion: SCHEMA_VERSION,
  designSystemId: pack.id,
  generatedAt: new Date().toISOString(),
  gaps: scan.gaps,
}

if (!write) {
  console.log(JSON.stringify({ pack, inventorySummary: inventory.entities.length, gaps: gaps.gaps }, null, 2))
  console.log("bootstrap scan only (pass --write after confirm to persist draft)")
  process.exit(0)
}

if (!existing && !args.includes("--confirm-write")) {
  fail("refusing to write the first pack without --confirm-write")
}

writeJson(packPath, pack)
writeJson(path.join(root, ".agents/inventory/components.json"), inventory)
writeJson(path.join(root, ".agents/inventory/gaps.json"), gaps)
seedMemoryLayout(root)
console.log(`bootstrap wrote pack status=${pack.bootstrapStatus} id=${pack.id || "(unset)"}`)
