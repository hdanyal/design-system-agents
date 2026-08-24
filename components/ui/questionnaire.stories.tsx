import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire"

const meta = {
  title: "UI/Questionnaire",
  component: Questionnaire,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    a11y: { test: "error" },
  },
} satisfies Meta<typeof Questionnaire>

export default meta
type Story = StoryObj<typeof meta>

export const SingleChoice: Story = {
  render: () => (
    <Questionnaire className="max-w-lg">
      <QuestionnaireItem name="adoption">
        <QuestionnaireTitle>How are you adopting Example?</QuestionnaireTitle>
        <QuestionnaireDescription>
          This determines which install path the docs recommend.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="registry">
            Immutable registry release
            <QuestionnaireChoiceDescription>
              Pinned to a /r/vX.Y.Z URL.
            </QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="dev">
            Shared /r/dev
            <QuestionnaireChoiceDescription>
              Tracks main; not supported for production consumers.
            </QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
        </QuestionnaireChoices>
      </QuestionnaireItem>
      <QuestionnaireActions>
        <QuestionnaireProgress />
        <QuestionnaireSkip>Skip</QuestionnaireSkip>
        <QuestionnaireSubmit>Submit</QuestionnaireSubmit>
      </QuestionnaireActions>
    </Questionnaire>
  ),
}

export const MultipleChoice: Story = {
  render: () => (
    <Questionnaire className="max-w-lg">
      <QuestionnaireItem name="surfaces" multiple>
        <QuestionnaireTitle>Which surfaces do you ship?</QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="web">Web app</QuestionnaireChoice>
          <QuestionnaireChoice value="admin">Admin console</QuestionnaireChoice>
          <QuestionnaireChoice value="docs">Docs site</QuestionnaireChoice>
        </QuestionnaireChoices>
      </QuestionnaireItem>
      <QuestionnaireActions>
        <QuestionnaireProgress />
        <QuestionnairePrevious>Back</QuestionnairePrevious>
        <QuestionnaireNext>Next</QuestionnaireNext>
      </QuestionnaireActions>
    </Questionnaire>
  ),
}

export const FreeText: Story = {
  render: () => (
    <Questionnaire className="max-w-lg">
      <QuestionnaireItem name="team">
        <QuestionnaireTitle>Which team owns the integration?</QuestionnaireTitle>
        <QuestionnaireDescription>
          Used to route support requests and drift reports.
        </QuestionnaireDescription>
        <QuestionnaireInput placeholder="platform-web" />
      </QuestionnaireItem>
      <QuestionnaireActions>
        <QuestionnaireProgress />
        <QuestionnaireSubmit>Submit</QuestionnaireSubmit>
      </QuestionnaireActions>
    </Questionnaire>
  ),
}
