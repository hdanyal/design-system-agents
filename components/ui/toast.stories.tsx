import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, screen, userEvent, waitFor } from "storybook/test"

import { Button } from "@/components/ui/button"
import { Toaster, toast } from "@/components/ui/toast"

const meta = {
  title: "UI/Toast",
  component: Toaster,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    a11y: { test: "error" },
  },
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Toaster>
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            title: "Release published",
            description: "example-ds v0.1.0 is available at /r/v0.1.0.",
          })
        }
      >
        Show toast
      </Button>
    </Toaster>
  ),
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Show toast" }))
    await waitFor(() =>
      expect(screen.getByText("Release published")).toBeVisible()
    )
  },
}

export const Types: Story = {
  render: () => (
    <Toaster>
      <div className="flex flex-wrap gap-2">
        {(["success", "error", "warning", "info"] as const).map((type) => (
          <Button
            key={type}
            variant="outline"
            onClick={() =>
              toast.add({
                type,
                title: `${type} toast`,
                description: `An example ${type} notification.`,
              })
            }
          >
            {type}
          </Button>
        ))}
      </div>
    </Toaster>
  ),
}

export const WithAction: Story = {
  render: () => (
    <Toaster>
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            title: "Drift detected",
            description: "A managed file was modified locally.",
            actionProps: {
              children: "Review",
              onClick: () => undefined,
            },
          })
        }
      >
        Show toast with action
      </Button>
    </Toaster>
  ),
}
