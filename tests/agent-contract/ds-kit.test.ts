import { existsSync, readFileSync, readdirSync } from "node:fs"
import { describe, expect, it } from "vitest"

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

  it("forbidden: carina-onboard as a second auto-select cold start", () => {
    const manifest = JSON.parse(readFileSync(".agents/skills/manifest.json", "utf8"))
    const onboard = manifest.skills.find((s: { name: string }) => s.name === "carina-onboard")
    expect(onboard.invocation).not.toBe("auto-select")
    const agents = readFileSync("AGENTS.md", "utf8")
    expect(agents).toContain("ds-release")
    expect(agents).not.toContain("Load `carina-onboard`, then exactly one owning skill.")
  })

  it("expected: present contract names Storybook command", () => {
    const present = readFileSync(".agents/agents/references/present.md", "utf8")
    expect(present).toContain("start command")
    expect(present).toContain("shown")
    const proto = readFileSync(".agents/agents/ds-prototype.md", "utf8")
    expect(proto).toContain("shown: yes|no")
  })

  it("forbidden: mixing another pack's memory into Carina", () => {
    const rule = readFileSync(".cursor/rules/ds-kit.mdc", "utf8")
    expect(rule).toContain("Never mix another design system's chats")
    const generated = readdirSync(".cursor/agents")
    expect(generated.filter((name) => name.startsWith("ds-") && name.endsWith(".md")).length).toBeGreaterThanOrEqual(
      10
    )
  })

  it("expected: Manager loads the live roster and does not freeze other agent names", () => {
    const manager = readFileSync(".agents/agents/ds-manager.md", "utf8")
    expect(manager).toContain(".agents/agents/manifest.json")
    expect(manager).toContain("Do not hardcode other agent names")
    expect(manager).toContain("scanProgramInputs")
  })
})
