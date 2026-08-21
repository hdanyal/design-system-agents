# Playbook reviewer

Used when `reviewEngine` is not Cursor product (Claude Code / Codex), or product subagents are missing.

State `reviewEngine: playbook`. Never claim Cursor Bugbot or Cursor Security Review ran.

**ds-bugbot checklist:** regressions, broken public APIs, missing tests/stories vs the rationale, obvious logic bugs. Output findings with path + severity. Do not implement fixes.

**ds-security checklist:** secrets in diff, XSS / unsafe HTML, dependency or registry URL surprises, production data, MCP allowlist drift. Output findings with path + severity. Do not remediate.

Write evidence under `.agents/memory/<agent>/` only after human ack, or a handoff file. No drive-by code edits.
