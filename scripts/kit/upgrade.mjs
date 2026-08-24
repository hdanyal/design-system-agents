import { existsSync } from "node:fs"
import {
  SCHEMA_VERSION,
  copyKitPaths,
  fail,
  kitRootFromScripts,
  listMemoryRecordPaths,
  loadKitManifest,
  path,
  readJson,
  seedMemoryLayout,
  writeJson,
} from "./lib.mjs"

const args = process.argv.slice(2)
const dirIdx = args.indexOf("--dir")
if (dirIdx < 0 || !args[dirIdx + 1]) fail("Usage: node scripts/kit/upgrade.mjs --dir <host-root>")
const host = path.resolve(args[dirIdx + 1])
const source = kitRootFromScripts()
const kit = loadKitManifest(source)
const packPath = path.join(host, ".agents/context.json")
if (!existsSync(packPath)) fail("kit:upgrade: no host pack; run bootstrap / kit:install first")

const pack = readJson(packPath)
const memoryBefore = listMemoryRecordPaths(host)
const snapshot = JSON.stringify({
  id: pack.id,
  inventory: existsSync(path.join(host, ".agents/inventory/components.json"))
    ? readJson(path.join(host, ".agents/inventory/components.json"))
    : null,
  memoryRecords: memoryBefore,
})

if (pack.$schemaVersion && pack.$schemaVersion !== SCHEMA_VERSION) {
  fail(`kit:upgrade cannot migrate schema ${pack.$schemaVersion}; stop and ask`)
}

copyKitPaths(source, host)
const next = readJson(packPath)
next.kitVersion = kit.kitVersion
next.$schemaVersion = SCHEMA_VERSION
next.id = pack.id
next.bootstrapStatus = pack.bootstrapStatus
next.paths = pack.paths
next.reviewedFields = pack.reviewedFields
next.reviewedAt = pack.reviewedAt
next.reviewedBy = pack.reviewedBy
next.figmaFileKey = pack.figmaFileKey
next.deferredGaps = pack.deferredGaps
writeJson(packPath, next)
seedMemoryLayout(host)

const memoryAfter = listMemoryRecordPaths(host)
for (const rel of memoryBefore) {
  if (!memoryAfter.includes(rel)) fail(`kit:upgrade removed host memory record ${rel}`)
}
if (JSON.parse(snapshot).id !== next.id) fail("kit:upgrade clobbered pack id")
console.log(`kit:upgrade applied ${kit.kitVersion} to ${host}`)
