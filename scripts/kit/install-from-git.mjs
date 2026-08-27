import os from "node:os"
import { existsSync, mkdtempSync, rmSync } from "node:fs"
import { spawnSync } from "node:child_process"
import {
  copyHostBootstrapFiles,
  copyKitPaths,
  fail,
  isKitSource,
  loadKitManifest,
  path,
  printInstallNextSteps,
} from "./lib.mjs"

const args = process.argv.slice(2)
const urlIdx = args.indexOf("--url")
if (urlIdx < 0 || !args[urlIdx + 1]) {
  fail("Usage: node scripts/kit/install-from-git.mjs --url <git-url> [--dir <host-root>]")
}
const gitUrl = args[urlIdx + 1]
const dirIdx = args.indexOf("--dir")
const host = path.resolve(dirIdx >= 0 ? args[dirIdx + 1] : process.cwd())

if (isKitSource(host)) {
  fail("install-from-git refuses the kit source root; run from a design-system host")
}

const tmp = mkdtempSync(path.join(os.tmpdir(), "ds-kit-clone-"))
try {
  const clone = spawnSync("git", ["clone", "--depth", "1", gitUrl, tmp], { encoding: "utf8" })
  if (clone.status !== 0) {
    console.error(clone.stderr || clone.stdout)
    fail(`git clone failed for ${gitUrl}`)
  }
  if (!existsSync(path.join(tmp, ".agents/kit/manifest.json"))) {
    fail("cloned repo is not a design-system agent kit (missing .agents/kit/manifest.json)")
  }

  const kit = loadKitManifest(tmp)
  const hasExistingPack = existsSync(path.join(host, ".agents/context.json"))
  copyKitPaths(tmp, host)
  const hostFiles = copyHostBootstrapFiles(tmp, host)
  console.log(`kit:install-from-git copied kit ${kit.kitVersion} into ${host}`)
  if (hostFiles.length) console.log(`host bootstrap files: ${hostFiles.join(", ")}`)
  printInstallNextSteps(host, { hasExistingPack })

  const boot = spawnSync("node", ["scripts/kit/bootstrap.mjs", "--dir", host], {
    cwd: host,
    encoding: "utf8",
  })
  process.stdout.write(boot.stdout || "")
  process.stderr.write(boot.stderr || "")
  if (boot.status !== 0) process.exit(boot.status ?? 1)
} finally {
  rmSync(tmp, { recursive: true, force: true })
}
