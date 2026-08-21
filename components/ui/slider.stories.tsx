import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

const meta = {
  title: "UI/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    a11y: { test: "error" },
  },
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="grid gap-3">
      {/* The thumb renders a hidden range input that inherits the root's
          labelling, so the slider needs an associated label. */}
      <Label id="slider-volume-label">Volume</Label>
      <Slider
        aria-labelledby="slider-volume-label"
        className="w-64"
        defaultValue={[50]}
        max={100}
        step={1}
      />
    </div>
  ),
}

export const Range: Story = {
  render: () => (
    <div className="grid gap-3">
      <Label id="slider-price-label">Price range</Label>
      <Slider
        aria-labelledby="slider-price-label"
        className="w-64"
        defaultValue={[25, 75]}
        max={100}
        step={1}
      />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="grid gap-3">
      <Label id="slider-disabled-label">Volume</Label>
      <Slider
        aria-labelledby="slider-disabled-label"
        className="w-64"
        defaultValue={[30]}
        max={100}
        step={1}
        disabled
      />
    </div>
  ),
}
