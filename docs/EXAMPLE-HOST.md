# Example design system host

**Two things in one repo:** the portable **`ds-*` agent kit** (specialists and scripts), and an **example catalog** so agents can practice on real tokens and components. The example is a demo — you do not have to keep the name. Details: [adr/0008-example-host-identity.md](adr/0008-example-host-identity.md).

**Agent kit** = works on any design-system repo. **Example host** = this repo’s sample tokens, components, and `example-*` skills. Do not copy the example’s settings or components into another repo — [install the kit](#replace-the-example-with-your-own-system) instead.

## Use the example as-is

- Run Storybook and the four layers (tokens → stock UI → primitives → blocks).
- Ask **`ds-*` specialists**; they read this repo’s settings file.
- Try harvest and promote on sample pieces (`heading-group`, `page-header`, prototypes).
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

Do not mix this catalog’s chats, Figma file, or memory with another design system.
