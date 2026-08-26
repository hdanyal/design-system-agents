---
title: Catalog fact — <entity-slug>
designSystemId: <pack-id>
agent: ds-docs
status: draft
---

# Catalog fact — <entity-slug>

Copy to `.agents/memory/shared/<entity-slug>.md` only after **explicit human acknowledgement** in a turn **after** HITL. Documentation (`ds-docs`) writes the file; the shipper (Architect after extract/enhance confirm, or Coding after HITL) proposes only. Keep frontmatter plus body under ~25 lines. Do not paste USAGE or inventory. Filename must match the entity slug; never a second file for the same entity.

## Frontmatter

```yaml
---
designSystemId: <pack-id>
agent: ds-docs
title: <Entity> catalog fact
evidence: <paths.primitives or paths.blocks entity path, or PR>
decision: new|enhanced|reused|replaced|retired
applicability: this pack
source: PR
owner: <ack reviewer>
reviewedAt: <ISO date>
expiresAt: <ISO date>
entities: <entity-slug>
supersedes:
---
```

## Body (required fields only)

- **entity** — public name and source path
- **layer** — stock UI | primitive | block | other
- **decision** — new | enhanced | reused | replaced | retired
- **reuse-of** or **changed-API** — when applicable
- **do-not-clone** — one sentence: what future work must reuse
- **story** — exact Storybook title or stable story id

Supersede an older fact in place when the entity contract changes; set `supersedes:` to the prior title or path. Match on frontmatter `entities` (or `entity`).
