import { readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"

describe("promote/release", () => {
  it("expected: promotion stays experimental and release is explicit", () => {
    const promote = readFileSync(".agents/skills/carina-promote-block/SKILL.md", "utf8")
    const release = readFileSync(".agents/skills/carina-release/SKILL.md", "utf8")
    const meta = JSON.parse(readFileSync("registry/blocks/page-header/meta.json", "utf8"))
    expect(promote).toContain("experimental")
    expect(promote).toContain("HITL")
    expect(release).toContain("explicit")
    expect(meta.status).toBe("experimental")
  })

  it("forbidden: committing generated public/r from promote", () => {
    const promote = readFileSync(".agents/skills/carina-promote-block/SKILL.md", "utf8")
    expect(promote).toContain("public/r")
  })
})
