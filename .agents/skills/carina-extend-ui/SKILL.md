---
name: carina-extend-ui
description: Propose and build approved reusable Carina primitives
---

# carina-extend-ui

- Form: full
- Invocation: contextual
- Audience: maintainer
- Depends on: carina-compose, carina-a11y, carina-stories

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
1. Confirm catalog gap via compose inventory.
2. Add `components/carina/<name>/` with RATIONALE.md, stories, meta.json, a11y error.
3. Prefer wrapping stock with tokens over a fork.
4. Stop for design + engineering HITL.
Forbidden: editing components/ui for a new API.
