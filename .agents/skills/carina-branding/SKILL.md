---
name: carina-branding
description: Canonical-token/reference checks; no token policy duplication
---

# carina-branding

- Form: thin
- Invocation: auto-select
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
1. Read generated `.agents/skills/carina-branding/reference.md`.
2. Use CSS variables and the resolved lucide/Inter stack only.
3. Token edits route to `carina-update-design-language`.
Never copy oklch/hex into JSX or stories.
