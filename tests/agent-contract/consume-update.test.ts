import { readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"

describe("consume/update", () => {
  it("expected: consumers pin immutable versions and keep a lockfile", () => {
    const adoption = readFileSync("docs/ADOPTION.md", "utf8")
    const skill = readFileSync(".agents/skills/carina-consume/SKILL.md", "utf8")
    expect(adoption).toContain("/r/v")
    expect(adoption).toContain("carina.lock.json")
    expect(skill).toContain("carina.lock.json")
  })

  it("forbidden: /r/dev or /latest in product apps", () => {
    const adoption = readFileSync("docs/ADOPTION.md", "utf8")
    expect(adoption).toContain("Never point production")
  })
})
