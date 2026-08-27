import { isKitSource, path, scanIdentityPaths, scanKitSourceForbidden } from "./lib.mjs"

const args = process.argv.slice(2)
const dirIdx = args.indexOf("--dir")
const root = path.resolve(dirIdx >= 0 ? args[dirIdx + 1] : process.cwd())

if (isKitSource(root)) {
  const forbidden = scanKitSourceForbidden(root)
  console.log(`identity-scan (${path.basename(root)}): kit source — ${forbidden.length} forbidden catalog marker(s)`)
  if (forbidden.length) {
    for (const hit of forbidden) console.log(`  ${hit.path} — ${hit.label}`)
    process.exit(1)
  }
  console.log("Kit source is clean (no bundled catalog identity).")
  process.exit(0)
}

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
console.log("Dry run only. Rename example identity via a confirmed Release change.")
