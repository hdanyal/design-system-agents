# Install Design System Agents

For **agents** installing the kit into a host design-system repository.

Humans paste a git URL (see [README.md](README.md)). You follow this playbook. Prefer a **durable sibling clone** so later kit updates can be `git pull`ed. `install-from-git` is an equal fallback when you should not keep a checkout.

## Prerequisites

- Host path is a git root (contains `.git`).
- Node 22+ and git available.
- Do **not** use the kit source checkout as the host.
- Do **not** nest the kit clone inside the host (never `host/design-system-agents/`).

## First install

1. Confirm cwd is the **host** git root. If this checkout has `.agents/kit/SOURCE`, stop — that is kit source, not a host.
2. Choose a kit source (equal paths):

   **Path A — durable clone (preferred when the machine can keep one)**
   - If a kit clone already exists on this machine: `git pull` in that checkout.
   - Else: `git clone <git-url>` to a **sibling** of the host (not inside it). Keep that clone.
   - `node <clone>/scripts/kit/install.mjs --dir <host>`

   **Path B — no kept clone (`install-from-git`)**
   - **Warn the human before copying:** this will hard-copy the kit at that URL’s current commit into the host. It is a snapshot, not a live link; future kit ships will not appear until they paste the URL again or you pull a kept clone and upgrade.
   - From a host that already has `scripts/kit/`:
     ```bash
     node scripts/kit/install-from-git.mjs --url <git-url> --dir <host>
     ```
   - Or shallow-clone to a temp directory, run `node <tmp>/scripts/kit/install.mjs --dir <host>`, then delete the temp clone. Kit scripts then live on the host under `scripts/kit/`.

3. Invoke **Release** (`ds-release`) to run a bootstrap scan:
   ```bash
   node scripts/kit/bootstrap.mjs --dir <host>
   ```
   **without** `--write`. Print the recap (pack id, paths, preview, gaps).
4. **Stop.** Ask the human to confirm pack id (not `example`) and folder paths.
5. After yes:
   ```bash
   node scripts/kit/bootstrap.mjs --dir <host> --write --confirm-write
   node scripts/kit/sync.mjs
   ```
6. If pack/inventory gaps remain, stay with **Release** (`ds-release`). Else confirm and invoke **Manager** (`ds-manager`) to seed `.agents/program/`. Only Manager writes the board. Confirm before spawning specialists.

## Later update (kit shipped a new version)

Human pastes the same git URL again, or asks to upgrade the agents.

**Path A — durable clone**
```bash
git -C <clone> pull
node <clone>/scripts/kit/upgrade.mjs --dir <host>
```

**Path B — no kept clone**
Warn again (another hard copy of whatever that URL is now), then from the host:
```bash
node scripts/kit/install-from-git.mjs --url <git-url> --dir .
node scripts/kit/upgrade.mjs --dir .
```

Upgrade refreshes kit playbooks without clobbering pack, inventory, memory, or program.

## Manager vs Release

| Hop | Owner | Writes |
| --- | --- | --- |
| Kit install / upgrade | This playbook; Release if a specialist is named | Kit files, then pack via bootstrap |
| Bootstrap scan, pack id, folder paths, `gaps.json` | **`ds-release`** | `.agents/context.json`, inventory gaps |
| First board after bootstrap | **`ds-manager`** | `.agents/program/` only |

## Do not

- Skip `--confirm-write` on the first pack write.
- Use pack id `example` (reserved).
- Nest the kit clone inside the host.
- Treat the kit clone as the design-system working copy.
- Let Release write `.agents/program/`, or let Manager run bootstrap / write `context.json`.

Human-oriented overview: [docs/ONBOARDING.md](docs/ONBOARDING.md) · Kit reference: [docs/AGENT-KIT.md](docs/AGENT-KIT.md)
