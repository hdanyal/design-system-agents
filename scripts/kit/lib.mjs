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

export function isKitSource(root) {
  return (
    existsSync(path.join(root, "scripts/kit/lib.mjs")) &&
    existsSync(path.join(root, ".agents/kit/manifest.json"))
  )
}

export function validatePack(pack, { allowExampleId = false } = {}) {
  const errors = []
  if (!pack || typeof pack !== "object") return ["pack missing"]
  if (pack.$schemaVersion !== SCHEMA_VERSION) errors.push("pack $schemaVersion")
  if (!pack.kitVersion) errors.push("pack kitVersion")
  const status = pack.bootstrapStatus
  if (!["missing", "draft", "blocked", "complete"].includes(status)) errors.push("pack bootstrapStatus")
  if (status === "complete") {
    if (!ID_RE.test(pack.id || "")) errors.push("pack id")
    if (pack.id === "example" && !allowExampleId) errors.push("pack id must not be example on a foreign host")
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

export const MEMORY_UNUSED_STUBS = new Set([
  "ds-docs",
  "ds-prototype",
  "ds-language",
  "ds-manager",
  "ds-release",
])

export const MEMORY_REVIEW_AGENTS = new Set(["ds-bugbot", "ds-security", "ds-a11y"])
export const MEMORY_LESSON_AGENTS = new Set(["ds-architect", "ds-coding", "ds-critique"])
export const MEMORY_BODY_LINE_CAP = 50

const MEMORY_SEVERITIES = new Set(["blocking", "important", "nit"])
const MEMORY_LESSON_KINDS = {
  "ds-architect": new Set(["near-miss", "twin-avoided", "job-map", "user-instruction"]),
  "ds-coding": new Set(["wrap-gotcha", "story-matrix", "test-pattern", "user-instruction"]),
  "ds-critique": new Set(["pack-lesson", "user-instruction"]),
}

export function memoryEntitySlug(data, fileBase) {
  const raw = data.entities ?? data.entity
  if (Array.isArray(raw)) return String(raw[0] || "").trim() || null
  if (raw != null && String(raw).trim()) return String(raw).trim().split(/\s*,\s*/)[0]
  if (fileBase && fileBase !== ".gitkeep") return fileBase.replace(/\.md$/, "")
  return null
}

export function isMemoryExpired(expiresAt, now = new Date()) {
  if (!expiresAt) return false
  const day = String(expiresAt).trim().slice(0, 10)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) return false
  const today = now.toISOString().slice(0, 10)
  return day < today
}

export function validateMemoryRecord(text, packId) {
  const { data } = parseFrontmatter(text)
  if (!data.designSystemId) return "memory missing designSystemId"
  if (packId && data.designSystemId !== packId) return "memory designSystemId mismatch"
  if (!data.agent || !data.title) return "memory missing agent/title"
  if (!data.owner) return "memory missing owner"
  if (!data.reviewedAt) return "memory missing reviewedAt"
  if (!data.expiresAt) return "memory missing expiresAt"
  const day = String(data.expiresAt).trim().slice(0, 10)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) return "memory expiresAt must be an ISO date"
  if (/sk-[a-zA-Z0-9]{8,}|BEGIN (RSA |OPENSSH )?PRIVATE KEY|password\s*=\s*\S+/i.test(text)) {
    return "memory contains a secret pattern"
  }
  return null
}

function memoryBodyText(text) {
  const { body } = parseFrontmatter(text)
  return body || ""
}

function bodyHasLabel(body, label) {
  const re = new RegExp(`(?:^|\\n)\\s*(?:[-*]\\s*)?(?:\\*\\*)?${label}(?:\\*\\*)?\\s*[:—-]`, "i")
  return re.test(body)
}

function bodyLineCount(body) {
  if (!body) return 0
  return body.replace(/\n$/, "").split("\n").length
}

