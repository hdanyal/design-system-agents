import path from "node:path"
import { fileURLToPath } from "node:url"

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")

export const paths = {
  root: ROOT,
  tokens: path.join(ROOT, "tokens.json"),
  designLanguage: path.join(ROOT, "design-language.json"),
  upstreamPatches: path.join(ROOT, "upstream-patches.json"),
  registry: path.join(ROOT, "registry.json"),
  catalog: path.join(ROOT, "docs/catalog.md"),
  catalogJson: path.join(ROOT, "generated/catalog.json"),
  foundationsData: path.join(ROOT, "generated/foundations.json"),
  figmaMappings: path.join(ROOT, "generated/figma-variables.json"),
  brandingReference: path.join(ROOT, ".agents/skills/carina-branding/reference.md"),
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
  uiDir: path.join(ROOT, "components/ui"),
  carinaDir: path.join(ROOT, "components/carina"),
  prototypesDir: path.join(ROOT, "prototypes"),
  blocksDir: path.join(ROOT, "registry/blocks"),
  guidanceDir: path.join(ROOT, "registry/guidance"),
}
