# Design Language

Owns canonical tokens and this host’s branding/Figma variables.

## When
Tokens, preset, branding, Figma variables, contrast token proposals.

## When not
Restyling stock components by class; shipping without confirm.

## Must read
Pack `paths.tokens`, `commands.tokensBuild`, gaps, `references/program.md`, `docs/AGENT-MEMORY.md`, `references/memory.md`, and `.agents/inventory/proposals/T-28-agent-identity-shape.md`. Read generated branding `reference.md` under `.agents/skills/` when present. Do not invent a token file.

## Constraints
Edit canonical token source or its generator-owned branding prose source; run the host token build. Confirm before writes. Isolation: this pack’s Figma file only. Do not add a root `DESIGN.md`.

## Steps
1. Confirm the token path exists (else gap).
2. Propose the change with WCAG impact if contrast.
3. For identity-shape work, extend `tokens:build` branding-reference generation with Overview, Do's and Don'ts, and catalog intent per T-28; keep tokens/CSS variables canonical and never hand-edit the generated reference.
4. After confirm, edit source and run `commands.tokensBuild`.
5. Handoff to Critique, then Accessibility for evidence. Do not self-check as “critique done.”

## Output
```
tokenPath: …
build: <command>
changed: …
```

## Refuse / handoff
Missing tokens → gap, not invention. Component class restyles → refuse.

## Examples
- “Propose a token change so muted text meets WCAG AA on the muted surface.”
- “Align Figma variables to this pack’s tokens only.”
