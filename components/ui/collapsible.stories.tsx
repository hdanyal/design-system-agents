import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const meta = {
  title: "UI/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    a11y: { test: "error" },
  },
} satisfies Meta<typeof Collapsible>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Collapsible defaultOpen className="w-80">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-foreground">@carina/ui</p>
        <CollapsibleTrigger render={<Button variant="ghost" size="sm" />}>
          Toggle
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <p className="mt-2 text-sm text-muted-foreground">
          Shared primitives for forms, overlays, and layout.
        </p>
      </CollapsibleContent>
    </Collapsible>
  ),
}
