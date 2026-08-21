import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { HeadingGroup } from "./heading-group"

const meta = {
  title: "Carina/Heading Group",
  component: HeadingGroup,
  tags: ["autodocs", "experimental", "a11y-error"],
  parameters: {
    layout: "padded",
    a11y: { test: "error" },
  },
  args: {
    eyebrow: "Documentation",
    title: "Heading group",
    description:
      "A reusable title cluster for page and section introductions. Values come from tokens, not hardcoded color.",
  },
} satisfies Meta<typeof HeadingGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Centered: Story = {
  args: {
    align: "center",
  },
}

export const TitleOnly: Story = {
  args: {
    eyebrow: undefined,
    description: undefined,
    title: "Invoices",
  },
}

export const LongCopy: Story = {
  args: {
    title: "Quarterly reconciliation workspace",
    description:
      "This synthetic description is intentionally long so reviewers can check wrapping, 200% zoom reflow, and muted-foreground contrast against the canvas.",
  },
}
