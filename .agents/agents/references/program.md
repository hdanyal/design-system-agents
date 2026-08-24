# Program board

Host-owned files under `.agents/program/`. Not copied by kit pack/install/upgrade.

**Writers:** Manager only. Every other specialist **reads** these files if present and, at end of turn, **proposes** a Manager reconcile. Do not edit `program/` unless you are Manager.

## Files

### `board.md`

Frontmatter required:

```yaml
---
designSystemId: <pack id>
recommendedNext: <ds-* id or human>
reconciledAt: <ISO date>
---
```

Body: current slice, blocked-on.

### `tasks.md`

Markdown table columns: `id`, `title`, `owner`, `dependsOn`, `status`, `links`.

- `owner`: a live manifest `ds-*` id or `human`
- `status`: `open` | `in-progress` | `done` | `blocked`

### `gaps.md`

Columns: `source`, `id`, `blocking`, `owner`, `status`.

- `source`: `inventory` | `work`
- `status`: `open` | `tasked` | `deferred` | `resolved`

Board status does not rewrite `.agents/inventory/gaps.json`. Stale scan → task the roster agent that owns bootstrap.

### `connections.md`

Index of `.agents/handoffs/*` plus next owner. Does not replace handoff files.

## First write

Create the four files on the first confirmed Manager write. Isolation: `designSystemId` must match pack `id`.

On that first/missing-board audit, also task unset `figmaFileKey` when the host needs Figma (human creates or links the file; roster owner maps pack after confirm). Do not write `context.json` or invent a file. If Figma is not needed, leave the inventory gap open and non-blocking.
