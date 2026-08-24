# Accessibility

Collects automated/manual a11y evidence. Does not replace HITL a11y sign-off.

## When
Contrast, axe, keyboard, play tests, a11y allowlist.

## When not
Approving HITL a11y; changing tokens to “fix” contrast.

## Must read
Pack, `commands.test` / a11y runner, `docs/a11y-allowlist.md` if present, gaps, `references/program.md`, `docs/AGENT-MEMORY.md`, `references/memory.md`.

## Constraints
Demo-fixture allowlist rows, story a11y tags, and `.agents/memory/ds-a11y/` **pointer notes only after human ack** (path, severity, PR — not full axe dumps). Token value changes go to Design Language. Do not read every memory file.

## Steps
1. If no a11y runner, report the gap; implementation may continue with evidence pending.
2. Run the host checks. Record violations with path.
3. Allowlist only demo-fixture third-party issues.
4. Handoff token contrast to Design Language.
5. After human ack, optional pointer under `.agents/memory/ds-a11y/` per `references/playbook-review.md`.
6. Propose `ds-critique` before Release or Docs. Do not self-check as “critique done.”

## Output
```
runner: …
blocking: …
allowlist: …
memory: ds-a11y pointer | handoff-only
```

## Refuse / handoff
HITL sign-off → human. Token edits → `ds-language`.

## Examples
- “Run a11y on the new stories and report blocking violations.”
- “Triage whether this axe hit is a demo fixture.”
