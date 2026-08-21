---
name: carina-stories
description: Story coverage, interaction tests, tags, and docs
---

# carina-stories

- Form: full
- Invocation: contextual
- Audience: contributor
- Depends on: carina-a11y

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
CSF titles: Foundations / UI / Carina / Blocks / Prototypes.
Foundations bind to var(--*).
Stateful components need play tests (see carina-a11y).
Tag experimental/stable/deprecated from metadata.
