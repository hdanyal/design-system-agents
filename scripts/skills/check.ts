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
}

const REQUIRED = [
  "template-onboard",
  "template-branding",
  "template-compose",
  "template-a11y",
  "template-contribute",
  "template-prototype",
  "template-extend-ui",
  "template-promote-block",
  "template-update-design-language",
  "template-update-shadcn",
  "template-figma",
  "template-shadcn-mcp",
  "template-stories",
  "template-verify",
  "template-consume",
  "template-release",
  "template-lifecycle",
  "template-incident",
  "template-dependency-review",
  "template-agent-tooling",
]

const THIN = new Set([
  "template-onboard",
  "template-branding",
  "template-prototype",
  "template-shadcn-mcp",
  "template-verify",
  "template-dependency-review",
])

const AUTO = new Set([
  "template-branding",
  "template-compose",
  "template-a11y",
  "template-contribute",
])

const EXPLICIT = new Set([
  "template-release",
  "template-lifecycle",
  "template-incident",
  "template-dependency-review",
  "template-agent-tooling",
])

const manifestPath = paths.skillTemplatesManifest
if (!existsSync(manifestPath)) fail(`Missing ${manifestPath}`)

const manifest = readJson<{ skills: Skill[] }>(manifestPath)
const names = manifest.skills.map((skill) => skill.name)
const templatesDir = path.join(paths.root, ".agents/kit/skill-templates")

if (names.length !== REQUIRED.length) fail(`Expected ${REQUIRED.length} templates, found ${names.length}`)
for (const name of REQUIRED) {
  if (!names.includes(name)) fail(`Missing template ${name}`)
}

const seen = new Set<string>()
for (const skill of manifest.skills) {
  if (seen.has(skill.name)) fail(`Duplicate template ${skill.name}`)
  seen.add(skill.name)
  const skillFile = path.join(templatesDir, skill.name, "SKILL.md")
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
    if (dep.startsWith("template-") && !REQUIRED.includes(dep)) fail(`${skill.name} depends on unknown ${dep}`)
    if (dep === skill.name) fail(`${skill.name} cannot depend on itself`)
  }
}

console.log("skills:check passed")
