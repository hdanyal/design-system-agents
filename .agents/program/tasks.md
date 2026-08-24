# Tasks

Live catalog hygiene (not the deleted prototype):

| id | title | owner | dependsOn | status | links |
| --- | --- | --- | --- | --- | --- |
| T-13 | Write `heading-group` USAGE.md | ds-docs | | done | `components/carina/heading-group/USAGE.md` |
| T-14 | Write `page-header` RATIONALE.md | ds-architect | | done | `registry/blocks/page-header/RATIONALE.md` |
| T-20 | Harvest-map template (reuse / enhance-existing / extract-new / keep local) | ds-architect | | done | `.agents/inventory/proposals/_template-harvest-map.md` |
| T-21 | Prototype playbook: any view, live present, harvest flags, no promote | ds-release | T-20 | done | carina-prototype, ds-prototype.md, present.md |
| T-22 | Compose + Architect: harvest-while-building; enhance-existing over twins | ds-release | T-20 | done | carina-compose, ds-architect.md |
| T-23 | Coding: named new/enhanced APIs; sandbox rewire; present after rewire | ds-release | T-20 | done | carina-extend-ui, ds-coding.md |
| T-24 | Promote-block: multi-slice experimental; propose memory not same turn | ds-release | T-20 | done | carina-promote-block |
| T-25 | Memory catalog-fact template + HITL-then-ack path | ds-release | | done | docs/AGENT-MEMORY.md |
| T-26 | Intent-eval + agent-contract tests (all three harness adapters) | ds-coding | T-21,T-22,T-23,T-24,T-25 | done | intent-eval.json, tests/agent-contract |
| T-27 | Later: human names first sandbox; then retarget to ds-prototype | human | T-21,T-26 | open | |
| T-28 | Identity file shape + Manager first-board duty (every new pack) | ds-architect | | done | `.agents/inventory/proposals/T-28-agent-identity-shape.md`; branding `reference.md` (generated Overview / Do's) |

## Archived

Reconstruction workstream cancelled 2026-08-24. Human removed the sandbox. Do not restore. Status `cancelled` is archive-only (not in-flight).

| id | title | owner | dependsOn | status | links |
| --- | --- | --- | --- | --- | --- |
| T-01 | Seed `prototypes/investigation-workspace` (USAGE + Storybook story, empty shell) | ds-prototype | | cancelled | sandbox deleted |
| T-02 | Composition map: HTML surfaces → catalog reuse / local / hole | ds-architect | | cancelled | proposal deleted |
| T-03 | Reconstruct app shell (XOR rail, top bar, chat-as-frame) from catalog | ds-prototype | T-01, T-02 | cancelled | sandbox deleted |
| T-04 | Portfolio screens: home, cases, ginbox, reports, settings | ds-prototype | T-03 | cancelled | sandbox deleted |
| T-05 | Lab screens: lab, labintake, labassign; stub missing lab rails | ds-prototype | T-03 | cancelled | sandbox deleted |
| T-06 | Case core: briefing, inbox, tasks, files, access, ledger, roster | ds-prototype | T-03 | cancelled | sandbox deleted |
| T-07 | Case reasoning: theories, elements, people, whiteboard, timeline, collab | ds-prototype | T-03 | cancelled | sandbox deleted |
| T-08 | Case evidence: artifacts, viewer, redact, casereports; Map as ArcGIS exception | ds-prototype | T-03 | cancelled | sandbox deleted |
| T-09 | Agent destination + overlays (chat, canvas, messages, evidence, modal family, cmd) | ds-prototype | T-03 | cancelled | sandbox deleted |
| T-10 | Implement only Architect-approved extractions | ds-coding | T-02 | cancelled | no sandbox to extract from |
| T-11 | Keep sandbox USAGE + story docs in lockstep with imports | ds-docs | T-01 | cancelled | sandbox deleted |
| T-12 | a11y report on sandbox stories (axe/keyboard; not HITL) | ds-a11y | T-03 | cancelled | a11y handoffs deleted |
| T-15 | Token change only if composition cannot map action/identity/state | ds-language | T-02 | cancelled | HTML token-channel question died with the sandbox |
| T-16 | Security review before ArcGIS/external script in sandbox | ds-security | T-08 | cancelled | no ArcGIS script; sandbox deleted |
