import { existsSync, readFileSync } from "node:fs"
import {
  GENERATED_HEADER,
  adapterRelPaths,
  fail,
  hashTree,
  kitRootFromScripts,
  loadAgentManifest,
  loadKitManifest,
  path,
  readJson,
  upsertMarker,
  writeJson,
  writeText,
} from "./lib.mjs"

const root = kitRootFromScripts()
const kit = loadKitManifest(root)
const manifest = loadAgentManifest(root)
const ids = manifest.agents.map((a) => a.id)

function playbook(id) {
  return readFileSync(path.join(root, ".agents/agents", `${id}.md`), "utf8").trim()
}

function preamble(agent) {
  return `<!-- ${GENERATED_HEADER} -->
Load \`.agents/context.json\`. Isolation key is \`(repoRoot, designSystemId)\`. Drop any other pack.
If \`bootstrapStatus\` is not \`complete\`, only Release/bootstrap work is allowed.
Confirm before protected writes or spawning another agent (see \`.agents/agents/references/confirm.md\`).
Write only this agent's pack paths. Named invoke wins. No second agent without a confirmed handoff.
Load \`carina-*\` skills only when pack \`id === "carina"\`.
Review engine: ${agent.reviewEngine || "none"}. Cursor product wrappers only in the Cursor adapter.
See docs/AGENT-KIT.md.`
}

function harnessHowTo(harness, agent) {
  if (harness === "cursor") {
    return `## How to use in Cursor
Invoke via \`/\` or the custom-agent picker (\`${agent.displayName}\`, id \`${agent.id}\`).
Confirm with AskQuestion. After approve, Task-spawn the next \`ds-*\`${agent.reviewEngine === "cursor-product" ? ` or the product \`${agent.id === "ds-bugbot" ? "bugbot" : "security-review"}\` subagent` : ""}.
Never search other workspaces' chats or attach another design system's catalog.`
  }
  if (harness === "claude") {
    return `## How to use in Claude Code
Invoke via \`/agents\` or \`@${agent.id}\`.
Stop and wait for an explicit yes before writes or spawn. Auto-approve is not kit confirm.
After yes, spawn only \`.claude/agents/${agent.id}.md\` (or the confirmed next id) with the handoff path.
${agent.reviewEngine ? "This harness uses the playbook reviewer. Do not claim Cursor Bugbot ran." : ""}`
  }
  return `## How to use in Codex
Start the prompt with \`${agent.id}:\` or spawn the project agent \`${agent.id}\`.
Stop and wait for an explicit yes. Codex auto-edit is not kit confirm.
If spawn is unavailable, write the handoff and tell the user the next invoke line.
${agent.reviewEngine ? "Playbook reviewer only. Never claim Cursor Bugbot ran." : ""}`
}

function cursorAdapter(agent) {
  const readonly = agent.readonly ? "true" : "false"
  return `---
name: ${agent.id}
description: ${agent.description}
model: inherit
readonly: ${readonly}
---

${preamble(agent)}

${harnessHowTo("cursor", agent)}

${playbook(agent.id)}
`
}

function claudeAdapter(agent) {
  const tools = agent.readonly
    ? "tools: Read, Grep, Glob, Bash\ndisallowedTools: Write, Edit\n"
    : ""
  return `---
name: ${agent.id}
description: ${agent.description}
model: inherit
permissionMode: default
${tools}---

${preamble(agent)}

${harnessHowTo("claude", agent)}

${playbook(agent.id)}
`
}

function tomlEscape(text) {
  return text.replaceAll("\\", "\\\\").replaceAll('"""', '\\"""')
}

function codexAdapter(agent) {
  const extra = agent.readonly ? `sandbox_mode = "read-only"\n` : ""
  const body = `${preamble(agent)}\n\n${harnessHowTo("codex", agent)}\n\n${playbook(agent.id)}\n`
  return `name = "${agent.id}"
description = "${agent.description.replaceAll('"', '\\"')}"
${extra}developer_instructions = """
${tomlEscape(body)}
"""
`
}

