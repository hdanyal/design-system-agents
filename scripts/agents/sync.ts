import { spawnSync } from "node:child_process"
import { paths } from "../lib/paths"

const result = spawnSync("node", ["scripts/kit/sync.mjs"], { cwd: paths.root, stdio: "inherit" })
process.exit(result.status ?? 1)
