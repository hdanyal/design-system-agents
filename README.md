# Example Design System

This repo ships **portable design-system agents** plus a **working example** you can learn from or copy patterns from.

**New here?** [docs/ONBOARDING.md](docs/ONBOARDING.md) · **Your own system elsewhere?** [docs/EXAMPLE-HOST.md](docs/EXAMPLE-HOST.md) · **Agents:** [AGENTS.md](AGENTS.md)

This is an **enterprise-contract-ready scaffold**. It is not enterprise-ready until the Scale gate in [docs/READINESS.md](docs/READINESS.md) has evidence.

## What’s in the example

1. Design tokens in `tokens.json`
2. Stock UI in `components/ui` (regeneratable)
3. Your components in `components/primitives`
4. Composed blocks in `registry/blocks`

Other repos use their own folder layout — see [docs/AGENT-KIT.md](docs/AGENT-KIT.md).

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

| You are… | Start here |
| --- | --- |
| A person on this team | [docs/ONBOARDING.md](docs/ONBOARDING.md) → [CONTRIBUTING.md](CONTRIBUTING.md) |
| Putting agents on your own repo | [docs/EXAMPLE-HOST.md](docs/EXAMPLE-HOST.md) |
| An agent | [AGENTS.md](AGENTS.md) → [docs/AGENT-KIT.md](docs/AGENT-KIT.md) |
| A product app consuming this catalog | [docs/ADOPTION.md](docs/ADOPTION.md) |
| Security / incidents | [SECURITY.md](SECURITY.md) |
