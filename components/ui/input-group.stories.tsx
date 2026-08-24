import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SearchIcon } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"

const meta = {
  title: "UI/Input Group",
  component: InputGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    a11y: { test: "error" },
  },
} satisfies Meta<typeof InputGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="grid w-80 gap-2">
      <Label htmlFor="input-group-search">Search</Label>
      <InputGroup>
        <InputGroupAddon>
          <SearchIcon aria-hidden="true" />
        </InputGroupAddon>
        <InputGroupInput id="input-group-search" placeholder="Search catalog" />
      </InputGroup>
    </div>
  ),
}

export const WithTextAddon: Story = {
  render: () => (
    <div className="grid w-80 gap-2">
      <Label htmlFor="input-group-url">Docs path</Label>
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>example.dev/</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput id="input-group-url" defaultValue="governance" />
      </InputGroup>
    </div>
  ),
}

export const WithButton: Story = {
  render: () => (
    <div className="grid w-80 gap-2">
      <Label htmlFor="input-group-token">Registry token</Label>
      <InputGroup>
        <InputGroupInput id="input-group-token" defaultValue="example_pat_…" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton>Copy</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
}

export const WithTextarea: Story = {
  render: () => (
    <div className="grid w-80 gap-2">
      <Label htmlFor="input-group-notes">Release notes</Label>
      <InputGroup>
        <InputGroupTextarea
          id="input-group-notes"
          rows={4}
          placeholder="Describe the change"
        />
      </InputGroup>
    </div>
  ),
}
