import { existsSync } from "node:fs"
import { copyKitPaths, fail, kitRootFromScripts, loadKitManifest, path } from "./lib.mjs"

const args = process.argv.slice(2)
const dirIdx = args.indexOf("--dir")
if (dirIdx < 0 || !args[dirIdx + 1]) fail("Usage: node scripts/kit/install.mjs --dir <host-root>")
const host = path.resolve(args[dirIdx + 1])
const source = kitRootFromScripts()
if (host === source) fail("kit:install refuses the kit source root; use kit:upgrade")

const kit = loadKitManifest(source)
if (kit.paths.includes("tokens.json") || kit.paths.includes("components")) {
  fail("kit manifest must not include host tokens or components")
}
if (existsSync(path.join(host, ".agents/context.json"))) {
  console.log("host pack present; leaving context/inventory/memory untouched")
}
copyKitPaths(source, host)
console.log(`kit:install copied kit ${kit.kitVersion} into ${host}`)
