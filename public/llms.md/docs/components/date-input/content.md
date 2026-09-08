# Date Input

A segmented field for entering dates, date ranges, and times without a calendar popup.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `DateInput` when people know the date they want to enter. Each date or time segment can be edited with the keyboard. Use [Date Picker](./date-picker) when people also need to browse a calendar.

## Preview

```tsx
import { DateInput } from "@/registry/base/date-input";
import { Label } from "@/registry/base/label";

export default function DateInputDemo() {
  return (
    <div className="grid w-full max-w-xs gap-2">
      <Label htmlFor="date-of-birth">Date of birth</Label>
      <DateInput id="date-of-birth" locale="en-US" />
    </div>
  );
}
```

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/date-input.json
```

## Usage

```tsx
import { DateInput } from "@/components/ui/date-input";
import { Label } from "@/components/ui/label";
```

```tsx
<div className="grid gap-2">
  <Label htmlFor="date-of-birth">Date of birth</Label>
  <DateInput id="date-of-birth" name="dateOfBirth" />
</div>
```

## Examples

### Controlled value

Use a `Date` array with `value` and update it from `onValueChange`.

```tsx
"use client";

import { useState } from "react";

import { DateInput } from "@/registry/base/date-input";
import { Label } from "@/registry/base/label";

export default function DateInputControlled() {
  const [value, setValue] = useState<Date[]>([new Date(2026, 8, 15)]);

  return (
    <div className="grid w-full max-w-xs gap-3">
      <div className="grid gap-2">
        <Label htmlFor="release-date">Release date</Label>
        <DateInput
          id="release-date"
          onValueChange={(details) => setValue(details.value)}
          value={value}
        />
      </div>
      <p aria-live="polite" className="text-sm text-muted-foreground">
        {value[0]
          ? value[0].toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })
          : "No date selected."}
      </p>
    </div>
  );
}
```

### Sizes

Set `size` to match adjacent form controls.

```tsx
import { DateInput } from "@/registry/base/date-input";
import { Label } from "@/registry/base/label";

export default function DateInputSizes() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <div className="grid gap-2">
        <Label htmlFor="date-input-size-sm">Small</Label>
        <DateInput id="date-input-size-sm" size="sm" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="date-input-size-default">Default</Label>
        <DateInput id="date-input-size-default" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="date-input-size-lg">Large</Label>
        <DateInput id="date-input-size-lg" size="lg" />
      </div>
    </div>
  );
}
```

| Size      | Description                      |
| --------- | -------------------------------- |
| `sm`      | Compact input for dense layouts. |
| `default` | Standard input height.           |
| `lg`      | Larger input for spacious forms. |

### Disabled and read-only

Use `disabled` and `readOnly` to communicate non-editable field states.

```tsx
import { DateInput } from "@/registry/base/date-input";
import { Label } from "@/registry/base/label";

export default function DateInputStates() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-5">
      <div className="grid gap-2">
        <Label htmlFor="date-input-disabled">Disabled</Label>
        <DateInput
          defaultValue={[new Date(2026, 8, 15)]}
          disabled
          id="date-input-disabled"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="date-input-readonly">Read only</Label>
        <DateInput
          defaultValue={[new Date(2026, 8, 15)]}
          id="date-input-readonly"
          readOnly
        />
      </div>
    </div>
  );
}
```

### Invalid

Trigger the invalid-state shake on the segmented input.

```tsx
"use client";

import { useState } from "react";

import { Button } from "@/registry/base/button";
import { DateInput } from "@/registry/base/date-input";

