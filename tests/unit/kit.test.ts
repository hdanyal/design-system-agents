import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import os from "node:os"
import path from "node:path"
import { spawnSync } from "node:child_process"
import { describe, expect, it } from "vitest"
import {
  routeIntent,
  scanHost,
  scanMemoryRecords,
  scanProgramInputs,
  seedMemoryLayout,
  validateMemoryRecord,
  validatePack,
  validateProgram,
} from "../../scripts/kit/lib.mjs"

const root = process.cwd()

function run(command: string, args: string[], cwd = root) {
  return spawnSync(command, args, { cwd, encoding: "utf8" })
}

describe("portable agent kit", () => {
  it("routes named invoke over intent and eval utterances to one owner", async () => {
    const manifest = JSON.parse(readFileSync(".agents/agents/manifest.json", "utf8"))
    expect(routeIntent("ds-manager: what's next", manifest).owner).toBe("ds-manager")
    expect(routeIntent("set up the repo", manifest).ambiguous).toBe(true)
    const evalFile = JSON.parse(readFileSync(".agents/kit/intent-eval.json", "utf8")) as {
      utterances: Array<{ text: string; owner: string }>
    }
    for (const row of evalFile.utterances) {
      const result = routeIntent(row.text, manifest)
      expect(result.owner, row.text).toBe(row.owner)
    }
  })

  it("does not invent a Figma key on a host without tokens", () => {
    const scan = scanHost(path.join(root, "tests/fixtures/foreign-ds"))
    expect(scan.figmaFileKey).toBeNull()
    expect(scan.guessed.tokens).toBeNull()
    expect(scan.guessed.ui).toBe("src/components/ui")
    expect(scan.preview.kind).toBe("missing")
    expect(scan.gaps.some((g: { id: string }) => g.id === "paths.tokens")).toBe(true)
  })

  it("scanProgramInputs includes the live roster and does not trust inventory stories", () => {
    const manifest = JSON.parse(readFileSync(".agents/agents/manifest.json", "utf8")) as {
      agents: Array<{ id: string }>
    }
    const inputs = scanProgramInputs(root)
    expect(inputs.agents.map((agent: { id: string }) => agent.id)).toEqual(
      manifest.agents.map((agent) => agent.id)
    )
    expect(inputs.layerCounts.ui).toBeGreaterThan(0)
    expect(inputs.layerCounts.primitives).toBeGreaterThan(0)
    expect(inputs.storyCoverage.ui.N).toBe(inputs.layerCounts.ui)
    const inventory = JSON.parse(readFileSync(".agents/inventory/components.json", "utf8")) as {
      entities: Array<{ stories: unknown[] }>
    }
    expect(inventory.entities.every((entity) => entity.stories.length === 0)).toBe(true)
    expect(inputs.storyCoverage.primitives.n).toBeGreaterThanOrEqual(0)
  })

  it("reads a second tasks table without treating its header as a task row", () => {
    const tmp = mkdtempSync(path.join(os.tmpdir(), "ds-program-"))
    try {
      const programDir = path.join(tmp, ".agents/program")
      mkdirSync(programDir, { recursive: true })
      writeFileSync(path.join(programDir, "board.md"), "---\ndesignSystemId: example\n---\n")
      writeFileSync(
        path.join(programDir, "tasks.md"),
        [
          "# Tasks",
          "",
          "| id | title | owner | status |",
          "| --- | --- | --- | --- |",
          "| T-01 | Live task | ds-coding | open |",
          "",
          "## Archived",
          "",
          "| id | title | owner | status |",
          "| --- | --- | --- | --- |",
          "| T-00 | Archived task | ds-prototype | cancelled |",
          "",
        ].join("\n")
      )
      expect(validateProgram(tmp, "example", ["ds-coding", "ds-prototype"])).toEqual([])
      expect(scanProgramInputs(tmp).program.taskIds).toEqual(["T-01", "T-00"])
    } finally {
      rmSync(tmp, { recursive: true, force: true })
    }
  })

  it("keeps this host's program table owners valid", () => {
    const tasksPath = ".agents/program/tasks.md"
    if (!existsSync(tasksPath)) return
    const manifest = JSON.parse(readFileSync(".agents/agents/manifest.json", "utf8")) as {
      agents: Array<{ id: string }>
    }
    expect(readFileSync(tasksPath, "utf8").match(/^\|\s*id\s*\|/gm)?.length ?? 0).toBeGreaterThan(1)
    const pack = JSON.parse(readFileSync(".agents/context.json", "utf8"))
    expect(
      validateProgram(
        root,
        pack.id,
        manifest.agents.map((agent) => agent.id)
      )
    ).toEqual([])
  })

  it("records Storybook when present", () => {
    const scan = scanHost(root)
    expect(scan.preview.kind).toBe("storybook")
    expect(scan.preview.port).toBe(6006)
  })

  it("install does not copy Example tokens; upgrade does not wipe host memory", () => {
    const tmp = mkdtempSync(path.join(os.tmpdir(), "ds-kit-"))
    try {
      cpSync(path.join(root, "tests/fixtures/foreign-ds"), tmp, { recursive: true })
      const install = run("node", ["scripts/kit/install.mjs", "--dir", tmp])
      expect(install.status, install.stderr).toBe(0)
      expect(existsSync(path.join(tmp, "tokens.json"))).toBe(false)
      expect(existsSync(path.join(tmp, ".cursor/agents/ds-coding.md"))).toBe(true)
      expect(existsSync(path.join(tmp, ".cursor/agents/ds-manager.md"))).toBe(true)
      expect(existsSync(path.join(tmp, ".agents/program"))).toBe(false)
      const note = path.join(tmp, ".agents/memory/shared/note.md")
      expect(readFileSync(note, "utf8")).toContain("foreign-ds")
      const programDir = path.join(tmp, ".agents/program")
      mkdirSync(programDir, { recursive: true })
      writeFileSync(
        path.join(programDir, "board.md"),
        "---\ndesignSystemId: foreign-ds\nrecommendedNext: human\nreconciledAt: 2026-08-21\n---\n"
      )
      writeFileSync(
        path.join(tmp, ".agents/context.json"),
        JSON.stringify(
          {
            $schemaVersion: "1",
            kitVersion: "0.0.0",
            bootstrapStatus: "draft",
            id: "foreign-ds",
            paths: { ui: "src/components/ui" },
          },
          null,
          2
        )
      )
      const upgrade = run("node", ["scripts/kit/upgrade.mjs", "--dir", tmp])
      expect(upgrade.status, upgrade.stderr).toBe(0)
      expect(readFileSync(note, "utf8")).toContain("foreign-ds")
      expect(readFileSync(path.join(programDir, "board.md"), "utf8")).toContain("foreign-ds")
      const pack = JSON.parse(readFileSync(path.join(tmp, ".agents/context.json"), "utf8"))
      expect(pack.id).toBe("foreign-ds")
      expect(pack.kitVersion).toBe("0.2.0")
    } finally {
      rmSync(tmp, { recursive: true, force: true })
    }
  })

  it("rejects memory from another design system id", () => {
    const pack = JSON.parse(readFileSync(".agents/context.json", "utf8"))
    const foreign = readFileSync("tests/fixtures/foreign-ds/.agents/memory/shared/note.md", "utf8")
    expect(validateMemoryRecord(foreign, pack.id)).toContain("mismatch")
  })

  it("rejects memory missing owner or reviewedAt", () => {
    const incomplete = `---
designSystemId: example
agent: ds-docs
title: Incomplete
---
body`
    expect(validateMemoryRecord(incomplete, "example")).toContain("owner")
    const noDate = `---
designSystemId: example
agent: ds-docs
title: No date
owner: test
---
body`
    expect(validateMemoryRecord(noDate, "example")).toContain("reviewedAt")
  })

  it("seedMemoryLayout creates shared and per-agent namespaces without md records", () => {
    const tmp = mkdtempSync(path.join(os.tmpdir(), "ds-mem-"))
    try {
      cpSync(path.join(root, ".agents/agents"), path.join(tmp, ".agents/agents"), { recursive: true })
      seedMemoryLayout(tmp)
      expect(existsSync(path.join(tmp, ".agents/memory/shared/.gitkeep"))).toBe(true)
      expect(existsSync(path.join(tmp, ".agents/memory/ds-docs/.gitkeep"))).toBe(true)
      expect(existsSync(path.join(tmp, ".agents/memory/ds-manager/.gitkeep"))).toBe(true)
      const scan = scanMemoryRecords(tmp)
      expect(scan.total).toBe(0)
      expect(scan.sharedTitles).toEqual([])
    } finally {
      rmSync(tmp, { recursive: true, force: true })
    }
  })

  it("bootstrap --write on a temp host seeds empty memory layout", () => {
    const tmp = mkdtempSync(path.join(os.tmpdir(), "ds-bootstrap-mem-"))
    try {
      cpSync(path.join(root, "tests/fixtures/foreign-ds"), tmp, { recursive: true })
      run("node", ["scripts/kit/install.mjs", "--dir", tmp])
      const bootstrap = run("node", [
        "scripts/kit/bootstrap.mjs",
        "--dir",
        tmp,
        "--write",
        "--confirm-write",
      ])
      expect(bootstrap.status, bootstrap.stderr).toBe(0)
      expect(existsSync(path.join(tmp, ".agents/memory/shared/.gitkeep"))).toBe(true)
      expect(existsSync(path.join(tmp, ".agents/memory/ds-docs/.gitkeep"))).toBe(true)
      expect(scanMemoryRecords(tmp).total).toBe(1)
    } finally {
      rmSync(tmp, { recursive: true, force: true })
    }
  })

  it("complete pack requires id and tokens or deferral", () => {
    const errors = validatePack(
      { $schemaVersion: "1", kitVersion: "0.1.0", bootstrapStatus: "complete", id: "acme" },
      { allowExampleId: false }
    )
    expect(errors.length).toBeGreaterThan(0)
  })
})
