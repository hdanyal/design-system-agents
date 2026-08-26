import { existsSync, readFileSync, readdirSync } from "node:fs"
import {
  SCHEMA_VERSION,
  adapterRelPaths,
  fail,
  hashTree,
  kitRootFromScripts,
  loadAgentManifest,
  loadKitManifest,
  path,
  readJson,
  routeIntent,
  validateDescription,
  validateHandoff,
  validateInventory,
  validateMemoryTree,
  validatePack,
  isKitSource,
  validateProgram,
  validateSharedMemorySlugs,
} from "./lib.mjs"

const args = process.argv.slice(2)
const dirIdx = args.indexOf("--dir")
const root = path.resolve(dirIdx >= 0 ? args[dirIdx + 1] : kitRootFromScripts())
const kitSource = isKitSource(root)

const kit = loadKitManifest(root)
const agents = loadAgentManifest(root)
const ids = agents.agents.map((a) => a.id)
if (new Set(ids).size !== ids.length) fail("duplicate agent ids")
if (ids.length === 0) fail("no agents in manifest")

for (const agent of agents.agents) {
  const descErr = validateDescription(agent)
  if (descErr) fail(descErr)
  const playbook = path.join(root, ".agents/agents", `${agent.id}.md`)
  if (!existsSync(playbook)) fail(`missing playbook ${agent.id}`)
}

const vague = agents.agents.filter((a) => /helps with|^general /i.test(a.description))
if (vague.length) fail("vague descriptions")

const evalPath = path.join(root, ".agents/kit/intent-eval.json")
if (existsSync(evalPath)) {
  const { utterances } = readJson(evalPath)
  for (const row of utterances) {
    const result = routeIntent(row.text, agents)
    if (result.ambiguous) fail(`intent eval ambiguous for: ${row.text}`)
    if (result.owner !== row.owner) fail(`intent eval expected ${row.owner} for "${row.text}", got ${result.owner}`)
  }
}

const lockPath = path.join(root, ".agents/kit/adapters.lock.json")
if (!existsSync(lockPath)) fail("missing adapters.lock.json; run pnpm agents:sync")
const lock = readJson(lockPath)
const rels = adapterRelPaths(ids)
const hashes = hashTree(root, rels)
for (const rel of rels) {
  if (!existsSync(path.join(root, rel))) fail(`missing generated adapter ${rel}`)
  if (lock.hashes?.[rel] !== hashes[rel]) fail(`adapter drift ${rel}; run pnpm agents:sync`)
}

const packPath = path.join(root, ".agents/context.json")
if (existsSync(packPath)) {
  const pack = readJson(packPath)
  const errors = validatePack(pack, { allowExampleId: kitSource || pack.id === "example" })
  if (errors.length) fail(`pack invalid: ${errors.join(", ")}`)
  const invPath = path.join(root, ".agents/inventory/components.json")
  if (existsSync(invPath)) {
    const inv = readJson(invPath)
    const invErr = validateInventory(inv, pack.id)
    if (invErr.length) fail(`inventory: ${invErr.join(", ")}`)
  }
  const memRoot = path.join(root, ".agents/memory")
  if (existsSync(memRoot)) {
    const memErrors = validateMemoryTree(root, pack.id)
    for (const err of memErrors) fail(err)
    const slugErr = validateSharedMemorySlugs(root)
    if (slugErr) fail(slugErr)
  }
  const programErr = validateProgram(root, pack.id, ids)
  if (programErr.length) fail(`program: ${programErr.join(", ")}`)
  const handoffs = path.join(root, ".agents/handoffs")
  if (existsSync(handoffs)) {
    for (const entry of readdirSync(handoffs)) {
      if (!entry.endsWith(".md")) continue
      const err = validateHandoff(readFileSync(path.join(handoffs, entry), "utf8"), pack.id)
      if (err) fail(`handoff ${entry}: ${err}`)
    }
  }
}

if (kit.$schemaVersion !== SCHEMA_VERSION) fail("kit schema")
console.log(`kit-check passed (${path.basename(root)}, kit ${kit.kitVersion})`)
