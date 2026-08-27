---
name: template-a11y
description: Automated/manual accessibility workflow and evidence
---

# template-a11y

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
1. Scope `pnpm test:a11y` and `pnpm test:stories` to the story ids listed in the Coding/Language handoff. Do not axe the whole Storybook.
2. Add play tests for stateful primitives/blocks. Confirm error + keyboard stories exist when the API is interactive, or name the gap.
3. Collect manual HITL evidence from GOVERNANCE. This hop is not HITL sign-off.
4. Never waive a violation; allowlist only demo-fixture stock issues.
See docs/a11y-allowlist.md.
