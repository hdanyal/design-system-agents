import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Foundations/Radius",
  tags: ["autodocs", "a11y-error"],
  parameters: {
    layout: "padded",
    a11y: { test: "error" },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Tokens: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {["sm", "md", "lg", "xl"].map((size) => (
        <div key={size} className="flex flex-col gap-2">
          <div
            className="size-16 border border-border bg-card"
            style={{ borderRadius: `var(--radius-${size})` }}
          />
          <code className="text-xs text-muted-foreground">{`var(--radius-${size})`}</code>
        </div>
      ))}
    </div>
  ),
}
