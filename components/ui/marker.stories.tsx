import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SparklesIcon } from "lucide-react"

import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"

const meta = {
  title: "UI/Marker",
  component: Marker,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    a11y: { test: "error" },
  },
} satisfies Meta<typeof Marker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="max-w-md">
      <Marker>
        <MarkerContent>Today</MarkerContent>
      </Marker>
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-6">
      {(["default", "separator", "border"] as const).map((variant) => (
        <Marker key={variant} variant={variant}>
          <MarkerContent>{variant}</MarkerContent>
        </Marker>
      ))}
    </div>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <div className="max-w-md">
      <Marker>
        <MarkerIcon>
          <SparklesIcon />
        </MarkerIcon>
        <MarkerContent>New since your last visit</MarkerContent>
      </Marker>
    </div>
  ),
}
