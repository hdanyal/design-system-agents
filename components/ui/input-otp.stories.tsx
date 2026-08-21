import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent } from "storybook/test"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Label } from "@/components/ui/label"

const meta = {
  title: "UI/Input OTP",
  component: InputOTP,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    a11y: { test: "error" },
  },
  // OTPInput requires maxLength and children; every story supplies its own via
  // render, so meta-level args exist only to satisfy the required prop types.
  args: { maxLength: 6, children: null },
} satisfies Meta<typeof InputOTP>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="grid gap-2">
      <Label htmlFor="input-otp-default">Verification code</Label>
      <InputOTP id="input-otp-default" maxLength={6}>
        <InputOTPGroup>
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <InputOTPSlot key={index} index={index} />
          ))}
        </InputOTPGroup>
      </InputOTP>
    </div>
  ),
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText("Verification code")
    await userEvent.type(input, "123456")
    await expect(input).toHaveValue("123456")
  },
}

export const WithSeparator: Story = {
  render: () => (
    <div className="grid gap-2">
      <Label htmlFor="input-otp-separated">Pairing code</Label>
      <InputOTP id="input-otp-separated" maxLength={6}>
        <InputOTPGroup>
          {[0, 1, 2].map((index) => (
            <InputOTPSlot key={index} index={index} />
          ))}
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          {[3, 4, 5].map((index) => (
            <InputOTPSlot key={index} index={index} />
          ))}
        </InputOTPGroup>
      </InputOTP>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="grid gap-2">
      <Label htmlFor="input-otp-disabled">Verification code</Label>
      <InputOTP id="input-otp-disabled" maxLength={4} disabled>
        <InputOTPGroup>
          {[0, 1, 2, 3].map((index) => (
            <InputOTPSlot key={index} index={index} />
          ))}
        </InputOTPGroup>
      </InputOTP>
    </div>
  ),
}
