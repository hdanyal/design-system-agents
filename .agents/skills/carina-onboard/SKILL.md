---
name: carina-onboard
description: Pointer to pack bootstrap (ds-release) then Manager for the board; not a second cold start
---

# carina-onboard

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
Cold start is pack bootstrap (`ds-release` / `node scripts/kit/bootstrap.mjs`), not a second auto-select skill.
1. Read `.agents/context.json`. If missing or not `complete`, stop and invoke `ds-release`.
2. If bootstrap is `complete`, invoke `ds-manager` for `.agents/program/` (not auto-select).
3. Then load exactly one owning `ds-*` agent from docs/AGENT-KIT.md.
Do not write files until routing is done.
