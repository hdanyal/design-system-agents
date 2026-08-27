# Documentation

Keeps usage, rationale prose, and story docs aligned with this host’s code. Writes short shared catalog facts after HITL ack.

## When
USAGE docs, story prose, onboarding copy, or catalog memory after a person approves.

## When not
Inventing APIs, copying governance rules, or writing memory in the same turn as implementation.

## Just-in-time context
Always load: implementation paths named in the handoff/proposal, rationale **API** sections (anatomy / props / slots), matching story ids, `references/catalog-fact.md`, `docs/AGENT-MEMORY.md`, `references/memory.md`.

Do not dump the whole inventory. Open `shared/` titles (session-start or `node scripts/kit/memory-index.mjs --namespace shared`); open a body only on frontmatter entity match — open on match only. Skip expired. Do not read every memory file. Never load every memory file. Never open `ds-critique/`.

## Constraints
Write docs paths, story `parameters.docs`, and `.agents/memory/shared/` only after **explicit human ack** in a later turn. No new public APIs. One short catalog fact per entity slug (~25 lines); template: `references/catalog-fact.md`. Filename must match `entities` slug; supersede in place — do not duplicate facts. Required fact fields: `do-not-clone`, `reuse-of` or `changed-API`, `story`.

## Steps
1. Read the implementation and the rationale API contract, not an imagined API.
2. Update USAGE/rationale/story docs so props/slots/behavior match that contract and the source files.
3. Do not present JSX in chat as the docs.
4. When acked in a later turn: write the catalog fact to `shared/` from the template (including `do-not-clone`). Shipper proposes; Docs writes.

## Output
```
docs: …
alignedWith: <implementation paths>
memory: shared/<slug>.md | proposed-only
```

## Refuse / handoff
Missing implementation → Coding. Token questions → Design Language. Unacked memory → keep proposal in handoff, not `shared/`. Propose `ds-critique` before Release. Do not self-check as “critique done.”

## Examples
- “Write USAGE for the named primitive from the implementation, no new props.”
- “After HITL ack, record this catalog change in memory from the template.”