const dsKitRule = `---
description: Portable design-system kit isolation
alwaysApply: true
---

Load \`.agents/context.json\`. One owning \`ds-*\` agent per request. Named invoke wins.
Never mix another design system's chats, memory, tokens, catalog, or Figma file.
No second specialist without a confirmed handoff. Confirm before protected writes.
If bootstrap is not complete, route to Release (\`ds-release\`) for scan/gaps.
If bootstrap is complete and \`.agents/program/\` is missing, route to Manager (\`ds-manager\`) for the board.
Do not print a host brand name that is not this pack's id.
See docs/AGENT-KIT.md.
`

const agentsMarker = `## Specialists (ds-kit)
See docs/AGENT-KIT.md.
Invoke: ${ids.join(", ")}.
Load .agents/context.json. One owner. Stop for yes before writes or another agent.
Codex: start with the id. If spawn is unavailable, write .agents/handoffs/ and print the next id.
Bugbot/Security: Cursor product reviewers, else playbook (never claim Cursor Bugbot on Claude/Codex).
`

const claudeMarker = `# Design-system kit
Read AGENTS.md, .agents/context.json, and docs/AGENT-KIT.md.
Invoke via /agents or @ds-*. One owner. Stop and wait for yes before writes or spawn.
Claude Code: playbook review for Bugbot/Security (not Cursor product reviewers).
`

for (const agent of manifest.agents) {
  writeText(path.join(root, ".cursor/agents", `${agent.id}.md`), cursorAdapter(agent))
  writeText(path.join(root, ".claude/agents", `${agent.id}.md`), claudeAdapter(agent))
  writeText(path.join(root, ".codex/agents", `${agent.id}.toml`), codexAdapter(agent))
}

writeText(path.join(root, ".cursor/rules/ds-kit.mdc"), dsKitRule)

const agentsMdPath = path.join(root, "AGENTS.md")
const agentsMd = existsSync(agentsMdPath) ? readFileSync(agentsMdPath, "utf8") : ""
writeText(agentsMdPath, upsertMarker(agentsMd, agentsMarker))

const claudeMdPath = path.join(root, "CLAUDE.md")
const claudeMd = existsSync(claudeMdPath) ? readFileSync(claudeMdPath, "utf8") : ""
writeText(claudeMdPath, upsertMarker(claudeMd, claudeMarker))

const toolingPath = path.join(root, "agent-tooling.json")
if (existsSync(toolingPath)) {
  const tooling = readJson(toolingPath)
  const mcp = {
    mcpServers: Object.fromEntries(
      Object.entries(tooling.mcpServers).map(([name, server]) => [
        name,
        { command: server.command, args: server.args },
      ])
    ),
  }
  writeText(
    path.join(root, ".cursor/mcp.json"),
    `/* GENERATED from agent-tooling.json. Do not hand-edit. Run \`pnpm agents:sync\`. */\n${JSON.stringify(mcp, null, 2)}\n`
  )
}

const skillsPath = path.join(root, ".agents/skills/manifest.json")
if (existsSync(skillsPath)) {
  const skills = readJson(skillsPath)
  const skillsDoc = `# Carina skills

GENERATED from \`.agents/skills/manifest.json\`. Canonical instructions live in each \`SKILL.md\`.

| Skill | Form | Invocation | Boundary |
| --- | --- | --- | --- |
${skills.skills
  .map((skill) => `| \`${skill.name}\` | ${skill.form} | ${skill.invocation} | ${skill.boundary} |`)
  .join("\n")}
`
  writeText(path.join(root, "docs/SKILLS.md"), skillsDoc)
}

const hashes = hashTree(root, adapterRelPaths(ids))
writeJson(path.join(root, ".agents/kit/adapters.lock.json"), {
  kitVersion: kit.kitVersion,
  hashes,
})

console.log(`agents:sync wrote ${ids.length} agents × Cursor/Claude/Codex adapters`)
