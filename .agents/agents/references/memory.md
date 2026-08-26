# Memory retrieval

Host-owned reviewed notes under `.agents/memory/`. Not copied by kit pack/install/upgrade records. Memory is **advisory** — inventory, USAGE, and Storybook remain source of truth.

**Must read:** [docs/AGENT-MEMORY.md](../../../docs/AGENT-MEMORY.md) (policy).

**Do not** read every file under `.agents/memory/` in one turn. Session start (Cursor) prints **shared titles** and **counts** per namespace only — never owner title strings, never record bodies. On an owner hop, list titles in that namespace yourself (or `node scripts/kit/memory-index.mjs --namespace <id>`). Optional exact filter (`memory-index --match`): `node scripts/kit/memory-index.mjs --match <slug-or-trigger>` (exact on `entities` / `trigger` / `subjectAgent` / filename; skips expired). Never use embedding or vector search over memory. Skip expired (`expiresAt` before today). Open at most **3** matching non-expired bodies.

**When to open `shared/`:** this turn names a catalog entity and you need its `do-not-clone` / decision fact. Match by frontmatter `entities` / `entity` or title. Architect and Coding must list titles and open on match during search / wrap.

**When to open `ds-critique/`:** Critique hop and frontmatter `subjectAgent` / `trigger` / entity matches; or the user asked about a prior critique lesson. **Producers must not read or write this namespace.** Producer-facing bars are routed to architect/coding/shared lessons — see [AGENT-MEMORY.md](../../../docs/AGENT-MEMORY.md) Critique routing.

**When to open `ds-architect/`:** Architect hop and slug / `trigger` / entity matches; or recording/acking an Architect lesson after human ack. Coding and Critique must not open this namespace.

**When to open `ds-coding/`:** Coding hop and slug / `trigger` / entity matches; or recording/acking a Coding lesson after human ack. Architect and Critique must not open this namespace.

**When to open own namespace (`ds-bugbot`, `ds-security`, `ds-a11y`):** recording or acking evidence, or the user asked about a prior finding. Template: `references/review-pointer.md`.

**Propose not write:** producers propose shared facts and own lessons in a handoff or inventory proposal. Write only after explicit human ack in a **later** turn. Never write memory in the same turn as the harvest decision or the implementation.

**Kit reference:** `references/critique-standards.md` is portable industry bar — not host memory. Load on every critique hop.

Inventory, Storybook, and USAGE remain source for what exists. Memory stores decisions inventory cannot express.
