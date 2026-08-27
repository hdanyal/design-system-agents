import { existsSync } from "node:fs"
import {
  copyHostBootstrapFiles,
  copyKitPaths,
  fail,
  isKitSource,
  kitRootFromScripts,
  loadKitManifest,
  path,
  printInstallNextSteps,
} from "./lib.mjs"

const args = process.argv.slice(2)
const dirIdx = args.indexOf("--dir")
const host = path.resolve(dirIdx >= 0 ? args[dirIdx + 1] : process.cwd())
const source = kitRootFromScripts()
if (host === source || isKitSource(host)) fail("kit:install refuses the kit source root; use kit:upgrade")

const kit = loadKitManifest(source)
if (kit.paths.includes("tokens.json") || kit.paths.includes("components")) {
  fail("kit manifest must not include host tokens or components")
}
const hasExistingPack = existsSync(path.join(host, ".agents/context.json"))
if (hasExistingPack) {
  console.log("host pack present; leaving context/inventory/memory untouched")
}
copyKitPaths(source, host)
const hostFiles = copyHostBootstrapFiles(source, host)
console.log(`kit:install copied kit ${kit.kitVersion} into ${host}`)
if (hostFiles.length) console.log(`host bootstrap files: ${hostFiles.join(", ")}`)
printInstallNextSteps(host, { hasExistingPack })
