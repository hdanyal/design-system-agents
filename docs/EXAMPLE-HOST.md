# Example design system host

This git root ships **two things**:

1. The portable **`ds-*` agent kit** — specialists, playbooks, and install/upgrade scripts.
2. An **example design-system host** — pack `id: example` — so you can run the agents against a real token/UI/primitive/block tree instead of an empty repo.

The example is a demonstration, not a product brand you must keep. Identity decision: [adr/0008-example-host-identity.md](adr/0008-example-host-identity.md).

## What is kit vs host

| | Agent kit | Example host (this checkout) |
| --- | --- | --- |
| Purpose | Work on **any** design-system git root | Show how those agents behave here |
| Packed by | `pnpm kit:pack` | Not packed |
| Includes | `.agents/agents`, `scripts/kit`, harness adapters, [AGENT-KIT.md](AGENT-KIT.md) | Tokens, `components/`, registry, inventory, program board, `example-*` skills |
| Pack `id` | None until the target host bootstraps | `example` (reserved for this source root) |

Install the kit into another repo; do **not** copy this host’s `.agents/context.json`, inventory, memory, program board, `tokens.json`, `design-language.json`, `agent-tooling.json`, or `components/`. Full steps: [AGENT-KIT.md#install](AGENT-KIT.md#install).

## Use the example as-is

Keep this checkout if you want a working scaffold:

- Run Storybook and the four layers (`tokens.json` → `components/ui` → `components/primitives` → `registry/blocks`).
- Invoke `ds-*` specialists; they read **this** pack’s `.agents/context.json`.
- Practice harvest, promote-block, tokens, and HITL on sample entities (`heading-group`, `page-header`, prototypes).
- Point product apps at the `@example` registry only if you intend to consume **this** catalog. Consumer contract: [ADOPTION.md](ADOPTION.md).
- Figma is optional. If Code Connect or design exploration is needed, Manager flags it on the program board; Release writes `figmaFileKey` after confirm. Do not copy a file key from another design system.

Human first day: [ONBOARDING.md](ONBOARDING.md). Agents: [AGENTS.md](../AGENTS.md).

## Replace the example with your own system

**Do not nest a second design system inside this git root.** One git root = one pack.

To run the same agents on **your** design system:

1. Create or clone a **separate** repository for that system.
2. From this checkout: `pnpm kit:pack`, then `node scripts/kit/install.mjs --dir /path/to/your-ds`.
3. On that host, invoke **Release** (`ds-release`) and bootstrap. Choose a pack `id` that is **not** `example` (kit check refuses `example` on a foreign host).
4. Point `paths` at **that** repo’s tokens, UI, primitives, and blocks. Review Figma key and preview.
5. Invoke **Manager** (`ds-manager`) to seed `.agents/program/` (or defer explicitly).
6. Add host skills under `.agents/skills/` with **that** pack’s prefix; do not keep `example-*` names as if they were universal.

Existing design systems: same install, then `node scripts/kit/upgrade.mjs --dir /path/to/your-ds` when refreshing playbooks. Host pack data stays untouched.

After install: `pnpm agents:sync` (or `node scripts/kit/sync.mjs` if scripts are wired). Done when kit-check is green, the program board exists or is deferred, and one specialist task uses **host** inventory.

## Keep this repo but change identity

If this git root **is** your producer (you are not installing elsewhere):

- Treat tokens, primitives, blocks, and `example-*` skills as yours to evolve.
- Changing pack `id`, registry namespace (`@example`), consumer install targets (`components/example/`), or skill prefix is a host-identity change. Route it to **Release** (`ds-release`); do not reuse `example` on another git root.

## Isolation

Agents must not mix this pack’s chats, catalog, Figma file, or memory with another design system. Program `designSystemId` must match pack `id`.
