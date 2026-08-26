import { path, scanIdentityPaths } from "./lib.mjs"

const args = process.argv.slice(2)
const dirIdx = args.indexOf("--dir")
const root = path.resolve(dirIdx >= 0 ? args[dirIdx + 1] : process.cwd())

const hits = scanIdentityPaths(root)
console.log(`identity-scan (${path.basename(root)}): ${hits.length} example-identity match(es)`)
if (hits.length === 0) {
  console.log("No example identity markers found in the usual paths.")
  process.exit(0)
}
for (const hit of hits) {
  console.log(`  ${hit.path} — ${hit.label}`)
}
console.log("")
console.log("Dry run only. Full rename is a confirmed Release change; see docs/EXAMPLE-HOST.md.")