export default function DateInputInvalidDemo() {
  const [invalid, setInvalid] = useState(false);

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-3">
      <DateInput aria-label="Event date" className="w-full" invalid={invalid} />
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

### Date range

Set `selectionMode="range"` to edit a start and end date in one field.

```tsx
import { DateInput } from "@/registry/base/date-input";
import { Label } from "@/registry/base/label";

export default function DateInputRange() {
  return (
    <div className="grid w-full max-w-xs gap-2">
      <Label htmlFor="travel-dates">Travel dates</Label>
      <DateInput
        defaultValue={[new Date(2026, 8, 10), new Date(2026, 8, 17)]}
        id="travel-dates"
        selectionMode="range"
      />
    </div>
  );
}
```

### Date and time

Set `granularity` to include time segments, or add `timeOnly` to hide the date segments.

```tsx
import { DateInput } from "@/registry/base/date-input";
import { Label } from "@/registry/base/label";

export default function DateInputGranularity() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <div className="grid gap-2">
        <Label htmlFor="granularity-appointment">Appointment</Label>
        <DateInput
          defaultValue={[new Date(2026, 8, 15, 14, 30)]}
          granularity="minute"
          hourCycle={12}
          id="granularity-appointment"
          locale="en-US"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="granularity-time">Time only</Label>
        <DateInput
          granularity="minute"
          hourCycle={24}
          id="granularity-time"
          timeOnly
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="granularity-timestamp">Precise timestamp</Label>
        <DateInput
          defaultValue={[new Date(2026, 8, 15, 14, 30, 45)]}
          granularity="second"
          hourCycle={24}
          id="granularity-timestamp"
          locale="en-GB"
        />
      </div>
    </div>
  );
}
```

### Clearable

Add `clearable` to let people reset an optional value.

```tsx
import { DateInput } from "@/registry/base/date-input";
import { Label } from "@/registry/base/label";

export default function DateInputClear() {
  return (
    <div className="grid w-full max-w-xs gap-2">
      <Label htmlFor="optional-deadline">Optional deadline</Label>
      <DateInput
        clearable
        defaultValue={[new Date(2026, 8, 15)]}
        id="optional-deadline"
      />
    </div>
  );
}
```

### Field composition

Associate the segmented group with a [Field](./field) label and description using explicit IDs.

```tsx
import { DateInput } from "@/registry/base/date-input";
import { Field, FieldDescription, FieldLabel } from "@/registry/base/field";

export default function DateInputField() {
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel htmlFor="passport-expiry">Passport expiry</FieldLabel>
      <DateInput
        aria-describedby="passport-date-description"
        id="passport-expiry"
        name="passportExpiry"
        required
      />
      <FieldDescription id="passport-date-description">
        Use the expiry date printed on your passport.
      </FieldDescription>
    </Field>
  );
}
```

## Accessibility

Compose with `Label` or `FieldLabel` using matching `id` and `htmlFor`, or provide `aria-label` or `aria-labelledby` directly on the input. Associate validation text with `aria-describedby`. People can type into each segment and use the arrow keys to adjust or move between segments.

## API Reference

`DateInput` composes [Ark UI Date Input](https://ark-ui.com/react/docs/components/date-input) into a complete segmented field. Its public date values use native `Date`; supported Ark UI root props pass through.

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `id` | `string` | `-` | Sets the field's ID, enabling label click activation when paired with a matching `Label` or `FieldLabel` via `htmlFor`. |
| `value` | `Date[]` | `-` | Controls the selected date or date range. Use an empty array to clear the field. |
| `defaultValue` | `Date[]` | `-` | Sets the initial value for an uncontrolled field. |
| `onValueChange` | `(details: { value: Date[]; valueAsString: string[] }) => void` | `-` | Receives the completed date values as Date objects and serialized strings. |
| `selectionMode` | `"single" \| "range"` | `single` | Renders one date or a start/end pair. |
| `size` | `"sm" \| "default" \| "lg"` | `default` | Sets the height and spacing of the input shell. |
| `clearable` | `boolean` | `false` | Displays a button that clears the selected dates. |
| `clearLabel` | `string` | `Clear date` | Sets the clear button's accessible name. |
| `granularity` | `"day" \| "hour" \| "minute" \| "second"` | `day` | Sets the smallest editable date or time unit. Defaults to `"minute"` when `timeOnly` is enabled. |
| `timeOnly` | `boolean` | `false` | Shows time segments without date segments. Pair with a time granularity. |
| `hourCycle` | `12 \| 24` | `-` | Chooses 12-hour or 24-hour time display when time segments are shown. |
| `min` | `Date` | `-` | Sets the minimum allowed value. |
| `max` | `Date` | `-` | Sets the maximum allowed value. |
| `placeholderValue` | `Date` | `-` | Controls the reference date used when editing an empty segment. |
| `defaultPlaceholderValue` | `Date` | `-` | Sets the initial reference date for editing an empty field. |
| `onPlaceholderChange` | `(details: { value: Date[]; valueAsString: string[]; placeholderValue: Date }) => void` | `-` | Receives reference-date changes while editing incomplete values. |
| `isDateUnavailable` | `(date: Date, locale: string) => boolean` | `-` | Marks individual dates unavailable using Date values. |
| `format` | `(date: Date, details: { locale: string; timeZone: string }) => string` | `-` | Customizes the serialized display string using a Date. |
| `startLabel` | `string` | `Start date` | Adds an accessible name for the range's start segment group. |
| `endLabel` | `string` | `End date` | Adds an accessible name for the range's end segment group. |
| `startName` | `string` | `-` | Overrides the start date's form name in range mode; otherwise the field uses `name[0]`. |
| `endName` | `string` | `-` | Overrides the end date's form name in range mode; otherwise the field uses `name[1]`. |
