import { existsSync } from "node:fs"
import { spawnSync } from "node:child_process"
import {
  copyKitPaths,
  fail,
  kitRootFromScripts,
  loadKitManifest,
  path,
  printInstallNextSteps,
} from "./lib.mjs"

const args = process.argv.slice(2)
const dirIdx = args.indexOf("--dir")
if (dirIdx < 0 || !args[dirIdx + 1]) fail("Usage: node scripts/kit/init.mjs --dir <host-root> [--write --confirm-write]")
const host = path.resolve(args[dirIdx + 1])
const write = args.includes("--write")
const source = kitRootFromScripts()
if (host === source) fail("kit:init refuses the kit source root; use kit:upgrade")

const kit = loadKitManifest(source)
const hasExistingPack = existsSync(path.join(host, ".agents/context.json"))
copyKitPaths(source, host)
console.log(`kit:init copied kit ${kit.kitVersion} into ${host}`)
printInstallNextSteps(host, { hasExistingPack })

const bootArgs = ["scripts/kit/bootstrap.mjs", "--dir", host]
if (write) bootArgs.push("--write")
if (args.includes("--confirm-write")) bootArgs.push("--confirm-write")

const boot = spawnSync("node", bootArgs, { cwd: source, encoding: "utf8" })
process.stdout.write(boot.stdout || "")
process.stderr.write(boot.stderr || "")
if (boot.status !== 0) process.exit(boot.status ?? 1)
