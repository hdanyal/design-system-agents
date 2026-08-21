import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import type { DateRange } from "react-day-picker"

import { Calendar } from "@/components/ui/calendar"

const meta = {
  title: "UI/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    a11y: { test: "error" },
  },
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

// Fixed so the rendered month never depends on the day the story runs.
const referenceMonth = new Date(2026, 7, 1)
const referenceDay = new Date(2026, 7, 17)

export const Default: Story = {
  args: {
    mode: "single",
    defaultMonth: referenceMonth,
    selected: referenceDay,
  },
}

function RangeCalendar() {
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: new Date(2026, 7, 10),
    to: new Date(2026, 7, 17),
  })

  return (
    <Calendar
      mode="range"
      defaultMonth={referenceMonth}
      selected={range}
      onSelect={setRange}
      numberOfMonths={2}
    />
  )
}

export const Range: Story = {
  args: { mode: "single" },
  render: () => <RangeCalendar />,
}

export const WithDropdowns: Story = {
  args: {
    mode: "single",
    defaultMonth: referenceMonth,
    captionLayout: "dropdown",
    startMonth: new Date(2024, 0),
    endMonth: new Date(2027, 11),
  },
}

export const WithDisabledDays: Story = {
  args: {
    mode: "single",
    defaultMonth: referenceMonth,
    disabled: { dayOfWeek: [0, 6] },
  },
}
