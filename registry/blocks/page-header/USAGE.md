# page-header

## Composed from

- `@carina/heading-group` — title, optional eyebrow, optional description
- `separator` — stock horizontal rule under the header
- Optional action slot — typically stock `button` instances supplied by the consumer

## New base components introduced

- `heading-group` (see `components/carina/heading-group/RATIONALE.md`)

## How to use

```tsx
import { PageHeader } from "@/registry/blocks/page-header/page-header"
import { Button } from "@/components/ui/button"

<PageHeader
  eyebrow="Billing"
  title="Invoices"
  description="Review synthetic invoice records for the current period."
  actions={<Button>Create invoice</Button>}
/>
```

Do not clone heading markup inside this block. Layout wrappers (`flex`, `gap`) stay local.
