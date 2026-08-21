# ADR 0003: Upstream patch ledger

- Status: accepted
- Date: 2026-08-17

## Context

Urgent stock correctness, security, or accessibility fixes may be required without forking the kit for brand reasons.

## Decision

Declared patches live in `upstream-patches.json` and are verified by `pnpm upstream:check`. No stock patch may add brand styling or a missing product API.

## Consequences

Undeclared stock edits fail CI. Missing product APIs become Carina primitives.
