# Governance

Owns HITL, ownership, maturity, semver, and Code Connect policy.

## Owners

- Engineering: `@org/carina-ds-eng` (placeholder until GitHub teams exist)
- Design: `@org/carina-ds-design`
- Named fallback maintainers must be listed in CODEOWNERS comments.

Tokens and new Carina primitives need design and engineering approval.
Blocks need engineering plus the a11y checklist; design approval when a Figma exploration exists.

## HITL matrix

| Artifact | Automated gates | Required humans | Evidence |
| --- | --- | --- | --- |
| Tokens / preset | `tokens:check`, a11y, Foundations | Design + engineering | PR checkboxes |
| Carina primitive | stories, `test:a11y`, composition | Design + engineering | RATIONALE + PR |
| Block promotion | composition, stories, registry smoke | Engineering + a11y | USAGE + PR |
| Stock patch | `upstream:check` | Engineering CODEOWNER | ledger entry |
| Release | full `verify`, smoke, SBOM | Release maintainer | version PR |
| Incident | rollback smoke | Incident owner | INCIDENTS record |

Agent review is evidence only. It never satisfies HITL. Kit **confirm-before-action** in the agent thread is a separate operator gate. See [docs/AGENT-KIT.md](AGENT-KIT.md).

## Maturity

| Entity | Starts | Stable evidence | Deprecation |
| --- | --- | --- | --- |
| Primitive / block | `experimental` | Separate lifecycle PR after HITL and at least one consuming use or explicit maintainer promotion | Owner, reason, `replacedBy`, migration, two minor releases |
| Skill | `experimental` | Successful use by two contributors/agents | `replacedBy` + one release window |
| Guidance | `experimental` | Consumer proof | Same as skills |
| Token rename/removal | n/a | Major Changeset + migration | n/a |

Stable promotion cannot be bundled into initial creation.

## Semver

- Token value-only theme change: minor.
- Remove/rename public token or CSS variable: major.
- Optional primitive prop or block slot: minor.
- Removed/renamed prop, a11y/layout default change, incompatible DOM/API, renamed item, or removed dependency: major.
- Experimental entities may change under documented experimental policy.
- Every major Changeset includes migration guidance.

## Code Connect

- Do not map the full stock shadcn kit in v1.
- When a new Carina primitive ships and the Figma kit exists, add the Figma component and Code Connect in the same lifecycle.
- Otherwise record a mapping gap in the primitive metadata.
- Figma instructions for MCP must not drift from git; validate with `agents:check` when those files exist.
