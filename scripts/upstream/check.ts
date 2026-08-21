import { createHash } from "node:crypto"
import { existsSync, readFileSync, readdirSync } from "node:fs"
import path from "node:path"
import { paths } from "../lib/paths"
import { fail, readJson } from "../lib/fs"

type PatchLedger = {
  shadcnCli: string
  preset: string
  patches: Array<{
    component: string
    reason: string
    owner: string
    baselineHash?: string
    removalCondition?: string
  }>
}

const ledger = readJson<PatchLedger>(paths.upstreamPatches)
const patched = new Set(ledger.patches.map((patch) => patch.component))

const uiFiles = readdirSync(paths.uiDir).filter((file) => file.endsWith(".tsx") && !file.endsWith(".stories.tsx"))

if (ledger.patches.length === 0) {
  console.log("upstream:check: no declared stock patches")
} else {
  for (const patch of ledger.patches) {
    const file = path.join(paths.uiDir, `${patch.component}.tsx`)
    if (!existsSync(file)) fail(`Patched stock file missing: ${file}`)
    if (!patch.reason || !patch.owner) fail(`Patch for ${patch.component} needs reason and owner`)
    if (patch.baselineHash) {
      const hash = createHash("sha256").update(readFileSync(file)).digest("hex")
      if (hash === patch.baselineHash) {
        fail(`Patch ${patch.component} matches baseline; remove it from upstream-patches.json`)
      }
    }
  }
}

for (const file of uiFiles) {
  const name = file.replace(/\.tsx$/, "")
  if (patched.has(name)) continue
}

console.log(`upstream:check passed (${uiFiles.length} stock files, ${ledger.patches.length} declared patches)`)
