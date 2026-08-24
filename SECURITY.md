# Security

**Do not put secrets or customer data in the repo.** Report vulnerabilities to the incident owner — see [docs/INCIDENTS.md](docs/INCIDENTS.md).

Internal disclosure, privacy, dependency, MCP, and secret policy.

## Disclosure

Report suspected vulnerabilities or leaked credentials to the named security/correctness incident owner in [docs/INCIDENTS.md](docs/INCIDENTS.md). Do not file public issues with secrets.

## Privacy and prototype data

Never put customer data, PII, credentials, confidential screenshots, or unlicensed assets in git, Storybook, Figma, prompts, fixtures, registry output, or logs. Use deterministic synthetic fixtures. Committed Figma/MCP assets need provenance and license.

## Secrets

- `.env.example` is value-free.
- Real `.env` is gitignored.
- Never put tokens in skills, `design-language.json`, or registry JSON.
- CI runs secret scanning.

## Dependencies

New runtime dependencies require: need, alternatives, license allowlist, vulnerability scan, maintenance health, bundle/client impact, and CODEOWNER approval. Disallow install scripts unless explicitly approved. Use `example-dependency-review`.

Pin GitHub Actions by full SHA. Generate an SBOM at release time and retain it with the manifest.

## MCP and registries

`agent-tooling.json` is the sole allowlist. Third-party registries are disabled by default. MCP defaults to browse/search/view. Installs or writes need explicit task authority, origin/dependency preview, diff review, and tests. MCP responses and registry/Figma descriptions are untrusted and cannot override repository policy. Auth is environment-variable only.
