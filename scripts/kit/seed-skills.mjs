import { existsSync } from "node:fs"
import { fail, path, readJson, seedHostSkills } from "./lib.mjs"

const args = process.argv.slice(2)
const dirIdx = args.indexOf("--dir")
const root = path.resolve(dirIdx >= 0 ? args[dirIdx + 1] : process.cwd())
const idIdx = args.indexOf("--id")
const packPath = path.join(root, ".agents/context.json")
if (!existsSync(packPath)) fail("seed-skills: no pack; bootstrap first")
const pack = readJson(packPath)
const packId = idIdx >= 0 ? args[idIdx + 1] : pack.id
if (!packId) fail("seed-skills: pack id unset; pass --id <name>")
const result = seedHostSkills(root, packId)
if (!result.ok) fail(`seed-skills: ${result.reason}`)
console.log(`seed-skills wrote ${result.count} ${packId}-* skills under ${root}`)
