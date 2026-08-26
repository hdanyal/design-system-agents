# Kit source vs your own design system

**Two things in one repo:** the portable **`ds-*` agent kit** (the product), and a **bundled catalog** so those specialists can run against real tokens and components. Pack `id` `example` names that catalog only. You do not have to keep it. Details: [adr/0008-example-host-identity.md](adr/0008-example-host-identity.md).

**Agent kit** = works on any design-system repo. **Bundled catalog** = this checkout’s practice tokens, components, and `example-*` skills. Do not copy the catalog’s settings or components into another repo — [install the kit](#replace-the-example-with-your-own-system) instead.

## Names, paths, and durable context

These are three different things. Do not treat the checkout folder, the Cursor window title, or a chat thread as the pack.

| Axis | This kit source | Any other host |
| --- | --- | --- |
| Product / display name | **Design System Agents** | That design system’s name |
| Pack `id` | `example` (bundled catalog only; reserved) | Anything except `example` |
| Checkout folder | `design-system-agents` (not pack `id`) | Whatever you named the directory |

**Durable context is git under this root.** Agents and people recover work from these, not from the Cursor Agents list:

- Pack and paths: `.agents/context.json`
- Cold start: [AGENTS.md](../AGENTS.md) · [AGENT-KIT.md](AGENT-KIT.md)
- Inventory, gaps, proposals: `.agents/inventory/`
- Reviewed memory: `.agents/memory/` ([AGENT-MEMORY.md](AGENT-MEMORY.md))
- Program board: `.agents/program/` (Manager only)
- Policy and identity: this file, [ONBOARDING.md](ONBOARDING.md), [adr/0008-example-host-identity.md](adr/0008-example-host-identity.md)

**Cursor chats are not portable knowledge.** The Agents/chat sidebar is keyed to Cursor’s workspace storage id, which is derived from the **folder URI**. Renaming or moving the folder starts a new empty list. Do not copy `~/Library/Application Support/Cursor` databases to “keep history.” Write decisions into git (docs, inventory, memory after ack, program board) before you rely on them on another machine or path.

**Open the real path.** File → Open Folder → the directory that contains `.git`. A leftover symlink at an old name (`Carina-DS` → this repo) makes Cursor restore the old explorer label even though the files moved.

Same rules on every future host: install the kit into **that** git root, bootstrap **that** pack `id`, and keep knowledge in **that** tree. Isolation is `(repoRoot, pack id)`, not the folder’s display name.

## Use the bundled catalog as-is

- Run Storybook and the four layers (tokens → stock UI → primitives → blocks).
- Ask **`ds-*` specialists**; they read this repo’s settings file.
- Try harvest and promote on catalog pieces (`heading-group`, `page-header`, prototypes).
- Product apps use `@example` only if they mean **this** catalog — [ADOPTION.md](ADOPTION.md).

First day: [ONBOARDING.md](ONBOARDING.md). Agents: [AGENTS.md](../AGENTS.md).

## Replace the example with your own system

Do not put your design system inside this folder. Use a **separate** repository (an empty folder is fine).

Run this **in this project**, not inside your new repo:

```bash
node scripts/kit/install.mjs --dir /path/to/your-ds
```

Optional: `node scripts/kit/init.mjs --dir /path/to/your-ds` (install + scan; still no save until you confirm with Release).

Then open **that** folder in Cursor:

1. Ask **Release** (`ds-release`) to set it up. Confirm a short name for your system (anything except `example`) and where your tokens and components live.
2. Ask **Manager** (`ds-manager`) to start the task board, or say you want to skip that for now.

You’re done for the first hour when Release shows a name and folder guesses you agree with. To refresh agents later without touching your files: `node scripts/kit/upgrade.mjs --dir /path/to/your-ds`. Commands and flags: [AGENT-KIT.md#install](AGENT-KIT.md#install).

## Keep this repo but change identity

If **this** checkout is your real producer (you are not installing elsewhere):

- Ask **Release** (`ds-release`) before renaming — do not silently rename `example`.
- Checklist (each needs a confirmed change):
  - Pack id in `.agents/context.json` (not `example` on other repos)
  - Registry namespace `@example` → `@your-id`
  - Consumer install paths `components/example/` → `components/your-id/`
  - Skill prefix `example-*` → `your-id-*`
  - Drift lockfile and env names (`example.lock.json`, `EXAMPLE_REGISTRY_*`)
- Dry run (writes nothing): `node scripts/kit/identity-scan.mjs --dir .`

## Isolation

Do not mix this catalog’s chats, Figma file, or memory with another design system. Isolation is `(repoRoot, pack id)`, not the folder display name. Cursor chats do not travel with the kit — see [Names, paths, and durable context](#names-paths-and-durable-context).
