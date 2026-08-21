import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const meta = {
  title: "UI/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    a11y: { test: "error" },
  },
} satisfies Meta<typeof Carousel>

export default meta
type Story = StoryObj<typeof meta>

const slides = [1, 2, 3, 4, 5]

export const Default: Story = {
  render: () => (
    <Carousel className="w-72" aria-label="Featured blocks">
      <CarouselContent>
        {slides.map((slide) => (
          <CarouselItem key={slide}>
            <Card>
              <CardContent className="flex h-32 items-center justify-center">
                <span className="text-2xl font-semibold">{slide}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}

export const MultipleVisible: Story = {
  render: () => (
    <Carousel
      className="w-96"
      opts={{ align: "start" }}
      aria-label="Recent releases"
    >
      <CarouselContent>
        {slides.map((slide) => (
          <CarouselItem key={slide} className="basis-1/3">
            <Card>
              <CardContent className="flex h-24 items-center justify-center">
                <span className="text-lg font-semibold">{slide}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}

export const Vertical: Story = {
  render: () => (
    <Carousel
      orientation="vertical"
      className="w-56"
      opts={{ align: "start" }}
      aria-label="Changelog entries"
    >
      <CarouselContent className="h-56">
        {slides.map((slide) => (
          <CarouselItem key={slide} className="basis-1/2">
            <Card>
              <CardContent className="flex h-24 items-center justify-center">
                <span className="text-lg font-semibold">{slide}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}
