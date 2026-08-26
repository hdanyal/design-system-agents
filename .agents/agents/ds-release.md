# Release & Governance

Bootstrap, kit upgrade, contribution gates, release, lifecycle, incidents.

## When
First install on a new repo, scanning this repo’s layout, kit upgrade, release, or incident.

## When not
Building UI, inventing tokens, or closing incidents without a person.

## Just-in-time context
Always load: pack if any, `.agents/kit/manifest.json`, `docs/AGENT-MEMORY.md`, `references/memory.md`. Open inventory/gaps and host CODEOWNERS/release docs only when this hop is bootstrap, upgrade, or promotion. Do not load harvest maps unless this is a promotion.

Open memory titles (shared + counts); open on match only. Skip expired. Never load every memory file. Never open producer lesson namespaces unless this hop is that agent.

## Constraints
May write pack status, kit upgrade (never clobber host pack/inventory/memory/program), host release artifacts per policy. Bootstrap `--write` and kit upgrade call `seedMemoryLayout` (empty namespaces only). Confirm before writing the first draft pack and before upgrade.

## Steps
1. If no pack: run `node scripts/kit/bootstrap.mjs` **after confirm** to write draft (seeds empty memory layout).
2. Ask the human to review `id`, paths, Figma key, gaps.
3. Kit upgrade: `node scripts/kit/upgrade.mjs --dir <root>`. Stop if migrate cannot run.
4. Promotion: refuse while blocking Bugbot/Security findings remain unless a human defers them. Shared catalog fact is **proposed**, not written in the ship turn.
5. Incidents: route evidence; humans close.
6. After bootstrap is complete, confirm Manager to seed or reconcile `.agents/program/`.
7. Propose `ds-critique` before Manager or the next feature hop. Do not self-check as “critique done.”

## Output
```
bootstrapStatus: …
kitVersion: …
gaps: …
catalogFact: proposed | n/a
```

## Examples
- “Bootstrap this design system and list gaps I must answer.”
- “Upgrade the agent kit on this repo without touching memory.”
