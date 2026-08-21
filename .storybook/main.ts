import type { StorybookConfig } from "@storybook/nextjs-vite"

const config: StorybookConfig = {
  stories: [
    "../stories/foundations/**/*.stories.@(ts|tsx)",
    "../components/ui/**/*.stories.@(ts|tsx)",
    "../components/carina/**/*.stories.@(ts|tsx)",
    "../registry/blocks/**/*.stories.@(ts|tsx)",
    "../prototypes/**/*.stories.@(ts|tsx)",
  ],
  addons: [
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-themes",
  ],
  framework: "@storybook/nextjs-vite",
  staticDirs: ["../public"],
}

export default config
