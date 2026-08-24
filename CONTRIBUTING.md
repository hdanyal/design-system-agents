# Contributing

Human handbook for Example DS. First-day setup is in [docs/ONBOARDING.md](docs/ONBOARDING.md). Agents follow this via `example-contribute` and the portable `ds-*` specialists in [docs/AGENT-KIT.md](docs/AGENT-KIT.md). Manager (`ds-manager`) tracks that work on `.agents/program/`. Policy details for HITL, maturity, and Code Connect live in [docs/GOVERNANCE.md](docs/GOVERNANCE.md). Full doc map: [docs/README.md](docs/README.md).

## Branching

Use short-lived `type/<actor>/<slug>` branches. Types indicate primary concern, not exclusive paths:

| Type | Primary concern |
| --- | --- |
| `proto` | Sandbox experiments |
| `ui` | New or changed host primitive under `paths.primitives` |
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

## Open-ended views (prototypes → catalog)

There is no allowlist of view types. Humans may name any surface (chat, timeline, full screen, workflow, …).

1. **Prototype** under `prototypes/<name>/` with `USAGE.md` and a Storybook CSF story. Keep Storybook running (`pnpm storybook`) and review the live story after material changes — chat paste is not verification.
2. **Harvest while building** — flag regions as reuse, enhance-existing, extract-new primitive/block, or keep local. Prefer reuse, then enhance an existing API, then extract. Batch flags for one Architect pass (template: `.agents/agents/references/harvest-map.md`). Do not promote from Prototype.
3. **Implement** only Architect-approved files (new or enhanced). Rewire the sandbox to catalog imports. Present the live story again.
4. **Promote** experimental blocks via `example-promote-block` after reviews and HITL. Multiple slices may come from one view over time. Do not mark stable or commit `public/r` in the creation PR.
5. **Remember** after HITL ack — **Documentation (`ds-docs`)** writes one short catalog fact per entity in `.agents/memory/shared/` per [docs/AGENT-MEMORY.md](docs/AGENT-MEMORY.md). The shipper proposes only; do not paste USAGE into memory.

Agent routing and harness rules: [docs/AGENT-KIT.md](docs/AGENT-KIT.md). Identity for agents is the generated branding reference from `pnpm tokens:build`, not a hand-edited DESIGN.md over `tokens.json`.
