# Incidents

Owns severity, rollback, revocation, evidence, and communication.

## Severity

- **SEV1**: broken authenticated registry, leaked token, or shipped accessibility/security defect in a stable item.
- **SEV2**: bad token apply or experimental item that blocks a consumer.
- **SEV3**: docs/tooling drift with no consumer outage.

## Response

1. Stop publication and further `/r/dev` deploys if the defect is in shared artifacts.
2. Identify the last known-good immutable `/r/vX.Y.Z`.
3. Tell consumers to pin that version.
4. Revert the bad merge or cut a patch release. Previous versioned files are never overwritten.
5. Preserve logs, manifests, checksums, and PR evidence.
6. Open follow-up actions. Do not reuse the incident PR for unrelated work.

## Token rollback

Revert the `tokens/` PR, run `pnpm tokens:build` and `pnpm registry:build`, and use Foundations stories as the smoke test.

## Block/primitive rollback

`git revert` the merge and cut a patch release if a broken immutable version was published.

## Authority

Only the incident owner or a CODEOWNER maintainer may revoke or republish.
