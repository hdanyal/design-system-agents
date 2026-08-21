import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { InvoicesWorkspace } from "./invoices-workspace"

const meta = {
  title: "Prototypes/Invoices Workspace",
  component: InvoicesWorkspace,
  tags: ["experimental"],
  parameters: {
    layout: "fullscreen",
    a11y: { test: "todo" },
  },
} satisfies Meta<typeof InvoicesWorkspace>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
