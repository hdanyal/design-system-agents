# Carina consumer agent guidance

This item is consumer-facing. It does not include maintainer hooks, credentials, or publish permissions.

## Install

1. Apply pinned preset `b3m6Yzw0W` with the pinned shadcn CLI from the producer `design-language.json`.
2. Point `components.json` at an immutable `@carina` URL: `/r/vX.Y.Z/{name}.json`.
3. Never use `/r/dev` or `/latest` in product apps.
4. Authenticate with `Authorization: Bearer ${CARINA_REGISTRY_TOKEN}`.
5. Preview with dry-run/diff, then install in a dedicated PR.
6. Record the install in `carina.lock.json`.

## Compose, do not fork

- Treat installed Carina files as managed.
- Customize through composition and wrappers.
- Report catalog gaps back to Carina as primitive proposals.
- Do not edit stock shadcn files for brand styling.

## Drift

Run the consumer `carina:drift` check. Intentional product-local forks must explicitly leave Carina management.
