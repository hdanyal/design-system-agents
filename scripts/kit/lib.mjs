import { createHash } from "node:crypto"
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

export const SCHEMA_VERSION = "1"
export const ID_RE = /^[a-z][a-z0-9-]{1,63}$/
export const MARKER_BEGIN = "<!-- BEGIN ds-kit-agents -->"
export const MARKER_END = "<!-- END ds-kit-agents -->"
export const GENERATED_HEADER = "GENERATED from .agents/agents. Do not hand-edit. Run pnpm agents:sync."

const HERE = path.dirname(fileURLToPath(import.meta.url))
export const KIT_SCRIPTS = HERE

export function kitRootFromScripts(scriptsKitDir = HERE) {
  return path.resolve(scriptsKitDir, "../..")
}

export function fail(message) {
  console.error(message)
  process.exit(1)
}

export function readJson(file) {
  return JSON.parse(readFileSync(file, "utf8"))
}

export function writeJson(file, value) {
  mkdirSync(path.dirname(file), { recursive: true })
  writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`)
}

export function writeText(file, value) {
  mkdirSync(path.dirname(file), { recursive: true })
  const body = value.endsWith("\n") ? value : `${value}\n`
  writeFileSync(file, body)
}

export function sha256(contents) {
  return createHash("sha256").update(contents).digest("hex")
}

export function loadKitManifest(root) {
  return readJson(path.join(root, ".agents/kit/manifest.json"))
}

export function loadAgentManifest(root) {
  return readJson(path.join(root, ".agents/agents/manifest.json"))
}

export const HOST_PROTECTED = [
  ".agents/context.json",
  ".agents/inventory",
  ".agents/memory",
  "agent-tooling.json",
  ".agents/program",
  ".agents/handoffs",
]

export function isProtectedRel(rel) {
  const normalized = rel.split(path.sep).join("/")
  return HOST_PROTECTED.some(
    (item) => normalized === item || normalized.startsWith(`${item}/`)
  )
}

export function walkFiles(dir, ignore = new Set(["node_modules", ".git", "generated"])) {
  if (!existsSync(dir)) return []
  const out = []
  for (const entry of readdirSync(dir)) {
    if (ignore.has(entry)) continue
    const full = path.join(dir, entry)
    const stat = statSync(full)
    if (stat.isDirectory()) out.push(...walkFiles(full, ignore))
    else out.push(full)
  }
  return out
}

export function parseFrontmatter(markdown) {
  if (!markdown.startsWith("---\n")) return { data: {}, body: markdown }
  const end = markdown.indexOf("\n---\n", 4)
  if (end === -1) return { data: {}, body: markdown }
  const raw = markdown.slice(4, end)
  const body = markdown.slice(end + 5)
  const data = {}
  for (const line of raw.split("\n")) {
    const idx = line.indexOf(":")
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    let value = line.slice(idx + 1).trim()
    if (value === "true") value = true
    else if (value === "false") value = false
    else if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1)
    data[key] = value
  }
  return { data, body }
}

export function stripGeneratedMarker(text) {
  const begin = text.indexOf(MARKER_BEGIN)
  const end = text.indexOf(MARKER_END)
  if (begin === -1 || end === -1 || end < begin) return text
  return `${text.slice(0, begin).trimEnd()}\n${text.slice(end + MARKER_END.length).trimStart()}`.trim()
}

export function upsertMarker(existing, inner) {
  const block = `${MARKER_BEGIN}\n${inner.trim()}\n${MARKER_END}\n`
  if (!existing || !existing.includes(MARKER_BEGIN)) {
    const base = (existing || "").trimEnd()
    return `${base}${base ? "\n\n" : ""}${block}`
  }
  const begin = existing.indexOf(MARKER_BEGIN)
  const end = existing.indexOf(MARKER_END)
  return `${existing.slice(0, begin)}${block}${existing.slice(end + MARKER_END.length).replace(/^\n/, "")}`
}

export function routeIntent(text, manifest) {
  const ids = (manifest.agents || []).map((agent) => agent.id)
  const named = text.match(/\b(ds-[a-z0-9-]+)\b/i)
  if (named) {
    const id = named[1].toLowerCase()
    if (ids.includes(id)) return { owner: id, named: true, ambiguous: false }
  }
  const lower = text.toLowerCase().replaceAll("-", " ")
  if (
    /\bset up (the )?repo\b/.test(lower) &&
    !/\bbootstrap\b|\btask board\b|\bfirst (tasks|board)\b/.test(lower)
  ) {
    return { owner: null, named: false, ambiguous: true, reason: "setup" }
  }
  if (/\breview\b/.test(lower) && !/bug|security|a11y|accessib|axe|contrast/.test(lower)) {
    return { owner: null, named: false, ambiguous: true, reason: "review" }
  }
  const scored = []
  for (const agent of manifest.agents) {
    let score = 0
    for (const phrase of agent.invokeWhen) {
      const p = phrase.toLowerCase()
      const hit = p.includes(" ")
        ? lower.includes(p)
        : new RegExp(`\\b${p.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")}\\b`).test(lower)
      if (hit) score += p.split(/\s+/).length
    }
    if (score > 0) scored.push({ id: agent.id, score })
  }
  scored.sort((a, b) => b.score - a.score)
  if (scored.length === 0) return { owner: null, named: false, ambiguous: true, reason: "none" }
  if (scored.length > 1 && scored[0].score === scored[1].score) {
    return {
      owner: null,
      named: false,
      ambiguous: true,
      reason: "tie",
      candidates: scored.slice(0, 2).map((s) => s.id),
    }
  }
  return { owner: scored[0].id, named: false, ambiguous: false }
}

