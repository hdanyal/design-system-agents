# Contributing

Human handbook for Carina DS. First-day setup is in [ONBOARDING.md](ONBOARDING.md). Agents follow this via `carina-contribute` and the portable `ds-*` specialists in [docs/AGENT-KIT.md](docs/AGENT-KIT.md). Manager (`ds-manager`) tracks that work on `.agents/program/`. Policy details for HITL, maturity, and Code Connect live in [docs/GOVERNANCE.md](docs/GOVERNANCE.md).

## Branching

Use short-lived `type/<actor>/<slug>` branches. Types indicate primary concern, not exclusive paths:

| Type | Primary concern |
| --- | --- |
| `proto` | Sandbox experiments |
| `ui` | New or changed Carina primitive |
| `block` | Promote or change a block |
| `tokens` | Token or preset change |
| `docs` | Process and docs |
| `chore` | Tooling, CI, Storybook, agent tooling |

A single PR may include required stories, tests, metadata, docs, a Changeset, and generated non-committed verification evidence. Avoid unrelated drive-bys.

`main` is protected. Agents may create branches and PRs. They must not push `main`, skip hooks, merge, or rewrite another contributor's commits.

## Commits and PRs

- Conventional Commits: `feat(ui):`, `feat(block):`, `feat(tokens):`, `docs:`, `fix(a11y):`, `chore:`.
- Use the PR template. Checkboxes are the HITL audit record.
- Add a Changeset for primitives, blocks, consumer guidance, or breaking token changes.
- Do not hand-edit released `CHANGELOG.md` sections.

## Review

CODEOWNERS are required on protected paths. CI on every PR runs `pnpm verify:fast` plus path-conditioned checks. Merge queue / pre-merge runs `pnpm verify`.

## Docs-as-code

Ship documentation in the same PR as the change. Prototypes need `USAGE.md`. New primitives need `RATIONALE.md`, stories, metadata, and a registry entry.
