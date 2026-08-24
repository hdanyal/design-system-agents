# heading-group

## Requirement the block needs

Page-level and section-level introductions need a consistent title, optional eyebrow, and supporting description with shared spacing, type, and alignment.

## Inventory considered (and why each fails)

- Stock `CardTitle` / `CardDescription`: card-scoped, not a reusable page/section intro.
- Stock `EmptyTitle` / `EmptyDescription`: empty-state specific layout and dashed container.
- Stock `Item` / `Field`: form and list semantics, not page headings.
- Raw `h2` + `p` markup in every block: duplicates heading semantics and token-bound type styles.

## Why this must be a base component

The same heading cluster is needed by `page-header` and by section intros in future blocks. Extracting it keeps blocks thin and prevents each composition from inventing its own heading API.

## API

- `title` (required): accessible heading text, rendered as `h2`.
- `description` (optional): supporting copy.
- `eyebrow` (optional): uppercase category/context label.
- `align`: `start` | `center`.
- `className`: layout-only extension.

## Accessibility contract

- One heading element (`h2`) so page structure stays predictable.
- Description is visible text, not `aria-describedby`, unless a future consumer needs an ID.
- Contrast uses `--foreground` and `--muted-foreground` tokens.

## What it is not

- Not a page chrome/layout (no actions, breadcrumbs, or separators).
- Not a stock heading restyle and not a fork of `Empty` or `Card`.
