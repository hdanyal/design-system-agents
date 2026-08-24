# ADR 0006: Copy-code consumer drift

- Status: accepted
- Date: 2026-08-17

## Context

shadcn installs source. Registry semver cannot update a consumer that edited installed files.

## Decision

Consumers keep `example.lock.json` and treat installed files as managed. Updates happen against a new immutable version with dry-run/diff. `example:drift` detects unmanaged edits.

## Consequences

Product-local forks must explicitly leave Example management.
