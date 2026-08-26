# Confirm and handoffs

Load `.agents/agents/references/confirm.md` when confirming a write or spawn.

Handoff files: `.agents/handoffs/{from}-to-{to}-{utcStamp}.md` on the working branch.

Required frontmatter: `from`, `to`, `packId`, `designSystemId`, `requestedAction`, `status` (`proposed` | `confirmed` | `running` | `cancelled`).

The child starts with a clean context — the handoff must be self-contained. Parallel Bugbot + Security Review = two files, one confirm. Spawn only after user confirm.

## Prototype → Architect

Include harvest table path. Each flag: candidate enum + inventory hint + `match confidence` (`exact` | `near` | `none`).

## Architect → Coding / Language

Include harvest-map path, `files Coding may write` for extract/enhance rows, and named **token-hole** rows for Language (or `none`).

## Coding → Critique / Bugbot / A11y / Docs

Include `verify:` command + outcome, play-test story ids, `shown: yes|no`, and catalog-fact **proposal** path (not a written `shared/` file). File allowlist from the rationale for Bugbot.

## Critique handoffs

Also require: `subjectAgent` (which producer is being reviewed), `critiqueRound` (1 or 2), decisions summary, and artifact paths (rationale, USAGE, diff, or story). The child must refuse a thin handoff missing these fields. Load `docs/AGENT-ARCHITECT-CODING.md` only when `subjectAgent` is `ds-architect` or `ds-coding`.

Example critique handoff body:

```markdown
subjectAgent: ds-architect
critiqueRound: 1
decisions: enhance page-header rather than extract a twin
artifacts: path to rationale / USAGE / diff
```
