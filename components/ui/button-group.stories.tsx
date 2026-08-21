import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group"

const meta = {
  title: "UI/Button Group",
  component: ButtonGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    a11y: { test: "error" },
  },
} satisfies Meta<typeof ButtonGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ButtonGroup aria-label="Text alignment">
      <Button variant="outline">Left</Button>
      <Button variant="outline">Center</Button>
      <Button variant="outline">Right</Button>
    </ButtonGroup>
  ),
}

export const Vertical: Story = {
  render: () => (
    <ButtonGroup orientation="vertical" aria-label="Row actions">
      <Button variant="outline">Duplicate</Button>
      <Button variant="outline">Archive</Button>
      <Button variant="outline">Delete</Button>
    </ButtonGroup>
  ),
}

export const IconButtons: Story = {
  render: () => (
    <ButtonGroup aria-label="Text formatting">
      <Button variant="outline" size="icon" aria-label="Bold">
        <BoldIcon />
      </Button>
      <Button variant="outline" size="icon" aria-label="Italic">
        <ItalicIcon />
      </Button>
      <Button variant="outline" size="icon" aria-label="Underline">
        <UnderlineIcon />
      </Button>
    </ButtonGroup>
  ),
}

export const WithSeparator: Story = {
  render: () => (
    <ButtonGroup aria-label="Publish actions">
      <Button variant="outline">Publish</Button>
      <ButtonGroupSeparator />
      <Button variant="outline">Schedule</Button>
    </ButtonGroup>
  ),
}

export const WithText: Story = {
  render: () => (
    <ButtonGroup aria-label="Quantity">
      <ButtonGroupText>Seats</ButtonGroupText>
      <Button variant="outline">-</Button>
      <Button variant="outline">+</Button>
    </ButtonGroup>
  ),
}
