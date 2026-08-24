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
1. Read generated \`.agents/skills/carina-branding/reference.md\` before view, component, story, or token work.
2. Follow its Overview and Do's and Don'ts when present; use its catalog intent to compose before extracting.
3. Use CSS variables and the resolved lucide/Inter stack only.
4. Token edits route to \`carina-update-design-language\`.
Never copy oklch/hex into JSX or stories. Never hand-edit the generated reference.`,
  "carina-compose": `## Workflow
1. Harvest while building: inventory stock UI, Carina primitives, blocks, Storybook, and approved MCP registries for each reusable-looking region.
2. Decide in order: reuse → enhance-existing → extract a reusable primitive/block → keep local.
3. Prefer enhancing a named existing API over creating a twin. A justified family extract (reusable primitive plus thin composing block) is allowed.
4. Keep living harvest flags and USAGE.md in lockstep with imports and decisions.
Forbidden: cloned primitives, stock restyles, duplicate public APIs, and extraction merely to clean up local layout.`,
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
1. Accept any human-named view; there is no view-name or view-type allowlist.
2. Write only under \`prototypes/<name>/\` with USAGE.md and a CSF story, then follow \`carina-compose\`.
3. Read generated \`.agents/skills/carina-branding/reference.md\` and honor its identity guidance.
4. After every material sandbox or story write, present the live companion using \`.agents/agents/references/present.md\`; keep the preview available for visual HITL.
5. Maintain a living Harvest section in USAGE.md, or HARVEST.md linked from it, using only: reuse, enhance-existing, extract-new primitive/block, keep local.
6. Batch all flags from the view into one Architect handoff using \`.agents/inventory/proposals/_template-harvest-map.md\`.
Never promote, mark stable, or create public registry output from this skill.`,
  "carina-extend-ui": `## Workflow
1. Confirm an Architect decision to create a new API or enhance a named existing API.
2. For new entities, add \`components/carina/<name>/\` with RATIONALE.md, stories, meta.json, and a11y error handling; for enhancements, document and test the API delta without adding a twin.
3. Prefer wrapping stock with tokens over a fork.
4. After implementation, Coding rewires sandbox imports to the decided entity and presents the live companion again.
5. Stop for design + engineering HITL.
Forbidden: editing components/ui for a new API or creating a new base without Architect rationale.`,
  "carina-promote-block": `## Workflow
1. A view may yield multiple experimental slices over time; review and name each slice independently.
2. Require USAGE.md matching imports and registryDependencies matching every registry import.
3. Move only the approved slice to \`registry/blocks/<name>\`; mark experimental and add stories, Changeset, and CI evidence.
4. Stop for HITL. After HITL, propose a catalog memory record; do not write memory in the same turn as promotion.
Do not mark stable, promote unrelated view chrome, or commit \`public/r\`.`,
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
