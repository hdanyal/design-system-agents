import type { Preview } from "@storybook/nextjs-vite"
import { withThemeByClassName } from "@storybook/addon-themes"

import "../app/globals.css"
import { fontVariables } from "../lib/fonts"

// Storybook renders stories without the Next.js root layout, so the font
// variables have to be put on <html> here or every token resolves to nothing.
document.documentElement.classList.add("antialiased", "font-sans", ...fontVariables)

const preview: Preview = {
  decorators: [
    withThemeByClassName({
      themes: {
        light: "",
        dark: "dark",
      },
      defaultTheme: "light",
      parentSelector: "html",
    }),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
    options: {
      storySort: {
        order: ["Foundations", "UI", "Carina", "Blocks", "Prototypes"],
      },
    },
  },
}

export default preview
