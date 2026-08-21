---
name: carina-incident
description: INCIDENTS rollback/revocation workflow
---

# carina-incident

- Form: full
- Invocation: explicit-only
- Audience: maintainer
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
Follow docs/INCIDENTS.md: stop publication, pin/revert known-good immutable release, preserve evidence, communicate, open follow-ups.
Requires incident-owner authority.
