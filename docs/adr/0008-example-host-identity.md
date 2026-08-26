# ADR 0008: Example host identity

- Status: accepted
- Date: 2026-08-24

**In plain words:** This repo’s product is the **Design System Agents** kit. Pack `id` `example` is reserved for the bundled practice catalog so the kit demo does not look like one product brand.

## Context

This git root ships the portable **ds-* agent kit** and must demonstrate kit usage without teaching agents that every host is branded "Carina." Pack `id`, skill prefixes, registry namespace, and consumer install targets should read as a neutral **example host**.

## Decision

- Pack `id`: `example` (reserved for this kit source root only; foreign hosts must not reuse it)
- Display name: **Design System Agents** (kit). Pack `id` `example` names the bundled catalog only — not the product.
- Checkout folder name is independent of pack `id` (this source root: `design-system-agents`). Cursor chat lists are not identity and are not source of truth.
- Skill prefix: `example-*` (20 pack skills under `.agents/skills/`)
- Registry namespace: `@example`; consumer install targets under `components/example/`
- Lockfile / drift: `example.lock.json`, `pnpm example:drift`
- Env: `EXAMPLE_REGISTRY_TOKEN`, `EXAMPLE_REGISTRY_ORIGIN`
- Producer primitive layer folder: `components/primitives` (role-named; Storybook segment **Primitives**)

## Consequences

- README and AGENTS.md lead with this repo as the agent kit; the bundled catalog is secondary. Humans start at `docs/ONBOARDING.md`.
- ADR 0001 and 0003 history remain; living contract lines in ADR 0006/0007 reference `@example` and `example.lock.json`.
- Kit scan may still list `components/carina` as a legacy fallback for foreign hosts (ADR 0007).

## Supersedes

Host identity previously documented as pack `id: carina` and `carina-*` skills on this source root.
