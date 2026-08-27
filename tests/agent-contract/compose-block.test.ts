import { readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"

describe("compose/build block", () => {
  it("expected: mini-host fixture has a block meta stub", () => {
    const meta = JSON.parse(
      readFileSync("tests/fixtures/mini-host/registry/blocks/mini-block/meta.json", "utf8")
    )
    expect(meta.name).toBe("mini-block")
    expect(meta.type).toBe("registry:block")
  })
})
