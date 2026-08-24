import { existsSync, readFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")

type PackPaths = {
  tokens?: string
  ui?: string
  primitives?: string
  blocks?: string
  prototypes?: string
  docs?: string
}

function loadPackPaths(): PackPaths {
  const packPath = path.join(ROOT, ".agents/context.json")
  if (!existsSync(packPath)) return {}
  try {
    const pack = JSON.parse(readFileSync(packPath, "utf8")) as { paths?: PackPaths }
    return pack.paths ?? {}
  } catch {
    return {}
  }
}

const packPaths = loadPackPaths()

function resolvePackPath(rel: string | undefined, fallback: string): string {
  return path.join(ROOT, rel ?? fallback)
}

export const paths = {
  root: ROOT,
  tokens: resolvePackPath(packPaths.tokens, "tokens.json"),
  designLanguage: path.join(ROOT, "design-language.json"),
  upstreamPatches: path.join(ROOT, "upstream-patches.json"),
  registry: path.join(ROOT, "registry.json"),
  catalog: path.join(ROOT, "docs/catalog.md"),
  catalogJson: path.join(ROOT, "generated/catalog.json"),
  foundationsData: path.join(ROOT, "generated/foundations.json"),
  figmaMappings: path.join(ROOT, "generated/figma-variables.json"),
  brandingReference: path.join(ROOT, ".agents/skills/example-branding/reference.md"),
  tokensCss: path.join(ROOT, "app/tokens.generated.css"),
  skillsDir: path.join(ROOT, ".agents/skills"),
  skillManifest: path.join(ROOT, ".agents/skills/manifest.json"),
  skillsDoc: path.join(ROOT, "docs/SKILLS.md"),
  agentTooling: path.join(ROOT, "agent-tooling.json"),
  agentToolingLock: path.join(ROOT, "agent-tooling.lock.json"),
  cursorMcp: path.join(ROOT, ".cursor/mcp.json"),
  publicRegistry: path.join(ROOT, "public/r"),
  generatedRegistry: path.join(ROOT, "generated/r"),
  releaseDir: path.join(ROOT, "generated/release"),
  uiDir: resolvePackPath(packPaths.ui, "components/ui"),
  primitivesDir: resolvePackPath(packPaths.primitives, "components/primitives"),
  prototypesDir: resolvePackPath(packPaths.prototypes, "prototypes"),
  blocksDir: resolvePackPath(packPaths.blocks, "registry/blocks"),
  guidanceDir: path.join(ROOT, "registry/guidance"),
  packPaths,
}
