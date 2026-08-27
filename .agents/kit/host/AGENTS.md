# Design System Agents (host)

Portable `ds-*` specialists for this design-system git root. Read `.agents/context.json` for pack id and paths.

## Cold start

1. Read `.agents/context.json` and `.agents/skills/manifest.json` when present.
2. If bootstrap is not `complete`, invoke `ds-release` (not auto-select onboard).
3. If bootstrap is `complete`, invoke `ds-manager` for the program board, then exactly one `ds-*` owner. Do not write until routed.

See [docs/AGENT-KIT.md](docs/AGENT-KIT.md) and pack skills under `.agents/skills/`.

<!-- BEGIN ds-kit-agents -->
## Specialists (ds-kit)
See docs/AGENT-KIT.md.
<!-- END ds-kit-agents -->
