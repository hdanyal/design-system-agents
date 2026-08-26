import { existsSync, readFileSync, readdirSync, statSync } from "node:fs"
import { describe, expect, it } from "vitest"

function playbookCopies(id: string) {
  return [
    `.agents/agents/${id}.md`,
    `.cursor/agents/${id}.md`,
    `.claude/agents/${id}.md`,
    `.codex/agents/${id}.toml`,
  ].map((file) => ({ file, body: readFileSync(file, "utf8") }))
}

function expectEveryHarness(id: string, phrases: string[]) {
  for (const { file, body } of playbookCopies(id)) {
    for (const phrase of phrases) expect(body, `${file} missing: ${phrase}`).toContain(phrase)
  }
}

describe("ds-kit agents", () => {
  it("expected: generated adapters per harness and no proactive spawn", () => {
    const ids = JSON.parse(readFileSync(".agents/agents/manifest.json", "utf8")).agents.map(
      (agent: { id: string }) => agent.id
    )
    expect(ids).toContain("ds-manager")
    for (const id of ids) {
      expect(existsSync(`.cursor/agents/${id}.md`)).toBe(true)
      expect(existsSync(`.claude/agents/${id}.md`)).toBe(true)
      expect(existsSync(`.codex/agents/${id}.toml`)).toBe(true)
      const cursor = readFileSync(`.cursor/agents/${id}.md`, "utf8")
      expect(cursor).toContain("How to use in Cursor")
      expect(cursor).not.toMatch(/use proactively/i)
    }
    expect(existsSync(".cursor/rules/ds-kit.mdc")).toBe(true)
  })

  it("forbidden: Coding landing a new primitive without Architect rationale", () => {
    const coding = readFileSync(".agents/agents/ds-coding.md", "utf8")
    expect(coding).toContain("Refuse a new base component if Architect rationale is missing")
    expect(coding).toContain("Do not self-check as “review done.”")
  })

  it("expected: Bugbot launches one product subagent after confirm on Cursor", () => {
    const bugbot = readFileSync(".agents/agents/ds-bugbot.md", "utf8")
    expect(bugbot).toContain('description` `"Bugbot"`')
    expect(bugbot).toContain("exactly one")
    expect(bugbot).toContain("reviewEngine: playbook")
    expect(bugbot).not.toContain("implement fixes in the same turn")
  })

  it("forbidden: example-onboard as a second auto-select cold start", () => {
    const manifest = JSON.parse(readFileSync(".agents/skills/manifest.json", "utf8"))
    const onboard = manifest.skills.find((s: { name: string }) => s.name === "example-onboard")
    expect(onboard.invocation).not.toBe("auto-select")
    const agents = readFileSync("AGENTS.md", "utf8")
    expect(agents).toContain("ds-release")
    expect(agents).not.toContain("Load `example-onboard`, then exactly one owning skill.")
  })

  it("expected: present contract names Storybook command", () => {
    const present = readFileSync(".agents/agents/references/present.md", "utf8")
    expect(present).toContain("start command")
    expect(present).toContain("shown")
    const proto = readFileSync(".agents/agents/ds-prototype.md", "utf8")
    expect(proto).toContain("shown: yes|no")
  })

  it("forbidden: mixing another pack's memory into this host", () => {
    const rule = readFileSync(".cursor/rules/ds-kit.mdc", "utf8")
    expect(rule).toContain("Never mix another design system's chats")
    expect(rule).toContain("Do not copy hex/oklch")
    expect(rule).toContain("Do not duplicate primitives or public APIs")
    expect(rule).toContain("upstream-patches.json")
    expect(existsSync(".cursor/rules/carina-ds.mdc")).toBe(false)
    const generated = readdirSync(".cursor/agents")
    expect(generated.filter((name) => name.startsWith("ds-") && name.endsWith(".md")).length).toBeGreaterThanOrEqual(
      11
    )
  })

  it("expected: Manager loads the live roster and does not freeze other agent names", () => {
    const manager = readFileSync(".agents/agents/ds-manager.md", "utf8")
    expect(manager).toContain(".agents/agents/manifest.json")
    expect(manager).toContain("Do not hardcode other agent names")
    expect(manager).toContain("scanProgramInputs")
  })

  it("expected: Prototype takes any named view and presents it live in every harness", () => {
    expectEveryHarness("ds-prototype", [
      "There is no view allowlist.",
      "shown: yes|no",
      "After every material sandbox or story write, present the live companion",
      "references/harvest-map.md",
      "Just-in-time context",
      "match confidence",
      "open on match only",
      "harvestBatch: one Architect hop",
    ])
  })

  it("forbidden: chat JSX or Canvas standing in for the live companion", () => {
    const present = readFileSync(".agents/agents/references/present.md", "utf8")
    expect(present).toContain("Writing files is not presenting")
    expect(present).toContain(
      "Chat JSX and Cursor Canvas are not the gallery or a substitute for the pack's live companion."
    )
    expect(present).toContain("must not claim a browser opened unless this session opened one")
    expectEveryHarness("ds-prototype", ["Never promote, mark stable, or write registry output."])
  })

  it("expected: Coding enhances a named existing API and re-presents after rewiring the sandbox", () => {
    expectEveryHarness("ds-coding", [
      "enhancement to a named existing API",
      "Rewire the prototype to import the decided entity",
      "After every material implementation, prototype, or story write, present the live companion",
      "do not replace it with a twin",
      "Just-in-time context",
      "pnpm verify:fast",
      "open on match only",
      "Do not write `.agents/memory/` **in the implementation turn**",
      "next: ds-critique, ds-bugbot, ds-security",
    ])
  })

  it("expected: Coding contract-first red-green loop and skills", () => {
    expectEveryHarness("ds-coding", [
      "**Red:** write colocated tests and CSF stories",
      "**Green:** implement the approved",
      "**Verify:** run host `commands.test` / `pnpm verify:fast`",
      "propose not write",
    ])
    const extend = readFileSync(".agents/skills/example-extend-ui/SKILL.md", "utf8")
    expect(extend).toContain("API before internals")
    expect(extend).toContain("Error story")
    expect(extend).toContain("Contract-first")
    const stories = readFileSync(".agents/skills/example-stories/SKILL.md", "utf8")
    expect(stories).toContain("Error story is required")
    expect(stories).toContain("not class strings")
    const verify = readFileSync(".agents/skills/example-verify/SKILL.md", "utf8")
    expect(verify).toContain("pnpm verify:fast")
    expect(verify).toContain("Do not weaken assertions")
  })

  it("expected: Manager audits the branding identity shape on the first board", () => {
    expectEveryHarness("ds-manager", [
      "first board after bootstrap",
      "branding `reference.md` identity shape",
      "Overview plus Do's and Don'ts",
      "Never write the identity file.",
      "figmaFileKey",
      "Do not write `context.json` or invent a file",
    ])
    const reference = readFileSync(".agents/skills/example-branding/reference.md", "utf8")
    expect(reference).toContain("## Overview")
    expect(reference).toContain("## Do's and Don'ts")
  })

  it("expected: harvest-while-building keeps enhance-existing ahead of a twin", () => {
    expectEveryHarness("ds-architect", [
      "reuse → enhance-existing → extract-new primitive/block → keep local",
      "Prefer enhancing a named existing API over inventing a twin",
      "references/harvest-map.md",
      "Just-in-time context",
      "Index scan",
      "Near-duplicate check",
      "Source inspect shortlist",
      "open on match only",
      "propose** (do not write)",
    ])
    const compose = readFileSync(".agents/skills/example-compose/SKILL.md", "utf8")
    expect(compose).toContain("Harvest while building")
    expect(compose).toContain("Prefer enhancing a named existing API over creating a twin")
    expect(compose).toContain("match confidence")
    const prototype = readFileSync(".agents/skills/example-prototype/SKILL.md", "utf8")
    expect(prototype).toContain("there is no view-name or view-type allowlist")
    expect(prototype).toContain("reuse, enhance-existing, extract-new primitive/block, keep local")
    const extend = readFileSync(".agents/skills/example-extend-ui/SKILL.md", "utf8")
    expect(extend).toContain("enhance a named existing API")
    expect(extend).toContain("Coding rewires sandbox imports to the decided entity")
    const harvest = readFileSync(".agents/agents/references/harvest-map.md", "utf8")
    expect(harvest).toContain("match confidence")
    expect(harvest).toContain("api delta")
    expect(harvest).toContain("files Coding may write")
    expect(harvest).toContain("Index scan")
    expect(harvest).toContain("Near-duplicate check")
    expect(harvest).toContain("Source inspect shortlist")
  })

  it("expected: harvest-eval fixtures lock search order and decisions", () => {
    const evalJson = JSON.parse(readFileSync(".agents/kit/harvest-eval.json", "utf8")) as {
      searchOrder: string[]
      preferenceOrder: string[]
      prototypeFlagColumns?: string[]
      cases: Array<{ id: string; expectedDecision: string; matchConfidence: string }>
    }
    expect(evalJson.searchOrder).toEqual([
      "index scan",
      "near-duplicate check",
      "source inspect shortlist",
      "decide",
      "API contract",
    ])
    expect(evalJson.preferenceOrder[0]).toBe("reuse")
    expect(evalJson.preferenceOrder).toContain("enhance-existing")
    expect(evalJson.prototypeFlagColumns).toEqual([
      "region",
      "candidate decision",
      "inventory hint",
      "match confidence",
    ])
    expect(evalJson.cases.length).toBeGreaterThanOrEqual(6)
    const byId = Object.fromEntries(evalJson.cases.map((c) => [c.id, c]))
    expect(byId["heading-group-extract"].expectedDecision).toBe("extract-new primitive")
    expect(byId["reuse-card"].expectedDecision).toBe("reuse")
    expect(byId["enhance-not-twin-button"].expectedDecision).toBe("enhance-existing")
    expect(byId["keep-local-sandbox-chrome"].expectedDecision).toBe("keep local")
    const architect = readFileSync(".agents/agents/ds-architect.md", "utf8")
    for (const step of evalJson.searchOrder) {
      expect(architect.toLowerCase()).toContain(step.toLowerCase().replace("api contract", "api contract"))
    }
    expect(architect).toContain("Index scan")
    expect(architect).toContain("Near-duplicate check")
    expect(architect).toContain("Source inspect shortlist")
  })

  it("expected: producer memory templates and propose-not-write", () => {
    expect(existsSync(".agents/agents/references/architect-lesson.md")).toBe(true)
    expect(existsSync(".agents/agents/references/coding-lesson.md")).toBe(true)
    expect(existsSync(".agents/agents/references/review-pointer.md")).toBe(true)
    const archLesson = readFileSync(".agents/agents/references/architect-lesson.md", "utf8")
    expect(archLesson).toContain("do not write in the decision turn")
    expect(archLesson).toMatch(/trigger:/)
    expect(archLesson).toContain("lessonKind")
    const codingLesson = readFileSync(".agents/agents/references/coding-lesson.md", "utf8")
    expect(codingLesson).toContain("do not write in the implementation turn")
    expect(codingLesson).toMatch(/trigger:/)
    const critiqueLesson = readFileSync(".agents/agents/references/critique-lesson.md", "utf8")
    expect(critiqueLesson).toMatch(/subjectAgent:/)
    expect(critiqueLesson).toMatch(/trigger:/)
    const catalogFact = readFileSync(".agents/agents/references/catalog-fact.md", "utf8")
    expect(catalogFact).toMatch(/entities:/)
    const memoryDoc = readFileSync("docs/AGENT-MEMORY.md", "utf8")
    expect(memoryDoc).toContain("ds-architect/")
    expect(memoryDoc).toContain("ds-coding/")
    expect(memoryDoc).toContain("open on match")
    expect(memoryDoc).toContain("Critique routing")
    expect(memoryDoc).toContain("architect-lesson")
    expect(memoryDoc).toContain("shared titles")
    expect(memoryDoc).toContain("memory-index --match")
    expect(memoryDoc).toContain("unused stubs")
    expect(memoryDoc).not.toMatch(/session-start.*Architect\/Coding title/)
    expect(memoryDoc).toMatch(/exact.*keys|Never.*embedding/i)
    expect(memoryDoc).not.toMatch(/\bFAISS\b/)
    const memoryRef = readFileSync(".agents/agents/references/memory.md", "utf8")
    expect(memoryRef).toContain("Propose not write")
    expect(memoryRef).toContain("ds-architect/")
    expect(memoryRef).toContain("ds-coding/")
    expect(memoryRef).toContain("Producers must not read or write this namespace")
    expect(memoryRef).toContain("Skip expired")
    expect(memoryRef).toContain("memory-index --match")
    expect(memoryRef).toContain("advisory")
    expect(memoryRef).toContain("Never use embedding or vector search")
    const manager = readFileSync(".agents/agents/ds-manager.md", "utf8")
    expect(manager).toContain("memoryExpired")
    expect(manager).toContain("workGaps")
    const manifest = JSON.parse(readFileSync(".agents/agents/manifest.json", "utf8"))
    const architect = manifest.agents.find((a: { id: string }) => a.id === "ds-architect")
    const coding = manifest.agents.find((a: { id: string }) => a.id === "ds-coding")
    expect(architect.mayWrite).toContain(".agents/memory/ds-architect")
    expect(coding.mayWrite).toContain(".agents/memory/ds-coding")
    expect(coding.mustNotWrite.some((s: string) => /memory in the implementation turn/i.test(s))).toBe(true)
  })

  it("expected: Critique routes producer bars; producers never open ds-critique", () => {
    expectEveryHarness("ds-critique", [
      "critique-only",
      "architect-lesson",
      "coding-lesson",
      "shared-fact",
      "Do not read producer memory namespaces",
    ])
    expectEveryHarness("ds-architect", ["Never open `ds-coding/` or `ds-critique/`"])
    expectEveryHarness("ds-coding", ["Never open `ds-architect/` or `ds-critique/`"])
    const critiqueDoc = readFileSync("docs/AGENT-CRITIQUE.md", "utf8")
    expect(critiqueDoc).toContain("route")
    expect(critiqueDoc).toContain("architect-lesson")
  })

  it("expected: AGENT-ARCHITECT-CODING provenance", () => {
    const doc = readFileSync("docs/AGENT-ARCHITECT-CODING.md", "utf8")
    expect(doc).toContain("Anthropic")
    expect(doc).toContain("Effective context engineering")
    expect(doc).toContain("What we did not copy")
    expect(doc).toContain("harvest-eval.json")
    const kit = readFileSync("docs/AGENT-KIT.md", "utf8")
    expect(kit).toContain("AGENT-ARCHITECT-CODING.md")
    const kitManifest = JSON.parse(readFileSync(".agents/kit/manifest.json", "utf8"))
    expect(kitManifest.paths).toContain("docs/AGENT-ARCHITECT-CODING.md")
    expect(kitManifest.paths).toContain(".agents/kit/harvest-eval.json")
  })

  it("expected: rationale template requires API anatomy before internals", () => {
    const template = readFileSync("components/primitives/_template/RATIONALE.md", "utf8")
    expect(template).toContain("### Anatomy")
    expect(template).toContain("### Props")
    expect(template).toContain("### Slots / composition")
    expect(template).toContain("### Files Coding may write")
  })

  it("expected: critique rubrics cover Architect JIT and Coding verify", () => {
    const rubrics = readFileSync(".agents/agents/references/critique.md", "utf8")
    expect(rubrics).toContain("match confidence")
    expect(rubrics).toContain("files Coding may write")
    expect(rubrics).toContain("pnpm verify:fast")
    expect(rubrics).toContain("open on match only")
    expect(rubrics).toContain("Output `next` includes Critique")
    expect(rubrics).toContain("cleared or marked resolved")
    expect(rubrics).toContain("do-not-clone")
    expect(rubrics).toContain("token-hole")
    expect(rubrics).toContain("Runners scoped")
    expect(rubrics).toContain("proposed")
  })

  it("expected: Docs writes shared memory after ack; do not load every memory file", () => {
    expectEveryHarness("ds-docs", [
      "`.agents/memory/shared/` only after **explicit human ack**",
      "references/catalog-fact.md",
      "Do not read every memory file",
      "Just-in-time context",
      "open on match only",
      "do-not-clone",
    ])
  })

  it("expected: pipeline consumers JIT and hop-state routing", () => {
    expectEveryHarness("ds-language", [
      "Just-in-time context",
      "token hole",
      "open on match only",
    ])
    expectEveryHarness("ds-a11y", [
      "Just-in-time context",
      "play-test ids",
      "open on match only",
    ])
    expectEveryHarness("ds-bugbot", [
      "Just-in-time context",
      "file allowlist from the rationale",
      "verify:",
      "next after Critique accept",
    ])
    expectEveryHarness("ds-security", [
      "Just-in-time context",
      "MCP allowlist",
      "security notes",
      "next after Critique accept",
    ])
    expectEveryHarness("ds-manager", [
      "Just-in-time context",
      "recommendedNext",
      "ready-for-confirm",
      "open on match only",
    ])
    expectEveryHarness("ds-release", [
      "Just-in-time context",
      "proposed",
      "open on match only",
    ])
    const handoffs = readFileSync(".agents/agents/references/handoffs.md", "utf8")
    expect(handoffs).toContain("match confidence")
    expect(handoffs).toContain("files Coding may write")
    expect(handoffs).toContain("verify:")
    expect(handoffs).toContain("AGENT-ARCHITECT-CODING.md")
    const usage = readFileSync("prototypes/_template/USAGE.md", "utf8")
    expect(usage).toContain("match confidence")
    const a11ySkill = readFileSync(".agents/skills/example-a11y/SKILL.md", "utf8")
    expect(a11ySkill).toContain("Do not axe the whole Storybook")
    const protoSkill = readFileSync(".agents/skills/example-prototype/SKILL.md", "utf8")
    expect(protoSkill).toContain("match confidence")
    const kit = readFileSync("docs/AGENT-KIT.md", "utf8")
    expect(kit).toContain("pipeline consumers")
    const aci = readFileSync("docs/AGENT-ARCHITECT-CODING.md", "utf8")
    expect(aci).toContain("Pipeline consumers")
  })

  it("expected: Manager stays board-only and forbids memory writes", () => {
    expectEveryHarness("ds-manager", ["Do not write `.agents/memory/`", "Write only `.agents/program/`"])
  })

  it("expected: Critique is independent and readonly", () => {
    const manifest = JSON.parse(readFileSync(".agents/agents/manifest.json", "utf8"))
    const critique = manifest.agents.find((a: { id: string }) => a.id === "ds-critique")
    expect(critique.readonly).toBe(true)
    expect(critique.reviewEngine).toBeNull()
    expectEveryHarness("ds-critique", [
      "Does not implement fixes",
      "Do not read producer memory namespaces",
      "never in the same turn as first proposing",
      "Unanswered rubric items → `refuse`, not `accept`",
    ])
  })

  it("forbidden: producers self-check critique done", () => {
    for (const id of [
      "ds-prototype",
      "ds-architect",
      "ds-coding",
      "ds-docs",
      "ds-language",
      "ds-a11y",
      "ds-release",
    ]) {
      expectEveryHarness(id, ["Do not self-check as “critique done.”"])
    }
  })

  it("expected: pipeline docs name Critique hop", () => {
    const kit = readFileSync("docs/AGENT-KIT.md", "utf8")
    expect(kit).toContain("Prototype → Critique → Architect → Critique → Coding → Critique")
    expect(kit).toContain("Language → Critique")
    expect(kit).toContain("AGENT-CRITIQUE.md")
  })

  it("expected: AGENT-CRITIQUE provenance and kit path", () => {
    const doc = readFileSync("docs/AGENT-CRITIQUE.md", "utf8")
    expect(doc).toContain("Anthropic")
    expect(doc).toContain("OpenAI")
    expect(doc).toContain("Conventional Comments")
    const kitManifest = JSON.parse(readFileSync(".agents/kit/manifest.json", "utf8"))
    expect(kitManifest.paths).toContain("docs/AGENT-CRITIQUE.md")
  })

  it("expected: role rubrics with automatic revise lines", () => {
    const rubrics = readFileSync(".agents/agents/references/critique.md", "utf8")
    for (const heading of [
      "## Prototype",
      "## Architect",
      "## Coding",
      "## Docs",
      "## Language",
      "## Accessibility",
      "## Release",
    ]) {
      expect(rubrics).toContain(heading)
    }
    expect(rubrics).toContain("automatic revise")
    expect(rubrics.match(/automatic revise/g)?.length).toBeGreaterThanOrEqual(7)
  })

  it("expected: critique presentation contract", () => {
    const present = readFileSync(".agents/agents/references/critique-present.md", "utf8")
    expect(present).toContain("No feedback sandwich")
    expect(present).toContain("nitpick` cannot force `revise`")
    expect(present).toContain("quote")
    expect(present).toContain("reasoning")
    expect(present).toContain("Do not echo producer claims")
    expect(present).toContain("label: issue")
    expect(present).toContain("blocking:")
    expect(present).toContain("observation:")
  })

  it("expected: critique standards and lesson template", () => {
    expect(existsSync(".agents/agents/references/critique-standards.md")).toBe(true)
    const template = readFileSync(".agents/agents/references/critique-lesson.md", "utf8")
    expect(template).toContain("lessonKind")
    expect(template).toContain("subjectAgent")
    expect(template).toContain("trigger")
    expect(template).toContain("critique-only")
    expect(template).toContain("lesson")
  })

  it("expected: handoffs require subjectAgent for critique", () => {
    const handoffs = readFileSync(".agents/agents/references/handoffs.md", "utf8")
    expect(handoffs).toContain("subjectAgent")
    expect(handoffs).toContain("critiqueRound")
  })

  it("forbidden: kit-copied playbooks treat one pack's folders as the only layout", () => {
    const kitManifest = JSON.parse(readFileSync(".agents/kit/manifest.json", "utf8")) as { paths: string[] }
    const isolationScripts = /scripts\/kit\/(lib|check|bootstrap)\.mjs$/
    const files: string[] = []
    const walk = (rel: string) => {
      if (!existsSync(rel)) return
      if (statSync(rel).isDirectory()) {
        for (const name of readdirSync(rel)) walk(`${rel}/${name}`)
        return
      }
      files.push(rel)
    }
    for (const rel of kitManifest.paths) walk(rel)
    for (const rel of files) {
      const body = readFileSync(rel, "utf8")
      if (rel.endsWith("scripts/kit/lib.mjs")) {
        expect(body).toContain("components/carina")
        expect(body).toContain("components/primitives")
      } else if (!isolationScripts.test(rel)) {
        expect(body, rel).not.toMatch(/components\/carina(?![\w-])/)
        expect(body, rel).not.toMatch(/components\/ui(?![\w-])/)
        expect(body, rel).not.toMatch(/Load `example-\*`/)
        expect(body, rel).not.toMatch(/id === ["']example["']/)
        expect(body, rel).not.toMatch(/\bexampleSkills\b/)
      }
    }
    const standards = readFileSync(".agents/agents/references/critique-standards.md", "utf8")
    expect(standards).toContain("paths.ui")
  })
})
