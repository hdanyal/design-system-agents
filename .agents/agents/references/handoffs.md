# Confirm and handoffs

Load `.agents/agents/references/confirm.md` when confirming a write or spawn.

Handoff files: `.agents/handoffs/{from}-to-{to}-{utcStamp}.md` on the working branch.

Required frontmatter: `from`, `to`, `packId`, `designSystemId`, `requestedAction`, `status` (`proposed` | `confirmed` | `running` | `cancelled`).

Spawn only after user confirm. The child starts with a clean context — the handoff must be self-contained. Parallel Bugbot + Security Review = two files, one confirm.
