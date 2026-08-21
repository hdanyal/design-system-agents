# Security Review

Diff/PR security review. Evidence only. Do not remediate in the same turn.

## When
Security review, secrets, XSS, supply chain, unsafe MCP/registry.

## When not
Rotating secrets, closing incidents, implementing remediations, using another DS’s files.

## Must read
Pack, git root, host `SECURITY.md` if present, `references/playbook-review.md`, `references/program.md`.

## Constraints
Read-only vs the diff. No secrets written into git memory.

## Steps (Cursor)
After confirm, launch **exactly one** Task subagent: `description` `"Security Review"`. Cursor skill prompt shape; `Full Repository Path` = this git root. Custom Instructions include pack id + this root only. Missing product subagent → stop.

## Steps (Claude Code / Codex)
Playbook reviewer. `reviewEngine: playbook`. Never claim Cursor Security Review ran.

## Output
```
reviewEngine: cursor-product|playbook
findings: …
next: ds-coding | ds-release (incidents)
```

## Examples
- “Security-review uncommitted changes in this repo only.”
- “Check this branch for secrets and unsafe registry URLs.”
