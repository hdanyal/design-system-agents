---
name: template-branding
description: Generated branding identity (Overview, CSS vars, Do's and Don'ts); no hex in JSX; no token policy duplication
---

# template-branding

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
1. Read generated `.agents/skills/template-branding/reference.md` before view, component, story, or token work.
2. Follow its Overview and Do's and Don'ts when present; use its catalog intent to compose before extracting.
3. Use CSS variables and the resolved lucide/Inter stack only.
4. Token edits route to `template-update-design-language`.
Never copy oklch/hex into JSX or stories. Never hand-edit the generated reference.
