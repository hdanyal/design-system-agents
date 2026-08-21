import { writeText } from "../lib/fs"
import { paths } from "../lib/paths"
import { readJson } from "../lib/fs"
import path from "node:path"

type Skill = {
  name: string
  form: "thin" | "full"
  invocation: string
  audience: string
  boundary: string
  dependencies: string[]
}

const POLICY = {
  contribute: "CONTRIBUTING.md",
  governance: "docs/GOVERNANCE.md",
  adoption: "docs/ADOPTION.md",
  security: "SECURITY.md",
  incidents: "docs/INCIDENTS.md",
}

const EXTRA: Record<string, string> = {
  "carina-onboard": `## Workflow
Cold start is pack bootstrap (\`ds-release\` / \`node scripts/kit/bootstrap.mjs\`), not a second auto-select skill.
1. Read \`.agents/context.json\`. If missing or not \`complete\`, stop and invoke \`ds-release\`.
2. If bootstrap is \`complete\`, invoke \`ds-manager\` for \`.agents/program/\` (not auto-select).
3. Then load exactly one owning \`ds-*\` agent from docs/AGENT-KIT.md.
Do not write files until routing is done.`,
  "carina-branding": `## Workflow
1. Read generated \`.agents/skills/carina-branding/reference.md\`.
2. Use CSS variables and the resolved lucide/Inter stack only.
3. Token edits route to \`carina-update-design-language\`.
Never copy oklch/hex into JSX or stories.`,
  "carina-compose": `## Workflow
1. Inventory stock UI, Carina primitives, blocks, Storybook, and approved MCP registries.
2. Reuse a match or extract a reusable primitive via \`carina-extend-ui\`.
3. Keep trivial local layout local.
4. Keep USAGE.md in lockstep with imports.
Forbidden: cloned primitives, stock restyles, duplicate public APIs.`,
  "carina-a11y": `## Workflow
1. Run \`pnpm test:a11y\` and \`pnpm test:stories\`.
2. Add play tests for stateful primitives/blocks.
3. Collect manual HITL evidence from GOVERNANCE.
4. Never waive a violation; allowlist only demo-fixture stock issues.
See docs/a11y-allowlist.md.`,
  "carina-contribute": `## Workflow
Follow CONTRIBUTING.md: typed branch, docs-as-code, Conventional Commits, PR template, CODEOWNERS.
Agents open/update PRs only. Never push or merge main, skip hooks, or rewrite others' commits.`,
  "carina-prototype": `## Workflow
Write only under \`prototypes/<name>/\` with USAGE.md and a story.
Then follow \`carina-compose\`. Do not promote from this skill.`,
  "carina-extend-ui": `## Workflow
1. Confirm catalog gap via compose inventory.
2. Add \`components/carina/<name>/\` with RATIONALE.md, stories, meta.json, a11y error.
3. Prefer wrapping stock with tokens over a fork.
4. Stop for design + engineering HITL.
Forbidden: editing components/ui for a new API.`,
  "carina-promote-block": `## Workflow
1. Require USAGE.md matching imports/registryDependencies.
2. Move approved prototype to registry/blocks/<name>.
3. Mark experimental, add stories, Changeset, and CI evidence.
4. Stop for HITL. Do not mark stable and do not commit public/r.`,
  "carina-update-design-language": `## Workflow
1. Edit tokens.json or apply a preset as a candidate diff.
2. Run \`pnpm tokens:build\` and a11y/Foundations review.
3. Never restyle by editing stock or Carina component class colors.
4. Breaking token renames need a major Changeset.`,
  "carina-update-shadcn": `## Workflow
1. Use pinned shadcn@4.18.0 (or the new pin in a chore PR).
2. Diff/dry-run, rebase upstream-patches.json, run upstream/catalog/story/a11y/smoke.
3. Theme-only work routes to design-language.
Forbidden: overwriting components/carina.`,
  "carina-figma": `## Workflow
1. Require a Figma URL or explicit exploration task.
2. Load official Figma skills for APIs.
3. Map values to canonical tokens. Place code-to-Figma work on Explorations.
4. Catalog gaps go through extend-ui. Do not paste generated code as a new primitive.`,
  "carina-shadcn-mcp": `## Workflow
Browse/search/view only by default.
Installs route to update-shadcn or consume.
Registry writes route to promote-block.
Never enable an unreviewed registry namespace.`,
  "carina-stories": `## Workflow
CSF titles: Foundations / UI / Carina / Blocks / Prototypes.
Foundations bind to var(--*).
Stateful components need play tests (see carina-a11y).
Tag experimental/stable/deprecated from metadata.`,
  "carina-verify": `## Workflow
Use \`pnpm verify:fast\` for local iteration.
Use \`pnpm verify\` before merge/release.
Do not skip or weaken a gate. Report failures with owning script.`,
  "carina-consume": `## Workflow
Follow docs/ADOPTION.md: pin preset + immutable /r/vX.Y.Z, dry-run/diff, carina.lock.json, product tests.
Report drift; do not fork managed files.`,
  "carina-release": `## Workflow
1. Changesets-only version PR.
2. Build immutable /r/vX.Y.Z, manifest, checksums, SBOM.
3. Run smoke/MCP/consumer/rollback checks.
4. Maintainer HITL. No public publish while proprietary.`,
  "carina-lifecycle": `## Workflow
Separate PR from creation. Apply GOVERNANCE maturity table.
Deprecation needs owner, reason, replacement, migration, and window.
Do not implement release mechanics; call carina-release.`,
  "carina-incident": `## Workflow
Follow docs/INCIDENTS.md: stop publication, pin/revert known-good immutable release, preserve evidence, communicate, open follow-ups.
Requires incident-owner authority.`,
  "carina-dependency-review": `## Workflow
Collect SECURITY intake: need, alternatives, license, vulns, health, bundle impact, install scripts.
Stop for CODEOWNER approval. Do not add the dependency first.`,
  "carina-agent-tooling": `## Workflow
Edit canonical skills/manifest/agent-tooling.json only.
Lock revisions, run agents:sync/check, skills:check, kit:check, and agent:contract.
Never hand-edit generated adapters or .cursor/mcp.json.`,
}

const manifest = readJson<{ skills: Skill[] }>(paths.skillManifest)

for (const skill of manifest.skills) {
  const body = `---
name: ${skill.name}
description: ${skill.boundary}
---

# ${skill.name}

- Form: ${skill.form}
- Invocation: ${skill.invocation}
- Audience: ${skill.audience}
- Depends on: ${skill.dependencies.join(", ") || "none"}

## Triggers
Use this skill for work that matches its boundary. Do not use it for a different owning artifact.

## Non-triggers
If another skill owns the mutation, route there.

## Allowed / forbidden
Allowed: the files and commands required by this workflow.
Forbidden: stock restyles, secret commits, main pushes, unreviewed registries, and policy duplication.

## Policy links
- Process: ${POLICY.contribute}
- Governance: ${POLICY.governance}
- Adoption: ${POLICY.adoption}
- Security: ${POLICY.security}
- Incidents: ${POLICY.incidents}

${EXTRA[skill.name]}
`
  writeText(path.join(paths.skillsDir, skill.name, "SKILL.md"), body)
}

console.log("wrote 20 SKILL.md files")
