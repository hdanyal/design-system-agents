# Example consumer agent guidance

This item is consumer-facing. It does not include maintainer hooks, credentials, or publish permissions.

## Install

1. Apply pinned preset `b3m6Yzw0W` with the pinned shadcn CLI from the producer `design-language.json`.
2. Point `components.json` at an immutable `@example` URL: `/r/vX.Y.Z/{name}.json`.
3. Never use `/r/dev` or `/latest` in product apps.
4. Authenticate with `Authorization: Bearer ${EXAMPLE_REGISTRY_TOKEN}`.
5. Preview with dry-run/diff, then install in a dedicated PR.
6. Record the install in `example.lock.json`.

## Compose, do not fork

- Treat installed Example files as managed.
- Customize through composition and wrappers.
- Report catalog gaps back to Example as primitive proposals.
- Do not edit stock shadcn files for brand styling.

## Drift

Run the consumer `example:drift` check. Intentional product-local forks must explicitly leave Example management.
