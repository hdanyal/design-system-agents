# ADR 0007: Role-named primitives folder

- Status: accepted
- Date: 2026-08-24

**In plain words:** Your components live in a role-named folder (`components/primitives`), not a brand-named folder.

## Context

The producer repository used `components/carina/` for the primitive layer. That taught agents and humans that primitive paths are pack-branded. Portable kit hosts need role-named folders resolved from `.agents/context.json` `paths.primitives`.

Consumer registry install targets may remain pack-branded (for example `components/example/` in product apps) separately from the producer tree.

## Decision

Rename the producer primitive layer to `components/primitives`. Pack `paths.primitives` is the source of truth. Kit playbooks, templates, and scripts refer to `paths.primitives` and `paths.ui`, not hardcoded Carina folders.

## Consequences

- Storybook sidebar uses **Primitives**, not a pack brand segment.
- `@example` registry `target` paths for consumers use `components/example/`.
- Legacy hosts may still use `components/carina` until they rename; kit scan lists it as a fallback candidate only.
