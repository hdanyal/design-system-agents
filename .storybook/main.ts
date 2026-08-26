import type { StorybookConfig } from "@storybook/nextjs-vite"

const config: StorybookConfig = {
  stories: [
    "../stories/foundations/**/*.stories.@(ts|tsx)",
    "../components/ui/**/*.stories.@(ts|tsx)",
    "../components/primitives/**/*.stories.@(ts|tsx)",
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
  // Preview + addon-docs + addon-a11y (axe-core) emit vendor chunks above Vite's
  // 500 kB app-bundle heuristic. That is Storybook overhead, not host UI.
  async viteFinal(config) {
    return {
      ...config,
      build: {
        ...config.build,
        chunkSizeWarningLimit: 2048,
      },
    }
  },
}

export default config
