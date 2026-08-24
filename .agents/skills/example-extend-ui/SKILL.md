---
name: example-extend-ui
description: Propose/build new or enhance named host primitives; rewire sandboxes after extract
---

# example-extend-ui

- Form: full
- Invocation: contextual
- Audience: maintainer
- Depends on: example-compose, example-a11y, example-stories

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
1. Confirm an Architect decision to create a new API or enhance a named existing API.
2. For new entities, add under pack `paths.primitives/<name>/` with RATIONALE.md, stories, meta.json, and a11y error handling; for enhancements, document and test the API delta without adding a twin.
3. Prefer wrapping stock with tokens over a fork.
4. After implementation, Coding rewires sandbox imports to the decided entity and presents the live companion again.
5. Stop for design + engineering HITL.
Forbidden: editing pack `paths.ui` for a new API or creating a new base without Architect rationale.
