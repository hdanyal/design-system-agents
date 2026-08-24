---
title: Harvest map — <sandbox-name>
sandbox: <prototypes/<name> or story id>
designSystemId: <pack-id>
architectOwner: ds-architect
status: draft
---

# Harvest map — <sandbox-name>

Copy this file to `.agents/inventory/proposals/<sandbox>-harvest-map.md` (or attach under the sandbox) when Prototype flags reusable regions. One Architect hop per sandbox batch — do not spawn Architect per region.

Canonical template: `.agents/agents/references/harvest-map.md`.

## Preference order

Apply decisions in this order only:

1. **reuse** — inventory / catalog entity already covers the region; compose it
2. **enhance-existing** — extend an existing primitive/block API or a11y contract (no twin)
3. **extract-new primitive** | **extract-new block** — only when stock + existing host entities fail (write rationale)
4. **keep local** — sandbox-only chrome; do not promote

Family extract remains OK when justified: a reusable primitive plus a composing block.

## Decision enum

| Value | Meaning |
| --- | --- |
| `reuse` | Match exists; wire it; no new public API |
| `enhance-existing` | Grow an existing entity; document delta; no duplicate export |
| `extract-new primitive` | New entity under pack `paths.primitives` with RATIONALE; confirm before Coding |
| `extract-new block` | New under pack `paths.blocks` with RATIONALE; confirm before Coding |
| `keep local` | Stays in sandbox; harvest flag cleared or deferred |

## Harvest table

| region | inventory match | decision | target entity | a11y notes | security notes |
| --- | --- | --- | --- | --- | --- |
| | | | | | |

Fill one row per flagged region. `inventory match` cites `.agents/inventory/components.json` (and Storybook catalog when relevant). `target entity` is the path or registry name for reuse/enhance/extract, or `local` when kept local.

## Constraints (Architect)

- Batch all harvest flags from one sandbox into **one** Architect hop — not one spawn per region.
- Token holes (missing CSS var / wrong channel) → route to **ds-language** via pack token source / `tokens:build`. Never invent hex in JSX.
- No stock restyles (pack `paths.ui` only via this host's `upstream-patches.json` when present).
- No duplicate public APIs or twin primitives.
- Family extract (primitive + composing block) is allowed when the primitive is reusable beyond one screen and the block stays thin.

## Prototype instructions — living harvest flags

While the sandbox is live, keep harvest flags in the sandbox:

1. Prefer a **Harvest** section in `paths.prototypes/<name>/USAGE.md` listing region → candidate decision → inventory hint.
2. If USAGE becomes crowded, move living flags to `HARVEST.md` and link it from USAGE.
3. Flags are disposable notes for Architect; they are not rationale. After the harvest map is written and decisions confirmed, clear or mark flags resolved.
4. Do not promote from flags alone. Architect writes this map (or a filled copy); Coding implements only after confirm.

## Handoff after fill

1. Architect completes the table and sets `status: ready-for-confirm`.
2. Human confirms any `extract-new *` / `enhance-existing` rows.
3. Propose Manager reconcile; hand off to **ds-coding** (implement) or **ds-language** (token holes) or **ds-prototype** (more exploration) as needed.
4. Do not edit `.agents/program/` from Architect.
