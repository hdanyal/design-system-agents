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

const { sharedTitles, critiqueTitles, perAgentCounts, total } = scanMemoryRecords(process.cwd())
let memNote = "memory 0 records"
if (total > 0) {
  const sharedPart =
    sharedTitles.length > 0 ? `shared ${sharedTitles.length}: ${sharedTitles.join(", ")}` : "shared 0"
  const critiquePart =
    critiqueTitles.length > 0
      ? `critique ${critiqueTitles.length}: ${critiqueTitles.join(", ")}`
      : "critique 0"
  const perAgentTotal = Object.values(perAgentCounts).reduce((sum, n) => sum + n, 0)
  memNote = `${sharedPart}; ${critiquePart}; per-agent ${perAgentTotal}`
}

const programPath = path.join(process.cwd(), ".agents/program/board.md")
let programNote = pack.bootstrapStatus === "complete" ? "no program board (invoke ds-manager)" : "program n/a until bootstrap"
if (existsSync(programPath)) {
  const board = readFileSync(programPath, "utf8")
  const next = board.match(/^recommendedNext:\s*(.+)$/m)
  programNote = next ? `program recommendedNext=${next[1].trim()}` : "program board present"
}

const brand = pack.id === "carina" ? "pack id=carina" : `pack id=${pack.id || "(unset)"}`
console.log(
  `ds-kit: ${brand} status=${pack.bootstrapStatus} ${gapNote}; ${memNote}; ${programNote}. One ds-* owner. Confirm before writes. See docs/AGENT-KIT.md.`
)
process.exit(0)
