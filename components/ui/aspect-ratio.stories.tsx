import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { AspectRatio } from "@/components/ui/aspect-ratio"

const meta = {
  title: "UI/AspectRatio",
  component: AspectRatio,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    a11y: { test: "error" },
  },
} satisfies Meta<typeof AspectRatio>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    ratio: 16 / 9,
  },
  render: () => (
    <div className="w-80">
      <AspectRatio ratio={16 / 9} className="bg-muted">
        <span className="flex size-full items-center justify-center text-sm text-muted-foreground">
          16:9
        </span>
      </AspectRatio>
    </div>
  ),
}