export function validateDescription(agent) {
  const d = agent.description || ""
  if (!d.trim()) return `${agent.id} missing description`
  if (d.length > 1024) return `${agent.id} description exceeds 1024 chars`
  if (/helps with|general helper/i.test(d)) return `${agent.id} description is vague`
  if (/use proactively/i.test(d)) return `${agent.id} must not say use proactively`
  if (!/use when/i.test(d)) return `${agent.id} description must include when to use`
  return null
}

function hasDeferred(pack, field) {
  return (pack.deferredGaps || []).some((gap) => gap.field === field || gap.id === field)
}

export function validatePack(pack, { allowCarinaId = false } = {}) {
  const errors = []
  if (!pack || typeof pack !== "object") return ["pack missing"]
  if (pack.$schemaVersion !== SCHEMA_VERSION) errors.push("pack $schemaVersion")
  if (!pack.kitVersion) errors.push("pack kitVersion")
  const status = pack.bootstrapStatus
  if (!["missing", "draft", "blocked", "complete"].includes(status)) errors.push("pack bootstrapStatus")
  if (status === "complete") {
    if (!ID_RE.test(pack.id || "")) errors.push("pack id")
    if (pack.id === "carina" && !allowCarinaId) errors.push("pack id must not be carina on a foreign host")
    if (!pack.paths?.tokens && !hasDeferred(pack, "paths.tokens")) errors.push("paths.tokens")
    if (!pack.paths?.ui && !hasDeferred(pack, "paths.ui")) errors.push("paths.ui")
    if (!pack.reviewedAt || !pack.reviewedBy) errors.push("pack review")
  }
  return errors
}

export function validateInventory(inventory, packId) {
  const errors = []
  if (inventory.$schemaVersion !== SCHEMA_VERSION) errors.push("inventory schema")
  if (packId && inventory.designSystemId && inventory.designSystemId !== packId) {
    errors.push("inventory designSystemId mismatch")
  }
  if (!Array.isArray(inventory.entities)) errors.push("inventory entities")
  return errors
}

export function validateMemoryRecord(text, packId) {
  const { data } = parseFrontmatter(text)
  if (!data.designSystemId) return "memory missing designSystemId"
  if (packId && data.designSystemId !== packId) return "memory designSystemId mismatch"
  if (!data.agent || !data.title) return "memory missing agent/title"
  if (!data.owner) return "memory missing owner"
  if (!data.reviewedAt) return "memory missing reviewedAt"
  if (/sk-[a-zA-Z0-9]{8,}|BEGIN (RSA |OPENSSH )?PRIVATE KEY|password\s*=\s*\S+/i.test(text)) {
    return "memory contains a secret pattern"
  }
  return null
}

