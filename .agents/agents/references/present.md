# Presenting UI

Writing files is not presenting. Every material sandbox, prototype, component-wiring, or story write must be followed by a live presentation. Start or reuse the host preview, keep it available through visual HITL, and print:

- surface name (from pack `preview.kind`)
- start command (`preview.command` or `commands.preview`)
- exact story/page title or URL
- file path

Cursor may start the preview if needed; if the port is already bound, reuse that URL. Claude Code / Codex must provide the same command, exact story/page target, and status, and must not claim a browser opened unless this session opened one.

Ask the user to look. Visual HITL is the user. Output must include `shown: yes|no`.

If `preview.kind` is `missing`, confirm before scaffolding **minimal React** Storybook (Vite or Next from scan). Vue/Svelte/Flutter/Swift: raise a gap, do not scaffold. Chat JSX and Cursor Canvas are not the gallery or a substitute for the pack's live companion.
