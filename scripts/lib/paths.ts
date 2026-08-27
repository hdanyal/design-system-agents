import { existsSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")

export const paths = {
  root: ROOT,
  skillTemplatesManifest: path.join(ROOT, ".agents/kit/skill-templates/manifest.json"),
  skillsDoc: path.join(ROOT, "docs/SKILLS.md"),
  isKitSource: existsSync(path.join(ROOT, ".agents/kit/SOURCE")),
}
