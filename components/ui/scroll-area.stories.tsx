import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

const tags = Array.from({ length: 20 }, (_, i) => `v1.${i}.0`)

const meta = {
  title: "UI/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    a11y: { test: "error" },
  },
} satisfies Meta<typeof ScrollArea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-48 w-56 rounded-none border">
      <div className="p-4">
        <h4 className="mb-4 text-xs font-semibold tracking-wide uppercase">
          Tags
        </h4>
        {tags.map((tag) => (
          <div key={tag}>
            <div className="py-2 text-sm text-foreground">{tag}</div>
            <Separator />
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}
