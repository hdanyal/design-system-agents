# page-header

## Requirement the block needs

Most product screens open with a title, optional supporting copy, and a small cluster of page actions, then a hairline before the body. That cluster is the same composition on Home, Cases, Briefing, Tasks, Files, Settings, and the rest of the investigation workspace. It is not a new control; it is the heading-group plus actions plus a separator.

## Inventory considered (and why each fails)

- Stock `CardHeader` / `CardTitle` / `CardDescription`: card-scoped chrome, not a page intro.
- Stock `EmptyHeader` / `EmptyTitle`: empty-state layout and dashed container.
- Stock `Item` / `Field`: list and form semantics.
- Primitive `@carina/heading-group` alone: covers title / eyebrow / description, and deliberately has no actions, breadcrumbs, or rule. A page header without an action slot would push every screen to invent its own flex row.
- Raw `h1` + `p` + button row in every screen: duplicates the heading-group contract and the separator.

No stock primitive is a page chrome composition. No existing Carina primitive should grow an actions slot — that would turn heading-group into a layout.

## Why this is a block, not a primitive

`page-header` is a registry composition: `@carina/heading-group` + optional consumer-supplied actions + stock `separator`. Blocks stay thin. The heading cluster is already extracted. What remains is local flex wrapping (`sm:flex-row sm:items-end sm:justify-between`) and a rule. That is not a reusable base component and must not grow a public API of its own.

## API

No new APIs. The block forwards the heading-group fields it already has and adds only the composition slot:

- `title` (required)
- `description` (optional)
- `eyebrow` (optional)
- `actions` (optional `ReactNode` — typically stock `button` / `button-group`)
- `className` (layout-only)

Do not add breadcrumbs, status chips, tabs, or permission gates to this block. Those compose beside it.

## Accessibility contract

- One heading, owned by `heading-group` (`h2`). Do not wrap a second heading around it.
- Actions are real controls supplied by the consumer; the block does not mint buttons.
- Contrast follows `--foreground` / `--muted-foreground` via heading-group. Do not paint HTML product hex onto this block.

## What it is not

- Not a primitive and not a twin of heading-group.
- Not app chrome (no rail, top bar, breadcrumbs, command trigger, or chat frame).
- Not a stock restyle and not a fork of `Card` or `Empty`.
- Not a place to encode identity / action / state colour channels.
