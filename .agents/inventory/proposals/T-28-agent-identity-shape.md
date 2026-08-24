---
title: T-28 — Agent identity file shape
designSystemId: example
task: T-28
architectOwner: ds-architect
status: decided
---

# T-28 — Agent identity file shape

## Decision

**extend** `.agents/skills/example-branding/reference.md` generation

Do **not** add a hand-maintained repo-root `DESIGN.md` as a parallel identity file.

## Rationale

- Canonical tokens remain `tokens.json` (ADR 0002). Identity prose must not become a second source of truth for colors, radius, or type.
- `reference.md` already exists, is **GENERATED** by `pnpm tokens:build` (`scripts/tokens/build.ts` → `brandingMarkdown`), and is the must-read for `example-branding`.
- A separate `DESIGN.md` would invite agents to treat marketing/philosophy copy as canonical over tokens, or to hand-edit hex/oklch into a root doc that drifts from `tokens.json`.
- DESIGN.md *philosophy* (Overview, Do's and Don'ts) is still useful — adapt it as **generated sections** inside `reference.md`, not as a competing file.
- Strong reason against a root `DESIGN.md` here: branding reference generation already ships; inventing a parallel hand-maintained doc violates pack preference and isolation.

## Required sections (in generated `reference.md`)

Order after the existing GENERATED banner and preset/stack bullets:

1. **Overview** — short product/visual intent for agents (Example look: tokens, CSS vars, lucide/Inter; not a second palette).
2. **Token context (CSS vars)** — keep/extend the current guidance: use `bg-primary`, `text-foreground`, `var(--ring)`, etc.; never copy hex/oklch into JSX or stories. Retain the token table sourced from `tokens.json`.
3. **Do's and Don'ts** — DESIGN.md-style rules adapted for agents (do: CSS variables, compose catalog; don't: stock restyles, twin APIs, hand-edit generated outputs, invent identity colors in components).
4. **Catalog component intent** — one short block pointing agents at inventory/Storybook for *what exists* and when to reuse vs extract; no duplicate component catalog inside the branding file.

Prose for Overview / Do's / catalog intent may be sourced from a small generator-owned stub (e.g. under `design-language.json` or a tokens-adjacent template) so Language owns the content path without hand-editing `reference.md`.

## GENERATED banner

Keep (and strengthen) the banner:

```text
GENERATED from `tokens.json` and `design-language.json`. Do not hand-edit.
Run `pnpm tokens:build`. Do not hand-copy hex or oklch into components or stories.
```

Hand-edits to `reference.md` are forbidden. Drift → regenerate.

## Who generates

- **Owner:** **ds-language** (via `example-update-design-language` / branding reference generation).
- **Command:** `pnpm tokens:build` (existing `scripts/tokens/build.ts` `brandingMarkdown` output to `.agents/skills/example-branding/reference.md`).
- Language extends the generator to emit Overview, Do's and Don'ts, and catalog-intent sections; does not maintain a separate root DESIGN.md.

## Manager duty

On the **first board after bootstrap**, Manager always tasks identity-shape work if the generated branding reference lacks the Overview + Do's and Don'ts sections (or if the pack has no generated branding reference path yet). Manager writes **only** `.agents/program/`; this proposal is the Architect decision Manager links.

## Must-read while building views

Prototype, Coding, and Language **must read** `.agents/skills/example-branding/reference.md` (this identity surface) while building or harvesting views — alongside inventory and compose rules. Do not invent a root DESIGN.md “for agents.”

## Explicit dependency gate

**Do not** add `@google/design.md` (or similar external design.md package) until **`example-dependency-review`** intake and approval. This decision does not authorize that dependency.

## What this is not

- Not permission to hand-edit `tokens.json` outputs or Foundations CSS.
- Not a new catalog of components (inventory + Storybook remain entity truth).
- Not a stock restyle guide.
- Not implementation of the generator changes — Coding/Language implement after confirm/reconcile.

## Inventory refs

- Existing: `.agents/skills/example-branding/reference.md` (generated)
- Generator: `scripts/tokens/build.ts` (`brandingMarkdown`)
- Skill: `.agents/skills/example-branding/SKILL.md`
- Canonical tokens: `tokens.json` (+ `design-language.json` for preset/stack metadata)
- No new catalog primitive or block from this task
