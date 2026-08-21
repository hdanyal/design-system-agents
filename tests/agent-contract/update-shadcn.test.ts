import { readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"

describe("update shadcn", () => {
  it("expected: pin and patch ledger are required", () => {
    const skill = readFileSync(".agents/skills/carina-update-shadcn/SKILL.md", "utf8")
    const ledger = JSON.parse(readFileSync("upstream-patches.json", "utf8"))
    expect(skill).toContain("upstream-patches.json")
    expect(skill).toContain("4.18.0")

    // Stock may be patched, but only through a fully attributed ledger entry.
    for (const patch of ledger.patches) {
      expect(patch.component).toBeTruthy()
      expect(patch.reason).toBeTruthy()
      expect(patch.owner).toBeTruthy()
      expect(patch.removalCondition).toBeTruthy()
    }
  })

  it("forbidden: overwriting Carina primitives", () => {
    const skill = readFileSync(".agents/skills/carina-update-shadcn/SKILL.md", "utf8")
    expect(skill).toContain("components/carina")
  })
})
