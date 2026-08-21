import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const meta = {
  title: "UI/Field",
  component: Field,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    a11y: { test: "error" },
  },
} satisfies Meta<typeof Field>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Field className="max-w-md">
      <FieldLabel htmlFor="field-name">Block name</FieldLabel>
      <Input id="field-name" placeholder="page-header" />
      <FieldDescription>
        Lowercase and hyphenated. Must not collide with a stock component name.
      </FieldDescription>
    </Field>
  ),
}

export const Invalid: Story = {
  render: () => (
    <Field className="max-w-md" data-invalid>
      <FieldLabel htmlFor="field-owner">Owner</FieldLabel>
      <Input id="field-owner" aria-invalid defaultValue="" />
      <FieldError>An owning team is required before promotion.</FieldError>
    </Field>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <Field orientation="horizontal" className="max-w-md">
      <Checkbox id="field-experimental" />
      <FieldContent>
        <FieldLabel htmlFor="field-experimental">
          <FieldTitle>Mark as experimental</FieldTitle>
        </FieldLabel>
        <FieldDescription>
          Experimental entries are excluded from immutable releases.
        </FieldDescription>
      </FieldContent>
    </Field>
  ),
}

export const Grouped: Story = {
  render: () => (
    <FieldSet className="max-w-md">
      <FieldLegend>Block metadata</FieldLegend>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="field-title">Title</FieldLabel>
          <Input id="field-title" placeholder="Page header" />
        </Field>
        <FieldSeparator />
        <Field>
          <FieldLabel htmlFor="field-rationale">Rationale</FieldLabel>
          <Textarea
            id="field-rationale"
            rows={3}
            placeholder="Why an existing primitive was not enough"
          />
          <FieldDescription>
            Required whenever a new base component is introduced.
          </FieldDescription>
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
}
