import { readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"

describe("agent tooling", () => {
  it("expected: agent-tooling.json is the MCP source", () => {
    const tooling = JSON.parse(readFileSync("agent-tooling.json", "utf8"))
    const skill = readFileSync(".agents/skills/carina-agent-tooling/SKILL.md", "utf8")
    expect(tooling.mcpServers.shadcn.args).toContain("shadcn@4.18.0")
    expect(skill).toContain("agent-tooling.json")
  })

  it("forbidden: hand-editing generated MCP config", () => {
    const skill = readFileSync(".agents/skills/carina-agent-tooling/SKILL.md", "utf8")
    expect(skill).toContain(".cursor/mcp.json")
  })
})
