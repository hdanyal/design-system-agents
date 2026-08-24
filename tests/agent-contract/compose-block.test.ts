import { readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"

describe("compose/build block", () => {
  it("expected: page-header inventories heading-group and separator", () => {
    const usage = readFileSync("registry/blocks/page-header/USAGE.md", "utf8")
    const source = readFileSync("registry/blocks/page-header/page-header.tsx", "utf8")
    expect(usage).toContain("heading-group")
    expect(source).toContain("@/components/primitives/heading-group/heading-group")
    expect(source).toContain("@/components/ui/separator")
  })

  it("forbidden: block does not clone heading markup or edit stock", () => {
    const source = readFileSync("registry/blocks/page-header/page-header.tsx", "utf8")
    expect(source).not.toContain("font-heading text-2xl")
    expect(source).not.toContain("components/ui/button.tsx")
  })
})