export function seedMemoryLayout(root) {
  const manifest = loadAgentManifest(root)
  writeText(path.join(root, ".agents/memory/.gitkeep"), "")
  writeText(path.join(root, ".agents/memory/shared/.gitkeep"), "")
  for (const agent of manifest.agents) {
    writeText(path.join(root, ".agents/memory", agent.id, ".gitkeep"), "")
  }
}

export function listMemoryRecordPaths(root) {
  const memRoot = path.join(root, ".agents/memory")
  if (!existsSync(memRoot)) return []
  const out = []
  const walk = (dir) => {
    for (const entry of readdirSync(dir)) {
      const full = path.join(dir, entry)
      if (statSync(full).isDirectory()) walk(full)
      else if (entry.endsWith(".md")) out.push(path.relative(root, full).split(path.sep).join("/"))
    }
  }
  walk(memRoot)
  return out.sort()
}

export function scanMemoryRecords(root) {
  const memRoot = path.join(root, ".agents/memory")
  if (!existsSync(memRoot)) {
    return { sharedTitles: [], critiqueTitles: [], perAgentCounts: {}, total: 0 }
  }
  const sharedTitles = []
  const critiqueTitles = []
  const perAgentCounts = {}
  let total = 0
  const sharedDir = path.join(memRoot, "shared")
  if (existsSync(sharedDir)) {
    for (const entry of readdirSync(sharedDir)) {
      if (!entry.endsWith(".md")) continue
      total += 1
      const text = readFileSync(path.join(sharedDir, entry), "utf8")
      const { data } = parseFrontmatter(text)
      sharedTitles.push(data.title || entry.replace(/\.md$/, ""))
    }
  }
  const critiqueDir = path.join(memRoot, "ds-critique")
  if (existsSync(critiqueDir)) {
    for (const entry of readdirSync(critiqueDir)) {
      if (!entry.endsWith(".md")) continue
      total += 1
      const text = readFileSync(path.join(critiqueDir, entry), "utf8")
      const { data } = parseFrontmatter(text)
      critiqueTitles.push(data.title || entry.replace(/\.md$/, ""))
    }
  }
  for (const agent of loadAgentManifest(root).agents) {
    const agentDir = path.join(memRoot, agent.id)
    if (!existsSync(agentDir)) continue
    let count = 0
    for (const entry of readdirSync(agentDir)) {
      if (entry.endsWith(".md")) count += 1
    }
    if (count > 0) perAgentCounts[agent.id] = count
    if (agent.id !== "ds-critique") total += count
  }
  return { sharedTitles, critiqueTitles, perAgentCounts, total }
}

export function validateHandoff(text, packId) {
  const { data } = parseFrontmatter(text)
  const required = ["from", "to", "packId", "designSystemId", "status"]
  for (const key of required) {
    if (!data[key]) return `handoff missing ${key}`
  }
  if (packId && data.designSystemId !== packId) return "handoff pack mismatch"
  if (!["proposed", "confirmed", "running", "cancelled"].includes(String(data.status))) return "handoff status"
  return null
}

function splitTableCells(line) {
  return line
    .split("|")
    .map((cell) => cell.trim())
    .filter((_, i, arr) => !(i === 0 && arr[i] === "") && !(i === arr.length - 1 && arr[i] === ""))
}

function isSeparatorRow(cells) {
  return cells.length > 0 && cells.every((cell) => /^:?-+:?$/.test(cell))
}

function parseMarkdownTable(markdown) {
  const rows = []
  const lines = markdown.split("\n").filter((line) => line.includes("|"))
  if (lines.length < 2) return { headers: [], rows }
  let firstHeaders = []
  let headers = []
  for (let i = 0; i < lines.length; i += 1) {
    const cells = splitTableCells(lines[i])
    if (isSeparatorRow(cells)) continue
    const startsBlock = isSeparatorRow(splitTableCells(lines[i + 1] || ""))
    const repeatsHeaders =
      headers.length > 0 &&
      cells.length === headers.length &&
      cells.every((cell, index) => cell.toLowerCase() === headers[index])
    if (startsBlock || repeatsHeaders) {
      headers = cells.map((cell) => cell.toLowerCase())
      if (firstHeaders.length === 0) firstHeaders = headers
      continue
    }
    if (headers.length === 0) continue
    const row = {}
    headers.forEach((header, index) => {
      row[header] = cells[index] || ""
    })
    if (Object.values(row).some(Boolean)) rows.push(row)
  }
  return { headers: firstHeaders, rows }
}

