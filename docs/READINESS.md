# Readiness

**This repo is a scaffold** until the Scale gate has real evidence. Do not call it enterprise-ready before then.

The repository is an **enterprise-contract-ready scaffold**.

## Foundation

Required: pinned reproducible scaffold; canonical token build/check; one primitive + block registry proof; explicit tests; CI; policy ownership; skills/tooling validation.

Record evidence in the PR that completes Foundation work.

## Pilot

Required before the first product consumer: authenticated shared `/r/dev`; retained immutable private release host; clean consumer install/update/drift; manifest/checksums/SBOM; rollback exercise; named owners and incident route.

## Scale

Required before a second team: second-team-ready authenticated hosting; hosted Storybook and PR visual previews; release retention/SLOs; compatibility matrix CI; deterministic cloud environment; named CODEOWNER teams/fallbacks; operational security/review/automation evidence.

## Current status

- Foundation contracts: implemented in this repository (pinned scaffold, DTCG tokens, heading-group + page-header registry proof, 20 skills, CI, policy docs).
- Pilot hosting: local authenticated `/r/dev` and `/r/v/0.1.0` routes, manifest, SBOM, and rollback docs exist. Shared org host is still required before the first product consumer.
- Scale evidence: not recorded. Do not call this system enterprise-ready.
