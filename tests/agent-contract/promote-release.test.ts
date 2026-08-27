import { readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"

describe("promote/release", () => {
  it("expected: promotion stays experimental and release is explicit", () => {
    const promote = readFileSync(".agents/kit/skill-templates/template-promote-block/SKILL.md", "utf8")
    const release = readFileSync(".agents/kit/skill-templates/template-release/SKILL.md", "utf8")
    const meta = JSON.parse(
      readFileSync("tests/fixtures/mini-host/registry/blocks/mini-block/meta.json", "utf8")
    )
    expect(promote).toContain("experimental")
    expect(promote).toContain("HITL")
    expect(release).toContain("explicit")
    expect(meta.type).toBe("registry:block")
  })

  it("expected: a view yields independently reviewed slices and memory lands after HITL", () => {
    const promote = readFileSync(".agents/kit/skill-templates/template-promote-block/SKILL.md", "utf8")
    expect(promote).toContain("multiple experimental slices over time")
    expect(promote).toContain("do not write `.agents/memory/shared/` in the same turn as promotion")
    const memory = readFileSync("docs/AGENT-MEMORY.md", "utf8")
    expect(memory).toContain("**proposes** the fact")
    expect(memory).toContain("waits for explicit human acknowledgement")
  })

  it("forbidden: committing generated public/r from promote", () => {
    const promote = readFileSync(".agents/kit/skill-templates/template-promote-block/SKILL.md", "utf8")
    expect(promote).toContain("public/r")
  })
})
