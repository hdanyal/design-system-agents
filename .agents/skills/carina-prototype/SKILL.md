---
name: carina-prototype
description: Route safe-sandbox work through compose
---

# carina-prototype

- Form: thin
- Invocation: contextual
- Audience: contributor
- Depends on: carina-compose

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
Write only under `prototypes/<name>/` with USAGE.md and a story.
Then follow `carina-compose`. Do not promote from this skill.
