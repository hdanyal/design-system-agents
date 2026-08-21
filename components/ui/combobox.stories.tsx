import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, screen, userEvent, waitFor } from "storybook/test"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { Label } from "@/components/ui/label"

const meta = {
  title: "UI/Combobox",
  component: Combobox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    a11y: { test: "error" },
  },
} satisfies Meta<typeof Combobox>

export default meta
type Story = StoryObj<typeof meta>

const primitives = [
  "heading-group",
  "page-header",
  "empty-state",
  "data-table",
  "filter-bar",
]

export const Default: Story = {
  parameters: {
    a11y: {
      // Base UI marks content outside the open popup aria-hidden without
      // removing it from the tab order. Upstream defect, see
      // docs/a11y-allowlist.md; every other node is still checked.
      context: { exclude: '[data-slot="input-group-addon"][aria-hidden="true"]' },
    },
  },
  render: () => (
    <div className="grid w-72 gap-2">
      <Label htmlFor="combobox-primitive">Primitive</Label>
      <Combobox items={primitives}>
        <ComboboxInput id="combobox-primitive" placeholder="Search primitives" />
        <ComboboxContent>
          <ComboboxEmpty>No primitive found.</ComboboxEmpty>
          <ComboboxList>
            {(item: string) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  ),
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByLabelText("Primitive"))
    await waitFor(() =>
      expect(screen.getByRole("option", { name: "page-header" })).toBeVisible()
    )
  },
}

export const WithSelection: Story = {
  render: () => (
    <div className="grid w-72 gap-2">
      <Label htmlFor="combobox-selected">Primitive</Label>
      <Combobox items={primitives} defaultValue="page-header">
        <ComboboxInput id="combobox-selected" showClear />
        <ComboboxContent>
          <ComboboxEmpty>No primitive found.</ComboboxEmpty>
          <ComboboxList>
            {(item: string) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="grid w-72 gap-2">
      <Label htmlFor="combobox-disabled">Primitive</Label>
      <Combobox items={primitives} disabled>
        <ComboboxInput id="combobox-disabled" disabled placeholder="Unavailable" />
        <ComboboxContent>
          <ComboboxList>
            {(item: string) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  ),
}
