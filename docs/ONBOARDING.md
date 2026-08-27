# Human onboarding

Welcome to **Design System Agents** — portable `ds-*` specialists you install onto a design-system git root.

## First hour (your design-system repo)

1. Open **your** design-system repository in Cursor or Claude Code.
2. Paste the install prompt from [README.md](../README.md) with this kit's git URL.
3. Follow [INSTALL.md](../INSTALL.md): install → bootstrap scan → confirm pack id and paths → write → sync.
4. Invoke **Manager** (`ds-manager`) for the task board, or **Release** (`ds-release`) if bootstrap gaps remain.

## Kit contributors (this repo)

```bash
pnpm install
pnpm agents:sync
pnpm verify
```

See [CONTRIBUTING.md](../CONTRIBUTING.md).

## Where context lives on a host

| Need | Where |
| --- | --- |
| Pack id and paths | `.agents/context.json` |
| What's next | `.agents/program/` |
| Reviewed agent notes | `.agents/memory/` |
| Install procedure | [INSTALL.md](../INSTALL.md) |

Cursor chats are not portable. Write decisions into git on the host.
