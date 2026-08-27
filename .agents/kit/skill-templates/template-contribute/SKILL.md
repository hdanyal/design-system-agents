---
name: template-contribute
description: Execute CONTRIBUTING process without restating it
---

# template-contribute

- Form: full
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
Follow CONTRIBUTING.md: typed branch, docs-as-code, Conventional Commits, PR template, CODEOWNERS.
Agents open/update PRs only. Never push or merge main, skip hooks, or rewrite others' commits.
