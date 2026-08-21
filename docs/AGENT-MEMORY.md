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
