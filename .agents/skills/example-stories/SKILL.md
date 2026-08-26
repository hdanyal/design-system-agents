---
name: example-stories
description: Story coverage, interaction tests, tags, and docs
---

# example-stories

- Form: full
- Invocation: contextual
- Audience: contributor
- Depends on: example-a11y

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
CSF titles: Foundations / UI / Primitives / Blocks / Prototypes.
Foundations bind to var(--*).
Stateful components need play tests (see example-a11y).
Tag experimental/stable/deprecated from metadata.
Required state matrix for new/enhanced primitives: default, disabled (when applicable), error, and keyboard/focus-visible where interactive.
Error story is required for form-like or validated surfaces.
Play tests assert roles, accessible names, and keyboard paths — not class strings.
After wiring stories, Coding notes play-test story ids in the present output.
