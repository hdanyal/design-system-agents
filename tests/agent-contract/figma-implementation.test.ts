import { readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"

describe("figma implementation", () => {
  it("expected: carina-figma prefers inventory and tokens over pasted code", () => {
    const skill = readFileSync(".agents/skills/carina-figma/SKILL.md", "utf8")
    expect(skill).toContain("canonical tokens")
    expect(skill).toContain("extend-ui")
  })

  it("forbidden: skill does not re-document official Figma APIs", () => {
    const skill = readFileSync(".agents/skills/carina-figma/SKILL.md", "utf8")
    expect(skill).toContain("official Figma skills")
    expect(skill).not.toContain("figma.currentPage")
  })
})
