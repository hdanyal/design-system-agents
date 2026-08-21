import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { CheckIcon, PlusIcon, SearchIcon } from "lucide-react"

const meta = {
  title: "Foundations/Icons",
  tags: ["autodocs", "a11y-error"],
  parameters: {
    layout: "padded",
    a11y: { test: "error" },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Lucide: Story = {
  render: () => (
    <div className="flex items-center gap-4 text-foreground">
      <PlusIcon aria-hidden="true" />
      <SearchIcon aria-hidden="true" />
      <CheckIcon aria-hidden="true" />
      <p className="text-sm text-muted-foreground">Import individual lucide-react icons only.</p>
    </div>
  ),
}
