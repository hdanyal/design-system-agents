import { readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"

describe("lifecycle", () => {
  it("expected: stable promotion is a separate PR with replacement rules", () => {
    const governance = readFileSync("docs/GOVERNANCE.md", "utf8")
    const skill = readFileSync(".agents/skills/carina-lifecycle/SKILL.md", "utf8")
    expect(governance).toContain("Separate lifecycle PR")
    expect(skill).toContain("Deprecation")
  })

  it("forbidden: bundling stable into initial creation", () => {
    const governance = readFileSync("docs/GOVERNANCE.md", "utf8")
    expect(governance).toContain("cannot be bundled into initial creation")
  })
})
