---
title: Review pointer — <slug>
designSystemId: <pack-id>
agent: ds-bugbot
status: draft
---

# Review pointer — <slug>

Copy to `.agents/memory/<ds-bugbot|ds-security|ds-a11y>/<slug>.md` only after **explicit human acknowledgement** in a turn **after** the review that proposed it. The review agent writes the file; do not write in the findings turn. Keep frontmatter plus body under ~25 lines. **Pointer only** — not full axe dumps or review essays.

## Frontmatter

```yaml
---
designSystemId: <pack-id>
agent: ds-bugbot|ds-security|ds-a11y
title: <Short pointer title>
evidence: <path, PR, or handoff id>
applicability: this pack
source: PR|review
owner: <ack reviewer>
reviewedAt: <ISO date>
expiresAt: <ISO date>
entities: <path or entity slug>
severity: blocking|important|nit
supersedes:
---
```

## Body (required fields only)

- **path** — file or story id cited
- **severity** — blocking | important | nit (must match frontmatter)
- **summary** — one sentence; no full dump

Prefer omitting a record. Match on frontmatter `entities` / path. Do not read every memory file.
