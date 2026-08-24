# Example Design System

This git root ships the portable **`ds-*` agent kit** plus an **example design system** (pack `id: example`) so you can run the specialists against a real catalog. Use the example as a scaffold, or install the kit on another git root and replace it with your own system — [docs/EXAMPLE-HOST.md](docs/EXAMPLE-HOST.md).

**New here?** Humans: [docs/ONBOARDING.md](docs/ONBOARDING.md). Agents: [AGENTS.md](AGENTS.md). Kit install: [docs/AGENT-KIT.md](docs/AGENT-KIT.md).

This repository is an **enterprise-contract-ready scaffold**. It is not enterprise-ready until the Scale gate in [docs/READINESS.md](docs/READINESS.md) has objective evidence.

## Layers (this pack)

Resolved from `.agents/context.json` `paths`. Other hosts use their own pack paths — see [docs/AGENT-KIT.md](docs/AGENT-KIT.md).

1. Canonical tokens in `tokens.json`
2. Regeneratable stock UI in `components/ui`
3. Host primitives in `components/primitives`
4. Blocks in `registry/blocks`

## Start

```bash
pnpm install
pnpm tokens:build
pnpm catalog
pnpm agents:sync
pnpm storybook
```

## Verify

```bash
pnpm verify:fast
pnpm verify
```

## Docs

Full map: [docs/README.md](docs/README.md)

| Audience | Start here |
| --- | --- |
| Humans | [docs/ONBOARDING.md](docs/ONBOARDING.md) → [CONTRIBUTING.md](CONTRIBUTING.md) |
| Kit vs this example catalog | [docs/EXAMPLE-HOST.md](docs/EXAMPLE-HOST.md) |
| Agents | [AGENTS.md](AGENTS.md) → [docs/AGENT-KIT.md](docs/AGENT-KIT.md) |
| Consumers | [docs/ADOPTION.md](docs/ADOPTION.md) |
| Security | [SECURITY.md](SECURITY.md) |
