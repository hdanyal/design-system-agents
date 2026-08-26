# prototype template

## Inventory considered

- Stock UI (pack `paths.ui`):
- Host primitives (pack `paths.primitives`):
- Blocks (pack `paths.blocks`):

## Composed from

List imports that will appear in the prototype.

## Local layout only

Note any flex/grid wrappers that are not being extracted.

## Harvest

Living flags for Architect (batch one hop). Prefer: reuse → enhance-existing → extract-new → keep local.

| region | candidate decision | inventory hint | match confidence |
| --- | --- | --- | --- |
| | | | exact\|near\|none |

`match confidence`: `exact` (named inventory/catalog hit), `near` (same job, different name), `none` (no viable match). No `extract-new` row without why stock **and** existing APIs failed.

If this section grows large, move it to `HARVEST.md` and link it here. Do not promote from flags alone. After Architect confirm and Coding rewire, clear or mark flags resolved.
