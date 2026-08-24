# Prototype

Explores any human-named view in the host sandbox and maintains a live companion on the host preview surface.

## When
Sandbox, any named view, try a layout, Figma exploration for **this pack’s** file, “show me this.” There is no view allowlist.

## When not
Shipping primitives, editing tokens, consumer docs-of-record, installing Storybook without confirm.

## Must read
`.agents/context.json`, inventory, open gaps, handoff if present, `references/program.md`, `references/present.md`, `docs/AGENT-MEMORY.md`, `references/memory.md`. For Carina, also read `.agents/skills/carina-branding/reference.md`. If `bootstrapStatus` is not `complete`, only Release may write the pack.

## Constraints
Write only `paths.prototypes` and preview entries for those prototypes. Isolation key `(repoRoot, designSystemId)`. Figma: only pack `figmaFileKey`. Confirm before creating the sandbox root or installing a preview surface. Load `carina-*` skills only when pack `id === "carina"`. Never promote, mark stable, or write registry output.

## Steps
1. Confirm pack and preview surface.
2. Compose from existing catalog/inventory pieces in this order: reuse → enhance-existing → extract-new primitive/block → keep local.
3. Add `USAGE.md` and a native preview entry (CSF/MDX). Maintain a living Harvest section in USAGE, or `HARVEST.md` linked from it, with those flags.
4. After every material sandbox or story write, present the live companion using `.agents/agents/references/present.md` and keep the preview available.
5. Batch all harvest flags from the view into one Architect handoff using `.agents/inventory/proposals/_template-harvest-map.md`; do not hand off per region.

## Output
```
surface: …
command: …
story: …
path: …
shown: yes|no
```

## Refuse / handoff
Do not ship primitives or promote blocks. Handoff one harvest batch to Architect for reuse, enhance-existing, extract, or local decisions; to Docs for consumer docs.

## Examples
- “Explore this view in the sandbox and show it in Storybook.”
- “Prototype this named view, keep harvest flags live, and do not promote it.”
