import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Button } from "@/components/ui/button"

import { PageHeader } from "./page-header"

const meta = {
  title: "Blocks/Page Header",
  component: PageHeader,
  tags: ["autodocs", "experimental", "a11y-error"],
  parameters: {
    layout: "padded",
    a11y: { test: "error" },
  },
  args: {
    eyebrow: "Billing",
    title: "Invoices",
    description: "Review synthetic invoice records for the current period.",
  },
} satisfies Meta<typeof PageHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithActions: Story = {
  args: {
    actions: (
      <>
        <Button variant="outline">Export</Button>
        <Button>Create invoice</Button>
      </>
    ),
  },
}

export const Narrow: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  args: {
    actions: <Button>Create invoice</Button>,
  },
}

export const EmptyActions: Story = {
  args: {
    title: "No invoices yet",
    description: "Create the first synthetic invoice to populate this workspace.",
    actions: undefined,
  },
}
