# Rollback exercise

Pilot evidence checklist. Run after the first immutable release:

1. Identify `generated/r/v/<previous>/manifest.json`.
2. Confirm the previous checksum still matches.
3. Point a clean consumer at `/r/v<previous>/{name}.json`.
4. Run `pnpm example:drift` against the consumer lock.
5. Record the result in the release PR.

Do not overwrite previous version directories.
