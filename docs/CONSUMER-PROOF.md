# Consumer proof

Date: 2026-08-17

## Immutable release

- Version: `0.1.0`
- Route: `/r/v/0.1.0/{name}.json`
- Manifest: `generated/release/manifest-0.1.0.json`
- SBOM: `generated/sbom/sbom.json`
- Items: `heading-group`, `page-header`, `agent-guidance`

## Clean fixture

`pnpm registry:smoke` installed every built item into `generated/fixtures/consumer` and typechecked the producer.

## Drift

Producer `example:drift` exits cleanly without a product lockfile. Consumers copy `generated/fixtures/example.lock.example.json` and fill checksums from the immutable manifest.

## Rollback

Previous version directories are retained under `generated/r/v/<version>` and are never overwritten. See [ROLLBACK.md](ROLLBACK.md).

## Hosting

Local authenticated routes exist:

- `/r/dev/{name}.json`
- `/r/preview/{name}.json`
- `/r/v/{version}/{name}.json`

Shared org hosting is required before team-wide adoption and the first product consumer. This repository is not enterprise-ready.
