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

## Match confidence

| Value | Meaning |
| --- | --- |
| `exact` | Inventory/catalog name or export covers the region as-is |
| `near` | Same job, different name or partial API — enhance or refuse twin |
| `none` | No viable match after shortlist source inspect |

## Harvest table

| region | inventory match | match confidence | decision | target entity | api delta | files Coding may write | a11y notes | security notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| | | exact\|near\|none | | | | | | |

Fill one row per flagged region. `inventory match` cites `.agents/inventory/components.json` (and Storybook catalog when relevant). `target entity` is the path or registry name for reuse/enhance/extract, or `local` when kept local. `api delta` is required for `enhance-existing` (props/slots/a11y delta) or `-` otherwise. `files Coding may write` lists rationale-named paths for extract/enhance, or `-` for reuse/keep local.

## Search protocol (Architect)

1. **Index scan** — exact name, then layer+job. Open inventory as names/layers/paths only.
2. **Near-duplicate check** — same job, different name. Prefer enhance-existing over a twin.
3. **Source inspect shortlist** — ≤3 candidates: public exports, variants, slots, a11y contract.
4. **Decide** with cited paths. `extract-new` only after stock **and** enhance-existing fail, with quotes.
5. **API contract** on extract/enhance — anatomy, props/slots, composition, a11y, files Coding may write — before confirm.
6. **Propose memory after confirm** — shared catalog fact and/or one Architect lesson; do not write memory in the decision turn.

Open catalog only when it exists and a region has no exact inventory hit. List titles under `shared/` and `.agents/memory/ds-architect/`; open bodies only on slug / `trigger` / entity match. Never load every memory file.

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
5. After confirm: propose (do not write) shared catalog fact / Architect lesson when warranted; write only in a later ack turn.
