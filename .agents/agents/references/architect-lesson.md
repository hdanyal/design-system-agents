---
title: Architect lesson — <slug>
designSystemId: <pack-id>
agent: ds-architect
status: draft
---

# Architect lesson — <slug>

Copy to `.agents/memory/ds-architect/<slug>.md` only after **explicit human acknowledgement** in a turn **after** the harvest confirm that proposed it. Architect (`ds-architect`) writes the file; do not write in the decision turn. Keep frontmatter plus body under ~25 lines. Do not paste USAGE, RATIONALE, harvest maps, or diffs.

## Frontmatter

```yaml
---
designSystemId: <pack-id>
agent: ds-architect
title: <Short lesson title>
evidence: <path, PR, or handoff id>
applicability: this pack
source: PR|harvest|user-instruction
owner: <ack reviewer>
reviewedAt: <ISO date>
expiresAt: <ISO date>
trigger: <entity slug, job phrase, or harvest pattern>
supersedes:
---
```

## Body (required fields only)

- **lessonKind** — `near-miss` | `twin-avoided` | `job-map` | `user-instruction`
- **lesson** — the standing note for matching Architect hops
- **do-not-repeat** — the twin or wrong extract this pack keeps making

Prefer omitting a record. One lesson per repeated mistake, not one file per region. Cross-agent facts belong in `shared/` via Docs, not here. Match on frontmatter `trigger` — do not open the body to know if it matches.
