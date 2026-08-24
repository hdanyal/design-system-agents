# Adoption

**How product apps install** components from this design system’s registry — pinned versions, lockfiles, and drift checks.

Consumer contract for product teams.

## Supported matrix

- Node >= 22
- React 19.2.x
- Next.js 16.2.x
- Tailwind 4
- TypeScript strict
- shadcn CLI 4.18.0
- Preset `b3m6Yzw0W`
- RSC and client components as declared by each item

## Install

1. Apply the pinned preset with the pinned CLI.
2. Configure the `@example` namespace to an immutable URL:

```json
{
  "registries": {
    "@example": {
      "url": "https://<host>/r/v0.1.0/{name}.json",
      "headers": {
        "Authorization": "Bearer ${EXAMPLE_REGISTRY_TOKEN}"
      }
    }
  }
}
```

3. Never point production `components.json` at `/r/dev` or `/latest`.
4. Preview with dry-run/diff. Install in a dedicated PR.
5. Record `example.lock.json`:

```json
{
  "registryVersion": "0.1.0",
  "preset": "b3m6Yzw0W",
  "cli": "4.18.0",
  "installDate": "2026-08-17",
  "items": [
    { "name": "heading-group", "checksum": "<sha256>", "path": "components/example/heading-group/heading-group.tsx" }
  ]
}
```

6. Run product tests and `example:drift`.

## Managed files

Treat installed Example files as managed. Customize through composition and wrappers. An intentional product-local fork must explicitly leave Example management and is no longer centrally upgradeable.

Report catalog gaps back as host primitive proposals. Do not fork stock UI in the product app.

## Support

- Compatibility and deprecation questions: design-system maintainers
- Security/correctness incidents: [docs/INCIDENTS.md](INCIDENTS.md)
- Escalation: CODEOWNERS teams
