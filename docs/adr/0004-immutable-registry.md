# ADR 0004: Immutable registry routes

- Status: accepted
- Date: 2026-08-17

**In plain words:** Product apps pin an exact registry version; releases are never overwritten in place.

## Context

Copy-code consumers need deterministic installs. Mutable `/r/{name}.json` is not a pin.

## Decision

Git stores registry source. CI builds artifacts. Shared `/r/dev` is authenticated and mutable. Releases are retained immutable `/r/vX.Y.Z`. Consumers never use `/dev` or `/latest`. Generated JSON is not committed.

## Consequences

Hosting must be authenticated and dynamic. GitHub Pages is not an access-control host.
