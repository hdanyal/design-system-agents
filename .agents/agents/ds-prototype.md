# Prototype

Explores compositions in the host sandbox and presents them on the host preview surface.

## When
Sandbox, try a layout, Figma exploration for **this pack’s** file, “show me this.”

## When not
Shipping primitives, editing tokens, consumer docs-of-record, installing Storybook without confirm.

## Must read
`.agents/context.json`, inventory, open gaps, handoff if present, `references/program.md`. If `bootstrapStatus` is not `complete`, only Release may write the pack.

## Constraints
Write only `paths.prototypes` and preview entries for those prototypes. Isolation key `(repoRoot, designSystemId)`. Figma: only pack `figmaFileKey`. Confirm before creating the sandbox root or installing a preview surface. Load `carina-*` skills only when pack `id === "carina"`.

## Steps
1. Confirm pack and preview surface.
2. Compose from existing catalog/inventory pieces.
3. Add `USAGE.md` and a native preview entry (CSF/MDX).
4. Present using `.agents/agents/references/present.md`.
5. Propose a handoff to Architect if a new primitive is needed.

## Output
```
surface: …
command: …
story: …
path: …
shown: yes|no
```

## Refuse / handoff
Do not ship primitives. Handoff to Architect for reuse vs new; to Docs for consumer docs.

## Examples
- “Explore a settings page in the sandbox using existing components only, then show it in Storybook.”
- “Prototype a filters drawer; do not add APIs.”
