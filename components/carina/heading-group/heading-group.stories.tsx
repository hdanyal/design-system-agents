import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { HeadingGroup } from "./heading-group"

const meta = {
  title: "Carina/Heading Group",
  component: HeadingGroup,
  tags: ["autodocs", "experimental", "a11y-error"],
  parameters: {
    layout: "padded",
    a11y: { test: "error" },
    docs: {
      description: {
        component:
          "Title cluster with required `title` and optional `eyebrow`, `description`, `align` (`start` | `center`), and `className`. Not page chrome.",
      },
    },
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

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Default `align` is `start`. Eyebrow, title, and description all set.",
      },
    },
  },
}

export const Centered: Story = {
  args: {
    align: "center",
  },
  parameters: {
    docs: {
      description: {
        story: "`align=\"center\"` centers the cluster.",
      },
    },
  },
}

export const TitleOnly: Story = {
  args: {
    eyebrow: undefined,
    description: undefined,
    title: "Invoices",
  },
  parameters: {
    docs: {
      description: {
        story: "Required `title` only; eyebrow and description omitted.",
      },
    },
  },
}

export const LongCopy: Story = {
  args: {
    title: "Quarterly reconciliation workspace",
    description:
      "This synthetic description is intentionally long so reviewers can check wrapping, 200% zoom reflow, and muted-foreground contrast against the canvas.",
  },
  parameters: {
    docs: {
      description: {
        story: "Long `description` for wrap and contrast checks. No extra props.",
      },
    },
  },
}
