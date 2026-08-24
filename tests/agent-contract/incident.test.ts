import { readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"

describe("incident", () => {
  it("expected: stop publication and pin a known-good immutable release", () => {
    const incidents = readFileSync("docs/INCIDENTS.md", "utf8")
    const skill = readFileSync(".agents/skills/example-incident/SKILL.md", "utf8")
    expect(incidents).toContain("known-good immutable")
    expect(skill).toContain("INCIDENTS.md")
  })

  it("forbidden: overwriting previous versioned artifacts", () => {
    const incidents = readFileSync("docs/INCIDENTS.md", "utf8")
    expect(incidents).toContain("never overwritten")
  })
})
