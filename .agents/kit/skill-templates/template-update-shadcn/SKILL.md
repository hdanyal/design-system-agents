---
name: template-update-shadcn
description: Pinned upstream refresh and patch-ledger rebase
---

# template-update-shadcn

- Form: full
- Invocation: contextual
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
1. Use pinned shadcn@4.18.0 (or the new pin in a chore PR).
2. Diff/dry-run, rebase upstream-patches.json, run upstream/catalog/story/a11y/smoke.
3. Theme-only work routes to design-language.
Forbidden: overwriting pack `paths.primitives`.
