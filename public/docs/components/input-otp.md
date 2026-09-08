# Input OTP

An accessible one-time-code input with animated slots, invalid states, and masked entry.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `InputOTP` for short verification codes that users enter or paste.

## Preview

```tsx
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/registry/base/input-otp";

const OTP_LENGTH = 6;

export default function InputOTPDefaultDemo() {
  return (
    <InputOTP aria-label="Verification code" maxLength={OTP_LENGTH}>
      <InputOTPGroup>
        {Array.from({ length: 3 }, (_, index) => (
          <InputOTPSlot index={index} key={index} />
        ))}
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        {Array.from({ length: 3 }, (_, index) => (
          <InputOTPSlot index={index + 3} key={index + 3} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
}
```

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/input-otp.json
```

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

```tsx
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

<InputOTP maxLength={6}>
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

## Examples

### Variants

Choose the slot treatment.

```tsx
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/registry/base/input-otp";

const SLOT_KEYS = Array.from({ length: 4 }, (_, index) => `slot-${index}`);

export default function InputOTPVariantsDemo() {
  return (
    <div className="grid gap-4">
      <InputOTP aria-label="Bordered code" maxLength={4} variant="bordered">
        <InputOTPGroup>
          {SLOT_KEYS.map((key, index) => (
            <InputOTPSlot index={index} key={key} />
          ))}
        </InputOTPGroup>
      </InputOTP>
      <InputOTP aria-label="Underlined code" maxLength={4} variant="underlined">
        <InputOTPGroup>
          {SLOT_KEYS.map((key, index) => (
            <InputOTPSlot index={index} key={key} />
          ))}
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
}
```

### Sizes

Align slots with nearby inputs.

```tsx
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  type InputOTPSize,
} from "@/registry/base/input-otp";

const SIZES: InputOTPSize[] = ["sm", "default", "lg"];
const SLOT_KEYS = Array.from({ length: 4 }, (_, index) => `slot-${index}`);

export default function InputOTPSizesDemo() {
  return (
    <div className="grid gap-4">
      {SIZES.map((size) => (
        <InputOTP
          aria-label={`${size} verification code`}
          key={size}
          maxLength={4}
          size={size}
        >
          <InputOTPGroup>
            {SLOT_KEYS.map((key, index) => (
              <InputOTPSlot index={index} key={`${size}-${key}`} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      ))}
    </div>
  );
}
```

### Invalid

Trigger the invalid-state shake on the OTP slots.

```tsx
"use client";

import { useState } from "react";

import { Button } from "@/registry/base/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/registry/base/input-otp";

const OTP_LENGTH = 6;
const SLOT_KEYS = Array.from(
  { length: OTP_LENGTH },
  (_, index) => `slot-${index}`
);

export default function InputOTPInvalidDemo() {
  const [invalid, setInvalid] = useState(false);

  return (
    <div className="flex flex-col items-center gap-3">
      <InputOTP
        aria-invalid={invalid || undefined}
        maxLength={OTP_LENGTH}
        aria-label="Verification code"
      >
        <InputOTPGroup>
          {SLOT_KEYS.map((key, index) => (
            <InputOTPSlot index={index} key={key} />
          ))}
        </InputOTPGroup>
      </InputOTP>
      <Button
        onClick={() => setInvalid((current) => !current)}
        variant={invalid ? "default" : "destructive"}
      >
        {invalid ? "Reset" : "Trigger Error"}
      </Button>
    </div>
  );
}
```

### Masked Entry

Use `mask` to obscure entered characters without changing the submitted value.

```tsx
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/registry/base/input-otp";

const OTP_LENGTH = 6;
const SLOT_KEYS = Array.from(
  { length: OTP_LENGTH },
  (_, index) => `slot-${index}`
);

export default function InputOTPMaskedDemo() {
  return (
    <InputOTP
      aria-label="Masked access code"
      defaultValue="824190"
      mask
      maxLength={OTP_LENGTH}
    >
      <InputOTPGroup>
        {SLOT_KEYS.map((key, index) => (
          <InputOTPSlot index={index} key={key} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
}
```

### Disabled

Prevent code entry while verification is unavailable.

```tsx
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/registry/base/input-otp";

const SLOT_KEYS = Array.from({ length: 4 }, (_, index) => `slot-${index}`);

export default function InputOTPDisabledDemo() {
  return (
    <InputOTP aria-label="Disabled verification code" disabled maxLength={4}>
      <InputOTPGroup>
        {SLOT_KEYS.map((key, index) => (
          <InputOTPSlot index={index} key={key} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
}
```

## Accessibility

Provide an `aria-label` or associated visible label that explains the code being requested.

## API Reference

`InputOTP` accepts [input-otp props](https://input-otp.rodz.dev/), including `value`, `onChange`, `onComplete`, `pattern`, and `pasteTransformer`.

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `maxLength` | `number` | `-` | Sets the required number of OTP slots. |
| `variant` | `"bordered" \| "underlined"` | `bordered` | Sets the visual treatment for every slot. |
| `size` | `"sm" \| "default" \| "lg"` | `default` | Sets the slot size. |
| `mask` | `boolean` | `false` | Obscures entered characters visually. |

#### InputOTPSlot

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `index` | `number` | `-` | Sets this slot's zero-based position. |
