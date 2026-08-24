# Agent kit

Portable specialists (`ds-*`) for a design-system git root. Cursor, Claude Code, and Codex share the same pack, inventory, memory, and program board. Copy this guide with the kit.

The **kit source** checkout also includes an example host (pack `id: example`) so the specialists can run against a real catalog. `pnpm kit:pack` does **not** include that catalog. On a packed install, bootstrap **your** pack and paths. On the kit source repo, [EXAMPLE-HOST.md](EXAMPLE-HOST.md) covers using or replacing the example.

## Install

**One git root = one pack.** Do not nest a second design system inside another host's tree (not under `prototypes/`, `components/`, or a subfolder of an existing pack).

### Pack the kit (from this repo)

```bash
pnpm kit:pack
# or: pnpm kit:pack --out /tmp/ds-agent-kit
```

Outputs kit paths from `.agents/kit/manifest.json` (playbooks, `scripts/kit`, agent docs, harness adapters). Does **not** include host tokens, components, inventory records, or memory.

### New git root (greenfield)

1. Create or clone a **separate** design-system repository (outside any other pack's git root).
2. From this checkout: `node scripts/kit/install.mjs --dir /path/to/new-ds` (refuses the kit source root itself).
3. On the host: invoke **Release** (`ds-release`).
4. Scan: `node scripts/kit/bootstrap.mjs --dir /path/to/new-ds`. After confirm: `--write --confirm-write` (seeds empty `.agents/memory/` only).
5. Review pack `id` (must not reuse this source host's id), `paths`, Figma key, gaps. Set `bootstrapStatus: complete`.
6. Invoke **Manager** (`ds-manager`) to seed `.agents/program/` (or defer explicitly).

Do **not** copy this source host's `.agents/context.json`, `.agents/inventory/`, `.agents/memory/`, `.agents/program/`, `tokens.json`, `design-language.json`, `agent-tooling.json`, or `components/`. On the kit source repo, [EXAMPLE-HOST.md](EXAMPLE-HOST.md) explains why.

### Existing design system

1. Same `node scripts/kit/install.mjs --dir /path/to/existing-ds` from a packed or source checkout.
2. Install leaves an existing host pack, inventory, memory, and program **untouched**.
3. If no pack: bootstrap as above. If pack exists: `node scripts/kit/upgrade.mjs --dir /path/to/existing-ds` to refresh kit playbooks without clobbering host data.
4. Confirm `paths.ui`, `paths.primitives`, `paths.blocks`, and preview match **that** repo's layout (bootstrap scan output or reviewed pack paths).
5. Run `node scripts/kit/check.mjs --dir /path/to/existing-ds`, then Manager on the host.

Upgrade later: `node scripts/kit/upgrade.mjs --dir <host-root>`. Kit-minimal check: `node scripts/kit/check.mjs --dir <host-root>`.

After install on any host: `pnpm agents:sync` (or `node scripts/kit/sync.mjs` from the host if scripts are wired).

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

Prototype accepts any human-named view; no screen allowlist defines the work. Each prototype keeps `USAGE.md` and a CSF story, reads the generated branding reference when present, and maintains living harvest flags while building. After every material sandbox or story write, it presents the live Storybook companion and keeps the preview available for visual HITL; chat JSX and Cursor Canvas are not the gallery.

Harvest decisions follow one order: reuse → enhance-existing → extract-new primitive/block → keep local. Prototype batches all regions from a view into one Architect hop using `.agents/agents/references/harvest-map.md`. Architect may approve a family extract, but prefers enhancing a named API over a twin. Coding implements the approved new or enhanced entity, rewires prototype imports, and presents the live companion again.

Experimental block slices may be harvested from one view over time. Each slice remains experimental, keeps `registryDependencies` aligned with imports, and requires HITL. After HITL, the specialist who shipped it may **propose** a shared catalog-memory fact; **Documentation (`ds-docs`)** writes it under `.agents/memory/shared/` only in a later acknowledged turn. Keep facts short (~25 lines); retrieve by entity match — do not load every memory file. Handoffs are not memory.

## Isolation

One git root = one pack. Do not attach another DS’s chats, catalog, or Figma file. Memory and program records must match pack `id`. v1 refuses importing another DS’s memory.

## MCP

Host `agent-tooling.json` is the allowlist. Cursor: `pnpm agents:sync` writes `.cursor/mcp.json`. Claude Code / Codex: configure MCP yourself; do not copy this source host's shadcn pin.

## Done on a foreign host

Reviewed pack, `kit-check` green, `.agents/program/` seeded (or explicitly deferred), one specialist task using **host** inventory.
