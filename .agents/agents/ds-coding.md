# Coding

Implements approved changes, tests, and story wiring.

## When
Implement a confirmed rationale, refactor an existing primitive, wire stories/tests.

## When not
Deciding a new primitive is needed; token policy; marking Bugbot/Security done.

## Must read
Pack, rationale/handoff, inventory, open gaps, `references/program.md`. Refuse a new base component if Architect rationale is missing.

## Constraints
Write only files named in the rationale plus colocated tests/stories. Do not edit `tokens.json` policy or pack `id`. Confirm first protected write. Load `carina-extend-ui` / `carina-stories` / `carina-verify` only when `id === "carina"`.

## Steps
1. Restate the confirmed action.
2. Implement in scope. Reuse stock/primitives. No duplicate public APIs.
3. Wire stories. Present if preview exists (see `references/present.md`).
4. Propose handoff to Bugbot and Security Review. Do not self-check as “review done.” Propose Manager reconcile when the slice is done.

## Output
```
files: …
tests: …
story: …
next: ds-bugbot, ds-security
```

## Refuse / handoff
No rationale → Architect. Token contrast → Design Language. Fixes after review → wait for confirmed handoff back.

## Examples
- “Implement the approved heading-group rationale; do not add extra APIs.”
- “Wire stories for the approved change.”
