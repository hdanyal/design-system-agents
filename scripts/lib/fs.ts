import { createHash } from "node:crypto"
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs"
import path from "node:path"

export function readJson<T>(file: string): T {
  return JSON.parse(readFileSync(file, "utf8")) as T
}

export function writeJson(file: string, value: unknown) {
  mkdirSync(path.dirname(file), { recursive: true })
  writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`)
}

export function writeText(file: string, value: string) {
  mkdirSync(path.dirname(file), { recursive: true })
  writeFileSync(file, value.endsWith("\n") ? value : `${value}\n`)
}

export function sha256(contents: string) {
  return createHash("sha256").update(contents).digest("hex")
}

export function walkFiles(dir: string, predicate?: (file: string) => boolean): string[] {
  if (!existsSync(dir)) return []
  const out: string[] = []
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry)
    const stat = statSync(full)
    if (stat.isDirectory()) {
      if (entry === "node_modules" || entry === ".git" || entry === "generated") continue
      out.push(...walkFiles(full, predicate))
    } else if (!predicate || predicate(full)) {
      out.push(full)
    }
  }
  return out
}

export function fail(message: string): never {
  console.error(message)
  process.exit(1)
}
