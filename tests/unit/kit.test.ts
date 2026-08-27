import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import os from "node:os"
import path from "node:path"
import { spawnSync } from "node:child_process"
import { describe, expect, it } from "vitest"
import {
  matchMemoryRecords,
  routeIntent,
  scanHost,
  scanIdentityPaths,
  scanMemoryRecords,
  scanProgramInputs,
  seedHostSkills,
  seedMemoryLayout,
  validateMemoryFile,
  validateMemoryRecord,
  validateMemoryTree,
  validatePack,
  scanKitSourceForbidden,
  validateProgram,
  validateSharedMemorySlugs,
} from "../../scripts/kit/lib.mjs"

const root = process.cwd()
const miniHost = path.join(root, "tests/fixtures/mini-host")

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

  it("scanProgramInputs reads agent roster from kit checkout", () => {
    const manifest = JSON.parse(readFileSync(".agents/agents/manifest.json", "utf8")) as {
      agents: Array<{ id: string }>
    }
    const inputs = scanProgramInputs(root)
    expect(inputs.agents.map((agent: { id: string }) => agent.id)).toEqual(
      manifest.agents.map((agent) => agent.id)
    )
  })

  it("scanHost finds layers on mini-host fixture", () => {
    const inputs = scanProgramInputs(miniHost)
    expect(inputs.layerCounts.ui).toBeGreaterThan(0)
    expect(inputs.layerCounts.primitives).toBeGreaterThan(0)
  })

  it("skips live program board on kit source", () => {
    expect(existsSync(".agents/program/tasks.md")).toBe(false)
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

  it("records Storybook when present on fixture host", () => {
    const scan = scanHost(miniHost)
    expect(scan.preview.kind).toBe("storybook")
  })

  it("install does not copy Example tokens; upgrade does not wipe host memory", () => {
    const tmp = mkdtempSync(path.join(os.tmpdir(), "ds-kit-"))
    try {
      cpSync(path.join(root, "tests/fixtures/foreign-ds"), tmp, { recursive: true })
      const install = run("node", ["scripts/kit/install.mjs", "--dir", tmp])
      expect(install.status, install.stderr).toBe(0)
      expect(existsSync(path.join(tmp, "AGENTS.md"))).toBe(true)
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
    const foreign = readFileSync("tests/fixtures/foreign-ds/.agents/memory/shared/note.md", "utf8")
    expect(validateMemoryRecord(foreign, "acme")).toContain("mismatch")
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

  it("requires expiresAt but does not fail when the date is past", () => {
    const missing = `---
designSystemId: example
agent: ds-docs
title: No expiry
owner: test
reviewedAt: 2026-08-21
---
body`
    expect(validateMemoryRecord(missing, "example")).toContain("expiresAt")
    const past = `---
designSystemId: example
agent: ds-docs
title: Past expiry
owner: test
reviewedAt: 2026-08-21
expiresAt: 2020-01-01
entities: past-fact
---
body`
    expect(validateMemoryRecord(past, "example")).toBeNull()
  })

  it("marks expired records and omits them from sharedTitles", () => {
    const tmp = mkdtempSync(path.join(os.tmpdir(), "ds-mem-exp-"))
    try {
      cpSync(path.join(root, ".agents/agents"), path.join(tmp, ".agents/agents"), { recursive: true })
      seedMemoryLayout(tmp)
      const shared = path.join(tmp, ".agents/memory/shared")
      writeFileSync(
        path.join(shared, "fresh.md"),
        `---
designSystemId: example
agent: ds-docs
title: Fresh fact
owner: test
reviewedAt: 2026-08-21
expiresAt: 2099-01-01
entities: fresh
---
ok
`
      )
      writeFileSync(
        path.join(shared, "stale.md"),
        `---
designSystemId: example
agent: ds-docs
title: Stale fact
owner: test
reviewedAt: 2026-08-21
expiresAt: 2020-01-01
entities: stale
---
old
`
      )
      const scan = scanMemoryRecords(tmp)
      expect(scan.total).toBe(2)
      expect(scan.sharedTitles).toEqual(["Fresh fact"])
      expect(scan.entries.find((e: { entities: string }) => e.entities === "stale")?.expired).toBe(true)
      expect(scan.entries.find((e: { entities: string }) => e.entities === "fresh")?.expired).toBe(false)
    } finally {
      rmSync(tmp, { recursive: true, force: true })
    }
  })

  it("rejects duplicate shared entity slugs", () => {
    const tmp = mkdtempSync(path.join(os.tmpdir(), "ds-mem-dup-"))
    try {
      mkdirSync(path.join(tmp, ".agents/memory/shared"), { recursive: true })
      const body = (slug: string) => `---
designSystemId: example
agent: ds-docs
title: ${slug}
owner: test
reviewedAt: 2026-08-21
expiresAt: 2099-01-01
entities: ${slug}
---
x
`
      writeFileSync(path.join(tmp, ".agents/memory/shared/heading-group.md"), body("heading-group"))
      writeFileSync(path.join(tmp, ".agents/memory/shared/heading-group-2.md"), body("heading-group"))
      expect(validateSharedMemorySlugs(tmp)).toContain("duplicate")
    } finally {
      rmSync(tmp, { recursive: true, force: true })
    }
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
      { $schemaVersion: "1", kitVersion: "0.1.0", bootstrapStatus: "complete", id: "acme" }
    )
    expect(errors.length).toBeGreaterThan(0)
  })

  it("bootstrap scan prints a human recap", () => {
    const tmp = mkdtempSync(path.join(os.tmpdir(), "ds-bootstrap-scan-"))
    try {
      cpSync(path.join(root, "tests/fixtures/foreign-ds"), tmp, { recursive: true })
      run("node", ["scripts/kit/install.mjs", "--dir", tmp])
      const scan = run("node", ["scripts/kit/bootstrap.mjs", "--dir", tmp])
      expect(scan.status, scan.stderr).toBe(0)
      expect(scan.stdout).toContain("Human recap:")
    } finally {
      rmSync(tmp, { recursive: true, force: true })
    }
  })

  it("refuses first pack write without --confirm-write", () => {
    const tmp = mkdtempSync(path.join(os.tmpdir(), "ds-bootstrap-refuse-"))
    try {
      cpSync(path.join(root, "tests/fixtures/foreign-ds"), tmp, { recursive: true })
      run("node", ["scripts/kit/install.mjs", "--dir", tmp])
      const bootstrap = run("node", ["scripts/kit/bootstrap.mjs", "--dir", tmp, "--write"])
      expect(bootstrap.status).not.toBe(0)
      expect(bootstrap.stderr || bootstrap.stdout).toMatch(/confirm-write/)
      expect(existsSync(path.join(tmp, ".agents/context.json"))).toBe(false)
    } finally {
      rmSync(tmp, { recursive: true, force: true })
    }
  })

  it("kit:init without --write does not create a pack", () => {
    const tmp = mkdtempSync(path.join(os.tmpdir(), "ds-kit-init-"))
    try {
      cpSync(path.join(root, "tests/fixtures/foreign-ds"), tmp, { recursive: true })
      const init = run("node", ["scripts/kit/init.mjs", "--dir", tmp])
      expect(init.status, init.stderr).toBe(0)
      expect(existsSync(path.join(tmp, ".agents/context.json"))).toBe(false)
    } finally {
      rmSync(tmp, { recursive: true, force: true })
    }
  })

  it("identity-scan reports clean kit source", () => {
    const scan = run("node", ["scripts/kit/identity-scan.mjs", "--dir", root])
    expect(scan.status, scan.stderr).toBe(0)
    expect(scan.stdout).toContain("Kit source is clean")
    expect(scanKitSourceForbidden(root)).toEqual([])
  })

  it("seedHostSkills writes foreign-ds-* stubs", () => {
    const tmp = mkdtempSync(path.join(os.tmpdir(), "ds-seed-skills-"))
    try {
      cpSync(path.join(root, ".agents/agents"), path.join(tmp, ".agents/agents"), { recursive: true })
      cpSync(path.join(root, ".agents/kit/skill-templates"), path.join(tmp, ".agents/kit/skill-templates"), {
        recursive: true,
      })
      writeFileSync(path.join(tmp, ".agents/kit/manifest.json"), readFileSync(path.join(root, ".agents/kit/manifest.json")))
      const result = seedHostSkills(tmp, "foreign-ds")
      expect(result.ok).toBe(true)
      expect(existsSync(path.join(tmp, ".agents/skills/foreign-ds-onboard/SKILL.md"))).toBe(true)
      const manifest = JSON.parse(readFileSync(path.join(tmp, ".agents/skills/manifest.json"), "utf8"))
      expect(manifest.skills.some((s: { name: string }) => s.name === "foreign-ds-onboard")).toBe(true)
    } finally {
      rmSync(tmp, { recursive: true, force: true })
    }
  })

  it("scanProgramInputs reports memoryExpired/memoryTotal zeros without a memory dir", () => {
    const tmp = mkdtempSync(path.join(os.tmpdir(), "ds-prog-mem-"))
    try {
      mkdirSync(path.join(tmp, ".agents/program"), { recursive: true })
      writeFileSync(
        path.join(tmp, ".agents/program", "board.md"),
        "---\ndesignSystemId: example\nrecommendedNext: human\nreconciledAt: 2026-08-21\n---\n"
      )
      const inputs = scanProgramInputs(tmp)
      expect(inputs.memoryExpired).toBe(0)
      expect(inputs.memoryTotal).toBe(0)
    } finally {
      rmSync(tmp, { recursive: true, force: true })
    }
  })

  it("path-aware memory gates reject wrong folder, unused stubs, nested files, and over-cap bodies", () => {
    const sharedOk = `---
designSystemId: example
agent: ds-docs
title: Heading group catalog fact
evidence: components/primitives/heading-group/USAGE.md
decision: enhanced
applicability: this pack
source: PR
owner: test
reviewedAt: 2026-08-21
expiresAt: 2099-01-01
entities: heading-group
supersedes:
---

- **entity** — heading-group at components/primitives/heading-group
- **layer** — primitive
- **decision** — enhanced
- **changed-API** — title + description slots
- **do-not-clone** — reuse heading-group for page/section titles
- **story** — Primitives/HeadingGroup
`
    expect(validateMemoryFile(sharedOk, "example", ".agents/memory/shared/heading-group.md", root)).toBeNull()
    expect(
      validateMemoryFile(sharedOk, "example", ".agents/memory/ds-docs/heading-group.md", root)
    ).toContain("unused stub")
    expect(
      validateMemoryFile(
        sharedOk.replace("agent: ds-docs", "agent: ds-architect"),
        "example",
        ".agents/memory/shared/heading-group.md",
        root
      )
    ).toContain("ds-docs")
    expect(
      validateMemoryFile(sharedOk, "example", ".agents/memory/shared/nested/heading-group.md", root)
    ).toContain("flat")
    expect(validateMemoryFile(sharedOk, "example", ".agents/memory/heading-group.md", root)).toContain(
      "root"
    )

    const noEntities = sharedOk.replace("entities: heading-group\n", "")
    expect(
      validateMemoryFile(noEntities, "example", ".agents/memory/shared/heading-group.md", root)
    ).toContain("entities")

    const dumpBody = `${sharedOk.split("---\n").slice(0, 2).join("---\n")}---\n\n${"line\n".repeat(51)}`
    expect(
      validateMemoryFile(dumpBody, "example", ".agents/memory/shared/heading-group.md", root)
    ).toContain("50 lines")

    const withOklch = sharedOk.replace(
      "- **story** — Primitives/HeadingGroup\n",
      "- **story** — Primitives/HeadingGroup\n- **note** — oklch(0.5 0.1 120)\n"
    )
    expect(
      validateMemoryFile(withOklch, "example", ".agents/memory/shared/heading-group.md", root)
    ).toContain("oklch")

    const lesson = `---
designSystemId: example
agent: ds-architect
title: Twin avoided for page chrome
evidence: handoff-1
applicability: this pack
source: harvest
owner: test
reviewedAt: 2026-08-21
expiresAt: 2099-01-01
trigger: page-header
supersedes:
---

- **lessonKind** — twin-avoided
- **lesson** — enhance page-header rather than extract twin chrome
- **do-not-repeat** — LoadingPageHeader twin
`
    expect(validateMemoryFile(lesson, "example", ".agents/memory/ds-architect/page-header.md", root)).toBeNull()
    expect(
      validateMemoryFile(lesson.replace("trigger: page-header\n", ""), "example", ".agents/memory/ds-architect/page-header.md", root)
    ).toContain("trigger")
  })

  it("validateMemoryTree accepts empty layout and rejects nested .md", () => {
    const tmp = mkdtempSync(path.join(os.tmpdir(), "ds-mem-tree-"))
    try {
      cpSync(path.join(root, ".agents/agents"), path.join(tmp, ".agents/agents"), { recursive: true })
      seedMemoryLayout(tmp)
      expect(validateMemoryTree(tmp, "example")).toEqual([])
      expect(scanMemoryRecords(tmp).total).toBe(0)

      mkdirSync(path.join(tmp, ".agents/memory/shared/nested"), { recursive: true })
      writeFileSync(
        path.join(tmp, ".agents/memory/shared/nested/bad.md"),
        `---
designSystemId: example
agent: ds-docs
title: Bad nested
evidence: x
owner: test
reviewedAt: 2026-08-21
expiresAt: 2099-01-01
entities: bad
---
ok
`
      )
      const nestedErrs = validateMemoryTree(tmp, "example")
      expect(nestedErrs.some((e) => /nested/i.test(e))).toBe(true)

      writeFileSync(path.join(tmp, ".agents/memory/ds-prototype/diary.md"), "---\ndesignSystemId: example\nagent: ds-prototype\ntitle: x\nowner: t\nreviewedAt: 2026-08-21\nexpiresAt: 2099-01-01\n---\nx\n")
      const stubErrs = validateMemoryTree(tmp, "example")
      expect(stubErrs.some((e) => /unused stub/i.test(e))).toBe(true)
    } finally {
      rmSync(tmp, { recursive: true, force: true })
    }
  })

  it("matchMemoryRecords exact-matches keys and skips expired", () => {
    const tmp = mkdtempSync(path.join(os.tmpdir(), "ds-mem-match-"))
    try {
      cpSync(path.join(root, ".agents/agents"), path.join(tmp, ".agents/agents"), { recursive: true })
      seedMemoryLayout(tmp)
      writeFileSync(
        path.join(tmp, ".agents/memory/shared/heading-group.md"),
        `---
designSystemId: example
agent: ds-docs
title: Heading group catalog fact
owner: test
reviewedAt: 2026-08-21
expiresAt: 2099-01-01
entities: heading-group
---
ok
`
      )
      writeFileSync(
        path.join(tmp, ".agents/memory/shared/stale.md"),
        `---
designSystemId: example
agent: ds-docs
title: Stale
owner: test
reviewedAt: 2026-08-21
expiresAt: 2020-01-01
entities: stale
---
old
`
      )
      expect(matchMemoryRecords(tmp, "heading-group").map((e) => e.entities)).toEqual(["heading-group"])
      expect(matchMemoryRecords(tmp, "stale")).toEqual([])
      expect(matchMemoryRecords(tmp, "heading")).toEqual([])
      expect(scanProgramInputs(tmp).memoryTotal).toBe(2)
      expect(scanProgramInputs(tmp).memoryExpired).toBe(1)
    } finally {
      rmSync(tmp, { recursive: true, force: true })
    }
  })

  it("kit-check passes empty memory and fails nested memory on a temp host", () => {
    const tmp = mkdtempSync(path.join(os.tmpdir(), "ds-kit-check-mem-"))
    try {
      cpSync(path.join(root, "tests/fixtures/foreign-ds"), tmp, { recursive: true })
      run("node", ["scripts/kit/install.mjs", "--dir", tmp])
      writeFileSync(
        path.join(tmp, ".agents/context.json"),
        JSON.stringify(
          {
            $schemaVersion: "1",
            kitVersion: "0.2.0",
            bootstrapStatus: "draft",
            id: "foreign-ds",
            paths: { ui: "src/components/ui" },
          },
          null,
          2
        )
      )
      // Foreign fixture note lacks full body shape; remove so empty tree can pass path-aware check.
      rmSync(path.join(tmp, ".agents/memory/shared/note.md"), { force: true })
      seedMemoryLayout(tmp)
      expect(validateMemoryTree(tmp, "foreign-ds")).toEqual([])

      mkdirSync(path.join(tmp, ".agents/memory/shared/nested"), { recursive: true })
      writeFileSync(path.join(tmp, ".agents/memory/shared/nested/x.md"), "---\ndesignSystemId: foreign-ds\nagent: ds-docs\ntitle: x\nevidence: e\nowner: t\nreviewedAt: 2026-08-21\nexpiresAt: 2099-01-01\nentities: x\n---\nok\n")
      const nestedErrs = validateMemoryTree(tmp, "foreign-ds")
      expect(nestedErrs.some((e) => /nested/i.test(e))).toBe(true)
    } finally {
      rmSync(tmp, { recursive: true, force: true })
    }
  })
})
