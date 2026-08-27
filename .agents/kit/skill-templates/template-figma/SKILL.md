---
name: template-figma
description: Bridge official Figma workflows to Example policy
---

# template-figma

- Form: full
- Invocation: contextual
- Audience: contributor
- Depends on: template-compose

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
1. Require a Figma URL or explicit exploration task.
2. Load official Figma skills for APIs.
3. Map values to canonical tokens. Place code-to-Figma work on Explorations.
4. Catalog gaps go through extend-ui. Do not paste generated code as a new primitive.
