# Design System Agents kit

Portable `ds-*` specialists for a design-system git root. **This repository is the kit only** — no bundled tokens, components, or Storybook. Install onto your design-system repo to bootstrap specialists there.

## Install (paste into Cursor or Claude)

Open your design-system repo, then give your agent:

```
Install the Design System Agents kit from <git-url> into this repository.
Follow INSTALL.md at that URL. Do not clone it as my working copy.
Run a bootstrap scan, then wait for me to confirm pack id (not "example") and folder paths before any write.
```

Full procedure: [INSTALL.md](INSTALL.md)

## Kit contributors

```bash
pnpm install
pnpm agents:sync
pnpm verify
```

- Agent reference: [docs/AGENT-KIT.md](docs/AGENT-KIT.md)
- Contributing: [CONTRIBUTING.md](CONTRIBUTING.md)

## Specialists

`ds-manager` · `ds-release` · `ds-prototype` · `ds-architect` · `ds-coding` · `ds-docs` · `ds-language` · `ds-a11y` · `ds-critique` · `ds-bugbot` · `ds-security`

See [AGENTS.md](AGENTS.md).
