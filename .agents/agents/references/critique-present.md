# Critique presentation

Must read every critique hop. Human reference: [docs/AGENT-CRITIQUE.md](../../../docs/AGENT-CRITIQUE.md).

The critic makes the next owner **able to act**, not soothed. Output is a structured critique, not patches and not a feedback sandwich.

## Tone and order

1. Lead with short **reasoning**, then **verdict**, then the single most important concern. Do not open with praise.
2. List **blocking** findings before non-blocking. Group nits under one `nitpick` root when there are more than a few.
3. Talk about the **artifact**, never the author.
4. Separate **observation** (what is in the file) from **impact** (why it matters) from **alternative** (a competing decision — not a patch).
5. If intent is unclear, use `question:` instead of inventing an `issue:`.
6. Specific `praise:` is optional and never required. False praise is forbidden. **No feedback sandwich.**
7. Cap: at most **7** blocking/issue findings. Group by root cause if more.
8. **`nitpick` cannot force `revise`.** Only blocking `issue` (including automatic-revise rubric fails) can.

## Labels (Conventional Comments)

- `issue` — rubric or kit bar fail. Default **blocking**. Pair with an alternative.
- `suggestion` — improvement, not a rubric fail. Non-blocking.
- `question` — intent unclear. Non-blocking unless required to accept.
- `nitpick` — polish. Always non-blocking.
- `praise` — specific decision worth keeping. Always non-blocking.
- `thought` — forward-looking. Non-blocking.

Do not use `todo` / `chore` to smuggle implementation instructions.

## Blocking issues

Every blocking `issue` must include:

- `observation` — what is in the artifact, with path
- `quote` — verbatim span or `not found`
- `impact` — why it matters (rubric item N)
- `alternative` — named competing decision (debate, not a patch)
- `evidence` — path
- `confidence` — high|medium

No quote → not blocking.

## Anti-sycophancy

Do not echo producer claims (“reuse is impossible”, “critique done”, “review done”). Test against inventory and files. Convincing prose is not evidence.

## Required output shape

```text
subjectAgent: ds-architect
rubric: Architect
round: 1/2
reasoning: <what was checked against which principles>
verdict: accept|revise|refuse
summary: 2–3 sentences. Most important concern first. No praise wrapper.

findings:
  - label: issue
    blocking: yes
    observation: …
    quote: …
    impact: …
    alternative: …
    evidence: …
    confidence: high|medium

answers:
  - 1: pass|fail|not found — <path>
  - … (every numbered rubric item)

working: <optional specific praise, or omit>
proposedLessons: <none | kind/trigger/lesson for later ack>
next: ds-architect | ds-coding | human
```

`revise` requires at least one `issue` with `blocking: yes`. `accept` with only nits/suggestions/praise is valid.

Bad (refuse this style): “Nice work overall, but you should really think about reuse. Also here’s a rewritten component.” That is a sandwich plus a patch.
