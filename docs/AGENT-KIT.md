# Agent kit

Portable specialists (`ds-*`) for a design-system git root. Cursor, Claude Code, and Codex share the same pack, inventory, memory, and program board. Copy this guide with the kit.

## Install

1. From a Carina git tag run `pnpm kit:pack` or copy kit paths listed in `.agents/kit/manifest.json`.
2. On the host: `node scripts/kit/install.mjs --dir <host-root>` (from the unpacked kit, or copy files then `pnpm agents:sync`).
3. Do **not** copy Carina `.agents/context.json`, `.agents/inventory/`, `.agents/memory/`, `.agents/program/`, `tokens.json`, `design-language.json`, `agent-tooling.json`, or `components/`.
4. Open **one** product on the host git root. Invoke **Release** (`ds-release`): bootstrap this design system.
5. Run `node scripts/kit/bootstrap.mjs --dir .` (scan). After you confirm: `--write --confirm-write` (seeds empty `.agents/memory/` layout; no records).
6. Review pack `id` (not `carina` unless it is Carina), paths, Figma key, gaps. Then `bootstrapStatus: complete`.
7. Invoke **Manager** (`ds-manager`) to seed `.agents/program/` (or explicitly defer the board). On the first board after bootstrap, and whenever the board is missing, Manager must task any generated-brand-identity gap: the branding reference needs Overview plus Do's and Don'ts. Manager records the gap/task only and never writes the identity file.

Upgrade later: `node scripts/kit/upgrade.mjs --dir <host-root>`. It must not clobber pack, inventory, memory records, or program; it may add missing empty memory folders. Kit-minimal check: `node scripts/kit/check.mjs --dir <host-root>`.

## Harness

| | Cursor | Claude Code | Codex |
| --- | --- | --- | --- |
| Invoke | `/` or picker | `/agents` or `@ds-*` | Prefix `ds-*: ` |
| Confirm | AskQuestion | Stop and wait | Stop and wait; auto-edit is not confirm |
| Next agent | Task-spawn | Spawn `.claude/agents` | Spawn TOML or print the next id |
| Reviews | Product Bugbot / Security Review | Playbook only | Playbook only |

Choose Cursor for product reviewers and confirm cards. Choose Claude Code for named subagents without Cursor. Choose Codex for CLI/`AGENTS.md`. Do not run the same write in two products on one branch. Handoffs are portable.

`pnpm agents:sync` regenerates all three harnesses from canonical `.agents/agents/*.md`: `.cursor/agents`, `.claude/agents`, and `.codex/agents`. Never hand-edit those adapters.

## Agents

Named invoke wins. Default chat picks one owner. Ambiguous “review” → ask Bugbot vs Security vs Accessibility vs Critique vs Coding. Unqualified “set up the repo” → ask Manager vs Release.

Manager assigns task owners from the **live** `.agents/agents/manifest.json` (`invokeWhen`, `handoffsTo`, `mustNotWrite`). Confirm before spawn. Manager is not an auto-run pipeline hop.

| Id | Invoke when | Example |
| --- | --- | --- |
| `ds-manager` | Task board, what’s next, flag/organize gaps | What’s next on the board? Flag gaps and organize tasks. |
| `ds-release` | Bootstrap, kit, release, incident | Bootstrap this design system and list gaps I must answer. |
| `ds-prototype` | Sandbox, show me this | Explore this named view in the sandbox and show it in Storybook. |
| `ds-architect` | Reuse, enhance, or new component? | Resolve this view's harvest batch without creating twins. |
| `ds-coding` | Implement approved change | Enhance the named API, rewire the sandbox, and present it live. |
| `ds-docs` | USAGE / story prose | Write USAGE from the implementation, no new props. |
| `ds-language` | Tokens | Propose a token change so muted text meets WCAG AA. |
| `ds-a11y` | axe / contrast | Run a11y on the new stories. |
| `ds-critique` | Decision quality | Critique this harvest batch before Coding. |
| `ds-bugbot` | PR bugs | Review branch changes for bugs against main. |
| `ds-security` | Security review | Security-review uncommitted changes in this repo only. |

**Manager vs Release:** Release writes the pack and `.agents/inventory/gaps.json`. Manager flags those plus work-structure gaps onto `.agents/program/` and keeps the board current.

Program path: `.agents/program/` (`board.md`, `tasks.md`, `gaps.md`, `connections.md`). Specialists read it; only Manager writes it. `designSystemId` in the board must match pack `id`.

Pipeline (confirm each hop): Prototype → Critique → Architect → Critique → Coding → Critique → Bugbot + Security → Accessibility + Documentation → Critique → Release. Language → Critique → (Accessibility | Coding). Max two critique rounds per producer, then human. See [AGENT-CRITIQUE.md](AGENT-CRITIQUE.md).

## Open-ended view pipeline

Prototype accepts any human-named view; no screen allowlist defines the work. Each prototype keeps `USAGE.md` and a CSF story, reads the generated branding reference, and maintains living harvest flags while building. After every material sandbox or story write, it presents the live Storybook companion and keeps the preview available for visual HITL; chat JSX and Cursor Canvas are not the gallery.

Harvest decisions follow one order: reuse → enhance-existing → extract-new primitive/block → keep local. Prototype batches all regions from a view into one Architect hop using `.agents/inventory/proposals/_template-harvest-map.md`. Architect may approve a family extract, but prefers enhancing a named API over a twin. Coding implements the approved new or enhanced entity, rewires prototype imports, and presents the live companion again.

Experimental block slices may be harvested from one view over time. Each slice remains experimental, keeps `registryDependencies` aligned with imports, and requires HITL. After HITL, the specialist who shipped it may **propose** a shared catalog-memory fact; **Documentation (`ds-docs`)** writes it under `.agents/memory/shared/` only in a later acknowledged turn. Keep facts short (~25 lines); retrieve by entity match — do not load every memory file. Handoffs are not memory.

## Isolation

One git root = one pack. Do not attach another DS’s chats, catalog, or Figma file. Memory and program records must match pack `id`. v1 refuses importing another DS’s memory.

## MCP

Host `agent-tooling.json` is the allowlist. Cursor: `pnpm agents:sync` writes `.cursor/mcp.json`. Claude Code / Codex: configure MCP yourself; do not copy Carina’s shadcn pin.

## Done on a foreign host

Reviewed pack, `kit-check` green, `.agents/program/` seeded (or explicitly deferred), one specialist task using **host** inventory.
