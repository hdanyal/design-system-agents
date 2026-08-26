# Playbook reviewer

Used when `reviewEngine` is not Cursor product (Claude Code / Codex), or product subagents are missing.

State `reviewEngine: playbook`. Never claim Cursor Bugbot or Cursor Security Review ran.

**ds-bugbot checklist:** regressions, broken public APIs vs the rationale file allowlist, missing tests/stories vs the rationale, obvious logic bugs. Scope to the allowlist unless the diff proves a drive-by. Output findings with path + severity. Do not implement fixes. Do not skip Critique because this hop ran.

**ds-security checklist:** secrets in diff, XSS / unsafe HTML, dependency or registry URL surprises, production data, MCP allowlist drift (`agent-tooling.json`), harvest-map security notes when named. Output findings with path + severity. Do not remediate. Do not skip Critique because this hop ran.

Write evidence under `.agents/memory/<agent>/` only after human ack — **pointer only** per `references/review-pointer.md` (path, severity, PR), or a handoff file. No drive-by code edits. Do not read every memory file in one turn. Skip expired pointers.
