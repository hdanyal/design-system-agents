# Human onboarding

Welcome to **Design System Agents** — portable `ds-*` specialists you install onto a design-system git root.

## First hour (your design-system repo)

1. Open **your** design-system repository in Cursor or Claude Code.
2. Paste the install prompt from [README.md](../README.md) with this kit's git URL. A URL install copies a **snapshot** of the kit into your repo (not a live link).
3. The agent follows [INSTALL.md](../INSTALL.md). **Release** (`ds-release`) runs the bootstrap scan — confirm pack id (not `example`) and folder paths before any write.
4. If bootstrap gaps remain, stay with `ds-release`. Once bootstrap is complete, invoke **Manager** (`ds-manager`) to seed the first program board.
5. How to talk to specialists day to day: [README.md — Working with specialists](../README.md#working-with-specialists).

Later kit updates: paste the same git URL again (or ask to upgrade the kit from that URL). Prefer a kept sibling clone that the agent can `git pull`; otherwise another URL install is another hard copy of whatever is at that URL now.

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
