import { createHash } from "node:crypto"
import { readFileSync } from "node:fs"
import path from "node:path"
import { paths } from "../lib/paths"
import { writeJson } from "../lib/fs"

const pkg = JSON.parse(readFileSync(path.join(paths.root, "package.json"), "utf8")) as {
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
}

const components = Object.entries({ ...pkg.dependencies, ...pkg.devDependencies }).map(
  ([name, version]) => ({
    type: "library",
    name,
    version,
    purl: `pkg:npm/${name}@${String(version).replace(/^[^0-9]*/, "")}`,
  })
)

const sbom = {
  bomFormat: "CycloneDX",
  specVersion: "1.5",
  version: 1,
  metadata: {
    timestamp: "1970-01-01T00:00:00.000Z",
    component: { name: "example-ds", type: "application" },
  },
  components,
  hash: createHash("sha256").update(JSON.stringify(components)).digest("hex"),
}

writeJson(path.join(paths.root, "generated/sbom/sbom.json"), sbom)
console.log(`SBOM wrote ${components.length} components`)
