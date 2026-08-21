import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, waitFor } from "storybook/test"
import { CalendarIcon, SettingsIcon, UserIcon } from "lucide-react"

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

const meta = {
  title: "UI/Command",
  component: Command,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    a11y: { test: "error" },
  },
} satisfies Meta<typeof Command>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Command className="w-80 border">
      <CommandInput placeholder="Type a command" aria-label="Command search" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <CalendarIcon />
            Calendar
          </CommandItem>
          <CommandItem>
            <UserIcon />
            Search contacts
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <SettingsIcon />
            Preferences
            <CommandShortcut>⌘,</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
  play: async ({ canvas }) => {
    await userEvent.type(canvas.getByLabelText("Command search"), "cal")
    await waitFor(() =>
      expect(canvas.getByText("Calendar")).toBeVisible()
    )
  },
}

function EmptyCommand() {
  // cmdk owns the input value, so the search term has to be controlled rather
  // than seeded with defaultValue.
  const [search, setSearch] = React.useState("nothing matches")

  return (
    <Command className="w-80 border">
      <CommandInput
        value={search}
        onValueChange={setSearch}
        aria-label="Command search"
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

export const Empty: Story = {
  parameters: {
    a11y: {
      // cmdk renders its empty-state element inside the role="listbox" list,
      // which ARIA does not permit as a child. Upstream defect, see
      // docs/a11y-allowlist.md.
      options: { rules: { "aria-required-children": { enabled: false } } },
    },
  },
  render: () => <EmptyCommand />,
}

export const InDialog: Story = {
  render: () => (
    <CommandDialog defaultOpen>
      <Command>
        <CommandInput placeholder="Type a command" aria-label="Command search" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Blocks">
            <CommandItem>page-header</CommandItem>
            <CommandItem>invoices-workspace</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  ),
}
