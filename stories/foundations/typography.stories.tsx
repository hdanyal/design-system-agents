import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

const meta = {
  title: "Foundations/Typography",
  tags: ["autodocs", "a11y-error"],
  parameters: {
    layout: "padded",
    a11y: { test: "error" },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Scale: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <p data-testid="heading" className="font-heading text-3xl font-semibold text-foreground">
        Heading / sans
      </p>
      <p data-testid="body" className="text-base text-foreground">
        Body uses the sans token stack.
      </p>
      <p className="text-sm text-muted-foreground">Muted supporting copy.</p>
      <p data-testid="mono" className="font-mono text-sm text-foreground">
        Mono sample 0123456789
      </p>
    </div>
  ),
  play: async ({ canvas }) => {
    const familyOf = (element: Element) => getComputedStyle(element).fontFamily

    const sans = familyOf(canvas.getByTestId("heading"))
    const body = familyOf(canvas.getByTestId("body"))
    const mono = familyOf(canvas.getByTestId("mono"))

    // The token stacks resolve only when the font variables are present on
    // <html>; an empty or generic family means the loader never ran.
    await expect(sans).toMatch(/Inter/i)
    await expect(body).toMatch(/Inter/i)
    await expect(mono).toMatch(/Geist Mono/i)
  },
}
