import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress"

const meta = {
  title: "UI/Progress",
  component: Progress,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    a11y: { test: "error" },
  },
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 62,
  },
  render: () => (
    <Progress value={62} className="w-72">
      <ProgressLabel>Uploading</ProgressLabel>
      <ProgressValue />
    </Progress>
  ),
}
