import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Message, MessageContent, MessageHeader } from "@/components/ui/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller"

const meta = {
  title: "UI/Message Scroller",
  component: MessageScroller,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    a11y: { test: "error" },
  },
} satisfies Meta<typeof MessageScroller>

export default meta
type Story = StoryObj<typeof meta>

const conversation = Array.from({ length: 12 }, (_, index) => ({
  id: index,
  author: index % 2 === 0 ? "Ada" : "You",
  text:
    index % 2 === 0
      ? "Composition check passed for this block."
      : "Good. Publish the immutable release once CI is green.",
}))

function Thread({ count }: { count: number }) {
  return (
    // MessageScroller reads scroll state from the provider, which must wrap it.
    <MessageScrollerProvider>
      <MessageScroller className="h-80 max-w-lg border">
        <MessageScrollerViewport aria-label="Conversation">
          <MessageScrollerContent className="gap-3 p-4">
            {conversation.slice(0, count).map((entry) => (
              <MessageScrollerItem key={entry.id}>
                <Message align={entry.author === "You" ? "end" : "start"}>
                  <MessageContent>
                    <MessageHeader>{entry.author}</MessageHeader>
                    <Bubble
                      align={entry.author === "You" ? "end" : "start"}
                      variant={entry.author === "You" ? "default" : "muted"}
                    >
                      <BubbleContent>{entry.text}</BubbleContent>
                    </Bubble>
                  </MessageContent>
                </Message>
              </MessageScrollerItem>
            ))}
          </MessageScrollerContent>
        </MessageScrollerViewport>
        <MessageScrollerButton />
      </MessageScroller>
    </MessageScrollerProvider>
  )
}

export const Default: Story = {
  render: () => <Thread count={conversation.length} />,
}

export const Short: Story = {
  render: () => <Thread count={2} />,
}
