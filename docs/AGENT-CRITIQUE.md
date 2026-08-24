# Agent critique

Why this pack has an independent **Critique** specialist (`ds-critique`) and which practices it borrows from. Playbooks: `.agents/agents/ds-critique.md`, `references/critique-present.md`, `references/critique.md`, `references/critique-standards.md`.

## Why a separate critic

Bugbot, Security, and Accessibility review **evidence** (bugs, secrets, axe). Critique challenges **decisions**: reuse vs twin, harvest order, missing rationale, self-declared “done.” It runs as an independent hop with a fresh spawn — not self-critique in the producer thread.

## Anthropic

| Source | Claim | Encoded in kit |
| --- | --- | --- |
| [Constitutional AI](https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback) | Generate, critique, and revise are separate; critique uses testable principles with explicit reasoning. | Role rubrics in `critique.md`; `reasoning` before `verdict`; producer revises, critic does not implement. |
| [Building effective agents — evaluator-optimizer](https://www.anthropic.com/engineering/building-effective-agents) | One model writes, another scores against criteria; loop with a stop cap. | Independent `ds-critique` hop after producers; max two rounds then human. |
| [Towards Understanding Sycophancy](https://www.anthropic.com/research/towards-understanding-sycophancy-in-language-models) | Models agree with stated beliefs even when wrong. | Anti-sycophancy: test producer claims against inventory/files; do not echo them. |

## OpenAI

| Source | Claim | Encoded in kit |
| --- | --- | --- |
| [CriticGPT / LLM Critics](https://openai.com/index/finding-gpt-4s-mistakes-with-gpt-4) | Quote spans then comment; human+critic beats either alone; watch hallucinated bugs and nit floods. | Blocking `issue` requires `quote`; precision over recall; nits cannot force `revise`; empty findings on clean hop OK. |
| [Let's Verify Step by Step](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision) | Supervise the process, not only the outcome. | Every numbered rubric item answered in `answers:`; skipped steps fail even if output looks fine. |
| [AI safety via debate](https://openai.com/index/debate) | Critic argues a counter-claim a human can judge. | `alternative` names a competing decision (steelman), not a patch. |

## Review culture

| Source | Claim | Encoded in kit |
| --- | --- | --- |
| [Conventional Comments](https://conventionalcomments.org/) | Labels and blocking decorations make intent parseable. | `issue`, `suggestion`, `question`, `nitpick`, `praise`, `thought` in `critique-present.md`. |
| Google eng-practices | Seek improvement, not perfection; nits don't block merge. | `accept` with only nits/suggestions is valid; `nitpick` cannot force `revise`. |
| Design critique | Observation → impact → option; producer owns the decision. | Finding fields: `observation`, `impact`, `alternative`. |
| Against feedback sandwich | Praise wrappers train people to ignore both. | No sandwich; do not open with praise; false praise forbidden. |

## What we did not copy

- We are **not** training CriticGPT or Constitutional AI weights — this is retrieval plus playbook at inference time.
- Critique is **not** a second Bugbot, Security run, or axe pass.
- The critic **does not implement** the fix or rewrite the component.

## Memory

Critique may store short **lessons** under `.agents/memory/ds-critique/` after human ack (not essays). Pack-agnostic bars live in `critique-standards.md` (kit), not host memory. See [AGENT-MEMORY.md](AGENT-MEMORY.md).
