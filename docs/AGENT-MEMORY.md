# Agent memory

Reviewed Git files under `.agents/memory/`. Retrieval context, not training. Isolation key: `(repoRoot, designSystemId)`.

## Layout

- `shared/` — pack-wide facts after human ack
- `<agent-id>/` — one namespace per specialist (`ds-manager`, `ds-prototype`, …)

The program board under `.agents/program/` is not memory. Manager writes the board; reviewed notes may live under `ds-manager/` only after human ack.

## Frontmatter

Every record:

```yaml
---
designSystemId: carina
agent: ds-architect
title: Heading group reuse
evidence: inventory/components.json
decision: reuse stock card
applicability: this pack
source: PR
owner: carina-ds-eng
reviewedAt: 2026-08-21
expiresAt: 2027-08-21
supersedes:
---
```

Missing or mismatched `designSystemId` fails `node scripts/kit/check.mjs`. Do not write secrets.

## Forbidden retrieval

Other design systems’ chats, `@Chats`, `~/.cursor` notes, other Figma files. v1 refuses imports.

Handoffs in `.agents/handoffs/` are not memory until reviewed.

## Catalog facts

After a new or enhanced catalog entity passes human review, the specialist who shipped it proposes the fact, waits for explicit human acknowledgement, then writes the reviewed record under `.agents/memory/shared/`. Do not write memory in the same turn as the implementation or promotion, and do not treat a handoff as memory.

Use the normal frontmatter above. The record body must include:

- `entity` — public entity name and source path
- `layer` — stock UI, Carina primitive, block, or other catalog layer
- `decision` — new, enhanced, reused, replaced, or retired
- `reuse-of` for a new composition based on an existing entity, or `changed-API` for an enhancement
- `do-not-clone` — the contract or use case future work must reuse instead of duplicating
- `story` — exact Storybook title or stable story id used as evidence

Human acknowledgement must be recorded in the frontmatter (`owner`, `reviewedAt`, and evidence/source). If acknowledgement has not happened, keep the proposal in a handoff or inventory proposal, not memory.
