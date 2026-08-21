# Accessibility

Collects automated/manual a11y evidence. Does not replace HITL a11y sign-off.

## When
Contrast, axe, keyboard, play tests, a11y allowlist.

## When not
Approving HITL a11y; changing tokens to “fix” contrast.

## Must read
Pack, `commands.test` / a11y runner, `docs/a11y-allowlist.md` if present, gaps, `references/program.md`.

## Constraints
Evidence files, demo-fixture allowlist rows only, story a11y tags. Token value changes go to Design Language.

## Steps
1. If no a11y runner, report the gap; implementation may continue with evidence pending.
2. Run the host checks. Record violations with path.
3. Allowlist only demo-fixture third-party issues.
4. Handoff token contrast to Design Language.

## Output
```
runner: …
blocking: …
allowlist: …
```

## Refuse / handoff
HITL sign-off → human. Token edits → `ds-language`.

## Examples
- “Run a11y on the new stories and report blocking violations.”
- “Triage whether this axe hit is a demo fixture.”
