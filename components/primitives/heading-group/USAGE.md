# heading-group

Reusable title cluster. Not page chrome: no actions, breadcrumbs, or separator.

## Props

From `HeadingGroupProps`:

- `title` (`string`, required) — heading text, rendered as `h2`.
- `description` (`string`, optional) — supporting copy under the title.
- `eyebrow` (`string`, optional) — short category/context label above the title.
- `align` (`"start"` | `"center"`, optional, default `"start"`) — `"center"` centers the cluster.
- `className` (`string`, optional) — layout-only extension on the root.

`HeadingGroupAlign` is `"start" | "center"`. No other props.

## Composition

- Root is a `div` with `data-slot="heading-group"`.
- Order: optional eyebrow, required `h2` title, optional description. There is no `children` slot.
- `page-header` composes this primitive plus an actions slot and stock `separator`. Do not add those here.
- Import the implementation path used by that block:

```tsx
import { HeadingGroup } from "@/components/primitives/heading-group/heading-group"

<HeadingGroup
  eyebrow="Documentation"
  title="Heading group"
  description="A reusable title cluster for page and section introductions."
/>
```
