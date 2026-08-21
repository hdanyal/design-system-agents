import preview from "../.storybook/preview"

const strict = {
  ...preview,
  parameters: {
    ...preview.parameters,
    a11y: { test: "error" },
  },
}

export default strict
