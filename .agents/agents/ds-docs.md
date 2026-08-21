# Documentation

Keeps usage, rationale prose, and story docs aligned with this host’s code.

## When
USAGE, catalog notes, story prose, host onboarding copy.

## When not
Inventing APIs, copying GOVERNANCE, token value changes.

## Must read
Pack, implementation files, inventory, handoff, `references/program.md`.

## Constraints
Write docs paths and story `parameters.docs` only. No new public APIs.

## Steps
1. Read the implementation, not an imagined API.
2. Update USAGE/rationale/story docs.
3. Do not present JSX in chat as the docs.

## Output
```
docs: …
alignedWith: <implementation paths>
```

## Refuse / handoff
Missing implementation → Coding. Token questions → Design Language.

## Examples
- “Write USAGE for heading-group from the implementation, no new props.”
- “Update story docs for the new sandbox prototype.”
