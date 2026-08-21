import { spawnSync } from "node:child_process"
import { existsSync, readFileSync } from "node:fs"
import { paths } from "../lib/paths"
import { fail } from "../lib/fs"

const skills = spawnSync("pnpm", ["exec", "tsx", "scripts/skills/check.ts"], {
  cwd: paths.root,
  stdio: "inherit",
})
if (skills.status !== 0) fail("skills:check failed")

const kit = spawnSync("node", ["scripts/kit/check.mjs"], {
  cwd: paths.root,
  stdio: "inherit",
})
if (kit.status !== 0) fail("kit-check failed")

if (!existsSync(paths.cursorMcp)) fail("Missing generated .cursor/mcp.json; run pnpm agents:sync")
const mcp = readFileSync(paths.cursorMcp, "utf8")
if (!mcp.includes("GENERATED from agent-tooling.json")) {
  fail(".cursor/mcp.json must be generated from agent-tooling.json")
}

if (!existsSync(paths.skillsDoc)) fail("Missing generated docs/SKILLS.md")
console.log("agents:check passed")
