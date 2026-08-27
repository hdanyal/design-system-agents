# Agent kit

**People:** start at [INSTALL.md](../INSTALL.md) and [docs/ONBOARDING.md](ONBOARDING.md). **This page** is commands and specialist reference for agents.

Portable specialists (`ds-*`) for a design-system git root. Cursor, Claude Code, and Codex share the same pack, inventory, memory, and program board on **each host**. Copy this guide with the kit.

The **kit source** checkout (this repo) contains playbooks, scripts, and skill **templates** only — no host tokens, components, or Storybook. Install onto a design-system repo, then bootstrap that host's pack.

## Install

**One repo = one design system.** Do not nest a second system inside another host's tree. Humans paste a git URL ([README.md](../README.md)); agents follow [INSTALL.md](../INSTALL.md). Prefer a durable sibling kit clone for later `git pull`; `install-from-git` is an equal fallback (hard copy / snapshot of the current kit — not a live link).

### Install from a kit checkout

Reuse or clone the kit next to the host (never inside it), then:

```bash
node scripts/kit/install.mjs --dir /path/to/your-ds
```

`--dir` defaults to cwd when omitted (still refuses kit source).

Optional: `node scripts/kit/init.mjs --dir /path/to/your-ds` (install + scan; write still needs confirm).

### Install from git URL (no kept clone)

Warn the human that this hard-copies the kit at that URL’s current commit into the host. From the host (after kit scripts exist once), or via a temp clone:

```bash
node scripts/kit/install-from-git.mjs --url <git-url>
```

Then invoke **Release** (`ds-release`) for bootstrap scan → human confirm → `--write --confirm-write` → `node scripts/kit/sync.mjs`.

### Pack the kit (optional)

Only if you need a kit folder **without** this full repo:

```bash
pnpm kit:pack
# or: pnpm kit:pack --out /tmp/ds-agent-kit
```

Outputs kit paths from `.agents/kit/manifest.json`. Does **not** include host tokens, components, inventory, or memory.

### New git root (greenfield)

1. Create or clone a **separate** design-system repository.
2. Run install (above) from a durable kit checkout or via install-from-git.
3. On the host: invoke **Release** (`ds-release`).
4. Scan: `node scripts/kit/bootstrap.mjs --dir /path/to/new-ds`. After confirm: `--write --confirm-write`.
5. Review pack `id` (must not be `example` on foreign hosts), `paths`, Figma key, gaps. Set `bootstrapStatus: complete`.
6. Invoke **Manager** (`ds-manager`) to seed `.agents/program/` (or defer). Only Manager writes the board.

Do **not** copy a host's `.agents/context.json`, inventory, memory, or program from another repo. Kit source has none of those.

### Existing design system

1. Same `node scripts/kit/install.mjs --dir /path/to/existing-ds` from a packed or source checkout (or install-from-git).
2. Install leaves an existing host pack, inventory, memory, and program **untouched**.
3. If no pack: bootstrap as above. If pack exists: refresh kit playbooks without clobbering host data (see Upgrade below).
4. Confirm `paths.ui`, `paths.primitives`, `paths.blocks`, and preview match **that** repo's layout (bootstrap scan output or reviewed pack paths).
5. Run `node scripts/kit/check.mjs --dir /path/to/existing-ds`, then Manager on the host.

### Upgrade later

- **Durable clone:** `git pull` in the kit checkout, then `node <clone>/scripts/kit/upgrade.mjs --dir <host-root>`.
- **No kept clone:** warn (another hard copy), then `node scripts/kit/install-from-git.mjs --url <git-url>` from the host, then `node scripts/kit/upgrade.mjs --dir <host-root>`.

Kit-minimal check: `node scripts/kit/check.mjs --dir <host-root>`.

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

Pipeline (confirm each hop): Prototype → Critique → Architect → Critique → Coding → Critique → Bugbot + Security → Accessibility + Documentation → Critique → Release. Language → Critique → (Accessibility | Coding). Max two critique rounds per producer, then human. See [AGENT-CRITIQUE.md](AGENT-CRITIQUE.md). Architect/Coding ACI and memory growth: [AGENT-ARCHITECT-CODING.md](AGENT-ARCHITECT-CODING.md).

## Open-ended view pipeline

Prototype accepts any human-named view; no screen allowlist defines the work. Each prototype keeps `USAGE.md` and a CSF story, reads the generated branding reference when present, and maintains living harvest flags while building. After every material sandbox or story write, it presents the live Storybook companion and keeps the preview available for visual HITL; chat JSX and Cursor Canvas are not the gallery.

Harvest decisions follow one order: reuse → enhance-existing → extract-new primitive/block → keep local. Prototype harvest flags include inventory hint and `match confidence`. Prototype batches all regions from a view into one Architect hop using `.agents/agents/references/harvest-map.md`. Architect may approve a family extract, but prefers enhancing a named API over a twin. Architect uses JIT search (index → near-duplicate → shortlist source inspect) and fills match confidence, api delta, and files Coding may write. Coding implements with contract tests first, `pnpm verify:fast`, rewires prototype imports, and presents the live companion again. After rewire, Prototype clears or marks harvest flags resolved. Token holes go to Language; A11y scopes runners to Coding story ids. See [AGENT-ARCHITECT-CODING.md](AGENT-ARCHITECT-CODING.md) pipeline consumers.

Experimental block slices may be harvested from one view over time. Each slice remains experimental, keeps `registryDependencies` aligned with imports, and requires HITL. After HITL, the specialist who shipped it may **propose** a shared catalog-memory fact; **Documentation (`ds-docs`)** writes it under `.agents/memory/shared/` only in a later acknowledged turn. Architect and Coding may also propose own-namespace lessons after ack (see [AGENT-MEMORY.md](AGENT-MEMORY.md)). Critique routes producer-facing bars to those namespaces — producers never read `ds-critique/`. Keep facts short (~25 lines); retrieve by entity/`trigger` match (exact keys via `memory-index --match`, not embeddings); skip expired; do not load every memory file. Handoffs are not memory.

## Isolation

One git root = one pack. Do not attach another DS’s chats, catalog, or Figma file. Memory and program records must match pack `id`. v1 refuses importing another DS’s memory. Retrieve memory by exact frontmatter keys only — never embedding search.

Pack `id` is not the checkout folder name and not the Cursor window title. Durable context is git on that root: pack, inventory, memory (after ack), program board, and docs. Cursor Agents/chat lists are keyed to a workspace storage id from the folder URI; they do not follow a rename and are not a knowledge store. On a new host, File → Open Folder the directory that contains `.git`. Details: [EXAMPLE-HOST.md](EXAMPLE-HOST.md#names-paths-and-durable-context).

## MCP

Host `agent-tooling.json` is the allowlist. Cursor: `pnpm agents:sync` writes `.cursor/mcp.json`. Claude Code / Codex: configure MCP yourself; do not copy this source host's shadcn pin.

## Done on a foreign host

Reviewed pack, `kit-check` green, `.agents/program/` seeded (or explicitly deferred), one specialist task using **host** inventory.
