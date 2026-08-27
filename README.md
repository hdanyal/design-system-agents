# Design System Agents kit

Portable `ds-*` specialists for a design-system git root. **This repository is the kit only** — no bundled tokens, components, or Storybook. Install onto your design-system repo to bootstrap specialists there.

## Why use these agents

A generic coding assistant will invent components, dump the whole catalog into context, and call itself done. These specialists are **named owners on your catalog**: reuse or enhance before extract, confirm before protected writes, present live Storybook for visual HITL, and keep pack, inventory, memory, and the program board in **git** — not in chat.

They are playbooks at inference time, not a trained “design-system model.” The hops encode published agent and review research:

- **Separate generate, critique, and revise** ([Constitutional AI](https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback); [evaluator-optimizer](https://www.anthropic.com/engineering/building-effective-agents)) — `ds-critique` is an independent hop with a stop cap; the critic does not implement.
- **Anti-sycophancy** ([Towards Understanding Sycophancy](https://www.anthropic.com/research/towards-understanding-sycophancy-in-language-models)) — claims are checked against inventory and files, not echoed.
- **Just-in-time context** ([Effective context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)) — load the smallest high-signal set; memory by exact keys, not embeddings.
- **Process gates, not vibes** ([Let's Verify Step by Step](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision); SWE-agent-style loops) — Architect owns the harvest decision; Coding must show a red→green verify signal it cannot fake.
- **Design-system practice** — component API before internals (Nathan Curtis / EightShapes); Testing Library roles/names; axe evidence is not HITL sign-off.

How that is encoded: [docs/AGENT-CRITIQUE.md](docs/AGENT-CRITIQUE.md) · [docs/AGENT-ARCHITECT-CODING.md](docs/AGENT-ARCHITECT-CODING.md) · [docs/AGENT-MEMORY.md](docs/AGENT-MEMORY.md)

## Install (paste into Cursor or Claude)

Open your design-system repo, then give your agent:

```
Install the Design System Agents kit from <git-url> into this repository.
Follow INSTALL.md at that URL. Clone the kit if needed and keep that clone so later kit updates can be pulled; do not treat it as my design-system working copy.
Then invoke ds-release to run a bootstrap scan. Wait for me to confirm pack id (not "example") and folder paths before any write.
```

Installing from a git URL copies the kit **as it is at that URL right now** into your repo. That copy is a snapshot — it does not stay linked to the kit repo. Later updates need another paste (or a kept clone that you pull).

Full procedure: [INSTALL.md](INSTALL.md)

## Working with specialists

After install, talk to named `ds-*` specialists in **your** design-system repo.

### How to invoke

| Product | How |
| --- | --- |
| Cursor | `/` or the agent picker, or `@ds-*` |
| Claude Code | `/agents` or `@ds-*` |
| Codex | Prefix `ds-*: ` |

Named invoke wins over default chat.

### Right after install

1. Confirm pack id and folder paths when **Release** (`ds-release`) stops.
2. If bootstrap gaps remain, stay with `ds-release`.
3. Once bootstrap is complete (or you are ready for the board), invoke **Manager** (`ds-manager`) to seed the first program board (`.agents/program/`). Release may propose that hop; it must not write the board itself.
4. Specialists wait for yes before protected writes.

### Day to day

Ask `ds-manager` what’s next, or name one specialist for the job. One `ds-*` owner per request. Do not ask the same write in two products on one branch.

| Specialist | Ask when |
| --- | --- |
| `ds-manager` | Task board, what’s next, organize gaps |
| `ds-release` | Bootstrap, kit upgrade, release, incident |
| `ds-prototype` | Explore a named view in the sandbox |
| `ds-architect` | Reuse, enhance, or extract a component? |
| `ds-coding` | Implement an approved change |
| `ds-docs` | USAGE / story prose |
| `ds-language` | Tokens / branding |
| `ds-a11y` | axe / contrast |
| `ds-critique` | Decision quality |
| `ds-bugbot` | PR bugs |
| `ds-security` | Security review |

Full reference: [AGENTS.md](AGENTS.md) · [docs/AGENT-KIT.md](docs/AGENT-KIT.md)

## Kit contributors

```bash
pnpm install
pnpm agents:sync
pnpm verify
```

- Agent reference: [docs/AGENT-KIT.md](docs/AGENT-KIT.md)
- Contributing: [CONTRIBUTING.md](CONTRIBUTING.md)
