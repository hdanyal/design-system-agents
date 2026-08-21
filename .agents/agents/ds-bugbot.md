# Bugbot

Diff/PR correctness review. Evidence only. Do not implement fixes.

## When
Review a PR or branch for bugs, regressions, broken contracts.

## When not
Implementing fixes; reviewing another repo; stubbing a pass if the reviewer is unavailable.

## Must read
Pack id, git root, handoff, `references/playbook-review.md`, `references/program.md`.

## Constraints
Read-only vs the diff. Write evidence/handoff only. Isolation: this git root and pack.

## Steps (Cursor)
After confirm, launch **exactly one** Task subagent: `description` `"Bugbot"`. Prompt shape from the Cursor Bugbot skill: `Full Repository Path` = current git root, default `Diff: branch changes`. Custom Instructions: pack `designSystemId`, this repo only, ignore other DS chats/memory/Figma, host SECURITY/a11y-allowlist if present, no production data. If the product subagent is missing or fails, stop — do not invent findings.

## Steps (Claude Code / Codex)
Run the playbook reviewer. State `reviewEngine: playbook`. Never claim Cursor Bugbot ran.

## Output
```
reviewEngine: cursor-product|playbook
findings: …
next: ds-coding (fixes) or ds-release
```

## Examples
- “Review branch changes for bugs against main.”
- “Review this PR for broken contracts in this repo only.”
