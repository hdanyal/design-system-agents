import { spawnSync } from "node:child_process"
import { paths } from "../lib/paths"
import { fail } from "../lib/fs"

const version = process.argv.find((arg) => arg.startsWith("--version="))?.split("=")[1] ?? "0.1.0"

function run(label: string, args: string[]) {
  const result = spawnSync("pnpm", args, { cwd: paths.root, stdio: "inherit" })
  if (result.status !== 0) fail(label)
}

run("registry:build", ["exec", "tsx", "scripts/registry/build.ts", `--version=${version}`])
run("manifest", ["exec", "tsx", "scripts/release/manifest.ts", `--version=${version}`])
run("sbom", ["exec", "tsx", "scripts/release/sbom.ts"])
console.log(`cut release ${version}`)
