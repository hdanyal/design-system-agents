import { existsSync, readFileSync } from "node:fs"
import path from "node:path"

const root = process.cwd()
const packPath = path.join(root, ".agents/context.json")
let primitivesPath = "components/primitives/"
if (existsSync(packPath)) {
  try {
    const pack = JSON.parse(readFileSync(packPath, "utf8"))
    if (pack.paths?.primitives) primitivesPath = `${pack.paths.primitives}/`
  } catch {
    // keep default
  }
}

const payload = await new Promise((resolve) => {
  let data = ""
  process.stdin.setEncoding("utf8")
  process.stdin.on("data", (chunk) => (data += chunk))
  process.stdin.on("end", () => resolve(data))
  setTimeout(() => resolve(data), 50)
})

const text = `${payload} ${process.env.CURSOR_STOP_PATHS ?? ""}`
const protectedPaths = ["registry/", "registry.json", primitivesPath, "tokens.json", "app/tokens.generated.css"]

if (protectedPaths.some((item) => text.includes(item))) {
  console.log(
    "HITL required: do not mark protected token/primitive/registry work done without GOVERNANCE checkboxes."
  )
}

process.exit(0)
