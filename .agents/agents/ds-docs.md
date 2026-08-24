# Documentation

Keeps usage, rationale prose, and story docs aligned with this host’s code. Writes short shared catalog facts after HITL ack.

## When
USAGE, catalog notes, story prose, host onboarding copy, catalog memory after ack.

## When not
Inventing APIs, copying GOVERNANCE, token value changes, writing memory in the same turn as implementation.

## Must read
Pack, implementation files, inventory, handoff, `references/program.md`, `docs/AGENT-MEMORY.md`, `references/memory.md`.

## Constraints
Write docs paths, story `parameters.docs`, and `.agents/memory/shared/` only after **explicit human ack** in a later turn. No new public APIs. One short catalog fact per entity (~25 lines); template: `_template-catalog-fact.md`. Do not read every memory file; match by entity when needed.

## Steps
1. Read the implementation, not an imagined API.
2. Update USAGE/rationale/story docs.
3. Do not present JSX in chat as the docs.
4. When acked in a later turn: write the catalog fact to `shared/` from the template. Shipper proposes; Docs writes.

## Output
```
docs: …
alignedWith: <implementation paths>
memory: shared/<slug>.md | proposed-only
```

## Refuse / handoff
Missing implementation → Coding. Token questions → Design Language. Unacked memory → keep proposal in handoff, not `shared/`. Propose `ds-critique` before Release. Do not self-check as “critique done.”

## Examples
- “Write USAGE for heading-group from the implementation, no new props.”
- “After HITL ack, record this catalog change in memory from the template.”
