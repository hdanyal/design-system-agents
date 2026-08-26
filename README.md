# Design System Agents kit

Portable `ds-*` **specialists** for a design-system git root — Cursor, Claude Code, and Codex share one pack, inventory, memory, and program board. This kit source also ships a **bundled catalog** (pack `id: example`) so the specialists can run against real tokens and components.

**New here?** [docs/ONBOARDING.md](docs/ONBOARDING.md) · **Your own system?** [docs/EXAMPLE-HOST.md](docs/EXAMPLE-HOST.md) · **Agents:** [AGENTS.md](AGENTS.md)

This is an **enterprise-contract-ready scaffold**. It is not enterprise-ready until the Scale gate in [docs/READINESS.md](docs/READINESS.md) has evidence.

## Setup

**This checkout** (kit source, bootstrap already complete):

```bash
pnpm install
pnpm tokens:build
pnpm catalog
pnpm agents:sync
pnpm storybook
```

`pnpm agents:sync` regenerates Cursor, Claude Code, and Codex adapters from `.agents/agents/*.md`. Do not hand-edit those generated files.

**Another design-system repo** (do not nest a second system in this tree):

```bash
node scripts/kit/install.mjs --dir /path/to/your-ds
```

Then in that repo: invoke **Release** (`ds-release`) to scan pack `id` and paths, confirm writes, set `bootstrapStatus: complete`. Invoke **Manager** (`ds-manager`) to seed `.agents/program/` (or defer). Refresh later with `node scripts/kit/upgrade.mjs --dir /path/to/your-ds` — upgrade does not clobber host inventory, memory, or program files.

Do **not** copy this kit source’s `.agents/context.json`, `.agents/inventory/`, `.agents/memory/`, `.agents/program/`, `tokens.json`, or `components/`. Details: [docs/EXAMPLE-HOST.md](docs/EXAMPLE-HOST.md) · [docs/AGENT-KIT.md](docs/AGENT-KIT.md#install).

## Agents

Named `ds-*` specialists share one pack, inventory, memory, and program board across Cursor, Claude Code, and Codex. One owner per request. Confirm before writes or spawning another specialist.


| Invoke         | For                                                |
| -------------- | -------------------------------------------------- |
| `ds-manager`   | Task board, what’s next, organize gaps             |
| `ds-release`   | Bootstrap, kit install/upgrade, release, incidents |
| `ds-prototype` | Named sandbox views in Storybook                   |
| `ds-architect` | Reuse vs enhance vs extract (no twins)             |
| `ds-coding`    | Implement an approved change                       |
| `ds-docs`      | USAGE, story prose, shared catalog facts after ack |
| `ds-language`  | Tokens / design language                           |
| `ds-a11y`      | axe / contrast evidence                            |
| `ds-critique`  | Independent decision review                        |
| `ds-bugbot`    | PR / branch bug review                             |
| `ds-security`  | Security review of this repo only                  |


Cold start: [AGENTS.md](AGENTS.md). Commands, harness table, and pipeline: [docs/AGENT-KIT.md](docs/AGENT-KIT.md). Host skills: [docs/SKILLS.md](docs/SKILLS.md).

## Memory

Short reviewed notes under `.agents/memory/` — not a second catalog. Inventory, USAGE, RATIONALE, and Storybook stay source of truth.

- **Retrieve** by exact frontmatter keys (`entities` / `entity`, `trigger`, filename stem). No embedding search. Skip expired. Open a body only on match (at most three).
- **Write** only after a person acknowledges in a later turn. Propose in a handoff first; do not write memory in the same turn as implementation.
- **Shared facts** (`shared/`) are written by Docs (`ds-docs`). Architect, Coding, Critique, and review agents write only their own namespaces.
- The program board under `.agents/program/` is **not** memory (Manager only). Handoffs are not memory until reviewed.

Isolation is `(repoRoot, pack id)`. Pack `id` is not the folder name. Cursor chats are not a knowledge store and do not follow a rename. Details: [docs/AGENT-MEMORY.md](docs/AGENT-MEMORY.md) · [docs/EXAMPLE-HOST.md](docs/EXAMPLE-HOST.md#names-paths-and-durable-context).

## What’s in the bundled catalog

Four layers from pack `paths` in `.agents/context.json`:

1. Design tokens in `tokens.json`
2. Stock UI in `components/ui` (regeneratable)
3. Host primitives in `components/primitives`
4. Composed blocks in `registry/blocks`

Storybook is coded truth. Other hosts use their own folder layout — see [docs/AGENT-KIT.md](docs/AGENT-KIT.md).

## Verify

```bash
pnpm verify:fast
pnpm verify
```

Kit-minimal check (pack, adapters, memory shape): `pnpm kit:check`.

## Docs

Full map: [docs/README.md](docs/README.md)


| You are…                             | Start here                                                                                    |
| ------------------------------------ | --------------------------------------------------------------------------------------------- |
| A person on this team                | [docs/ONBOARDING.md](docs/ONBOARDING.md) → [CONTRIBUTING.md](CONTRIBUTING.md)                 |
| Putting agents on your own repo      | [docs/EXAMPLE-HOST.md](docs/EXAMPLE-HOST.md) · [docs/AGENT-KIT.md](docs/AGENT-KIT.md#install) |
| An agent                             | [AGENTS.md](AGENTS.md) → [docs/AGENT-KIT.md](docs/AGENT-KIT.md)                               |
| Looking up agent memory              | [docs/AGENT-MEMORY.md](docs/AGENT-MEMORY.md)                                                  |
| A product app consuming this catalog | [docs/ADOPTION.md](docs/ADOPTION.md)                                                          |
| Security / incidents                 | [SECURITY.md](SECURITY.md)                                                                    |


