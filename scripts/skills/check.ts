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
  "carina-onboard",
  "carina-branding",
  "carina-compose",
  "carina-a11y",
  "carina-contribute",
  "carina-prototype",
  "carina-extend-ui",
  "carina-promote-block",
  "carina-update-design-language",
  "carina-update-shadcn",
  "carina-figma",
  "carina-shadcn-mcp",
  "carina-stories",
  "carina-verify",
  "carina-consume",
  "carina-release",
  "carina-lifecycle",
  "carina-incident",
  "carina-dependency-review",
  "carina-agent-tooling",
]

const THIN = new Set([
  "carina-onboard",
  "carina-branding",
  "carina-prototype",
  "carina-shadcn-mcp",
  "carina-verify",
  "carina-dependency-review",
])

const AUTO = new Set([
  "carina-branding",
  "carina-compose",
  "carina-a11y",
  "carina-contribute",
])

const EXPLICIT = new Set([
  "carina-release",
  "carina-lifecycle",
  "carina-incident",
  "carina-dependency-review",
  "carina-agent-tooling",
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
    if (dep.startsWith("carina-") && !REQUIRED.includes(dep)) fail(`${skill.name} depends on unknown ${dep}`)
    if (dep === skill.name) fail(`${skill.name} cannot depend on itself`)
  }
}

console.log("skills:check passed")
