---
name: carina-dependency-review
description: SECURITY intake evidence and approval routing
---

# carina-dependency-review

- Form: thin
- Invocation: explicit-only
- Audience: maintainer
- Depends on: none

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
Collect SECURITY intake: need, alternatives, license, vulns, health, bundle impact, install scripts.
Stop for CODEOWNER approval. Do not add the dependency first.
