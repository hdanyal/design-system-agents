---
name: example-prototype
description: Any human-named view in prototypes with live Storybook present and harvest flags; never promote
---

# example-prototype

- Form: thin
- Invocation: contextual
- Audience: contributor
- Depends on: example-compose

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
1. Accept any human-named view; there is no view-name or view-type allowlist.
2. Write only under `prototypes/<name>/` with USAGE.md and a CSF story, then follow `example-compose`.
3. Read generated `.agents/skills/example-branding/reference.md` and honor its identity guidance.
4. After every material sandbox or story write, present the live companion using `.agents/agents/references/present.md`; keep the preview available for visual HITL.
5. Maintain a living Harvest section in USAGE.md, or HARVEST.md linked from it, using only: reuse, enhance-existing, extract-new primitive/block, keep local.
6. Batch all flags from the view into one Architect handoff using `references/harvest-map.md`.
Never promote, mark stable, or create public registry output from this skill.
