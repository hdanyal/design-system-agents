import { existsSync, readdirSync, readFileSync } from "node:fs"
import path from "node:path"
import { paths } from "../lib/paths"
import { fail } from "../lib/fs"

const dir = path.join(paths.root, "tests/agent-contract")
if (!existsSync(dir)) fail("Missing tests/agent-contract")

const files = readdirSync(dir).filter((file) => file.endsWith(".test.ts"))
if (files.length < 8) fail("Expected behavioral contract tests for the high-risk workflows")

for (const file of files) {
  const body = readFileSync(path.join(dir, file), "utf8")
  if (!body.includes("expected") && !body.includes("forbidden")) {
    fail(`${file} must assert expected/forbidden outcomes, not prose`)
  }
}

console.log(`agent:contract validated ${files.length} high-risk scenarios`)
