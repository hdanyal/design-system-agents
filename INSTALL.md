# Install Design System Agents

For **agents** installing the kit into a host design-system repository.

## Prerequisites

- Host path is a git root (contains `.git`).
- Node 22+ and git available.
- Do **not** use the kit source checkout as the host.

## Procedure

1. Confirm cwd is the **host** git root. If this checkout has `.agents/kit/SOURCE`, stop — that is kit source, not a host.
2. Shallow-clone the kit to a temp directory (or run `node scripts/kit/install-from-git.mjs --url <git-url> --dir .` from the host after kit scripts exist).
3. `node <clone>/scripts/kit/install.mjs --dir <host>`
4. Delete the temp clone when done. Kit scripts now live on the host under `scripts/kit/`.
5. `node scripts/kit/bootstrap.mjs --dir <host>` **without** `--write`. Print the recap (pack id, paths, preview, gaps).
6. **Stop.** Ask the human to confirm pack id (not `example`) and folder paths.
7. After yes:
   ```bash
   node scripts/kit/bootstrap.mjs --dir <host> --write --confirm-write
   node scripts/kit/sync.mjs
   ```
8. If gaps remain, invoke **Release** (`ds-release`). Else invoke **Manager** (`ds-manager`) for the task board. Confirm before spawning specialists.

## One command (host already has git access)

From the host root, after cloning kit once:

```bash
node path/to/kit/scripts/kit/install-from-git.mjs --url <git-url>
```

Then bootstrap scan → confirm → write → sync as above.

## Do not

- Skip `--confirm-write` on the first pack write.
- Use pack id `example` (reserved).
- Treat the kit clone as the working copy.

Human-oriented overview: [docs/ONBOARDING.md](docs/ONBOARDING.md) · Kit reference: [docs/AGENT-KIT.md](docs/AGENT-KIT.md)
