import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { DirectionProvider } from "@/components/ui/direction"

const meta = {
  title: "UI/Direction",
  component: DirectionProvider,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    a11y: { test: "error" },
  },
} satisfies Meta<typeof DirectionProvider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <DirectionProvider direction="ltr">
      <p className="text-sm text-foreground">Left-to-right layout provider.</p>
    </DirectionProvider>
  ),
}
