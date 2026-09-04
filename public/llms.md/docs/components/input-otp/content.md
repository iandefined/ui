# Input OTP

An accessible one-time-code input with animated slots, invalid states, and masked entry.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `InputOTP` for short verification codes that users enter or paste.

## Preview

## Installation

## Usage

```tsx
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

<InputOTP aria-label="Verification code" maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>;
```

## Composition

Group slots with `InputOTPGroup` and use `InputOTPSeparator` between groups.

## Examples

### Variants

Choose the slot treatment.

### Sizes

Align slots with nearby inputs.

### Invalid

Set `aria-invalid` to expose and style an invalid code.

### Masked Entry

Use `mask` to obscure entered characters without changing the submitted value.

### Disabled

Prevent code entry while verification is unavailable.

## Accessibility

Provide an `aria-label` or associated visible label that explains the code being requested.

## API Reference

`InputOTP` accepts [input-otp props](https://input-otp.rodz.dev/), including `value`, `onChange`, `onComplete`, `pattern`, and `pasteTransformer`.

### Props

Sets the required number of OTP slots.
Sets the visual treatment for every slot.
Sets the slot size.
Obscures entered characters visually.

#### InputOTPSlot

Sets this slot's zero-based position.
