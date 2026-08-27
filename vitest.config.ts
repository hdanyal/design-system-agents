import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: "unit",
          environment: "node",
          include: [
            "tests/unit/**/*.test.ts",
            "scripts/**/*.test.ts",
            "tests/agent-contract/**/*.test.ts",
          ],
        },
      },
    ],
  },
})
