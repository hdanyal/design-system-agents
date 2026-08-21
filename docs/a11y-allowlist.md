# A11y allowlist

Two distinct things are recorded here, and they are not interchangeable.

**Demo-fixture exceptions** cover incomplete example chrome in a story, never a defect in the component itself. They may use `todo`.

**Third-party upstream defects** are real accessibility bugs inside a dependency we cannot patch (Base UI, cmdk). They are never waived wholesale: each one disables exactly one axe rule or excludes exactly one node on exactly one story, and every other rule stays enforced on that story. Defects in our own stock layer do not belong here — those go through `upstream-patches.json` and are fixed.

Every row needs an owner and an expiry. At expiry the dependency is re-checked and the scope is removed if upstream has fixed it.

## Demo-fixture exceptions

| Story | Owner | Issue | Reason | Expiry | Last review |
| --- | --- | --- | --- | --- | --- |
| UI/*/Default demo fixtures | carina-ds-eng | n/a | Upstream example stories may include incomplete demo chrome | 2026-11-17 | 2026-08-17 |

## Third-party upstream defects

| Story | Dependency | Rule scoped | Defect | Owner | Expiry | Last review |
| --- | --- | --- | --- | --- | --- | --- |
| UI/Menubar/Default | @base-ui/react | `aria-required-children` off | While a menu is open, Base UI injects a `span[aria-owns]` directly into the `role="menubar"` element. ARIA permits only `menuitem`, `menuitemcheckbox`, `menuitemradio`, and `group` children there. | carina-ds-eng | 2026-11-17 | 2026-08-17 |
| UI/Navigation Menu/Default | @base-ui/react | `aria-hidden-focus` off | Base UI's focus guard spans carry `aria-hidden="true"` together with `tabindex="0"`, so a hidden element remains in the tab order. | carina-ds-eng | 2026-11-17 | 2026-08-17 |
| UI/Combobox/Default | @base-ui/react | `[data-slot="input-group-addon"][aria-hidden="true"]` excluded | When the popup opens, Base UI marks surrounding content `aria-hidden` without removing its focusable children from the tab order. | carina-ds-eng | 2026-11-17 | 2026-08-17 |
| UI/Command/Empty | cmdk | `aria-required-children` off | cmdk renders its empty-state element inside the `role="listbox"` list, which ARIA does not permit as a child. | carina-ds-eng | 2026-11-17 | 2026-08-17 |

## Fixed rather than allowlisted

Recorded so the same findings are not re-triaged.

| Finding | Resolution |
| --- | --- |
| Combobox trigger and clear buttons had no accessible name (`button-name`) | Fixed in the stock layer under the `combobox` entry in `upstream-patches.json` |
| `muted-foreground` on `muted` was 4.34:1 (avatar, aspect-ratio) | `muted-foreground` light darkened to `oklch(0.54 0 0)` in `tokens.json`, now 4.64:1 |
| `destructive` text on the destructive tint was 3.99:1, and at 80% opacity on the background 4.12:1 (button, bubble, attachment) | `destructive` light darkened to `oklch(0.52 0.245 27.325)` in `tokens.json`, now 4.68:1 and 4.64:1 |
