# ADR 0002: DTCG tokens are canonical

- Status: accepted
- Date: 2026-08-17

**In plain words:** Edit `tokens.json` once; CSS, Storybook, and docs are generated from it so colors do not drift.

## Context

CSS, Storybook Foundations, branding docs, and Figma variables must not drift.

## Decision

`tokens.json` is the token source after preset bootstrap. CSS, Foundations data, branding reference, and Figma mappings are generated.

## Consequences

Token edits never begin in CSS. Preset apply produces a candidate diff.
