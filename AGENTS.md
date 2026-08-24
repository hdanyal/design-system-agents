# Carina Design System

Internal proprietary design system. Four layers: canonical tokens, regeneratable stock shadcn UI, Carina primitives, and composed blocks. Storybook is coded truth. Figma explores. Git is source of truth.

## Cold start

1. Read `.agents/context.json` and `.agents/skills/manifest.json`.
2. Run `pnpm catalog` when the repo is installed.
3. If bootstrap is not `complete`, invoke `ds-release` (not auto-select onboard).
4. If bootstrap is `complete`, invoke `ds-manager` for the program board, then exactly one `ds-*` owner. Do not write until routed. On the first board after bootstrap, Manager tasks generated branding identity (Overview + Do's and Don'ts) if missing — Manager never writes the identity file.

## Open-ended views

Any human-named view may be explored under `prototypes/<name>/` with `USAGE.md`, a Storybook CSF story, and a **live** Storybook companion after every material write. Chat JSX and Cursor Canvas are not the gallery. While building, keep harvest flags (`reuse` → `enhance-existing` → `extract-new` → `keep local`), batch them to Architect, prefer enhancing existing APIs over twins, then clean/register via Coding and promote-block. Full pipeline: [docs/AGENT-KIT.md](docs/AGENT-KIT.md#open-ended-view-pipeline). Identity guidance: generated `.agents/skills/carina-branding/reference.md` (not a second token source). Catalog facts after HITL: [docs/AGENT-MEMORY.md](docs/AGENT-MEMORY.md).

## Hard don'ts

- Do not restyle or fork `components/ui` except via `upstream-patches.json`.
- Do not duplicate primitives or public APIs.
- Do not edit `tokens.json` outputs by hand; run `pnpm tokens:build`.
- Do not copy hex/oklch into JSX or stories; use CSS variables from the branding reference.
- Do not promote or mark stable from a prototype; do not commit `public/r` or hand-edit generated MCP/changelog artifacts.
- Do not use production data, secrets, or `/r/dev` for consumers.
- Do not restore cancelled sandboxes from the program archive without a new human-named slice.

## Route

See [docs/AGENT-KIT.md](docs/AGENT-KIT.md) and [docs/SKILLS.md](docs/SKILLS.md). Policy: [CONTRIBUTING.md](CONTRIBUTING.md), [docs/GOVERNANCE.md](docs/GOVERNANCE.md), [docs/ADOPTION.md](docs/ADOPTION.md), [SECURITY.md](SECURITY.md), [docs/INCIDENTS.md](docs/INCIDENTS.md).

## Commands

`pnpm verify:fast` · `pnpm verify` · `pnpm tokens:build` · `pnpm catalog` · `pnpm registry:build` · `pnpm agents:sync`

<!-- BEGIN ds-kit-agents -->
## Specialists (ds-kit)
See docs/AGENT-KIT.md.
Invoke: ds-manager, ds-prototype, ds-architect, ds-coding, ds-docs, ds-language, ds-a11y, ds-bugbot, ds-security, ds-release.
Load .agents/context.json. One owner. Stop for yes before writes or another agent.
Codex: start with the id. If spawn is unavailable, write .agents/handoffs/ and print the next id.
Bugbot/Security: Cursor product reviewers, else playbook (never claim Cursor Bugbot on Claude/Codex).
<!-- END ds-kit-agents -->
