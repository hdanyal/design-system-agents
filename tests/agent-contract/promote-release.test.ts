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

  it("expected: a view yields independently reviewed slices and memory lands after HITL", () => {
    const promote = readFileSync(".agents/skills/carina-promote-block/SKILL.md", "utf8")
    expect(promote).toContain("multiple experimental slices over time")
    expect(promote).toContain("do not write `.agents/memory/shared/` in the same turn as promotion")
    const memory = readFileSync("docs/AGENT-MEMORY.md", "utf8")
    expect(memory).toContain("**proposes** the fact")
    expect(memory).toContain("waits for explicit human acknowledgement")
  })

  it("forbidden: committing generated public/r from promote", () => {
    const promote = readFileSync(".agents/skills/carina-promote-block/SKILL.md", "utf8")
    expect(promote).toContain("public/r")
  })
})
