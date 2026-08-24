# invoices-workspace

## Inventory considered

- Stock `button`, `separator`: reused for actions and divider.
- `@example/heading-group`: reused via the `page-header` block.
- `page-header` block: reused as the page chrome.
- Stock `empty`: not used; this is a populated workspace, not an empty state.
- Stock `card`: not extracted; the table region is local layout.

## Composed from

- `page-header` (`@example/heading-group` + `separator`)
- stock `button`

## Local layout only

A flex column and a placeholder content region. No new primitive.
