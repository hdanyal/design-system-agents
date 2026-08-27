# Design System Agents (kit source)

This checkout is the **portable agent kit**, not a design-system host. There is no pack `context.json` here.

## Cold start (kit contributors)

1. Read [docs/AGENT-KIT.md](docs/AGENT-KIT.md) and [CONTRIBUTING.md](CONTRIBUTING.md).
2. Run `pnpm install`, `pnpm agents:sync`, `pnpm verify`.
3. To try specialists against tokens and components, [install the kit onto another repo](INSTALL.md).

Do not route to Release/Manager for a program board on this root.

<!-- BEGIN ds-kit-agents -->
## Specialists (ds-kit)
See docs/AGENT-KIT.md.
Invoke: ds-manager, ds-prototype, ds-architect, ds-coding, ds-docs, ds-language, ds-a11y, ds-critique, ds-bugbot, ds-security, ds-release.
This checkout is kit source — no host pack. Install onto a design-system repo before bootstrap work.
Contributors: confirm before writes. See CONTRIBUTING.md.
<!-- END ds-kit-agents -->
