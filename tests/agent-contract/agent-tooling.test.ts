import { readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"

describe("agent tooling", () => {
  it("expected: skill documents host agent-tooling.json", () => {
    const skill = readFileSync(".agents/kit/skill-templates/template-agent-tooling/SKILL.md", "utf8")
    expect(skill).toContain("agent-tooling.json")
    expect(skill).toContain("agents:sync")
  })

  it("forbidden: hand-editing generated MCP config", () => {
    const skill = readFileSync(".agents/kit/skill-templates/template-agent-tooling/SKILL.md", "utf8")
    expect(skill).toContain(".cursor/mcp.json")
  })
})
