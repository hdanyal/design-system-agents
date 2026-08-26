import { existsSync, readFileSync } from "node:fs"
import path from "node:path"
import { scanMemoryRecords } from "../kit/lib.mjs"

const packPath = path.join(process.cwd(), ".agents/context.json")
if (!existsSync(packPath)) {
  console.log("ds-kit: no pack. Scan with node scripts/kit/bootstrap.mjs (confirm before --write).")
  process.exit(0)
}

const pack = JSON.parse(readFileSync(packPath, "utf8"))
const gapsPath = path.join(process.cwd(), ".agents/inventory/gaps.json")
let gapNote = "no gaps file"
if (existsSync(gapsPath)) {
  const gaps = JSON.parse(readFileSync(gapsPath, "utf8"))
  const open = (gaps.gaps || []).filter((g) => g.status === "open")
  gapNote = `${open.length} open gaps`
}

const { sharedTitles, perAgentCounts, total } = scanMemoryRecords(process.cwd())
const countParts = ["shared", "ds-architect", "ds-coding", "ds-critique", "ds-bugbot", "ds-security", "ds-a11y"]
  .map((ns) => {
    if (ns === "shared") return `shared=${sharedTitles.length}`
    const short = ns.replace(/^ds-/, "")
    return `${short}=${perAgentCounts[ns] || 0}`
  })
  .join(" ")

let memNote = `memory ${total} records; ${countParts}`
if (sharedTitles.length > 0) {
  const titles =
    sharedTitles.length > 20
      ? `${sharedTitles.slice(0, 20).join(", ")}… (run node scripts/kit/memory-index.mjs)`
      : sharedTitles.join(", ")
  memNote = `${memNote}; shared titles: ${titles}`
}

const programPath = path.join(process.cwd(), ".agents/program/board.md")
let programNote = pack.bootstrapStatus === "complete" ? "no program board (invoke ds-manager)" : "program n/a until bootstrap"
if (existsSync(programPath)) {
  const board = readFileSync(programPath, "utf8")
  const next = board.match(/^recommendedNext:\s*(.+)$/m)
  programNote = next ? `program recommendedNext=${next[1].trim()}` : "program board present"
}

const brand = `pack id=${pack.id || "(unset)"}`
console.log(
  `ds-kit: ${brand} status=${pack.bootstrapStatus} ${gapNote}; ${memNote}; ${programNote}. One ds-* owner. Confirm before writes. See docs/AGENT-KIT.md.`
)
process.exit(0)
