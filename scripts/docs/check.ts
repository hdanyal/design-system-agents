import { existsSync, readFileSync } from "node:fs"
import path from "node:path"
import { paths } from "../lib/paths"
import { fail } from "../lib/fs"

const MARKER_BEGIN = "<!-- BEGIN ds-kit-agents -->"
const MARKER_END = "<!-- END ds-kit-agents -->"

const requiredDocs = [
  "INSTALL.md",
  "docs/ONBOARDING.md",
  "docs/README.md",
  "CONTRIBUTING.md",
  "AGENTS.md",
  "SECURITY.md",
  "docs/SKILLS.md",
  "docs/AGENT-KIT.md",
  "docs/AGENT-MEMORY.md",
  "docs/adr/0008-example-host-identity.md",
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

if (!existsSync(paths.skillTemplatesManifest)) fail("missing skill template manifest")

const skillsDoc = readFileSync(paths.skillsDoc, "utf8")
for (const name of ["template-onboard", "template-compose"]) {
  if (!skillsDoc.includes(name)) fail(`docs/SKILLS.md missing ${name}`)
}

console.log("docs:check passed")
