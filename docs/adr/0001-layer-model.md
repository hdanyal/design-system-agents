# ADR 0001: Layer model

- Status: accepted
- Date: 2026-08-17

**In plain words:** Tokens, stock UI, your components, and blocks are separate layers so shadcn can update without breaking your catalog.

## Context

The system must stay upgradeable with upstream shadcn while publishing reusable Carina work.

## Decision

Four layers: DTCG tokens, regeneratable stock UI, Carina primitives, and composed blocks. The `@carina` registry publishes primitives, blocks, and approved consumer guidance only.

## Consequences

Stock files are not republished. Missing APIs become Carina primitives, not stock forks.
