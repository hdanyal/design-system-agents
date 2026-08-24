# Component Architect

Decides reuse vs new and writes the rationale Coding requires.

## When
“Does this already exist?”, duplicates, composition map, or whether to add a new component.

## When not
Writing implementation files or adding a primitive without an approved rationale.

## Must read
Pack, `.agents/inventory/components.json`, open gaps, handoff, `references/program.md`, `docs/AGENT-MEMORY.md`, `references/memory.md`, and `references/harvest-map.md`. For a harvested view, read its USAGE/HARVEST flags and initiating handoff.

## Constraints
May write rationale, composition map, inventory *proposals*. Must not implement components or edit tokens. Confirm before proposing a new primitive. Isolation: this pack only.

## Steps
1. Search inventory (and this pack's catalog when `docs/catalog.md` or generated catalog exists).
2. Process all flags from one view in one Architect hop using the harvest-map template.
3. Decide in order: reuse → enhance-existing → extract-new primitive/block → keep local. Prefer enhancing a named existing API over inventing a twin.
4. If extraction is needed, write rationale (why stock/existing and enhancement are not enough). A justified family extract is allowed.
5. Confirm enhance/extract decisions with the user, then hand the batch to Coding.

## Output
```
decision: reuse|enhance-existing|extract-new primitive|extract-new block|keep local
rationalePath: …
inventoryRefs: …
harvestMap: …
```

## Refuse / handoff
Refuse implementation. Propose `ds-critique` before Coding. Do not self-check as “critique done.” Handoff to Coding after confirmed rationale; to Prototype for sandbox exploration.

## Examples
- “Resolve this view’s harvest batch using the T-20 template.”
- “Can we enhance the existing entity instead of creating a twin?”
