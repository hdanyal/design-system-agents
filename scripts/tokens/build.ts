import { existsSync, readFileSync } from "node:fs"
import { paths } from "../lib/paths"
import { fail, readJson, writeJson, writeText } from "../lib/fs"

type ModeValue = { light: string; dark: string } | string

type TokenNode = {
  $type?: string
  $description?: string
  $value?: ModeValue
  [key: string]: unknown
}

type TokenFile = Record<string, Record<string, TokenNode>>

const GENERATED_HEADER =
  "/* GENERATED from tokens.json. Do not hand-edit. Run `pnpm tokens:build`. */"

function flattenTokens(tokens: TokenFile) {
  const items: Array<{
    group: string
    name: string
    cssName: string
    type?: string
    description?: string
    light: string
    dark: string
  }> = []

  for (const [group, groupTokens] of Object.entries(tokens)) {
    if (group.startsWith("$")) continue
    for (const [name, token] of Object.entries(groupTokens)) {
      if (!token || typeof token !== "object" || token.$value == null) continue
      const value = token.$value
      const light = typeof value === "string" ? value : value.light
      const dark = typeof value === "string" ? value : value.dark
      items.push({
        group,
        name,
        cssName: name,
        type: token.$type,
        description: token.$description,
        light,
        dark,
      })
    }
  }
  return items
}

function cssBlock(selector: string, items: ReturnType<typeof flattenTokens>, mode: "light" | "dark") {
  const lines = items
    .filter((item) => item.group === "color" || item.group === "radius")
    .map((item) => {
      const value = item.group === "radius" ? item.light : mode === "light" ? item.light : item.dark
      const varName = item.group === "radius" ? "radius" : item.cssName
      return `  --${varName}: ${value};`
    })
  return `${selector} {\n${lines.join("\n")}\n}`
}

function brandingMarkdown(items: ReturnType<typeof flattenTokens>, designLanguage: Record<string, unknown>) {
  const colors = items.filter((item) => item.group === "color")
  const rows = colors
    .map(
      (item) =>
        `| \`--${item.cssName}\` | ${item.description ?? ""} | \`${item.light}\` | \`${item.dark}\` |`
    )
    .join("\n")

  return `# Example branding reference

> **GENERATED from \`tokens.json\` and \`design-language.json\`. Do not hand-edit.**
> Run \`pnpm tokens:build\`. Do not hand-copy hex or oklch into components or stories.

- Preset: \`${designLanguage.preset}\`
- shadcn CLI: \`${designLanguage.shadcnCli}\`
- Icon library: \`${designLanguage.iconLibrary}\`
- Font: \`${designLanguage.font}\`
- Radius: \`${items.find((item) => item.group === "radius")?.light ?? ""}\`

## Overview

Example's visual identity is expressed through canonical tokens, CSS variables, the Inter type stack, and lucide icons. Treat this reference as identity guidance, not a second palette: compose existing catalog entities and preserve their established contracts.

## Token context (CSS vars)

Use CSS variables only: \`bg-primary\`, \`text-foreground\`, \`var(--ring)\`. Never paste resolved hex or oklch values into JSX, stories, or component classes.

| Token | Description | Light | Dark |
| --- | --- | --- | --- |
${rows}

## Do's and Don'ts

**Do**
- Use semantic CSS variables and token-backed utility classes.
- Reuse stock UI, host primitives, and registered blocks before extracting.
- Keep generated outputs synchronized with \`pnpm tokens:build\`.

**Don't**
- Restyle stock components outside the upstream patch workflow.
- Create twin primitives or duplicate public APIs when an existing entity can be enhanced.
- Hand-edit generated token outputs or invent identity colors in components and stories.

## Catalog component intent

Use \`.agents/inventory/components.json\` and Storybook as the source for what exists and how it behaves. Prefer reuse, then enhance an existing entity; extract a new primitive or block only after Architect confirms the catalog gap and rationale.
`
}

function build() {
  const tokens = readJson<TokenFile>(paths.tokens)
  const designLanguage = readJson<Record<string, unknown>>(paths.designLanguage)
  const items = flattenTokens(tokens)
  const colors = items.filter((item) => item.group === "color")
  const radius = items.find((item) => item.group === "radius")

  const css = `${GENERATED_HEADER}

${cssBlock(":root", items, "light")}

${cssBlock(".dark", items, "dark")}
`

  const foundations = {
    generatedFrom: "tokens.json",
    colors: colors.map((item) => ({
      name: item.cssName,
      cssVar: `var(--${item.cssName})`,
      description: item.description,
      light: item.light,
      dark: item.dark,
    })),
    radius: radius
      ? { name: "radius", cssVar: "var(--radius)", value: radius.light }
      : null,
    font: {
      sans: "var(--font-sans)",
      heading: "var(--font-heading)",
      mono: "var(--font-mono)",
    },
    iconLibrary: designLanguage.iconLibrary,
  }

  const figma = {
    generatedFrom: "tokens.json",
    modes: ["light", "dark"],
    variables: colors.map((item) => ({
      name: item.cssName,
      description: item.description,
      scopes: ["ALL_FILLS", "STROKE_COLOR"],
      codeSyntax: { WEB: `var(--${item.cssName})` },
      values: { light: item.light, dark: item.dark },
    })),
  }

  return {
    css,
    foundations,
    figma,
    branding: brandingMarkdown(items, designLanguage),
  }
}

function maybeCheck(actual: string, expectedPath: string, label: string) {
  if (!existsSync(expectedPath)) {
    fail(`${label} missing: ${expectedPath}`)
  }
  const expected = readFileSync(expectedPath, "utf8")
  if (expected !== actual && expected !== `${actual}`) {
    fail(`${label} is out of date. Run \`pnpm tokens:build\`.`)
  }
}

const check = process.argv.includes("--check")
const outputs = build()

if (check) {
  maybeCheck(outputs.css, paths.tokensCss, "Generated token CSS")
  maybeCheck(`${JSON.stringify(outputs.foundations, null, 2)}\n`, paths.foundationsData, "Foundations data")
  maybeCheck(`${JSON.stringify(outputs.figma, null, 2)}\n`, paths.figmaMappings, "Figma mappings")
  maybeCheck(outputs.branding, paths.brandingReference, "Branding reference")
  console.log("tokens:check passed")
} else {
  writeText(paths.tokensCss, outputs.css)
  writeJson(paths.foundationsData, outputs.foundations)
  writeJson(paths.figmaMappings, outputs.figma)
  writeText(paths.brandingReference, outputs.branding)
  console.log("tokens:build wrote CSS, foundations, Figma mappings, and branding reference")
}
