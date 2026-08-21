import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const meta = {
  title: "UI/Chart",
  component: ChartContainer,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    a11y: { test: "error" },
  },
} satisfies Meta<typeof ChartContainer>

export default meta
type Story = StoryObj<typeof meta>

const data = [
  { month: "March", installs: 186, updates: 80 },
  { month: "April", installs: 305, updates: 200 },
  { month: "May", installs: 237, updates: 120 },
  { month: "June", installs: 273, updates: 190 },
  { month: "July", installs: 209, updates: 130 },
  { month: "August", installs: 314, updates: 240 },
]

// Colours come from chart tokens so the chart follows the design language.
const config = {
  installs: { label: "Installs", color: "var(--chart-1)" },
  updates: { label: "Updates", color: "var(--chart-2)" },
} satisfies ChartConfig

export const Bars: Story = {
  args: { config, children: <div /> },
  render: () => (
    <ChartContainer config={config} className="h-64 w-full max-w-xl">
      <BarChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="installs" fill="var(--color-installs)" radius={0} />
        <Bar dataKey="updates" fill="var(--color-updates)" radius={0} />
      </BarChart>
    </ChartContainer>
  ),
}

export const Lines: Story = {
  args: { config, children: <div /> },
  render: () => (
    <ChartContainer config={config} className="h-64 w-full max-w-xl">
      <LineChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line
          dataKey="installs"
          stroke="var(--color-installs)"
          dot={false}
          strokeWidth={2}
        />
      </LineChart>
    </ChartContainer>
  ),
}

export const Areas: Story = {
  args: { config, children: <div /> },
  render: () => (
    <ChartContainer config={config} className="h-64 w-full max-w-xl">
      <AreaChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          dataKey="installs"
          stroke="var(--color-installs)"
          fill="var(--color-installs)"
          fillOpacity={0.2}
        />
      </AreaChart>
    </ChartContainer>
  ),
}
