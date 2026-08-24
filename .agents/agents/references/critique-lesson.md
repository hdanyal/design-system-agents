---
title: Critique lesson — <slug>
designSystemId: <pack-id>
agent: ds-critique
status: draft
---

# Critique lesson — <slug>

Copy to `.agents/memory/ds-critique/<slug>.md` only after **explicit human acknowledgement** in a turn **after** the critique that proposed it. Critique (`ds-critique`) writes the file; do not write in the proposal turn. Keep frontmatter plus body under ~25 lines.

## Frontmatter

```yaml
---
designSystemId: <pack-id>
agent: ds-critique
title: <Short lesson title>
evidence: <path, PR, or handoff id>
applicability: this pack
source: PR|user-instruction|critique
owner: <ack reviewer>
reviewedAt: <ISO date>
expiresAt: <ISO date>
supersedes:
---
```

## Body (required fields only)

- **kind** — `pack-lesson` | `user-instruction`
- **subjectAgent** — `ds-prototype` | `ds-architect` | `ds-coding` | `ds-docs` | `ds-language` | `ds-a11y` | `ds-release` | `any`
- **trigger** — entity slug, harvest pattern, or phrase that retrieves this file
- **lesson** — the standing challenge to apply on matching hops
- **do-not-repeat** — the producer mistake this pack keeps making

If the lesson is industry-wide, also propose a `critique-standards.md` update via Release instead of host-only memory.
