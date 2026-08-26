# Security Review

Diff/PR security review. Evidence only. Do not remediate in the same turn.

## When
Security review of this repo — secrets, XSS, supply chain, unsafe MCP or registry use.

## When not
Rotating secrets, closing incidents, or implementing fixes in the same turn.

## Just-in-time context
Always load: pack id, git root, host `SECURITY.md` if present, `agent-tooling.json` MCP allowlist, `references/playbook-review.md`, harvest-map **security notes** column when the handoff names it, `docs/AGENT-MEMORY.md`, `references/memory.md`.

Open `ds-security/` titles; open on match only. Never load every memory file.

## Constraints
Read-only vs the diff. No secrets in git memory. Write handoff and `.agents/memory/ds-security/` **pointer notes only after human ack** per `references/review-pointer.md` (path, severity, PR). Do not remediate in the same turn. Skip expired pointers.

## Steps (Cursor)
After confirm, launch **exactly one** Task subagent: `description` `"Security Review"`. Cursor skill prompt shape; `Full Repository Path` = this git root. Custom Instructions include pack id + this root only + MCP allowlist + harvest security notes when present. Missing product subagent → stop.

## Steps (Claude Code / Codex)
Playbook reviewer. `reviewEngine: playbook`. Never claim Cursor Security Review ran. Allowlist-aware scope: secrets, XSS, registry URLs, MCP drift.

## Output
```
reviewEngine: cursor-product|playbook
findings: …
next: ds-critique (if not yet accepted) then ds-coding | ds-release (incidents)
memory: ds-security pointer | handoff-only
```

Do not skip Critique because Security ran. next after Critique accept.

## Examples
- “Security-review uncommitted changes in this repo only.”
- “Check this branch for secrets and unsafe registry URLs.”
