import { existsSync } from "node:fs"
import { spawnSync } from "node:child_process"
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
const write = args.includes("--write")
const source = kitRootFromScripts()
if (host === source || isKitSource(host)) fail("kit:init refuses the kit source root; use kit:upgrade")

const kit = loadKitManifest(source)
const hasExistingPack = existsSync(path.join(host, ".agents/context.json"))
copyKitPaths(source, host)
copyHostBootstrapFiles(source, host)
console.log(`kit:init copied kit ${kit.kitVersion} into ${host}`)
printInstallNextSteps(host, { hasExistingPack })

const bootArgs = ["scripts/kit/bootstrap.mjs", "--dir", host]
if (write) bootArgs.push("--write")
if (args.includes("--confirm-write")) bootArgs.push("--confirm-write")

const boot = spawnSync("node", bootArgs, { cwd: host, encoding: "utf8" })
process.stdout.write(boot.stdout || "")
process.stderr.write(boot.stderr || "")
if (boot.status !== 0) process.exit(boot.status ?? 1)