export function validateProgram(root, packId, agentIds) {
  const dir = path.join(root, ".agents/program")
  if (!existsSync(dir)) return []
  const errors = []
  const boardPath = path.join(dir, "board.md")
  if (!existsSync(boardPath)) return ["program missing board.md"]
  const { data } = parseFrontmatter(readFileSync(boardPath, "utf8"))
  if (packId && data.designSystemId && data.designSystemId !== packId) {
    errors.push("program designSystemId mismatch")
  }
  const allowed = new Set([...(agentIds || []), "human"])
  const tasksPath = path.join(dir, "tasks.md")
  if (existsSync(tasksPath)) {
    const { rows } = parseMarkdownTable(readFileSync(tasksPath, "utf8"))
    for (const row of rows) {
      const owner = row.owner
      if (owner && !allowed.has(owner)) errors.push(`unknown task owner ${owner}`)
    }
  }
  return errors
}

function listFilesRecursive(dir, acc = []) {
  if (!dir || !existsSync(dir)) return acc
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === "_template") continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) listFilesRecursive(full, acc)
    else acc.push(full)
  }
  return acc
}

function countUiLayer(root, rel) {
  const dir = rel ? path.join(root, rel) : null
  if (!dir || !existsSync(dir)) return { entities: 0, stories: 0 }
  const files = readdirSync(dir).filter(
    (name) => name.endsWith(".tsx") && !name.endsWith(".stories.tsx") && !name.endsWith(".d.ts")
  )
  const stories = files.filter((name) =>
    existsSync(path.join(dir, name.replace(/\.tsx$/, ".stories.tsx")))
  ).length
  return { entities: files.length, stories }
}

function countDirLayer(root, rel) {
  const dir = rel ? path.join(root, rel) : null
  if (!dir || !existsSync(dir)) return { entities: 0, stories: 0, missingRationale: 0, missingUsage: 0 }
  const dirs = readdirSync(dir, { withFileTypes: true }).filter(
    (entry) => entry.isDirectory() && entry.name !== "_template"
  )
  let stories = 0
  let missingRationale = 0
  let missingUsage = 0
  for (const entry of dirs) {
    const folder = path.join(dir, entry.name)
    const files = listFilesRecursive(folder)
    if (files.some((file) => file.endsWith(".stories.tsx"))) stories += 1
    if (!existsSync(path.join(folder, "RATIONALE.md"))) missingRationale += 1
    if (!existsSync(path.join(folder, "USAGE.md"))) missingUsage += 1
  }
  return { entities: dirs.length, stories, missingRationale, missingUsage }
}

