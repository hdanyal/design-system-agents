import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, waitFor } from "storybook/test"
import { BookOpenIcon, ComponentIcon, HomeIcon, SettingsIcon } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const meta = {
  title: "UI/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    a11y: { test: "error" },
  },
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

const navigation = [
  { title: "Overview", icon: HomeIcon, badge: undefined },
  { title: "Catalog", icon: ComponentIcon, badge: "61" },
  { title: "Docs", icon: BookOpenIcon, badge: undefined },
  { title: "Settings", icon: SettingsIcon, badge: undefined },
]

function SidebarDemo({
  collapsible = "offcanvas",
}: {
  collapsible?: React.ComponentProps<typeof Sidebar>["collapsible"]
}) {
  return (
    <SidebarProvider>
      <Sidebar collapsible={collapsible}>
        <SidebarHeader className="px-3 py-2 text-sm font-semibold">
          Carina
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigation.map((entry) => (
                  <SidebarMenuItem key={entry.title}>
                    <SidebarMenuButton isActive={entry.title === "Catalog"}>
                      <entry.icon />
                      <span>{entry.title}</span>
                    </SidebarMenuButton>
                    {entry.badge ? (
                      <SidebarMenuBadge>{entry.badge}</SidebarMenuBadge>
                    ) : null}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="px-3 py-2 text-xs text-muted-foreground">
          v0.1.0
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="p-4">
        <SidebarTrigger />
        <p className="mt-4 text-sm text-muted-foreground">
          Application content sits inside SidebarInset.
        </p>
      </SidebarInset>
    </SidebarProvider>
  )
}

export const Default: Story = {
  render: () => <SidebarDemo />,
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole("button", { name: "Toggle Sidebar" })
    await userEvent.click(trigger)
    await waitFor(() => expect(trigger).toBeVisible())
  },
}

export const Icon: Story = {
  render: () => <SidebarDemo collapsible="icon" />,
}

export const Loading: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {[0, 1, 2, 3].map((index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuSkeleton showIcon />
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="p-4">
        <p className="text-sm text-muted-foreground">Loading navigation…</p>
      </SidebarInset>
    </SidebarProvider>
  ),
}
