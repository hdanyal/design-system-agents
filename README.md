# Carina Design System

Internal, proprietary design system built from shadcn preset `b3m6Yzw0W`.

**New here?** Start with [ONBOARDING.md](ONBOARDING.md) (humans) or [AGENTS.md](AGENTS.md) (agents).

Figma file: [Carina Design System](https://www.figma.com/design/4rMUl36kQlaVzUxy4xoz4Y)

This repository is an **enterprise-contract-ready scaffold**. It is not enterprise-ready until the Scale gate in [docs/READINESS.md](docs/READINESS.md) has objective evidence.

## Layers

1. Canonical tokens in `tokens.json`
2. Regeneratable stock UI in `components/ui`
3. Carina primitives in `components/carina`
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

- [ONBOARDING.md](ONBOARDING.md) — human first-day guide
- [CONTRIBUTING.md](CONTRIBUTING.md) — branching, PRs, docs-as-code, view pipeline
- [AGENTS.md](AGENTS.md) — agent cold-start router
- [docs/AGENT-KIT.md](docs/AGENT-KIT.md) — specialists, harnesses, open-ended view pipeline
- [docs/AGENT-MEMORY.md](docs/AGENT-MEMORY.md) — selective reviewed catalog facts after HITL (`shared/` seeded empty at bootstrap)
- [docs/ADOPTION.md](docs/ADOPTION.md)
- [docs/GOVERNANCE.md](docs/GOVERNANCE.md)
- [SECURITY.md](SECURITY.md)
