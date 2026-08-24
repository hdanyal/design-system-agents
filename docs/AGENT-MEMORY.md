# Agent memory

**Short notes agents can look up later** — not a second catalog. Open a file only when the entity matches this turn. Write only after a person approves.

Reviewed Git files under `.agents/memory/`. Isolation key: `(repoRoot, designSystemId)`.

Bootstrap `--write` and kit upgrade seed **empty** namespaces (`.gitkeep` only). They never copy records from another pack.

## Layout

- `shared/` — one short catalog fact per public entity after human ack
- `<agent-id>/` — pointer notes for Bugbot, Security, or Accessibility evidence after human ack
- `ds-critique/` — short pack lessons and user instructions after human ack (not full critique essays)

The program board under `.agents/program/` is not memory. Manager writes only `.agents/program/`. Kit `critique-standards.md` is portable industry bar, not host memory.

## Selectivity

Memory is a **small retrieval index**, not a second catalog. Prefer omitting a record over a verbose one.

**Write to `shared/` (ds-docs only, after ack):** one file per entity slug; frontmatter plus ~15–25 lines; required body fields only. Shipper proposes in a handoff or inventory proposal; do not write in the implementation or promotion turn.

**Write to `<agent-id>/` (review agents only, after ack):** path, severity, PR or handoff id — not full axe dumps or review essays.

**Write to `ds-critique/` (Critique only, after ack):** short pack lessons or user instructions from `references/critique-lesson.md`. Retrieve by `subjectAgent` / `trigger` / entity match — not every lesson in one turn. Producers must not pre-seed `ds-critique/` for a friendly review.

**Never memory:** inventory, USAGE, RATIONALE, harvest maps, program board, handoffs (until reviewed and reduced), token tables, secrets, chat transcripts.

**Retrieval:** read [docs/AGENT-MEMORY.md](AGENT-MEMORY.md) and session-start title counts (shared and ds-critique titles only). Do **not** load every file under `.agents/memory/`. Open a `shared/*.md` only when this turn’s entity matches. Open `ds-critique/*.md` only when `subjectAgent` / `trigger` / entity matches this hop. Open own-namespace files only when recording/acking evidence or the user asked about a prior finding. Never open producer memory namespaces from Critique. Inventory and Storybook remain source for what exists.

Templates: `.agents/agents/references/catalog-fact.md`, `references/critique-lesson.md`.

## Frontmatter

Every record:

```yaml
---
designSystemId: <pack-id>
agent: ds-docs
title: Heading group catalog fact
evidence: <paths.primitives>/heading-group/USAGE.md
decision: enhanced
applicability: this pack
source: PR
owner: <ack reviewer>
reviewedAt: 2026-08-21
expiresAt: 2027-08-21
supersedes:
---
```

Missing or mismatched `designSystemId`, `owner`, or `reviewedAt` fails `node scripts/kit/check.mjs`. Do not write secrets.

## Forbidden retrieval

Other design systems’ chats, `@Chats`, `~/.cursor` notes, other Figma files. v1 refuses imports.

Handoffs in `.agents/handoffs/` are not memory until reviewed.

## Catalog facts

After a new or enhanced catalog entity passes human review, the specialist who shipped it **proposes** the fact and waits for explicit human acknowledgement. **Documentation (`ds-docs`)** writes the reviewed record under `.agents/memory/shared/` in a **later** acknowledged turn. Do not write memory in the same turn as the implementation or promotion, and do not treat a handoff as memory.

Use the normal frontmatter above. The record body must include:

- `entity` — public entity name and source path
- `layer` — stock UI, primitive, block, or other catalog layer
- `decision` — new, enhanced, reused, replaced, or retired
- `reuse-of` for a new composition based on an existing entity, or `changed-API` for an enhancement
- `do-not-clone` — the contract or use case future work must reuse instead of duplicating
- `story` — exact Storybook title or stable story id used as evidence

Human acknowledgement must be recorded in the frontmatter (`owner`, `reviewedAt`, and evidence/source). If acknowledgement has not happened, keep the proposal in a handoff or inventory proposal, not memory.
