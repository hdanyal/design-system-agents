#!/usr/bin/env node
/**
 * Print a hop-safe memory index (titles + match keys). Never dumps bodies.
 * Usage:
 *   node scripts/kit/memory-index.mjs
 *   node scripts/kit/memory-index.mjs --namespace ds-architect
 *   node scripts/kit/memory-index.mjs --match heading-group
 *   node scripts/kit/memory-index.mjs --dir /path/to/host
 */
import {
  kitRootFromScripts,
  matchMemoryRecords,
  path,
  scanMemoryRecords,
} from "./lib.mjs"

const args = process.argv.slice(2)
const dirIdx = args.indexOf("--dir")
const nsIdx = args.indexOf("--namespace")
const matchIdx = args.indexOf("--match")
const root = path.resolve(dirIdx >= 0 ? args[dirIdx + 1] : kitRootFromScripts())
const namespace = nsIdx >= 0 ? args[nsIdx + 1] : null
const match = matchIdx >= 0 ? args[matchIdx + 1] : null

const { entries, sharedTitles, perAgentCounts, total } = scanMemoryRecords(root)
const scoped = namespace ? entries.filter((e) => e.namespace === namespace) : entries
const filtered = match
  ? matchMemoryRecords(root, match, { namespace })
  : scoped

const openable = filtered.filter((e) => !e.expired)
const expired = match ? [] : filtered.filter((e) => e.expired)

console.log(
  `memory-index root=${path.basename(root)} total=${total} shown=${filtered.length}${
    match ? ` match=${match}` : ""
  }`
)
if (!namespace && !match) {
  const counts = Object.entries(perAgentCounts)
    .map(([id, n]) => `${id}=${n}`)
    .join(" ")
  console.log(`counts: shared=${sharedTitles.length} ${counts}`.trim())
}

const printEntry = (e) => {
  const bits = [
    e.namespace,
    e.expired ? "EXPIRED" : "ok",
    e.title,
    e.entities ? `entities=${e.entities}` : null,
    e.trigger ? `trigger=${e.trigger}` : null,
    e.subjectAgent ? `subjectAgent=${e.subjectAgent}` : null,
    e.expiresAt ? `expires=${e.expiresAt}` : null,
    e.path,
  ].filter(Boolean)
  console.log(bits.join(" | "))
}

if (openable.length === 0 && expired.length === 0) {
  console.log("(no records)")
} else {
  for (const e of openable) printEntry(e)
  if (expired.length) {
    console.log(`# ${expired.length} expired (skip on retrieve; supersede on manage hop)`)
    for (const e of expired) printEntry(e)
  }
}
