import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ChevronRightIcon, FileTextIcon, PackageIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item"

const meta = {
  title: "UI/Item",
  component: Item,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    a11y: { test: "error" },
  },
} satisfies Meta<typeof Item>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Item className="max-w-xl" variant="outline">
      <ItemMedia variant="icon">
        <PackageIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>page-header</ItemTitle>
        <ItemDescription>
          Composed block built from heading-group and separator.
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button size="sm" variant="outline">
          View
        </Button>
      </ItemActions>
    </Item>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="flex max-w-xl flex-col gap-4">
      {(["default", "outline", "muted"] as const).map((variant) => (
        <Item key={variant} variant={variant}>
          <ItemMedia variant="icon">
            <FileTextIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{variant}</ItemTitle>
            <ItemDescription>The {variant} item surface.</ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex max-w-xl flex-col gap-4">
      {(["default", "sm", "xs"] as const).map((size) => (
        <Item key={size} variant="outline" size={size}>
          <ItemContent>
            <ItemTitle>Size {size}</ItemTitle>
            <ItemDescription>Density option for dense lists.</ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </div>
  ),
}

export const Group: Story = {
  render: () => (
    <ItemGroup className="max-w-xl">
      {/* ItemGroup is role="list", so each child has to carry role="listitem". */}
      <Item variant="outline" role="listitem">
        <ItemContent>
          <ItemTitle>heading-group</ItemTitle>
          <ItemDescription>host primitive.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <ChevronRightIcon className="size-4" aria-hidden="true" />
        </ItemActions>
      </Item>
      {/* role="separator" is not a permitted child of role="list", and the
          divider is purely visual, so it stays out of the a11y tree. */}
      <ItemSeparator aria-hidden="true" />
      <Item variant="outline" role="listitem">
        <ItemContent>
          <ItemTitle>page-header</ItemTitle>
          <ItemDescription>Composed block.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <ChevronRightIcon className="size-4" aria-hidden="true" />
        </ItemActions>
      </Item>
    </ItemGroup>
  ),
}

export const HeaderAndFooter: Story = {
  render: () => (
    <Item className="max-w-xl" variant="outline">
      <ItemHeader>
        <ItemTitle>Registry release</ItemTitle>
        <Badge variant="secondary">v0.1.0</Badge>
      </ItemHeader>
      <ItemContent>
        <ItemDescription>
          Immutable release with checksums and an SBOM attached.
        </ItemDescription>
      </ItemContent>
      <ItemFooter>
        <span className="text-xs text-muted-foreground">Published 17 Aug 2026</span>
        <Button size="sm" variant="outline">
          Open manifest
        </Button>
      </ItemFooter>
    </Item>
  ),
}