export function scanProgramInputs(root) {
  const packPath = path.join(root, ".agents/context.json")
  const pack = existsSync(packPath) ? readJson(packPath) : null
  let agents = []
  try {
    agents = loadAgentManifest(root).agents.map((agent) => ({
      id: agent.id,
      displayName: agent.displayName,
      invokeWhen: agent.invokeWhen,
      mayWrite: agent.mayWrite,
      mustNotWrite: agent.mustNotWrite,
      handoffsTo: agent.handoffsTo,
      readonly: agent.readonly,
      reviewEngine: agent.reviewEngine,
    }))
  } catch {
    agents = []
  }
  const gapsPath = path.join(root, ".agents/inventory/gaps.json")
  const inventoryGaps = existsSync(gapsPath) ? readJson(gapsPath) : { gaps: [] }
  const inventoryGapsOpen = (inventoryGaps.gaps || []).filter((gap) => gap.status === "open")
  const handoffsDir = path.join(root, ".agents/handoffs")
  const handoffs = []
  if (existsSync(handoffsDir)) {
    for (const entry of readdirSync(handoffsDir)) {
      if (!entry.endsWith(".md")) continue
      const { data } = parseFrontmatter(readFileSync(path.join(handoffsDir, entry), "utf8"))
      handoffs.push({ file: entry, status: data.status, from: data.from, to: data.to })
    }
  }
  const programDir = path.join(root, ".agents/program")
  const tasksPath = path.join(programDir, "tasks.md")
  const taskIds = existsSync(tasksPath)
    ? parseMarkdownTable(readFileSync(tasksPath, "utf8")).rows.map((row) => row.id).filter(Boolean)
    : []
  const guessed = pack?.paths || guessPaths(root, existsSync(path.join(root, "components.json")) ? readJson(path.join(root, "components.json")) : null)
  const ui = countUiLayer(root, guessed.ui)
  const primitives = countDirLayer(root, guessed.primitives)
  const blocks = countDirLayer(root, guessed.blocks)
  const prototypes = countDirLayer(root, guessed.prototypes)
  return {
    pack: pack
      ? {
          id: pack.id,
          bootstrapStatus: pack.bootstrapStatus,
          deferredGaps: pack.deferredGaps || [],
        }
      : null,
    agents,
    inventoryGapsOpen,
    handoffs,
    program: { exists: existsSync(programDir), taskIds },
    layerCounts: {
      ui: ui.entities,
      primitives: primitives.entities,
      blocks: blocks.entities,
      prototypes: prototypes.entities,
    },
    storyCoverage: {
      primitives: { n: primitives.stories, N: primitives.entities },
      blocks: { n: blocks.stories, N: blocks.entities },
      ui: { n: ui.stories, N: ui.entities },
    },
    missingDocs: {
      primitives: { rationale: primitives.missingRationale, usage: primitives.missingUsage },
      blocks: { rationale: blocks.missingRationale, usage: blocks.missingUsage },
    },
  }
}

export function copyKitPaths(fromRoot, toRoot) {
  const kit = loadKitManifest(fromRoot)
  const copied = []
  for (const rel of kit.paths) {
    const src = path.join(fromRoot, rel)
    if (!existsSync(src)) continue
    if (isProtectedRel(rel)) continue
    const dest = path.join(toRoot, rel)
    mkdirSync(path.dirname(dest), { recursive: true })
    cpSync(src, dest, { recursive: true, force: true })
    copied.push(rel)
  }
  return copied
}

export function detectPreview(root, pkg) {
  const deps = { ...pkg.dependencies, ...pkg.devDependencies }
  if (deps.storybook || existsSync(path.join(root, ".storybook"))) {
    const scripts = pkg.scripts || {}
    const command = scripts.storybook || "npx storybook dev -p 6006"
    const portMatch = String(command).match(/-p\s+(\d+)/)
    return { kind: "storybook", command, port: portMatch ? Number(portMatch[1]) : 6006 }
  }
  if (Object.keys(deps).some((name) => name === "nextra" || name.startsWith("nextra-"))) {
    return { kind: "nextra", command: pkg.scripts?.dev || "npx next dev", port: 3000 }
  }
  if (deps["@docusaurus/core"] || deps.vitepress || deps.ladle || deps.histoire || deps.styleguidist) {
    return { kind: "other", command: pkg.scripts?.dev || pkg.scripts?.docs || null, port: null }
  }
  return { kind: "missing", command: null, port: null }
}

export function guessPaths(root, componentsJson) {
  return {
    tokens: existsSync(path.join(root, "tokens.json"))
      ? "tokens.json"
      : existsSync(path.join(root, "tokens/tokens.json"))
        ? "tokens/tokens.json"
        : null,
    ui: componentsJson?.aliases?.ui
      ? String(componentsJson.aliases.ui).replace(/^@\//, "")
      : existsSync(path.join(root, "components/ui"))
        ? "components/ui"
        : null,
    primitives: existsSync(path.join(root, "components/carina"))
      ? "components/carina"
      : existsSync(path.join(root, "components/primitives"))
        ? "components/primitives"
        : null,
    blocks: existsSync(path.join(root, "registry/blocks")) ? "registry/blocks" : null,
    prototypes: existsSync(path.join(root, "prototypes")) ? "prototypes" : null,
    docs: existsSync(path.join(root, "docs")) ? "docs" : null,
  }
}

function collectDirEntities(root, rel, layer) {
  const dir = rel ? path.join(root, rel) : null
  if (!dir || !existsSync(dir)) return []
  const entities = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      entities.push({
        name: entry.name,
        layer,
        path: `${rel}/${entry.name}`.replaceAll("\\", "/"),
        exported: true,
        stories: [],
        duplicateOf: null,
      })
      continue
    }
    if (!entry.name.endsWith(".tsx") && !entry.name.endsWith(".ts")) continue
    if (entry.name.endsWith(".d.ts") || entry.name.includes(".stories.")) continue
    const name = entry.name.replace(/\.(tsx|ts)$/, "")
    entities.push({
      name,
      layer,
      path: `${rel}/${entry.name}`.replaceAll("\\", "/"),
      exported: true,
      stories: [],
      duplicateOf: null,
    })
  }
  return entities
}

