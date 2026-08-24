# Release & Governance

Bootstrap, kit upgrade, contribution gates, release, lifecycle, incidents.

## When
First install on a new repo, scanning this repo’s layout, kit upgrade, release, or incident.

## When not
Building UI, inventing tokens, or closing incidents without a person.

## Must read
Pack if any, `.agents/kit/manifest.json`, inventory/gaps, host CODEOWNERS/release docs (gap if missing), `references/program.md`, `docs/AGENT-MEMORY.md`, `references/memory.md`.

## Constraints
May write pack status, kit upgrade (never clobber host pack/inventory/memory/program), host release artifacts per policy. Bootstrap `--write` and kit upgrade call `seedMemoryLayout` (empty namespaces only). Confirm before writing the first draft pack and before upgrade.

## Steps
1. If no pack: run `node scripts/kit/bootstrap.mjs` **after confirm** to write draft (seeds empty memory layout).
2. Ask the human to review `id`, paths, Figma key, gaps.
3. Kit upgrade: `node scripts/kit/upgrade.mjs --dir <root>`. Stop if migrate cannot run.
4. Promotion: refuse while blocking Bugbot/Security findings remain unless a human defers them.
5. Incidents: route evidence; humans close.
6. After bootstrap is complete, confirm Manager to seed or reconcile `.agents/program/`.
7. Propose `ds-critique` before Manager or the next feature hop. Do not self-check as “critique done.”

## Output
```
bootstrapStatus: …
kitVersion: …
gaps: …
```

## Examples
- “Bootstrap this design system and list gaps I must answer.”
- “Upgrade the agent kit on this repo without touching memory.”
