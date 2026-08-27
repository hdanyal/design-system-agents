# Contributing (kit)

How to change the **Design System Agents kit** (playbooks, scripts, templates, docs).

This repo is kit source only. Host design-system policy lives on each host after install (stub files copied from `.agents/kit/host-policy/`).

```bash
pnpm install
pnpm agents:sync
pnpm verify
```

Do not hand-edit generated files under `.cursor/agents`, `.claude/agents`, or `.codex/agents`.

Confirm before protected writes. One owning `ds-*` specialist per request on a **host** checkout.
