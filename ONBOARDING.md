# Human onboarding

Welcome to Carina DS. This is the first-day guide for people. Agents use [AGENTS.md](AGENTS.md). Contribution process lives in [CONTRIBUTING.md](CONTRIBUTING.md).

Carina is an **enterprise-contract-ready** internal design system. Do not call it enterprise-ready until the Scale gate in [docs/READINESS.md](docs/READINESS.md) has evidence.

## What you are joining

Four layers, in order of authority:

1. **Tokens** — edit `tokens.json` only; generate CSS and docs with `pnpm tokens:build`
2. **Stock UI** — `components/ui/**` from shadcn; regeneratable; no brand forks
3. **Carina primitives** — `components/carina/**` with `RATIONALE.md` when stock is not enough
4. **Blocks** — `registry/blocks/**` compositions of stock + Carina pieces

Storybook is coded truth. Figma is exploration. Git is the source of truth for what shipped.

Figma file: [Carina Design System](https://www.figma.com/design/4rMUl36kQlaVzUxy4xoz4Y)

## Prerequisites

- Node 22+ (see `.nvmrc`)
- pnpm 10.33.0+ (`packageManager` in `package.json`)
- Access to this private repo and, when available, the Figma file above
- Copy `.env.example` to `.env` locally if you need registry auth; never commit secrets

## First-hour setup

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

- Storybook on `http://localhost:6006`
- Catalog at [docs/catalog.md](docs/catalog.md)
- Skills index at [docs/SKILLS.md](docs/SKILLS.md)

## Mental model before you change anything

| Goal | Do this | Do not do this |
| --- | --- | --- |
| Restyle colors / fonts | Edit `tokens.json` or follow a design-language PR | Hardcode hex/oklch in components or stories |
| Fix / extend a stock control for product API | Propose a Carina primitive with `RATIONALE.md` | Restyle or fork `components/ui` |
| Urgent stock correctness / a11y / security | Declared entry in `upstream-patches.json` + CODEOWNER | Silent edit to stock files |
| Try a layout | Work under `prototypes/<name>/` with `USAGE.md` | Publish from the prototype folder |
| Ship a reusable composition | Promote to `registry/blocks` after HITL | Commit generated `public/r` or hand-edit changelog release sections |
| Change process | Update CONTRIBUTING / GOVERNANCE in the same PR | Wiki-only or Slack-only notes |

## How work moves

1. Open an issue (prototype, new base component, promote block, design language, or a11y).
2. Ask Manager (`ds-manager`) for the task board when you want work sequenced; `.agents/program/` is local documentation, not a substitute for GitHub issues.
3. Branch as `type/<your-github-login>/<slug>` — see CONTRIBUTING for types.
4. Keep docs, stories, tests, and a Changeset (when required) in the same PR.
5. Complete the PR HITL checkboxes. Those checkboxes are the audit record.
6. CODEOWNERS review and merge. Agents may open PRs; only humans merge protected paths.

Stable promotion is a **separate** lifecycle PR from first creation. New Carina primitives need design and engineering approval.

## Where to look next

| Need | Doc |
| --- | --- |
| Branching, commits, PRs | [CONTRIBUTING.md](CONTRIBUTING.md) |
| HITL, maturity, semver, Code Connect | [docs/GOVERNANCE.md](docs/GOVERNANCE.md) |
| Product app install / drift | [docs/ADOPTION.md](docs/ADOPTION.md) |
| Secrets, MCP, dependencies | [SECURITY.md](SECURITY.md) |
| Rollback / incidents | [docs/INCIDENTS.md](docs/INCIDENTS.md) |
| Agent cold start | [AGENTS.md](AGENTS.md) · [docs/AGENT-KIT.md](docs/AGENT-KIT.md) |
| Architecture decisions | [docs/adr/](docs/adr/) |

## Local registry (optional)

```bash
# Ensure CARINA_REGISTRY_TOKEN is set in .env
pnpm registry:build
pnpm dev
```

Authenticated routes (token required):

- `http://localhost:3000/r/dev/{name}.json`
- `http://localhost:3000/r/v/0.1.0/{name}.json`

Consumers must never use `/r/dev` or `/latest` in product apps. See ADOPTION.

## Done when

You can:

1. Run Storybook and find Foundations, UI, Carina, Blocks, and Prototypes
2. Explain the four layers to a teammate
3. Open a correct branch type for a prototype vs a new primitive
4. Point to the doc that owns HITL, adoption, and security without guessing
