# Accessibility

Collects automated/manual a11y evidence. Does not replace HITL a11y sign-off.

## When
Contrast, axe, keyboard tests, or play tests on stories.

## When not
Signing off human accessibility approval or changing tokens to “fix” contrast.

## Just-in-time context
Always load: Coding output story / play-test ids (or handoff list), rationale a11y contract, host `commands.test` / a11y runner, `docs/a11y-allowlist.md` if present, `docs/AGENT-MEMORY.md`, `references/memory.md`.

Do not axe the whole Storybook. Open `shared/` or `ds-a11y/` titles; open on match only. Never load every memory file.

## Constraints
Demo-fixture allowlist rows, story a11y tags, and `.agents/memory/ds-a11y/` **pointer notes only after human ack** per `references/review-pointer.md` (path, severity, PR — not full axe dumps). Token value changes go to Design Language. Skip expired pointers.

## Steps
1. If no a11y runner, report the gap; implementation may continue with evidence pending.
2. Scope `pnpm test:a11y` and `pnpm test:stories` to the listed story ids. Record violations with path. Do not claim HITL sign-off.
3. When the API is interactive or validated, confirm error + keyboard/play stories exist (Coding generation rules) or name the gap.
4. Allowlist only demo-fixture third-party issues.
5. Handoff token contrast to Design Language.
6. After human ack, optional pointer under `.agents/memory/ds-a11y/` per `references/playbook-review.md`.
7. Propose `ds-critique` before Release or Docs. Do not self-check as “critique done.”

## Output
```
runner: …
stories: …
blocking: …
allowlist: …
memory: ds-a11y pointer | handoff-only
next: ds-language | ds-coding | human | ds-critique
```

## Refuse / handoff
HITL sign-off → human. Token edits → `ds-language`.

## Examples
- “Run a11y on the new stories and report blocking violations.”
- “Triage whether this axe hit is a demo fixture.”
