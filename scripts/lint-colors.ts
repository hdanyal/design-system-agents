import { readFileSync } from "node:fs"
import { paths } from "./lib/paths"
import { fail, walkFiles } from "./lib/fs"

const COLOR_RE = /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b|\brgb\(|\brgba\(|\bhsl\(|\bhsla\(/
const uiAllow = `${paths.packPaths.ui ?? "components/ui"}/`
const ALLOW = [
  "/generated/",
  "app/tokens.generated.css",
  "tokens.json",
  "node_modules",
  ".next",
  "storybook-static",
  "scripts/lint-colors.ts",
  uiAllow,
]

const files = walkFiles(paths.root, (file) => /\.(ts|tsx|css|md|json)$/.test(file)).filter(
  (file) => !ALLOW.some((part) => file.includes(part))
)

const violations: string[] = []
for (const file of files) {
  const lines = readFileSync(file, "utf8").split("\n")
  lines.forEach((line, index) => {
    if (COLOR_RE.test(line) && !line.includes("oklch(")) {
      violations.push(`${file}:${index + 1}: ${line.trim()}`)
    }
  })
}

if (violations.length) {
  fail(`Color literals are forbidden. Use tokens.\n${violations.join("\n")}`)
}

console.log("lint-colors passed")
