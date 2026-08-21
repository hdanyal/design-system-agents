import {
  copyKitPaths,
  fail,
  kitRootFromScripts,
  loadKitManifest,
  path,
  writeJson,
} from "./lib.mjs"

const source = kitRootFromScripts()
const args = process.argv.slice(2)
const outIdx = args.indexOf("--out")
const outDir = outIdx >= 0 ? args[outIdx + 1] : path.join(source, "generated/kit-pack")

const kit = loadKitManifest(source)
copyKitPaths(source, outDir)
writeJson(path.join(outDir, ".agents/kit/pack-meta.json"), {
  kitVersion: kit.kitVersion,
  packedFrom: "kit-paths-only",
  protectedExcluded: true,
})
console.log(`kit:pack wrote ${outDir} (kitVersion ${kit.kitVersion})`)
if (outDir.includes(source) && args.includes("--check-host-leak")) {
  fail("unexpected")
}
