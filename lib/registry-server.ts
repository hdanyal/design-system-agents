import { existsSync, readFileSync } from "node:fs"
import path from "node:path"

const GENERATED_DEV = path.join(process.cwd(), "generated/r/dev")
const GENERATED_RELEASE = path.join(process.cwd(), "generated/r/v")

export function authorizeRegistry(request: Request) {
  const expected = process.env.EXAMPLE_REGISTRY_TOKEN
  if (!expected) {
    return new Response(JSON.stringify({ error: "Registry token is not configured" }), {
      status: 503,
      headers: { "content-type": "application/json" },
    })
  }

  const header = request.headers.get("authorization") ?? ""
  const token = header.toLowerCase().startsWith("bearer ") ? header.slice(7) : ""
  if (token !== expected) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    })
  }

  return null
}

export function readRegistryItem(channel: "dev" | "release", name: string, version?: string) {
  const fileName = name.endsWith(".json") ? name : `${name}.json`
  const file =
    channel === "dev"
      ? path.join(GENERATED_DEV, fileName)
      : path.join(GENERATED_RELEASE, version ?? "", fileName)

  if (!existsSync(file)) return null
  return readFileSync(file, "utf8")
}

export function jsonResponse(body: string) {
  return new Response(body, {
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store",
    },
  })
}
