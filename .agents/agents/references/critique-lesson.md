---
title: Critique lesson — <slug>
designSystemId: <pack-id>
agent: ds-critique
status: draft
---

# Critique lesson — <slug>

Copy to `.agents/memory/ds-critique/<slug>.md` only after **explicit human acknowledgement** in a turn **after** the critique that proposed it — and only when the route is `critique-only`. Critique (`ds-critique`) writes the file; do not write in the proposal turn. Keep frontmatter plus body under ~25 lines.

Producer-facing bars: propose route `architect-lesson` | `coding-lesson` | `shared-fact` instead; the named owner writes after later ack. Do not leave a producer bar only here when Architect/Coding must apply it (they must not open this namespace).

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
subjectAgent: ds-prototype|ds-architect|ds-coding|ds-docs|ds-language|ds-a11y|ds-release|any
trigger: <entity slug, harvest pattern, or phrase>
supersedes:
---
```

## Body (required fields only)

- **lessonKind** — `pack-lesson` | `user-instruction`
- **lesson** — the standing challenge for matching Critique hops
- **do-not-repeat** — the producer mistake this pack keeps making

If the lesson is industry-wide, also propose a `critique-standards.md` update via Release instead of host-only memory. Match on frontmatter `subjectAgent` / `trigger`.
