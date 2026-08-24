---
name: example-shadcn-mcp
description: Browse/view/install routing and registry-origin checks
---

# example-shadcn-mcp

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
Browse/search/view only by default.
Installs route to update-shadcn or consume.
Registry writes route to promote-block.
Never enable an unreviewed registry namespace.
