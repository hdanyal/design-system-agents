import { existsSync, readFileSync } from "node:fs"
import path from "node:path"
import { paths } from "../lib/paths"
import { fail, readJson } from "../lib/fs"

const MARKER_BEGIN = "<!-- BEGIN ds-kit-agents -->"
const MARKER_END = "<!-- END ds-kit-agents -->"

const requiredDocs = [
  "ONBOARDING.md",
  "CONTRIBUTING.md",
  "AGENTS.md",
  "SECURITY.md",
  "docs/GOVERNANCE.md",
  "docs/ADOPTION.md",
  "docs/INCIDENTS.md",
  "docs/catalog.md",
  "docs/SKILLS.md",
  "docs/READINESS.md",
  "docs/AGENT-KIT.md",
  "docs/AGENT-MEMORY.md",
  "docs/a11y-allowlist.md",
  "docs/adr/0001-layer-model.md",
  "docs/adr/0002-dtcg-tokens.md",
  "docs/adr/0003-upstream-patch-ledger.md",
  "docs/adr/0004-immutable-registry.md",
  "docs/adr/0005-storybook-figma-roles.md",
  "docs/adr/0006-copy-code-drift.md",
]

for (const file of requiredDocs) {
  if (!existsSync(path.join(paths.root, file))) fail(`Missing required doc: ${file}`)
}

const agents = readFileSync(path.join(paths.root, "AGENTS.md"), "utf8")
const begin = agents.indexOf(MARKER_BEGIN)
const end = agents.indexOf(MARKER_END)
const human =
  begin !== -1 && end !== -1
    ? `${agents.slice(0, begin)}${agents.slice(end + MARKER_END.length)}`
    : agents
const agentLines = human.split("\n").filter((line) => line.length > 0).length
if (agentLines > 80) fail(`AGENTS.md human body is ${agentLines} lines; keep it at most 80`)

const manifest = readJson<{ skills: Array<{ name: string }> }>(paths.skillManifest)
if (manifest.skills.length < 1) fail("skills manifest is empty")

const skillsDoc = readFileSync(paths.skillsDoc, "utf8")
for (const skill of manifest.skills) {
  if (!skillsDoc.includes(skill.name)) fail(`docs/SKILLS.md missing ${skill.name}`)
}

console.log("docs:check passed")
