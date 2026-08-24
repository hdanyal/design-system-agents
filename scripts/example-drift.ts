import { existsSync, readFileSync } from "node:fs"
import path from "node:path"
import { paths } from "./lib/paths"
import { fail, readJson, sha256 } from "./lib/fs"

type Lock = {
  registryVersion: string
  preset: string
  cli: string
  items: Array<{ name: string; checksum: string; path: string }>
}

const lockPath = path.join(paths.root, "example.lock.json")
if (!existsSync(lockPath)) {
  console.log("example:drift: no example.lock.json in this producer repo (expected for consumers)")
  process.exit(0)
}

const lock = readJson<Lock>(lockPath)
for (const item of lock.items) {
  const file = path.join(paths.root, item.path)
  if (!existsSync(file)) fail(`Managed file missing: ${item.path}`)
  const checksum = sha256(readFileSync(file, "utf8"))
  if (checksum !== item.checksum) {
    fail(`Drift in ${item.path}. Update via an immutable registry version PR or exit Example management.`)
  }
}

console.log("example:drift passed")
