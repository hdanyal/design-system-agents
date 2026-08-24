import { existsSync, readFileSync } from "node:fs"
import path from "node:path"
import { paths } from "../lib/paths"
import { fail, readJson } from "../lib/fs"

type Skill = {
  name: string
  form: "thin" | "full"
  invocation: "auto-select" | "contextual" | "explicit-only"
  audience: string
  dependencies: string[]
  writes?: string[]
}

const REQUIRED = [
  "example-onboard",
  "example-branding",
  "example-compose",
  "example-a11y",
  "example-contribute",
  "example-prototype",
  "example-extend-ui",
  "example-promote-block",
  "example-update-design-language",
  "example-update-shadcn",
  "example-figma",
  "example-shadcn-mcp",
  "example-stories",
  "example-verify",
  "example-consume",
  "example-release",
  "example-lifecycle",
  "example-incident",
  "example-dependency-review",
  "example-agent-tooling",
]

const THIN = new Set([
  "example-onboard",
  "example-branding",
  "example-prototype",
  "example-shadcn-mcp",
  "example-verify",
  "example-dependency-review",
])

const AUTO = new Set([
  "example-branding",
  "example-compose",
  "example-a11y",
  "example-contribute",
])

const EXPLICIT = new Set([
  "example-release",
  "example-lifecycle",
  "example-incident",
  "example-dependency-review",
  "example-agent-tooling",
])

const manifest = readJson<{ skills: Skill[] }>(paths.skillManifest)
const names = manifest.skills.map((skill) => skill.name)

if (names.length !== REQUIRED.length) fail(`Expected ${REQUIRED.length} skills, found ${names.length}`)
for (const name of REQUIRED) {
  if (!names.includes(name)) fail(`Missing skill ${name}`)
}

const seen = new Set<string>()
for (const skill of manifest.skills) {
  if (seen.has(skill.name)) fail(`Duplicate skill ${skill.name}`)
  seen.add(skill.name)
  const skillFile = path.join(paths.skillsDir, skill.name, "SKILL.md")
  if (!existsSync(skillFile)) fail(`Missing ${skillFile}`)
  const body = readFileSync(skillFile, "utf8")
  const lines = body.split("\n").length
  if (skill.form === "thin" && lines > 90) fail(`${skill.name} is thin but ${lines} lines`)
  if (skill.form === "full" && lines > 280) fail(`${skill.name} exceeds 280-line budget`)
  if (THIN.has(skill.name) !== (skill.form === "thin")) fail(`${skill.name} form mismatch`)
  if (AUTO.has(skill.name) !== (skill.invocation === "auto-select")) fail(`${skill.name} invocation mismatch`)
  if (EXPLICIT.has(skill.name) !== (skill.invocation === "explicit-only")) {
    fail(`${skill.name} invocation mismatch`)
  }
  for (const dep of skill.dependencies) {
    if (dep.startsWith("example-") && !REQUIRED.includes(dep)) fail(`${skill.name} depends on unknown ${dep}`)
    if (dep === skill.name) fail(`${skill.name} cannot depend on itself`)
  }
}

console.log("skills:check passed")
