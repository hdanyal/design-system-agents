---
title: Coding lesson — <slug>
designSystemId: <pack-id>
agent: ds-coding
status: draft
---

# Coding lesson — <slug>

Copy to `.agents/memory/ds-coding/<slug>.md` only after **explicit human acknowledgement** in a turn **after** HITL that proposed it. Coding (`ds-coding`) writes the file; do not write in the implementation turn. Keep frontmatter plus body under ~25 lines. Do not paste USAGE, RATIONALE, harvest maps, or diffs.

## Frontmatter

```yaml
---
designSystemId: <pack-id>
agent: ds-coding
title: <Short lesson title>
evidence: <path, PR, or handoff id>
applicability: this pack
source: PR|implementation|user-instruction
owner: <ack reviewer>
reviewedAt: <ISO date>
expiresAt: <ISO date>
trigger: <entity slug, API name, or phrase>
supersedes:
---
```

## Body (required fields only)

- **lessonKind** — `wrap-gotcha` | `story-matrix` | `test-pattern` | `user-instruction`
- **lesson** — the standing note for matching Coding hops
- **do-not-repeat** — the impl mistake tests alone did not encode

Prefer omitting a record. One lesson per repeated mistake. Catalog `do-not-clone` facts belong in `shared/` via Docs, not here. Propose not write in the implementation turn. Match on frontmatter `trigger`.
