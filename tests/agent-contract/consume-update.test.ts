import { readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"

describe("consume/update", () => {
  it("expected: consumers pin immutable versions and keep a lockfile", () => {
    const adoption = readFileSync("docs/ADOPTION.md", "utf8")
    const skill = readFileSync(".agents/skills/example-consume/SKILL.md", "utf8")
    expect(adoption).toContain("/r/v")
    expect(adoption).toContain("example.lock.json")
    expect(skill).toContain("example.lock.json")
  })

  it("forbidden: /r/dev or /latest in product apps", () => {
    const adoption = readFileSync("docs/ADOPTION.md", "utf8")
    expect(adoption).toContain("Never point production")
  })
})
