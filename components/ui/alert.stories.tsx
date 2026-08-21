import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { CircleAlertIcon } from "lucide-react"

import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

const meta = {
  title: "UI/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    a11y: { test: "error" },
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Alert className="w-96">
      <CircleAlertIcon />
      <AlertTitle>Heads up</AlertTitle>
      <AlertDescription>
        You can add components to your app using the CLI.
      </AlertDescription>
    </Alert>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="grid w-96 gap-4">
      <Alert>
        <CircleAlertIcon />
        <AlertTitle>Default</AlertTitle>
        <AlertDescription>This is a default alert.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <CircleAlertIcon />
        <AlertTitle>Destructive</AlertTitle>
        <AlertDescription>Something went wrong. Try again.</AlertDescription>
        <AlertAction>
          <Button variant="ghost" size="xs">
            Dismiss
          </Button>
        </AlertAction>
      </Alert>
    </div>
  ),
}
