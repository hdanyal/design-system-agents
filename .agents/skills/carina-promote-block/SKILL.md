---
name: carina-promote-block
description: Experimental multi-slice block promotion with HITL; propose memory after ack, not same turn
---

# carina-promote-block

- Form: full
- Invocation: contextual
- Audience: maintainer
- Depends on: carina-compose, carina-a11y, carina-stories

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
1. A view may yield multiple experimental slices over time; review and name each slice independently.
2. Require USAGE.md matching imports and registryDependencies matching every registry import.
3. Move only the approved slice to `registry/blocks/<name>`; mark experimental and add stories, Changeset, and CI evidence.
4. Stop for HITL. After HITL, propose a catalog memory record; do not write memory in the same turn as promotion.
Do not mark stable, promote unrelated view chrome, or commit `public/r`.
