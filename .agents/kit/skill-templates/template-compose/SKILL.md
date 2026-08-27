---
name: template-compose
description: Inventory, harvest-while-building, enhance-existing over twins, composition map, extraction routing
---

# template-compose

- Form: full
- Invocation: auto-select
- Audience: contributor
- Depends on: template-branding

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
1. Harvest while building: inventory stock UI (pack `paths.ui`), host primitives (`paths.primitives`), blocks, Storybook, and approved MCP registries for each reusable-looking region.
2. Decide in order: reuse → enhance-existing → extract a reusable primitive/block → keep local.
3. Prefer enhancing a named existing API over creating a twin. A justified family extract (reusable primitive plus thin composing block) is allowed.
4. Architect search protocol: index scan → near-duplicate check → source inspect shortlist (≤3) → decide with cited paths. Fill match confidence (`exact` | `near` | `none`), api delta, and files Coding may write on the harvest map.
5. Keep living harvest flags and USAGE.md in lockstep with imports and decisions.
Forbidden: cloned primitives, stock restyles, duplicate public APIs, and extraction merely to clean up local layout.
