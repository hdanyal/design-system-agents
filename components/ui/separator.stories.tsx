import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Separator } from "@/components/ui/separator"

const meta = {
  title: "UI/Separator",
  component: Separator,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    a11y: { test: "error" },
  },
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-64">
      <p className="text-sm text-foreground">Example Design System</p>
      <Separator className="my-4" />
      <p className="text-sm text-muted-foreground">Sera / orange preset</p>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="flex h-8 items-center gap-4">
      <span className="text-sm text-foreground">Blog</span>
      <Separator orientation="vertical" />
      <span className="text-sm text-foreground">Docs</span>
      <Separator orientation="vertical" />
      <span className="text-sm text-foreground">Source</span>
    </div>
  ),
}
