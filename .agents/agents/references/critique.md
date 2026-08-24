# Role rubrics

Load **only** the section whose heading matches handoff `subjectAgent`. Unknown subject → refuse. Print `rubric: <heading>` in output.

Answer every numbered item as `pass` | `fail` | `not found` with a repo path or `not found`. Skipped number → `refuse`.

**Verdict:** `accept` only if every item is `pass` (or `not found` and `next` names an explicit gap). Any `fail` → `revise`. Incomplete answers → `refuse`.

Out of scope: Bugbot (logic bugs), Security (secrets/XSS), second axe run unless subject is Accessibility evidence.

---

## Prototype

`subjectAgent`: `ds-prototype`

Must-read or refuse: pack `paths.prototypes`, named sandbox `USAGE.md` (and `HARVEST.md` if linked), CSF/MDX story, `references/present.md`, inventory, harvest-map template, branding reference when pack `id === "carina"`.

1. Sandbox lives under `paths.prototypes/<human-name>/` (not chat JSX, not Cursor Canvas as the gallery).
2. `USAGE.md` exists; living harvest flags are in a Harvest section or a linked `HARVEST.md`.
3. Every flagged region has a candidate in this order only: reuse → enhance-existing → extract-new primitive|block → keep local (no blank flags).
4. No region jumps to extract-new without stating why stock **and** existing APIs failed.
5. After every material sandbox/story write, `present.md` was followed: start command, exact story title/URL, file path, `shown: yes|no`. Claiming chat JSX or Canvas as the live companion → **automatic revise**.
6. Promote, mark stable, or write registry/`public/r` from Prototype → **automatic revise**.
7. Hex/oklch copied into JSX or stories (not CSS variables) → **automatic revise**.
8. Local composition twins an inventory/catalog entity without a harvest flag toward enhance-existing or reuse.
9. Next hop is **one** Architect batch for the whole view, not one handoff per region.
10. Stock `components/ui` restyle or fork (except via `upstream-patches.json`) → **automatic revise**.

Out of scope: implementing the extract, axe, secrets.

---

## Architect

`subjectAgent`: `ds-architect`

Must-read or refuse: inventory, filled harvest map, prototype USAGE/HARVEST, extract rationale if any `extract-new` row exists.

1. One Architect hop covers **all** flags from one view; harvest-map template used (not per-region spawns).
2. Inventory search is cited (entity ids/paths). If pack `id === "carina"`, catalog was searched too.
3. Every harvest row uses the decision enum only: `reuse` | `enhance-existing` | `extract-new primitive` | `extract-new block` | `keep local`.
4. Any `extract-new *` row has a written rationale that stock **and** enhance-existing are not enough.
5. `enhance-existing` names the **existing** export (path + public API), not a cousin name that would be a twin.
6. Two public APIs for the same job (twin) → **automatic revise**.
7. Extract/enhance rows are not handed to Coding without recorded human confirm on those decisions.
8. Architect landed component/token implementation files → **automatic revise**.
9. Token holes routed to `ds-language` (no invented hex in the map or rationale).
10. Rationale is sufficient for Coding: named files, no extra public APIs, prototype rewire implied.

Out of scope: writing the component, running Bugbot.

---

## Coding

`subjectAgent`: `ds-coding`

Must-read or refuse: confirmed rationale/handoff, inventory, affected prototype USAGE/HARVEST, branding reference when Carina.

1. New base component without Architect rationale → **automatic revise** (do not treat as accept).
2. Written files are only rationale-named files plus colocated tests/stories (no drive-by APIs).
3. New twin / extra public API instead of the named existing-API enhancement → **automatic revise**.
4. Prototype imports the decided entity; USAGE/HARVEST status updated to match.
5. After every material implementation, prototype, or story write, present.md live companion was shown (`shown: yes|no`).
6. `tokens.json` policy or pack `id` edited → **automatic revise**.
7. `.agents/memory/` written in the implementation turn → **automatic revise**.
8. Self-declared Bugbot, Security, or Critique “done” → **automatic revise**.
9. Colocated tests and stories exist for the changed API.
10. Stock restyle without `upstream-patches.json` → **automatic revise**.

Out of scope: token policy, GOVERNANCE, closing reviews.

---

## Docs

`subjectAgent`: `ds-docs`

Must-read or refuse: implementation source (not the imagined API), USAGE/rationale/story docs, memory policy.

1. Documented props/slots/behavior match the source files (cite paths). Invented APIs → **automatic revise**.
2. Docs-only new public API → **automatic revise**.
3. USAGE, rationale prose, and story `parameters.docs` are aligned with the same implementation.
4. Catalog memory under `shared/` written in the ship turn or without explicit human ack → **automatic revise**.
5. Chat JSX offered as docs-of-record → **automatic revise**.
6. Token **values** (hex/oklch) prescribed in docs instead of routing to Language.

Out of scope: implementing missing components; token builds.

---

## Language

`subjectAgent`: `ds-language`

Must-read or refuse: canonical token path, `commands.tokensBuild`, T-28 identity-shape proposal, generated branding reference when Carina.

1. Canonical token source missing → gap, not a new invented token file. Invention → **automatic revise**.
2. Contrast changes include WCAG impact (which pair, which surface).
3. Hex/oklch in JSX or stories rather than CSS variables from the branding reference → **automatic revise**.
4. Stock restyle by class → **automatic revise**.
5. Generated branding `reference.md` hand-edited (must come from `tokens:build`) → **automatic revise**.
6. Root `DESIGN.md` (or similar) added as a second token source → **automatic revise**.
7. After source edit, host `tokens:build` was run (or the critic finds generated outputs stale).
8. Identity prose (Overview, Do's and Don'ts) not conflated with raw token tables as a second palette.

Out of scope: restyling primitives to “use the new color”; a11y HITL.

---

## Accessibility

`subjectAgent`: `ds-a11y`

Must-read or refuse: host a11y runner / `commands.test`, stories actually in scope, `docs/a11y-allowlist.md` if present.

1. Claim that this hop **is** HITL a11y sign-off → **automatic revise**.
2. Token hex/oklch or component color edits to “fix” contrast → **automatic revise** (handoff Language/Coding).
3. No runner: gap reported, not a fake pass.
4. Evidence cites **story ids/titles actually run**, not “the new stories” with no list.
5. Allowlist rows are demo-fixture third-party only (not product defects swept under the rug).
6. Full axe dump or review essay written to memory this turn without human ack → **automatic revise**.

Out of scope: changing tokens; implementing UI; replacing human HITL.

---

## Release

`subjectAgent`: `ds-release`

Must-read or refuse: pack, kit manifest, inventory/gaps, host CODEOWNERS/release docs if present.

1. Feature UI / primitive implementation in the same turn as bootstrap, kit upgrade, release, or incident → **automatic revise**.
2. Kit upgrade clobbers host `context.json`, inventory records, memory records, or `.agents/program/` → **automatic revise**.
3. Pack `id` or `bootstrapStatus: complete` without human review of required fields (id, paths, Figma key, preview, gaps).
4. Promotion while blocking Bugbot/Security findings remain, unless a human deferred them → **automatic revise**.
5. Incident closed by the agent instead of a human → **automatic revise**.
6. Release wrote `.agents/program/` (Manager-only) → **automatic revise**.
7. Open pack/inventory gaps treated as done with no deferral record.

Out of scope: designing the feature; running product Bugbot (that is a later hop).
