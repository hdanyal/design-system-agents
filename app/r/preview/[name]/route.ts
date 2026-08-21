import { authorizeRegistry, jsonResponse, readRegistryItem } from "@/lib/registry-server"

export async function GET(
  request: Request,
  context: { params: Promise<{ name: string }> }
) {
  const unauthorized = authorizeRegistry(request)
  if (unauthorized) return unauthorized
  const { name } = await context.params
  const item = readRegistryItem("dev", name)
  if (!item) return new Response("Preview artifact not found", { status: 404 })
  return jsonResponse(item)
}
