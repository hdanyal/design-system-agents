import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"

const meta = {
  title: "UI/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    a11y: { test: "error" },
  },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Toggle aria-label="Toggle italic">
      <ItalicIcon />
    </Toggle>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Toggle aria-label="Toggle bold" variant="default">
        <BoldIcon />
      </Toggle>
      <Toggle aria-label="Toggle italic" variant="outline">
        <ItalicIcon />
      </Toggle>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Toggle aria-label="Underline small" size="sm">
        <UnderlineIcon />
      </Toggle>
      <Toggle aria-label="Underline default" size="default">
        <UnderlineIcon />
      </Toggle>
      <Toggle aria-label="Underline large" size="lg">
        <UnderlineIcon />
      </Toggle>
    </div>
  ),
}
