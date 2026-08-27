---
name: template-agent-tooling
description: Skills, rules, hooks, MCP, adapters, and vendor locks
---

# template-agent-tooling

- Form: full
- Invocation: explicit-only
- Audience: maintainer
- Depends on: template-verify

## Triggers
Use this skill for work that matches its boundary. Do not use it for a different owning artifact.

## Non-triggers
If another skill owns the mutation, route there.

## Allowed / forbidden
Allowed: the files and commands required by this workflow.
Forbidden: stock restyles, secret commits, main pushes, unreviewed registries, and policy duplication.

## Policy links
- Process: CONTRIBUTING.md
- Governance: docs/GOVERNANCE.md
- Adoption: docs/ADOPTION.md
- Security: SECURITY.md
- Incidents: docs/INCIDENTS.md

## Workflow
Edit canonical skills/manifest/agent-tooling.json only.
Lock revisions, run agents:sync/check, skills:check, kit:check, and agent:contract.
Never hand-edit generated adapters or .cursor/mcp.json.
