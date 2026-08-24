---
name: example-consume
description: Immutable install/update/drift flow under ADOPTION
---

# example-consume

- Form: full
- Invocation: contextual
- Audience: consumer
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
Follow docs/ADOPTION.md: pin preset + immutable /r/vX.Y.Z, dry-run/diff, example.lock.json, product tests.
Report drift; do not fork managed files.