export function scanHost(root) {
  const pkgPath = path.join(root, "package.json")
  const pkg = existsSync(pkgPath) ? readJson(pkgPath) : {}
  const componentsPath = path.join(root, "components.json")
  const componentsJson = existsSync(componentsPath) ? readJson(componentsPath) : null
  const preview = detectPreview(root, pkg)
  const guessed = guessPaths(root, componentsJson)
  const designLanguage = existsSync(path.join(root, "design-language.json"))
    ? readJson(path.join(root, "design-language.json"))
    : null
  const figma = designLanguage?.figmaFileKey || null
  const commands = {
    install: String(pkg.packageManager || "").startsWith("pnpm")
      ? "pnpm install"
      : existsSync(path.join(root, "yarn.lock"))
        ? "yarn"
        : "npm install",
    test: pkg.scripts?.test || pkg.scripts?.["test:unit"] || null,
    tokensBuild: pkg.scripts?.["tokens:build"] || null,
    preview: preview.command,
  }
  const entities = [
    ...collectDirEntities(root, guessed.ui, "ui"),
    ...collectDirEntities(root, guessed.primitives, "primitive"),
    ...collectDirEntities(root, guessed.blocks, "block"),
    ...collectDirEntities(root, guessed.prototypes, "unknown"),
  ]
  const gaps = []
  if (!guessed.tokens) {
    gaps.push({
      id: "paths.tokens",
      found: false,
      missing: "canonical token source",
      whyNotInferred: "no tokens.json",
      options: ["add path", "defer"],
      ownerAgent: "ds-language",
      blocking: true,
      status: "open",
    })
  }
  if (!guessed.ui && !componentsJson) {
    gaps.push({
      id: "paths.ui",
      found: false,
      missing: "UI path",
      whyNotInferred: "no components/ui or components.json",
      options: ["add path", "defer"],
      ownerAgent: "ds-architect",
      blocking: true,
      status: "open",
    })
  }
  if (!figma) {
    gaps.push({
      id: "figmaFileKey",
      found: false,
      missing: "Figma file key",
      whyNotInferred: "no design-language.json figmaFileKey",
      options: ["set this host’s file", "leave unset"],
      ownerAgent: "ds-prototype",
      blocking: false,
      status: "open",
    })
  }
  if (preview.kind === "missing") {
    gaps.push({
      id: "preview",
      found: false,
      missing: "Storybook/Nextra/other preview",
      whyNotInferred: "no storybook/nextra/docs preview deps",
      options: ["scaffold React Storybook", "defer"],
      ownerAgent: "ds-prototype",
      blocking: false,
      status: "open",
    })
  }
  return {
    guessed,
    preview,
    commands,
    figmaFileKey: figma,
    componentsJson: Boolean(componentsJson),
    entities,
    gaps,
    packageManager: pkg.packageManager || commands.install,
  }
}

export function adapterRelPaths(ids) {
  return [
    ...ids.map((id) => `.cursor/agents/${id}.md`),
    ".cursor/rules/ds-kit.mdc",
    ...ids.map((id) => `.claude/agents/${id}.md`),
    ...ids.map((id) => `.codex/agents/${id}.toml`),
  ]
}

export function hashTree(root, rels) {
  const hashes = {}
  for (const rel of rels) {
    const full = path.join(root, rel)
    if (!existsSync(full)) continue
    hashes[rel] = sha256(readFileSync(full, "utf8"))
  }
  return hashes
}

export { cpSync, existsSync, mkdirSync, path, readFileSync, readdirSync, rmSync, writeFileSync }
