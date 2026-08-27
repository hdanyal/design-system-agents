import { readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"

describe("consume/update", () => {
  it("expected: consumers pin immutable versions and keep a lockfile", () => {
    const adoption = readFileSync(".agents/kit/host-policy/docs/ADOPTION.md", "utf8")
    const skill = readFileSync(".agents/kit/skill-templates/template-consume/SKILL.md", "utf8")
    expect(adoption).toContain("/r/v")
    expect(adoption).toContain("lockfile")
    expect(skill).toContain("host.lock.json")
  })

  it("forbidden: /r/dev or /latest in product apps", () => {
    const adoption = readFileSync(".agents/kit/host-policy/docs/ADOPTION.md", "utf8")
    expect(adoption).toContain("Never point production")
  })
})
