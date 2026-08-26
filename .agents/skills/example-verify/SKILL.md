---
name: example-verify
description: Select and report deterministic checks
---

# example-verify

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
Use `pnpm verify:fast` for local iteration in every Coding hop after the green pass.
Use host `commands.test` when scoped unit/story tests are enough for the allowlist.
Use `pnpm verify` before merge/release.
Paste command + pass/fail outcome in the Coding output. Do not skip or weaken a gate. Report failures with owning script.
Not green → keep iterating the implementation; Do not weaken assertions to cheat.
