import { readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"

describe("update shadcn", () => {
  it("expected: pin and patch ledger are required", () => {
    const skill = readFileSync(".agents/kit/skill-templates/template-update-shadcn/SKILL.md", "utf8")
    expect(skill).toContain("upstream-patches.json")
    expect(skill).toContain("4.18.0")
  })

  it("forbidden: overwriting host primitives", () => {
    const skill = readFileSync(".agents/kit/skill-templates/template-update-shadcn/SKILL.md", "utf8")
    expect(skill).toContain("paths.primitives")
  })
})
