import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Bubble, BubbleContent, BubbleGroup } from "@/components/ui/bubble"

const meta = {
  title: "UI/Bubble",
  component: Bubble,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    a11y: { test: "error" },
  },
} satisfies Meta<typeof Bubble>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Bubble>
      <BubbleContent>Pin consumers to an immutable release URL.</BubbleContent>
    </Bubble>
  ),
}

export const Variants: Story = {
  render: () => (
    <BubbleGroup className="max-w-lg">
      {(
        [
          "default",
          "secondary",
          "muted",
          "tinted",
          "outline",
          "ghost",
          "destructive",
        ] as const
      ).map((variant) => (
        <Bubble key={variant} variant={variant}>
          <BubbleContent>{variant}</BubbleContent>
        </Bubble>
      ))}
    </BubbleGroup>
  ),
}

export const Alignment: Story = {
  render: () => (
    <BubbleGroup className="max-w-lg">
      <Bubble variant="muted">
        <BubbleContent>Aligned to the start.</BubbleContent>
      </Bubble>
      <Bubble align="end">
        <BubbleContent>Aligned to the end.</BubbleContent>
      </Bubble>
    </BubbleGroup>
  ),
}

export const Interactive: Story = {
  render: () => (
    <Bubble variant="outline">
      <BubbleContent render={<button type="button" />}>
        Open the release manifest
      </BubbleContent>
    </Bubble>
  ),
}
