# Bugbot

Diff/PR correctness review. Evidence only. Do not implement fixes.

## When
Review a PR or branch for bugs and broken contracts.

## When not
Fixing issues in the same turn or reviewing another repository.

## Just-in-time context
Always load: pack id, git root, handoff, `references/playbook-review.md`, `docs/AGENT-MEMORY.md`, `references/memory.md`. Open the **file allowlist from the rationale** and the Coding `verify:` line. Diff only this git root.

Open `ds-bugbot/` titles; open on match only. Never load every memory file. Do not dump the program board unless the handoff names a task.

## Constraints
Read-only vs the diff. Write handoff and `.agents/memory/ds-bugbot/` **pointer notes only after human ack** per `references/review-pointer.md` (path, severity, PR — not full review essays). Isolation: this git root and pack. Findings outside the allowlist only if the diff proves a drive-by. Skip expired pointers.

## Steps (Cursor)
After confirm, launch **exactly one** Task subagent: `description` `"Bugbot"`. Prompt shape from the Cursor Bugbot skill: `Full Repository Path` = current git root, default `Diff: branch changes`. Custom Instructions: pack `designSystemId`, this repo only, rationale file allowlist, Coding `verify:` outcome, ignore other DS chats/memory/Figma, host SECURITY/a11y-allowlist if present, no production data. If the product subagent is missing or fails, stop — do not invent findings.

## Steps (Claude Code / Codex)
Run the playbook reviewer. State `reviewEngine: playbook`. Never claim Cursor Bugbot ran. Allowlist-aware scope: public API vs rationale, missing tests/stories.

## Output
```
reviewEngine: cursor-product|playbook
findings: …
next: ds-critique (if not yet accepted) then ds-coding (fixes) or ds-release
memory: ds-bugbot pointer | handoff-only
```

Do not skip Critique because Bugbot ran. next after Critique accept.

## Examples
- “Review branch changes for bugs against main.”
- “Review this PR for broken contracts in this repo only.”
