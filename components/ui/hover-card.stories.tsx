import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, screen, userEvent, waitFor } from "storybook/test"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

const meta = {
  title: "UI/Hover Card",
  component: HoverCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    a11y: { test: "error" },
  },
} satisfies Meta<typeof HoverCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger render={<Button variant="link" />}>
        @example
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="space-y-1">
          <p className="text-sm font-semibold">Design System Agents</p>
          <p className="text-sm text-muted-foreground">
            Portable ds-* specialists plus a bundled practice catalog.
          </p>
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <CalendarIcon className="size-3" aria-hidden="true" />
            Maintained since August 2026
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
  play: async ({ canvas }) => {
    await userEvent.hover(canvas.getByRole("button", { name: "@example" }))
    // The popup mounts before its open animation finishes, so poll for paint.
    await waitFor(() =>
      expect(screen.getByText("Design System Agents")).toBeVisible()
    )
  },
}

export const Open: Story = {
  render: () => (
    <HoverCard defaultOpen>
      <HoverCardTrigger render={<Button variant="link" />}>
        Release notes
      </HoverCardTrigger>
      <HoverCardContent>
        <p className="text-sm">
          Immutable releases are published under <code>/r/vX.Y.Z</code> and never
          change after publication.
        </p>
      </HoverCardContent>
    </HoverCard>
  ),
}
