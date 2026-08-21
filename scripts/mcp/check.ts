import { existsSync } from "node:fs"
import { paths } from "../lib/paths"
import { fail, readJson } from "../lib/fs"

type Tooling = {
  mcpServers: Record<string, { command: string; args: string[]; allowedRegistries?: string[] }>
}

const tooling = readJson<Tooling>(paths.agentTooling)
const shadcn = tooling.mcpServers.shadcn
if (!shadcn) fail("agent-tooling.json must declare mcpServers.shadcn")
if (!shadcn.args.includes("4.18.0") && !shadcn.args.some((arg) => arg.includes("shadcn@4.18.0"))) {
  fail("shadcn MCP must use the pinned CLI version")
}

const allowed = shadcn.allowedRegistries ?? ["@shadcn", "@carina"]
if (!allowed.includes("@carina") || !allowed.includes("@shadcn")) {
  fail("MCP allowlist must include @shadcn and @carina only unless reviewed")
}

const catalog = readJson<{ items: Array<{ name: string }> }>(paths.catalogJson)
const required = ["heading-group", "page-header", "agent-guidance"]
for (const name of required) {
  if (!catalog.items.some((item) => item.name === name)) fail(`MCP catalog missing ${name}`)
}

if (!existsSync(paths.generatedRegistry) && !existsSync(paths.publicRegistry)) {
  console.log("mcp:check: registry artifacts not built yet; catalog/allowlist validated")
} else {
  console.log("mcp:check passed")
}