function forbiddenMemoryBodyPayload(body) {
  if (/oklch\s*\(/i.test(body)) return "memory body contains oklch("
  if (/(^|[^#\w])#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/.test(body)) {
    return "memory body contains hex color"
  }
  if (/```(?:json)?[\s\S]*?(?:axe|violations|nodes)\b/i.test(body)) {
    return "memory body contains fenced axe dump"
  }
  return null
}

export function memoryAllowedNamespaces(root) {
  const ids = new Set(["shared"])
  try {
    for (const agent of loadAgentManifest(root).agents) ids.add(agent.id)
  } catch {
    // empty when no manifest
  }
  return ids
}

/**
 * Path-aware memory check. Two-arg validateMemoryRecord stays frontmatter-only.
 * relPath is posix under repo root, e.g. .agents/memory/shared/heading-group.md
 * @param {string} text
 * @param {string} packId
 * @param {string} [relPath]
 * @param {string | null} [root] repo root for namespace allowlist; omit to skip
 * @returns {string | null}
 */
export function validateMemoryFile(text, packId, relPath, root = null) {
  const base = validateMemoryRecord(text, packId)
  if (base) return base
  if (!relPath) return null

  const normalized = String(relPath).split(path.sep).join("/")
  const parts = normalized.split("/")
  if (parts[0] !== ".agents" || parts[1] !== "memory") {
    return "memory path must be under .agents/memory/"
  }
  if (parts.length === 3 && parts[2].endsWith(".md")) {
    return "memory .md must not sit at .agents/memory/ root"
  }
  if (parts.length !== 4 || !parts[3].endsWith(".md")) {
    return "memory records must be flat under a namespace (no nested dirs)"
  }

  const namespace = parts[2]
  const fileName = parts[3]
  const fileSlug = fileName.replace(/\.md$/, "")
  const allowed = root ? memoryAllowedNamespaces(root) : null
  if (allowed && !allowed.has(namespace)) {
    return `memory unknown namespace "${namespace}"`
  }
  if (MEMORY_UNUSED_STUBS.has(namespace)) {
    return `memory unused stub "${namespace}" must not contain .md records`
  }

  const { data } = parseFrontmatter(text)
  const agent = String(data.agent || "").trim()
  const body = memoryBodyText(text)

  if (!data.evidence) return "memory missing evidence"

  const bodyLines = bodyLineCount(body)
  if (bodyLines > MEMORY_BODY_LINE_CAP) {
    return `memory body exceeds ${MEMORY_BODY_LINE_CAP} lines`
  }
  const forbidden = forbiddenMemoryBodyPayload(body)
  if (forbidden) return forbidden

  if (namespace === "shared") {
    if (agent !== "ds-docs") return "shared memory agent must be ds-docs"
    const slug = memoryEntitySlug(data, null)
    if (!slug) return "shared memory missing entities/entity slug"
    if (slug !== fileSlug) {
      return `shared entities slug "${slug}" must match filename "${fileSlug}"`
    }
    for (const label of ["entity", "layer", "decision", "do-not-clone", "story"]) {
      if (!bodyHasLabel(body, label)) return `shared memory missing body field ${label}`
    }
    return null
  }

  if (MEMORY_LESSON_AGENTS.has(namespace)) {
    if (agent !== namespace) return `memory agent must match namespace ${namespace}`
    if (!data.trigger) return "memory missing trigger"
    if (namespace === "ds-critique") {
      if (!data.subjectAgent) return "memory missing subjectAgent"
      const subject = String(data.subjectAgent).trim()
      if (subject !== "any" && allowed && !allowed.has(subject)) {
        return `memory subjectAgent "${subject}" is not a known agent`
      }
    }
    for (const label of ["lessonKind", "lesson", "do-not-repeat"]) {
      if (!bodyHasLabel(body, label)) return `memory missing body field ${label}`
    }
    const kindMatch = body.match(/(?:^|\n)\s*(?:[-*]\s*)?(?:\*\*)?lessonKind(?:\*\*)?\s*[:—-]\s*`?([a-z0-9-]+)`?/i)
    const kind = kindMatch?.[1]
    const allowedKinds = MEMORY_LESSON_KINDS[namespace]
    if (kind && allowedKinds && !allowedKinds.has(kind)) {
      return `memory lessonKind "${kind}" is not allowed for ${namespace}`
    }
    return null
  }

  if (MEMORY_REVIEW_AGENTS.has(namespace)) {
    if (agent !== namespace) return `memory agent must match namespace ${namespace}`
    if (!data.severity) return "memory missing severity"
    if (!MEMORY_SEVERITIES.has(String(data.severity).trim())) {
      return "memory severity must be blocking|important|nit"
    }
    for (const label of ["path", "summary"]) {
      if (!bodyHasLabel(body, label)) return `memory missing body field ${label}`
    }
    return null
  }

  return `memory namespace "${namespace}" is not writable`
}

/**
 * Structural walk: unknown dirs, nested dirs, unused-stub .md, then per-file validateMemoryFile.
 * Returns an array of error strings (empty = ok).
 */
export function validateMemoryTree(root, packId) {
  const memRoot = path.join(root, ".agents/memory")
  if (!existsSync(memRoot)) return []
  const errors = []
  const allowed = memoryAllowedNamespaces(root)

  for (const entry of readdirSync(memRoot)) {
    const full = path.join(memRoot, entry)
    const st = statSync(full)
    if (entry === ".gitkeep") continue
    if (st.isFile()) {
      if (entry.endsWith(".md")) errors.push(`.agents/memory/${entry}: memory .md must not sit at .agents/memory/ root`)
      continue
    }
    if (!st.isDirectory()) continue
    if (!allowed.has(entry)) {
      errors.push(`.agents/memory/${entry}: unknown memory namespace`)
      continue
    }
    for (const child of readdirSync(full)) {
      const childFull = path.join(full, child)
      const childSt = statSync(childFull)
      if (childSt.isDirectory()) {
        errors.push(`.agents/memory/${entry}/${child}: nested memory directories are not allowed`)
        continue
      }
      if (!child.endsWith(".md")) continue
      const rel = `.agents/memory/${entry}/${child}`
      const err = validateMemoryFile(readFileSync(childFull, "utf8"), packId, rel, root)
      if (err) errors.push(`${rel}: ${err}`)
    }
  }
  return errors
}

export function matchMemoryRecords(root, match, { namespace = null } = {}) {
  const needle = String(match || "").trim().toLowerCase()
  if (!needle) return []
  const { entries } = scanMemoryRecords(root)
  return entries.filter((e) => {
    if (e.expired) return false
    if (namespace && e.namespace !== namespace) return false
    const fileStem = path.basename(e.path, ".md").toLowerCase()
    const keys = [e.entities, e.trigger, e.subjectAgent, fileStem]
      .filter(Boolean)
      .map((v) => String(v).trim().toLowerCase())
    return keys.includes(needle)
  })
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

function readMemoryEntry(full, rel, namespace, entry) {
  const text = readFileSync(full, "utf8")
  const { data } = parseFrontmatter(text)
  const expired = isMemoryExpired(data.expiresAt)
  return {
    path: rel.split(path.sep).join("/"),
    namespace,
    title: data.title || entry.replace(/\.md$/, ""),
    entities: memoryEntitySlug(data, entry),
    trigger: data.trigger ? String(data.trigger).trim() : null,
    subjectAgent: data.subjectAgent ? String(data.subjectAgent).trim() : null,
    reviewedAt: data.reviewedAt || null,
    expiresAt: data.expiresAt || null,
    expired,
  }
}

export function scanMemoryRecords(root) {
  const memRoot = path.join(root, ".agents/memory")
  if (!existsSync(memRoot)) {
    return {
      sharedTitles: [],
      critiqueTitles: [],
      perAgentCounts: {},
      entries: [],
      total: 0,
    }
  }
  const entries = []
  const sharedTitles = []
  const critiqueTitles = []
  const perAgentCounts = {}

  const sharedDir = path.join(memRoot, "shared")
  if (existsSync(sharedDir)) {
    for (const entry of readdirSync(sharedDir)) {
      if (!entry.endsWith(".md")) continue
      const full = path.join(sharedDir, entry)
      const rec = readMemoryEntry(full, path.relative(root, full), "shared", entry)
      entries.push(rec)
      if (!rec.expired) sharedTitles.push(rec.title)
    }
  }

  for (const agent of loadAgentManifest(root).agents) {
    const agentDir = path.join(memRoot, agent.id)
    if (!existsSync(agentDir)) continue
    let count = 0
    for (const entry of readdirSync(agentDir)) {
      if (!entry.endsWith(".md")) continue
      count += 1
      const full = path.join(agentDir, entry)
      const rec = readMemoryEntry(full, path.relative(root, full), agent.id, entry)
      entries.push(rec)
      if (agent.id === "ds-critique" && !rec.expired) critiqueTitles.push(rec.title)
    }
    if (count > 0) perAgentCounts[agent.id] = count
  }

  return {
    sharedTitles,
    critiqueTitles,
    perAgentCounts,
    entries,
    total: entries.length,
  }
}

export function validateSharedMemorySlugs(root) {
  const sharedDir = path.join(root, ".agents/memory/shared")
  if (!existsSync(sharedDir)) return null
  const rows = []
  for (const entry of readdirSync(sharedDir)) {
    if (!entry.endsWith(".md")) continue
    const full = path.join(sharedDir, entry)
    const { data } = parseFrontmatter(readFileSync(full, "utf8"))
    // Check path: require frontmatter entities/entity — no filename fallback.
    const slug = memoryEntitySlug(data, null)
    if (!slug) return `shared/${entry}: memory missing entities/entity slug`
    rows.push({ entry, slug, fileSlug: entry.replace(/\.md$/, "") })
  }
  const seen = new Map()
  for (const row of rows) {
    if (seen.has(row.slug)) {
      return `shared duplicate entity slug "${row.slug}" (${seen.get(row.slug)} and ${row.entry})`
    }
    seen.set(row.slug, row.entry)
  }
  for (const row of rows) {
    if (row.slug !== row.fileSlug) {
      return `shared/${row.entry}: entities slug "${row.slug}" must match filename "${row.fileSlug}"`
    }
  }
  return null
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
  let memoryExpired = 0
  let memoryTotal = 0
  try {
    const mem = scanMemoryRecords(root)
    memoryTotal = mem.total
    memoryExpired = mem.entries.filter((e) => e.expired).length
  } catch {
    memoryExpired = 0
    memoryTotal = 0
  }
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
    memoryExpired,
    memoryTotal,
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
  const uiCandidates = [
    componentsJson?.aliases?.ui ? String(componentsJson.aliases.ui).replace(/^@\//, "") : null,
    "components/ui",
    "src/components/ui",
  ].filter(Boolean)

  let ui = null
  for (const candidate of uiCandidates) {
    if (existsSync(path.join(root, candidate))) {
      ui = candidate
      break
    }
  }

  const primitiveCandidates = ["components/primitives", "components/carina", "src/components/primitives"]
  let primitives = null
  for (const candidate of primitiveCandidates) {
    if (existsSync(path.join(root, candidate))) {
      primitives = candidate
      break
    }
  }

  return {
    tokens: existsSync(path.join(root, "tokens.json"))
      ? "tokens.json"
      : existsSync(path.join(root, "tokens/tokens.json"))
        ? "tokens/tokens.json"
        : null,
    ui,
    primitives,
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
      whyNotInferred: "no stock UI path (components.json aliases.ui, components/ui, src/components/ui, or pack paths.ui)",
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

export function printInstallNextSteps(host, { hasExistingPack = false } = {}) {
  console.log("")
  console.log("--- Next steps ---")
  console.log(`Copied into ${host}.`)
  if (hasExistingPack) {
    console.log("Your system settings were left as they are. Use upgrade to refresh the agents.")
  } else {
    console.log("Open that folder in Cursor.")
    console.log("Ask Release (ds-release) to set it up, then Manager (ds-manager) for the task board.")
  }
  console.log(`Optional scan: node scripts/kit/bootstrap.mjs --dir ${host}`)
  console.log("------------------")
}

export function formatBootstrapHumanRecap(pack, scan) {
  const id = pack.id ?? "(unset — pick a short name, not example)"
  const paths = pack.paths || {}
  const gapIds =
    (scan?.gaps || [])
      .map((g) => g.id)
      .filter(Boolean)
      .join(", ") || "none"
  return [
    "",
    "Human recap:",
    `  Name: ${id}`,
    `  Tokens: ${paths.tokens ?? "not found"}`,
    `  UI: ${paths.ui ?? "not found"}`,
    `  Primitives: ${paths.primitives ?? "not found"}`,
    `  Blocks: ${paths.blocks ?? "not found"}`,
    `  Preview: ${pack.preview?.kind ?? "missing"}`,
    `  Open gaps: ${gapIds}`,
    "  Ask Release before writing. After confirm: node scripts/kit/bootstrap.mjs --dir <host> --write --confirm-write",
    "",
  ].join("\n")
}

const IDENTITY_SCAN_PATTERNS = [
  { label: "pack id example", glob: ".agents/context.json", test: (t) => /"id"\s*:\s*"example"/.test(t) },
  { label: "registry @example", glob: "registry.json", test: (t) => t.includes("@example") },
  { label: "components/example consumer targets", glob: "registry.json", test: (t) => t.includes("components/example") },
  { label: "example-* skills", glob: ".agents/skills/manifest.json", test: (t) => /"example-/.test(t) },
  { label: "example drift script", glob: "package.json", test: (t) => t.includes("example:drift") },
  { label: "EXAMPLE_REGISTRY env", glob: ".env.example", test: (t) => t.includes("EXAMPLE_REGISTRY") },
  { label: "example.lock.json reference", glob: "docs/ADOPTION.md", test: (t) => t.includes("example.lock.json") },
]

export function scanIdentityPaths(root) {
  const hits = []
  for (const row of IDENTITY_SCAN_PATTERNS) {
    const full = path.join(root, row.glob)
    if (!existsSync(full)) continue
    const text = readFileSync(full, "utf8")
    if (row.test(text)) hits.push({ path: row.glob, label: row.label })
  }
  const skillsDir = path.join(root, ".agents/skills")
  if (existsSync(skillsDir)) {
    for (const entry of readdirSync(skillsDir)) {
      if (entry.startsWith("example-") && statSync(path.join(skillsDir, entry)).isDirectory()) {
        hits.push({ path: `.agents/skills/${entry}`, label: "example-* skill folder" })
      }
    }
  }
  return hits
}

function skillWorkflowExtra(prefix, suffix) {
  const p = prefix
  const workflows = {
    onboard: `## Workflow
Cold start is pack bootstrap (\`ds-release\` / \`node scripts/kit/bootstrap.mjs\`), not a second auto-select skill.
1. Read \`.agents/context.json\`. If missing or not \`complete\`, stop and invoke \`ds-release\`.
2. If bootstrap is \`complete\`, invoke \`ds-manager\` for \`.agents/program/\` (not auto-select).
3. Then load exactly one owning \`ds-*\` agent from docs/AGENT-KIT.md.
Do not write files until routing is done.`,
    branding: `## Workflow
1. Read generated \`.agents/skills/${p}-branding/reference.md\` when present before view, component, story, or token work.
2. Follow its Overview and Do's and Don'ts; use CSS variables only.
3. Token edits route to \`${p}-update-design-language\`.
Never copy oklch/hex into JSX or stories.`,
    compose: `## Workflow
1. Harvest while building: inventory stock UI, host primitives, blocks, and Storybook for reusable regions.
2. Decide in order: reuse → enhance-existing → extract → keep local.
3. Prefer enhancing a named existing API over creating a twin.`,
    verify: `## Workflow
Use \`pnpm verify:fast\` for local iteration.
Use \`pnpm verify\` before merge/release.`,
  }
  return (
    workflows[suffix] ||
    `## Workflow
Follow host policy in CONTRIBUTING.md and docs/GOVERNANCE.md for ${p}-${suffix}.`
  )
}

export function seedHostSkills(root, packId) {
  if (!packId || !ID_RE.test(packId)) return { ok: false, reason: "invalid pack id" }
  if (packId === "example" && !isKitSource(root)) return { ok: false, reason: "example reserved on foreign hosts" }
  if (packId === "example" && isKitSource(root)) return { ok: false, reason: "kit source keeps example-* skills" }

  const templateRoot = isKitSource(root) ? root : kitRootFromScripts()
  const templateManifest = readJson(path.join(templateRoot, ".agents/skills/manifest.json"))
  const skillsDir = path.join(root, ".agents/skills")
  mkdirSync(skillsDir, { recursive: true })

  const skills = templateManifest.skills.map((skill) => {
    const suffix = skill.name.replace(/^example-/, "")
    const name = `${packId}-${suffix}`
    return {
      ...skill,
      name,
      owner: skill.owner.replace(/^example-/, `${packId}-`),
      dependencies: (skill.dependencies || []).map((d) => d.replace(/^example-/, `${packId}-`)),
    }
  })

  writeJson(path.join(skillsDir, "manifest.json"), {
    version: templateManifest.version,
    lastReviewed: new Date().toISOString().slice(0, 10),
    skills,
  })

  const policy = {
    contribute: "CONTRIBUTING.md",
    governance: "docs/GOVERNANCE.md",
    adoption: "docs/ADOPTION.md",
    security: "SECURITY.md",
    incidents: "docs/INCIDENTS.md",
  }

  for (const skill of skills) {
    const suffix = skill.name.replace(`${packId}-`, "")
    const dir = path.join(skillsDir, skill.name)
    mkdirSync(dir, { recursive: true })
    const body = `---
name: ${skill.name}
description: ${skill.boundary}
---

# ${skill.name}

- Form: ${skill.form}
- Invocation: ${skill.invocation}
- Audience: ${skill.audience}
- Depends on: ${skill.dependencies.join(", ") || "none"}

## Triggers
Use this skill for work that matches its boundary.

## Policy links
- Process: ${policy.contribute}
- Governance: ${policy.governance}
- Adoption: ${policy.adoption}
- Security: ${policy.security}
- Incidents: ${policy.incidents}

${skillWorkflowExtra(packId, suffix)}
`
    writeText(path.join(dir, "SKILL.md"), body)
  }

  return { ok: true, count: skills.length }
}

export { cpSync, existsSync, mkdirSync, path, readFileSync, readdirSync, rmSync, writeFileSync }
