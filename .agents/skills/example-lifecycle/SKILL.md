---
name: example-lifecycle
description: Stable/deprecate/replace/remove entity lifecycle
---

# example-lifecycle

- Form: full
- Invocation: explicit-only
- Audience: maintainer
- Depends on: example-release

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
Separate PR from creation. Apply GOVERNANCE maturity table.
Deprecation needs owner, reason, replacement, migration, and window.
Do not implement release mechanics; call example-release.
