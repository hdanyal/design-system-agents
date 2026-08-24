import { spawnSync } from "node:child_process"
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import path from "node:path"
import { paths } from "../lib/paths"
import { fail, readJson } from "../lib/fs"

const indexPath = path.join(paths.generatedRegistry, "dev", "index.json")
if (!existsSync(indexPath)) fail("Run `pnpm registry:build` before registry:smoke")

const index = readJson<{ items: Array<{ name: string }> }>(indexPath)
const fixture = path.join(paths.root, "generated/fixtures/consumer")
rmSync(fixture, { recursive: true, force: true })
mkdirSync(path.join(fixture, "components"), { recursive: true })
writeFileSync(
  path.join(fixture, "package.json"),
  `${JSON.stringify(
    {
      name: "@example/consumer-fixture",
      private: true,
      type: "module",
      dependencies: {
        react: "19.2.4",
        "react-dom": "19.2.4",
      },
    },
    null,
    2
  )}\n`
)

for (const item of index.items.filter((entry) => entry.name !== "example")) {
  const source = path.join(paths.generatedRegistry, "dev", `${item.name}.json`)
  if (!existsSync(source)) fail(`Missing built item ${item.name}`)
  const json = JSON.parse(readFileSync(source, "utf8")) as {
    files?: Array<{ path?: string; content?: string; target?: string }>
    registryDependencies?: string[]
  }
  if (!json.files?.length) fail(`${item.name} has no files`)
  for (const file of json.files) {
    const target = path.join(fixture, file.target ?? file.path ?? `${item.name}.txt`)
    mkdirSync(path.dirname(target), { recursive: true })
    writeFileSync(target, file.content ?? "")
  }
}

const typecheck = spawnSync("pnpm", ["exec", "tsc", "--noEmit", "--pretty", "false"], {
  cwd: paths.root,
  stdio: "inherit",
})
if (typecheck.status !== 0) fail("Producer typecheck failed during registry:smoke")

console.log(`registry:smoke installed ${index.items.length} items into a clean fixture`)
