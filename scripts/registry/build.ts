import { spawnSync } from "node:child_process"
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import path from "node:path"
import { paths } from "../lib/paths"
import { fail, readJson, sha256, writeJson } from "../lib/fs"

const designLanguage = readJson<{ shadcnCli: string; preset: string }>(paths.designLanguage)

function runShadcnBuild(output: string) {
  rmSync(output, { recursive: true, force: true })
  mkdirSync(output, { recursive: true })
  const result = spawnSync(
    "pnpm",
    ["exec", "shadcn", "build", "--output", output],
    { cwd: paths.root, stdio: "inherit" }
  )
  if (result.status !== 0) fail("shadcn registry build failed")
}

function stripVolatileFields(dir: string) {
  if (!existsSync(dir)) return
  for (const file of readdirSync(dir)) {
    if (!file.endsWith(".json")) continue
    const full = path.join(dir, file)
    const json = JSON.parse(readFileSync(full, "utf8")) as Record<string, unknown>
    delete json.createdAt
    delete json.updatedAt
    delete json.timestamp
    writeFileSync(full, `${JSON.stringify(json, null, 2)}\n`)
  }
}

function writeIndex(dir: string, channel: string, version?: string) {
  const items = existsSync(dir)
    ? readdirSync(dir)
        .filter((file) => file.endsWith(".json") && file !== "index.json" && file !== "registry.json")
        .map((file) => {
          const json = JSON.parse(readFileSync(path.join(dir, file), "utf8")) as {
            name?: string
            type?: string
            description?: string
          }
          return {
            name: json.name ?? file.replace(/\.json$/, ""),
            type: json.type,
            description: json.description,
            checksum: sha256(readFileSync(path.join(dir, file), "utf8")),
          }
        })
        .sort((a, b) => a.name.localeCompare(b.name))
    : []

  writeJson(path.join(dir, "index.json"), {
    namespace: "@carina",
    channel,
    version: version ?? null,
    preset: designLanguage.preset,
    shadcnCli: designLanguage.shadcnCli,
    items,
  })
}

const versionArg = process.argv.find((arg) => arg.startsWith("--version="))?.split("=")[1]
const channel = versionArg ? "release" : "dev"
const output = versionArg
  ? path.join(paths.generatedRegistry, "v", versionArg)
  : path.join(paths.generatedRegistry, "dev")

runShadcnBuild(output)
stripVolatileFields(output)
writeIndex(output, channel, versionArg)
console.log(`registry:build wrote ${output}`)
