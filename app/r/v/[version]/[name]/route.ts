import { authorizeRegistry, jsonResponse, readRegistryItem } from "@/lib/registry-server"

export async function GET(
  request: Request,
  context: { params: Promise<{ version: string; name: string }> }
) {
  const unauthorized = authorizeRegistry(request)
  if (unauthorized) return unauthorized
  const { version, name } = await context.params
  const item = readRegistryItem("release", name, version)
  if (!item) return new Response("Not found", { status: 404 })
  return jsonResponse(item)
}
