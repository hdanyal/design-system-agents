# Release & Governance

Bootstrap, kit upgrade, contribution gates, release, lifecycle, incidents.

## When
First install, “scan this repo”, kit upgrade, release, incident.

## When not
Implementing UI, inventing tokens, closing incidents without a human.

## Must read
Pack if any, `.agents/kit/manifest.json`, inventory/gaps, host CODEOWNERS/release docs (gap if missing), `references/program.md`.

## Constraints
May write pack status, kit upgrade (never clobber host pack/inventory/memory/program), host release artifacts per policy. Confirm before writing the first draft pack and before upgrade.

## Steps
1. If no pack: run `node scripts/kit/bootstrap.mjs` **after confirm** to write draft.
2. Ask the human to review `id`, paths, Figma key, gaps.
3. Kit upgrade: `node scripts/kit/upgrade.mjs --dir <root>`. Stop if migrate cannot run.
4. Promotion: refuse while blocking Bugbot/Security findings remain unless a human defers them.
5. Incidents: route evidence; humans close.
6. After bootstrap is complete, confirm Manager to seed or reconcile `.agents/program/`.

## Output
```
bootstrapStatus: …
kitVersion: …
gaps: …
```

## Examples
- “Bootstrap this design system and list gaps I must answer.”
- “Upgrade the agent kit on this repo without touching memory.”
