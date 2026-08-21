import { existsSync, readdirSync, readFileSync } from "node:fs"
import path from "node:path"
import { paths } from "../lib/paths"
import { fail, readJson, sha256, writeJson } from "../lib/fs"

const version = process.argv.find((arg) => arg.startsWith("--version="))?.split("=")[1]
if (!version) fail("Usage: tsx scripts/release/manifest.ts --version=0.1.0")

const designLanguage = readJson<Record<string, string>>(paths.designLanguage)
const dir = path.join(paths.generatedRegistry, "v", version)
if (!existsSync(dir)) fail(`Missing immutable build at ${dir}`)

const items = readdirSync(dir)
    .filter((file) => file.endsWith(".json") && !["index.json", "manifest.json", "registry.json"].includes(file))
  .map((file) => {
    const contents = readFileSync(path.join(dir, file), "utf8")
    const json = JSON.parse(contents) as { name?: string; type?: string; meta?: { status?: string } }
    return {
      name: json.name ?? file.replace(/\.json$/, ""),
      type: json.type,
      status: json.meta?.status ?? "experimental",
      checksum: sha256(contents),
    }
  })

const manifest = {
  name: "@carina/registry",
  version,
  preset: designLanguage.preset,
  shadcnCli: designLanguage.shadcnCli,
  commitSha: process.env.GITHUB_SHA ?? "local",
  compatibility: {
    node: ">=22",
    react: designLanguage.react,
    next: designLanguage.frameworkVersion,
    tailwind: designLanguage.tailwind,
  },
  items,
}

writeJson(path.join(dir, "manifest.json"), manifest)
writeJson(path.join(paths.releaseDir, `manifest-${version}.json`), manifest)
console.log(`Wrote release manifest for ${version}`)
