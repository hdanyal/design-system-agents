import { authorizeRegistry, jsonResponse, readRegistryItem } from "@/lib/registry-server"

export async function GET(
  request: Request,
  context: { params: Promise<{ version: string }> }
) {
  const unauthorized = authorizeRegistry(request)
  if (unauthorized) return unauthorized
  const { version } = await context.params
  const index = readRegistryItem("release", "index", version)
  if (!index) return new Response("Release index not found", { status: 404 })
  return jsonResponse(index)
}
