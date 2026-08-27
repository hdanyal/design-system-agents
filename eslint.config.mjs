import { defineConfig, globalIgnores } from "eslint/config"

export default defineConfig([
  globalIgnores(["node_modules/**", "generated/**", "tests/fixtures/**"]),
  {
    files: ["**/*.{js,mjs,ts}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
    },
  },
])
