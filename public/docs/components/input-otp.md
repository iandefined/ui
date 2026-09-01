# Input OTP

An accessible one-time-code input with animated slots, invalid states, and masked entry.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/input-otp.json
```

```bash
npm install @base-ui/react tailwind-variants clsx tailwind-merge
```

```bash
npm install input-otp motion
```

```css
@theme inline {
  --animate-caret-blink: caret-blink 1s ease-out infinite;
}

@keyframes caret-blink {
  0%,
  70%,
  100% {
    opacity: 1;
  }

  20%,
  50% {
    opacity: 0;
  }
}
```

```ts filename="lib/utils.ts"
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## Usage

```tsx
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
```

```tsx
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
</InputOTP>
```

## Anatomy

```tsx
<InputOTP>
  <InputOTPGroup>
    <InputOTPSlot />
  </InputOTPGroup>
  <InputOTPSeparator />
</InputOTP>
```

The default slots are `h-9`, matching the default [Input](/docs/components/input). The `sm` and `lg` sizes also share the Input component's `h-8` and `h-10` heights.

## Examples

### Variants

### Sizes

### Invalid

Set `aria-invalid` on `InputOTP` to give every visual slot the destructive invalid state while preserving the native input's accessible state.

### Masked Entry

Use `mask` to obscure entered characters visually. The real input value remains unchanged for form submission and validation.

### Disabled

## API Reference

### InputOTP

`InputOTP` accepts the props from the `input-otp` package, including `value`, `onChange`, `onComplete`, `pattern`, and `pasteTransformer`.

| Prop           | Type                         | Default      | Description                                                     |
| -------------- | ---------------------------- | ------------ | --------------------------------------------------------------- |
| `maxLength`    | `number`                     | —            | Required number of OTP slots.                                   |
| `variant`      | `"bordered" \| "underlined"` | `"bordered"` | Visual treatment for every slot.                                |
| `size`         | `"sm" \| "default" \| "lg"`  | `"default"`  | Slot size aligned with Input heights.                           |
| `mask`         | `boolean`                    | `false`      | Visually obscures entered characters.                           |
| `aria-invalid` | `boolean`                    | —            | Applies an accessible destructive state to the input and slots. |

### InputOTPSlot

Each `InputOTPSlot` requires an `index` matching its position in the root input.

| Prop    | Type     | Description            |
| ------- | -------- | ---------------------- |
| `index` | `number` | Zero-based slot index. |
