# Critique standards

Pack-agnostic decision-quality bar. Must read every critique hop with the matching role rubric from `critique.md`. Grows via kit upgrade (Release), not `.agents/memory/`.

## Principles

1. **Composition over twins** — reuse or enhance a named existing API before inventing a duplicate public export.
2. **Harvest order** — reuse → enhance-existing → extract-new primitive|block → keep local. No skipping steps without evidence.
3. **Evidence over assertion** — cite inventory paths, story ids, or file quotes. Claims without paths are not evidence.
4. **Public API minimalism** — no drive-by props or extra exports beyond the confirmed rationale.
5. **Process, not outcome** — a good-looking artifact that skipped reuse search or human confirm on extract still fails.
6. **Live companion** — Storybook (or host preview) is the gallery. Chat JSX and Cursor Canvas are not substitutes (`present.md`).
7. **No hex in JSX** — CSS variables from the branding reference or token pipeline, not copied hex/oklch in components or stories.
8. **Stock UI** — `components/ui` changes only via `upstream-patches.json`.
9. **No promote from sandbox** — Prototype does not write registry output or mark stable.
10. **Reviews stay separate** — Critique challenges decisions; Bugbot finds bugs; Security finds secrets/XSS; Accessibility collects axe evidence. Do not mix jobs.
11. **Anti-sycophancy** — test producer claims against files; disagreement is the job when principles fail.
12. **Human judges** — critic proposes verdict and lessons; human acks or accepts with dissent. Loop cap two rounds.

## When to propose a kit-standards update

If a user instruction is clearly industry-wide (not pack-specific), propose promoting it into this file via Release — do not keep it only as host memory.
