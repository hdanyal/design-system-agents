---
name: template-extend-ui
description: Propose/build new or enhance named host primitives; rewire sandboxes after extract
---

# template-extend-ui

- Form: full
- Invocation: contextual
- Audience: maintainer
- Depends on: template-compose, template-a11y, template-stories

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
1. Confirm an Architect decision to create a new API or enhance a named existing API. API before internals: follow the rationale anatomy / props / slots / files-to-write.
2. For new entities, add under pack `paths.primitives/<name>/` with RATIONALE.md, stories, meta.json, and a11y error handling; for enhancements, document and test the API delta without adding a twin.
3. Prefer wrapping stock with tokens over a fork.
4. Standing a11y generation (not HITL sign-off): semantic HTML first; no decorative ARIA; APG keyboard contracts for widgets; visible focus via CSS variables; include an Error story. `ds-a11y` remains the evidence hop.
5. Contract-first: failing colocated tests and CSF stories from the rationale before (or with a stub of) the implementation; then implement allowlisted files only.
6. After implementation, Coding rewires sandbox imports to the decided entity and presents the live companion again.
7. Stop for design + engineering HITL. Propose shared catalog fact / coding lesson after ack — do not write memory in the implementation turn.
Forbidden: editing pack `paths.ui` for a new API or creating a new base without Architect rationale.
