# Design System Agents kit

Portable `ds-*` specialists for a design-system git root. **This repository is the kit only** — no bundled tokens, components, or Storybook. Install onto your design-system repo to bootstrap specialists there.

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
