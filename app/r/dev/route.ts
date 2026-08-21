import { authorizeRegistry, jsonResponse, readRegistryItem } from "@/lib/registry-server"

export async function GET(request: Request) {
  const unauthorized = authorizeRegistry(request)
  if (unauthorized) return unauthorized
  const index = readRegistryItem("dev", "index")
  if (!index) return new Response("Registry index not built", { status: 404 })
  return jsonResponse(index)
}
