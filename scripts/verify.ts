import { spawnSync } from "node:child_process"

const fast = process.argv.includes("--fast")

const steps = fast
  ? [
      ["pnpm", ["kit:check"]],
      ["pnpm", ["skills:check"]],
      ["pnpm", ["test:unit"]],
    ]
  : [
      ["pnpm", ["kit:check"]],
      ["pnpm", ["skills:check"]],
      ["pnpm", ["docs:check"]],
      ["pnpm", ["test:unit"]],
      ["pnpm", ["agent:contract"]],
    ]

for (const [cmd, args] of steps) {
  const result = spawnSync(cmd, args, { stdio: "inherit", shell: process.platform === "win32" })
  if (result.status !== 0) process.exit(result.status ?? 1)
}

console.log(fast ? "verify:fast passed" : "verify passed")
