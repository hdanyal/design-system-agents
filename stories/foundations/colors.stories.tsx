import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import foundations from "@/generated/foundations.json"

const meta = {
  title: "Foundations/Colors",
  tags: ["autodocs", "a11y-error"],
  parameters: {
    layout: "padded",
    a11y: { test: "error" },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Semantic: Story = {
  render: () => (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {foundations.colors.map((token) => (
        <div key={token.name} className="flex flex-col gap-2 rounded-none border border-border p-3">
          <div
            className="h-16 border border-border"
            style={{ background: token.cssVar }}
            aria-hidden="true"
          />
          <p className="text-sm font-medium text-foreground">{token.name}</p>
          <p className="text-xs text-muted-foreground">{token.description}</p>
          <code className="text-xs text-muted-foreground">{token.cssVar}</code>
        </div>
      ))}
    </div>
  ),
}
