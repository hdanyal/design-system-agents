import { spawnSync } from "node:child_process"
import { paths } from "./lib/paths"
import { fail } from "./lib/fs"

const fast = process.argv.includes("--fast")

function run(label: string, command: string, args: string[]) {
  console.log(`\n→ ${label}`)
  const result = spawnSync(command, args, { cwd: paths.root, stdio: "inherit" })
  if (result.status !== 0) fail(`${label} failed`)
}

run("lint", "pnpm", ["exec", "eslint", "."])
run("typecheck", "pnpm", ["typecheck"])
run("unit", "pnpm", ["test:unit"])

if (fast) {
  console.log("\nverify:fast passed")
  process.exit(0)
}

run("stories", "pnpm", ["test:stories"])
run("a11y", "pnpm", ["test:a11y"])
run("storybook:build", "pnpm", ["storybook:build"])
run("tokens:check", "pnpm", ["tokens:check"])
run("catalog:check", "pnpm", ["catalog:check"])
run("composition:check", "pnpm", ["composition:check"])
run("docs:check", "pnpm", ["docs:check"])
run("agents:check", "pnpm", ["agents:check"])
run("upstream:check", "pnpm", ["upstream:check"])
run("registry:build", "pnpm", ["registry:build"])
run("registry:smoke", "pnpm", ["registry:smoke"])
run("mcp:check", "pnpm", ["mcp:check"])
run("colors", "pnpm", ["exec", "tsx", "scripts/lint-colors.ts"])

console.log("\nverify passed")
