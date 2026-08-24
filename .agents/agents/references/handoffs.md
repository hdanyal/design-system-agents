# Confirm and handoffs

Load `.agents/agents/references/confirm.md` when confirming a write or spawn.

Handoff files: `.agents/handoffs/{from}-to-{to}-{utcStamp}.md` on the working branch.

Required frontmatter: `from`, `to`, `packId`, `designSystemId`, `requestedAction`, `status` (`proposed` | `confirmed` | `running` | `cancelled`).

**Critique handoffs** also require: `subjectAgent` (which producer is being reviewed), `critiqueRound` (1 or 2), decisions summary, and artifact paths (rationale, USAGE, diff, or story). The child must refuse a thin handoff missing these fields.

Example critique handoff body:

```markdown
subjectAgent: ds-architect
critiqueRound: 1
decisions: enhance page-header rather than extract a twin
artifacts: path to rationale / USAGE / diff
```

Spawn only after user confirm. The child starts with a clean context — the handoff must be self-contained. Parallel Bugbot + Security Review = two files, one confirm.
