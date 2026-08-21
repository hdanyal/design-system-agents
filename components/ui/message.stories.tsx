import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Bubble, BubbleContent } from "@/components/ui/bubble"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@/components/ui/message"

const meta = {
  title: "UI/Message",
  component: Message,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    a11y: { test: "error" },
  },
} satisfies Meta<typeof Message>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Message className="max-w-lg">
      <MessageContent>
        <Bubble variant="muted">
          <BubbleContent>
            Which registry URL should the consumer pin to?
          </BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  ),
}

export const Conversation: Story = {
  render: () => (
    <MessageGroup className="max-w-lg">
      <Message>
        <MessageContent>
          <MessageHeader>Ada</MessageHeader>
          <Bubble variant="muted">
            <BubbleContent>
              Which registry URL should the consumer pin to?
            </BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent>
          <Bubble align="end">
            <BubbleContent>
              Always an immutable release, never /r/dev.
            </BubbleContent>
          </Bubble>
          <MessageFooter>Delivered</MessageFooter>
        </MessageContent>
      </Message>
    </MessageGroup>
  ),
}

export const WithAvatar: Story = {
  render: () => (
    <Message className="max-w-lg">
      <MessageAvatar>
        <span className="flex size-8 items-center justify-center text-xs font-semibold">
          AD
        </span>
      </MessageAvatar>
      <MessageContent>
        <MessageHeader>Ada</MessageHeader>
        <Bubble variant="muted">
          <BubbleContent>Drift check passed on all managed files.</BubbleContent>
        </Bubble>
        <MessageFooter>09:41</MessageFooter>
      </MessageContent>
    </Message>
  ),
}
