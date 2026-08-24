# ADR 0008: Example host identity

- Status: accepted
- Date: 2026-08-24

**In plain words:** This repo uses the neutral name `example` so the kit demo does not look like one product brand.

## Context

This git root ships the portable **ds-* agent kit** and must demonstrate kit usage without teaching agents that every host is branded "Carina." Pack `id`, skill prefixes, registry namespace, and consumer install targets should read as a neutral **example host**.

## Decision

- Pack `id`: `example` (reserved for this kit source root only; foreign hosts must not reuse it)
- Display name: **Example Design System**
- Skill prefix: `example-*` (20 pack skills under `.agents/skills/`)
- Registry namespace: `@example`; consumer install targets under `components/example/`
- Lockfile / drift: `example.lock.json`, `pnpm example:drift`
- Env: `EXAMPLE_REGISTRY_TOKEN`, `EXAMPLE_REGISTRY_ORIGIN`
- Producer primitive layer folder: `components/primitives` (role-named; Storybook segment **Primitives**)

## Consequences

- README and AGENTS.md lead with this repo as the example of using the agents; humans start at `docs/ONBOARDING.md`.
- ADR 0001 and 0003 history remain; living contract lines in ADR 0006/0007 reference `@example` and `example.lock.json`.
- Kit scan may still list `components/carina` as a legacy fallback for foreign hosts (ADR 0007).

## Supersedes

Host identity previously documented as pack `id: carina` and `carina-*` skills on this source root.
