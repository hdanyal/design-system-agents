# ADR 0008: Reserved pack id `example`

- Status: accepted (superseded scope 2026-08-26)
- Date: 2026-08-24

**In plain words:** Pack id `example` is **forbidden** on all hosts. This git root is **kit source only** — no bundled catalog.

## Context

The kit previously shipped a bundled practice catalog (pack `example`) in this repo. That coupling confused adopters. The kit now ships skill templates under `.agents/kit/skill-templates/` and installs onto foreign hosts only.

## Decision

- Pack `id` `example` is **reserved and forbidden** everywhere (including this repo).
- Kit source is marked by `.agents/kit/SOURCE`; it has no `.agents/context.json`.
- Host skills are seeded as `{packId}-*` from `template-*` skill templates on bootstrap.
- Display name: **Design System Agents** (the kit product).

## Consequences

- README and [INSTALL.md](../INSTALL.md) lead with install-from-git-URL onto a host.
- CI runs kit-only verify (`kit:check`, skill templates, unit/contract tests against fixtures).
- Historical ADRs 0001–0007 (catalog architecture) were removed with the bundled catalog.

## Supersedes

Bundled example host identity (`example-*` skills, `@example` registry) on this git root.
