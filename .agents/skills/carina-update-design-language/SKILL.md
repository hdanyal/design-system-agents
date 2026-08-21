---
name: carina-update-design-language
description: Preset candidate or canonical token change workflow
---

# carina-update-design-language

- Form: full
- Invocation: contextual
- Audience: maintainer
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
1. Edit tokens.json or apply a preset as a candidate diff.
2. Run `pnpm tokens:build` and a11y/Foundations review.
3. Never restyle by editing stock or Carina component class colors.
4. Breaking token renames need a major Changeset.
