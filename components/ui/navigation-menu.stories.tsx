import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, screen, userEvent, waitFor } from "storybook/test"
import { BookOpenIcon, ComponentIcon } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const meta = {
  title: "UI/Navigation Menu",
  component: NavigationMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    a11y: { test: "error" },
  },
} satisfies Meta<typeof NavigationMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    a11y: {
      // Base UI's focus guards are aria-hidden yet keep tabindex="0".
      // Upstream defect, see docs/a11y-allowlist.md. Scoped as a rule rather
      // than a context exclusion so the default story-root scope is preserved.
      options: { rules: { "aria-hidden-focus": { enabled: false } } },
    },
  },
  render: () => (
    // The popup is portalled into its own nav landmark, so the root needs a
    // name to keep the two landmarks distinguishable.
    <NavigationMenu aria-label="Main">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Catalog</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-72 gap-1">
              <li>
                <NavigationMenuLink href="#primitives">
                  <ComponentIcon />
                  Carina primitives
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#blocks">
                  <ComponentIcon />
                  Composed blocks
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Docs</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-72 gap-1">
              <li>
                <NavigationMenuLink href="#contributing">
                  <BookOpenIcon />
                  Contributing
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#governance">
                  <BookOpenIcon />
                  Governance
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: /Catalog/ }))
    await waitFor(() =>
      expect(screen.getByRole("link", { name: /Carina primitives/ })).toBeVisible()
    )
  },
}

export const WithActiveLink: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="#overview" data-active="true">
            Overview
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#tokens">Tokens</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#releases">Releases</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
}
