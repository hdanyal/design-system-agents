---
name: carina-compose
description: Inventory, reuse, composition map, and extraction routing
---

# carina-compose

- Form: full
- Invocation: auto-select
- Audience: contributor
- Depends on: carina-branding

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
1. Inventory stock UI, Carina primitives, blocks, Storybook, and approved MCP registries.
2. Reuse a match or extract a reusable primitive via `carina-extend-ui`.
3. Keep trivial local layout local.
4. Keep USAGE.md in lockstep with imports.
Forbidden: cloned primitives, stock restyles, duplicate public APIs.
