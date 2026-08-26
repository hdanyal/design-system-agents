# Agent Architect and Coding

**Reuse vs new, then prove the implementation.** Architect decides; Coding implements with a verification signal it cannot fake. Neither replaces Critique, Bugbot, Security, or a11y HITL.

Playbooks: `.agents/agents/ds-architect.md`, `.agents/agents/ds-coding.md`, `references/harvest-map.md`, `references/present.md`, `references/architect-lesson.md`, `references/coding-lesson.md`. Skills: `example-compose`, `example-extend-ui`, `example-stories`, `example-verify`.

## Why separate owners

Architect owns the decision surface (inventory match, twin risk, API contract). Coding owns the file allowlist and the red→green loop. Mixing them invites “looks done” without ground truth.

## Anthropic / harness

| Source | Claim | Encoded in kit |
| --- | --- | --- |
| [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) | Ground truth from the environment; invest in the agent-computer interface; keep it simple; show the plan. | Harvest search protocol; rationale file allowlist; Coding verify step; Critique hop before Bugbot. |
| [Effective context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) | Smallest high-signal token set; just-in-time load by path. | JIT must-read; inventory as index; shortlist ≤3; memory title index then open on match. |
| [Claude Code best practices](https://code.claude.com/docs/en/best-practices) | Lean standing instructions; isolate investigation. | Lean playbooks; skills hold standing a11y/story rules; no corpus dump. |
| SWE-agent (NeurIPS 2024) / 2026 harness writing | Test execution is the loop signal; a loop without a fake-proof gate is not an agent. | Red tests before green; `pnpm verify:fast` required in Coding output. |

## Design systems

| Source | Claim | Encoded in kit |
| --- | --- | --- |
| Nathan Curtis / EightShapes — component API | Spec anatomy, properties, layout before internals. | RATIONALE template sections; harvest `api delta` / files Coding may write. |
| This pack [ADR 0001](adr/0001-layer-model.md) | Tokens / stock UI / primitives / blocks stay separate. | Prefer wrap stock; no `paths.ui` forks without upstream-patches. |
| Components as data | Match on exports/variants/slots, not folklore. | Source-inspect shortlist; match confidence `exact` \| `near` \| `none`. |

## Frontend / a11y

| Source | Claim | Encoded in kit |
| --- | --- | --- |
| W4A / a11y-loop research | Accessibility-oriented prompts barely help without a loop. | Standing generation rules + error/play stories in Coding; `ds-a11y` remains evidence/HITL. |
| Storybook MCP practice | Two-stage hydration: list, then load docs for the shortlist. | Inventory index → open shortlist sources; no catalog dump. |
| Testing Library | Assert roles, names, keyboard — not class strings. | Coding red step and `example-stories`. |

## Memory that scales

| Source | Claim | Encoded in kit |
| --- | --- | --- |
| Context engineering + [AGENT-MEMORY.md](AGENT-MEMORY.md) | Persist high-signal notes; retrieve on match; do not grow the standing prompt. | Shared catalog facts via Docs; Architect/Coding lessons after ack; propose not write in decision/impl turn; open on match only; exact-key `memory-index --match` (no embedding RAG — PoisonedRAG / OWASP LLM08). |

## What we did not copy

- We are **not** training A11yn or other weights — retrieval plus playbook at inference time.
- No Storybook MCP or extra MCP servers in this slice (shadcn allowlist only); two-stage hydration is playbook.
- Coding is **not** a11y HITL; Critique is **not** self-checked by producers.
- No restored composition-map artifact, overnight orchestrators, or dumping every memory file “for context.”
- No embedding / vector search over `.agents/memory/` — exact frontmatter keys only.

## Pipeline consumers

Handoffs must be self-contained ([`references/handoffs.md`](../.agents/agents/references/handoffs.md)): Prototype flags include `match confidence`; Architect passes `files Coding may write` and token-hole rows; Coding passes `verify:`, play-test story ids, `shown: yes|no`, and a catalog-fact **proposal** path. A11y and Bugbot/Security scope to those ids/allowlist. Manager `recommendedNext` follows hop state (flags vs map vs confirm vs Critique vs Docs). Critique loads this page only when `subjectAgent` is Architect or Coding.

## Evals

- Playbook phrases locked in `tests/agent-contract/ds-kit.test.ts` across harness adapters.
- Harvest decision fixtures in `.agents/kit/harvest-eval.json` (expected decisions; not a live LLM judge).
