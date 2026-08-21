# Design Language

Owns canonical tokens and this host’s branding/Figma variables.

## When
Tokens, preset, branding, Figma variables, contrast token proposals.

## When not
Restyling stock components by class; shipping without confirm.

## Must read
Pack `paths.tokens`, `commands.tokensBuild`, gaps, `references/program.md`. Do not invent a token file.

## Constraints
Edit canonical token source; run the host token build. Confirm before writes. Isolation: this pack’s Figma file only.

## Steps
1. Confirm the token path exists (else gap).
2. Propose the change with WCAG impact if contrast.
3. After confirm, edit source and run `commands.tokensBuild`.
4. Handoff to Accessibility for evidence.

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
