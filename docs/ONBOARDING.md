# Human onboarding

Welcome to Example DS — pack `id: example` in this git root. This is the first-day guide for people. The same `ds-*` specialists install onto **any other design-system git root**; they read that host's `.agents/context.json`, not this host's folders. Agents use [AGENTS.md](../AGENTS.md). Contribution process lives in [CONTRIBUTING.md](../CONTRIBUTING.md).

This example host is an **enterprise-contract-ready** internal design system. Do not call it enterprise-ready until the Scale gate in [READINESS.md](READINESS.md) has evidence.

The `ds-*` kit is portable. The tokens, UI, primitives, and `example-*` skills in this checkout are a **sample host**. Keep them to learn or ship from this scaffold, or install the kit on a **separate** git root for your real system. Details: [EXAMPLE-HOST.md](EXAMPLE-HOST.md).

## What you are joining

Four layers, in order of authority. On every host, folder names come from pack `paths` in `.agents/context.json`:

| Layer | Pack key | This pack |
| --- | --- | --- |
| Tokens | `paths.tokens` | `tokens.json` |
| Stock UI | `paths.ui` | `components/ui` (shadcn; regeneratable) |
| Host primitives | `paths.primitives` | `components/primitives` |
| Blocks | `paths.blocks` | `registry/blocks` |

Storybook is coded truth. Figma is optional exploration. Git is the source of truth for what shipped.

No Figma file is linked yet. If this host needs Code Connect or design exploration, Manager (`ds-manager`) flags that on `.agents/program/`. Do not invent a file URL.

## Prerequisites

- Node 22+ (see `.nvmrc`)
- pnpm 10.33.0+ (`packageManager` in `package.json`)
- Access to this private repo
- Copy `.env.example` to `.env` locally if you need registry auth; never commit secrets

## First-hour setup (this pack)

```bash
pnpm install
pnpm tokens:build
pnpm catalog
pnpm agents:sync
pnpm storybook
```

Optional:

```bash
pnpm dev                 # Next app + local authenticated registry routes
pnpm verify:fast         # lint, typecheck, unit tests
```

Confirm you can open:

- Storybook on `http://localhost:6006` — Foundations, UI, **Primitives**, Blocks, Prototypes
- Catalog at [catalog.md](catalog.md)
- Skills index at [SKILLS.md](SKILLS.md)

## Mental model before you change anything

| Goal | Do this | Do not do this |
| --- | --- | --- |
| Restyle colors / fonts | Edit `tokens.json` or follow a design-language PR | Hardcode hex/oklch in components or stories |
| Fix / extend a stock control for product API | Propose a host primitive under `paths.primitives` with `RATIONALE.md`, or enhance an existing named API | Restyle or fork pack `paths.ui` (`components/ui` here); invent a twin |
| Urgent stock correctness / a11y / security | Declared entry in `upstream-patches.json` + CODEOWNER | Silent edit to stock files |
| Try any named view | `prototypes/<name>/` with `USAGE.md` + Storybook story; keep Storybook open | Publish from the prototype folder; treat chat JSX as the gallery |
| Grow the catalog while prototyping | Flag harvest regions; batch to Architect | Promote from Prototype or skip composition review |
| Ship a reusable composition | Promote experimental slices to `registry/blocks` after HITL | Commit generated `public/r` or mark stable in the same PR |
| Change process | Update CONTRIBUTING / GOVERNANCE in the same PR | Wiki-only or Slack-only notes |

## Another repository

**Do not add a second design system inside this git root.** One git root = one pack.

To use these agents on a **new or existing** design system elsewhere, see [EXAMPLE-HOST.md](EXAMPLE-HOST.md) and [AGENT-KIT.md](AGENT-KIT.md#install) — pack the kit from this repo, install into the other git root, bootstrap that host's pack (id must not be `example`), then run Manager there.

## How work moves

1. Open an issue (prototype, new base component, promote block, design language, or a11y).
2. Ask Manager (`ds-manager`) for the task board when you want work sequenced.
3. For a new view: prototype under `prototypes/<name>/`, harvest, Architect → Coding → reviews → promote. Details: [AGENT-KIT.md](AGENT-KIT.md#open-ended-view-pipeline).
4. Branch as `type/<your-github-login>/<slug>` — see CONTRIBUTING for types.
5. Keep docs, stories, tests, and a Changeset (when required) in the same PR.
6. Complete the PR HITL checkboxes.
7. CODEOWNERS review and merge.

New host primitives need design and engineering approval on this pack.

## Where to look next

| Need | Doc |
| --- | --- |
| Branching, commits, PRs | [CONTRIBUTING.md](../CONTRIBUTING.md) |
| HITL, maturity, semver, Code Connect | [GOVERNANCE.md](GOVERNANCE.md) |
| Product app install / drift | [ADOPTION.md](ADOPTION.md) |
| Example host vs kit; replace this catalog | [EXAMPLE-HOST.md](EXAMPLE-HOST.md) |
| Kit install on another git root | [AGENT-KIT.md](AGENT-KIT.md) |
| Secrets, MCP, dependencies | [SECURITY.md](../SECURITY.md) |
| Rollback / incidents | [INCIDENTS.md](INCIDENTS.md) |
| Agent cold start / view pipeline | [AGENTS.md](../AGENTS.md) · [AGENT-KIT.md](AGENT-KIT.md) |
| Agent catalog memory after HITL | [AGENT-MEMORY.md](AGENT-MEMORY.md) |
| Generated branding identity | `.agents/skills/example-branding/reference.md` |
| Architecture decisions | [adr/](adr/) |
| Full doc map | [README.md](README.md) |

## Local registry (optional)

```bash
# Ensure EXAMPLE_REGISTRY_TOKEN is set in .env
pnpm registry:build
pnpm dev
```

Consumers must never use `/r/dev` or `/latest` in product apps. See ADOPTION.

## Done when

You can:

1. Run Storybook and find Foundations, UI, Primitives, Blocks, and Prototypes
2. Explain the four layers and that another host resolves paths from its pack
3. Point to EXAMPLE-HOST and AGENT-KIT for using this scaffold vs installing agents on a separate repo
4. Open a correct branch type for a prototype vs a new primitive vs an experimental block
5. Point to the doc that owns HITL, adoption, security, and agent memory without guessing
