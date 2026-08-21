import { existsSync, readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"

describe("canonical tokens", () => {
  it("defines concrete color values instead of CSS var pointers", () => {
    const tokens = JSON.parse(readFileSync("tokens.json", "utf8")) as {
      color: Record<string, { $value: { light: string } | string }>
    }
    for (const [name, token] of Object.entries(tokens.color)) {
      const value = typeof token.$value === "string" ? token.$value : token.$value.light
      expect(value.includes("var(--"), name).toBe(false)
      expect(value.startsWith("oklch(") || value.includes("oklch("), name).toBe(true)
    }
  })

  it("keeps generated CSS present for the app", () => {
    expect(existsSync("app/tokens.generated.css")).toBe(true)
  })
})
