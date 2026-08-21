---
name: carina-promote-block
description: Experimental block promotion with HITL and evidence
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
1. Require USAGE.md matching imports/registryDependencies.
2. Move approved prototype to registry/blocks/<name>.
3. Mark experimental, add stories, Changeset, and CI evidence.
4. Stop for HITL. Do not mark stable and do not commit public/r.
