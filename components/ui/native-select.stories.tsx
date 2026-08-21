import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Label } from "@/components/ui/label"
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/ui/native-select"

const meta = {
  title: "UI/Native Select",
  component: NativeSelect,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    a11y: { test: "error" },
  },
} satisfies Meta<typeof NativeSelect>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="grid gap-2">
      <Label htmlFor="native-select-env">Environment</Label>
      <NativeSelect id="native-select-env" defaultValue="staging">
        <NativeSelectOption value="development">Development</NativeSelectOption>
        <NativeSelectOption value="staging">Staging</NativeSelectOption>
        <NativeSelectOption value="production">Production</NativeSelectOption>
      </NativeSelect>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(["default", "sm"] as const).map((size) => (
        <div key={size} className="grid gap-2">
          <Label htmlFor={`native-select-${size}`}>Size {size}</Label>
          <NativeSelect id={`native-select-${size}`} size={size}>
            <NativeSelectOption value="a">Option A</NativeSelectOption>
            <NativeSelectOption value="b">Option B</NativeSelectOption>
          </NativeSelect>
        </div>
      ))}
    </div>
  ),
}

export const Grouped: Story = {
  render: () => (
    <div className="grid gap-2">
      <Label htmlFor="native-select-region">Region</Label>
      <NativeSelect id="native-select-region" defaultValue="us-east-1">
        <NativeSelectOptGroup label="Americas">
          <NativeSelectOption value="us-east-1">us-east-1</NativeSelectOption>
          <NativeSelectOption value="us-west-2">us-west-2</NativeSelectOption>
        </NativeSelectOptGroup>
        <NativeSelectOptGroup label="Europe">
          <NativeSelectOption value="eu-west-1">eu-west-1</NativeSelectOption>
        </NativeSelectOptGroup>
      </NativeSelect>
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="grid gap-2">
        <Label htmlFor="native-select-disabled">Disabled</Label>
        <NativeSelect id="native-select-disabled" disabled>
          <NativeSelectOption value="a">Unavailable</NativeSelectOption>
        </NativeSelect>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="native-select-invalid">Invalid</Label>
        <NativeSelect id="native-select-invalid" aria-invalid>
          <NativeSelectOption value="">Choose a value</NativeSelectOption>
          <NativeSelectOption value="a">Option A</NativeSelectOption>
        </NativeSelect>
      </div>
    </div>
  ),
}
