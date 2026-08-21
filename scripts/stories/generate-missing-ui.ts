import { existsSync, readdirSync } from "node:fs"
import path from "node:path"
import { paths } from "../lib/paths"
import { writeText } from "../lib/fs"

const files = readdirSync(paths.uiDir).filter((file) => file.endsWith(".tsx") && !file.endsWith(".stories.tsx"))

for (const file of files) {
  const name = file.replace(/\.tsx$/, "")
  const storyPath = path.join(paths.uiDir, `${name}.stories.tsx`)
  if (existsSync(storyPath)) continue
  const exportName = name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")
  const title = name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")

  writeText(
    storyPath,
    `import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "UI/${title}",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    a11y: { test: "todo" },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <p className="text-sm text-muted-foreground">
      Representative story for stock <code>${name}</code> (${exportName}). Compose from the catalog instead of cloning.
    </p>
  ),
}
`
  )
}

console.log("generated missing stock UI stories")
