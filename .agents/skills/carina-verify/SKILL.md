---
name: carina-verify
description: Select and report deterministic checks
---

# carina-verify

- Form: thin
- Invocation: contextual
- Audience: contributor
- Depends on: none

## Triggers
Use this skill for work that matches its boundary. Do not use it for a different owning artifact.

## Non-triggers
If another skill owns the mutation, route there.

## Allowed / forbidden
Allowed: the files and commands required by this workflow.
Forbidden: stock restyles, secret commits, main pushes, unreviewed registries, and policy duplication.

## Policy links
- Process: CONTRIBUTING.md
- Governance: docs/GOVERNANCE.md
- Adoption: docs/ADOPTION.md
- Security: SECURITY.md
- Incidents: docs/INCIDENTS.md

## Workflow
Use `pnpm verify:fast` for local iteration.
Use `pnpm verify` before merge/release.
Do not skip or weaken a gate. Report failures with owning script.
