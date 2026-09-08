# Date Picker

A date selector with typed input, button triggers, and a calendar popup.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `DatePicker` to browse a calendar or type a date into a segmented input. The calendar heading opens month and year selection. Use [Calendar](./calendar) for an inline calendar or [Date Input](./date-input) for segmented entry without a popup.

## Preview

```tsx
import {
  DatePicker,
  DatePickerContent,
  DatePickerLabel,
  DatePickerTrigger,
} from "@/registry/base/date-picker";

export default function DatePickerDemo() {
  return (
    <DatePicker>
      <DatePickerLabel>Event date</DatePickerLabel>
      <DatePickerTrigger />
      <DatePickerContent />
    </DatePicker>
  );
}
```

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/date-picker.json
```

## Usage

```tsx
import {
  DatePicker,
  DatePickerContent,
  DatePickerLabel,
  DatePickerTrigger,
} from "@/components/ui/date-picker";
```

```tsx
<DatePicker>
  <DatePickerLabel>Event date</DatePickerLabel>
  <DatePickerTrigger />
  <DatePickerContent />
</DatePicker>
```

## Composition

Use `DatePickerTrigger` for a button or `DatePickerInput` for segmented entry with an integrated calendar trigger. `DatePickerInput` reuses [Date Input](./date-input), so each segment keeps its constrained keyboard values and locale-aware placeholder. `DatePickerContent` renders the default calendar unless you supply children.

Wrap grouped inputs or triggers in one `DatePickerControl` so they share a popup anchor. A standalone input or trigger supplies this wrapper automatically.

```tsx
import {
  DatePicker,
  DatePickerCalendar,
  DatePickerContent,
  DatePickerInput,
  DatePickerLabel,
} from "@/components/ui/date-picker";

<DatePicker>
  <DatePickerLabel />
  <DatePickerInput />
  <DatePickerContent>
    <DatePickerCalendar />
  </DatePickerContent>
</DatePicker>;
```

## Examples

### Typed input

Use `DatePickerInput` to enter each date segment with Date Input's constrained keyboard behavior alongside the calendar popup. Segment placeholders follow the picker's locale.

```tsx
import {
  DatePicker,
  DatePickerContent,
  DatePickerInput,
  DatePickerLabel,
} from "@/registry/base/date-picker";

export default function DatePickerInputDemo() {
  return (
    <DatePicker className="w-full max-w-xs">
      <DatePickerLabel>Appointment date</DatePickerLabel>
      <DatePickerInput />
      <DatePickerContent />
    </DatePicker>
  );
}
```

### Controlled and clearable

Control the `Date` value array and add `DatePickerClearTrigger` to reset an optional date. The trigger flexibly adapts its size within a stable `max-w-xs` container to fit the clear icon button without shifting the layout.

```tsx
"use client";

import { useState } from "react";

import {
  DatePicker,
  DatePickerClearTrigger,
  DatePickerContent,
  DatePickerControl,
  DatePickerLabel,
  DatePickerTrigger,
} from "@/registry/base/date-picker";

export default function DatePickerControlled() {
  const [value, setValue] = useState<Date[]>([new Date(2026, 8, 15)]);
  const hasValue = value.length > 0 && value[0] != null;

  return (
    <div className="w-full max-w-xs space-y-3">
      <DatePicker
        className="w-full max-w-xs"
        onValueChange={(details) => setValue(details.value)}
        value={value}
      >
        <DatePickerLabel>Optional deadline</DatePickerLabel>
        <DatePickerControl className="w-full">
          <DatePickerTrigger className="w-full flex-1" />
          {hasValue && <DatePickerClearTrigger className="shrink-0" />}
        </DatePickerControl>
        <DatePickerContent />
      </DatePicker>
      <p aria-live="polite" className="text-sm text-muted-foreground">
        {hasValue ? value[0].toLocaleDateString("en-CA") : "No deadline set."}
      </p>
    </div>
  );
}
```

### Date range

Set `selectionMode="range"` and group input indexes `0` and `1` in one `DatePickerControl` for the start and end dates.

```tsx
import {
  DatePicker,
  DatePickerContent,
  DatePickerControl,
  DatePickerInput,
  DatePickerLabel,
} from "@/registry/base/date-picker";

export default function DatePickerRange() {
  return (
    <DatePicker
      className="max-w-xs"
      defaultValue={[new Date(2026, 8, 10), new Date(2026, 8, 17)]}
      numOfMonths={2}
      selectionMode="range"
    >
      <DatePickerLabel>Travel dates</DatePickerLabel>
      <DatePickerControl className="flex-wrap">
        <DatePickerInput aria-label="Start date" index={0} showTrigger />
        <span aria-hidden="true" className="text-muted-foreground">
          to
        </span>
        <DatePickerInput aria-label="End date" index={1} showTrigger />
      </DatePickerControl>
      <DatePickerContent />
    </DatePicker>
  );
}
```

### Multiple dates

Set `selectionMode="multiple"` and use `DatePickerChips` to render selected dates as removable pill chips matching multi-select combobox styling.

```tsx
import {
  DatePicker,
  DatePickerChips,
  DatePickerContent,
  DatePickerLabel,
  DatePickerValue,
} from "@/registry/base/date-picker";

export default function DatePickerMultiple() {
  return (
    <DatePicker
      className="w-full max-w-xs"
      defaultValue={[
        new Date(2026, 8, 8),
        new Date(2026, 8, 12),
        new Date(2026, 8, 15),
        new Date(2026, 8, 22),
      ]}
      selectionMode="multiple"
    >
      <DatePickerLabel>Available dates</DatePickerLabel>
      <DatePickerChips>
        <DatePickerValue format="MMM D" placeholder="Choose available dates" />
      </DatePickerChips>
      <DatePickerContent />
    </DatePicker>
  );
}
```

### Presets

Compose `DatePickerPresetTrigger` beside the calendar to select a named date or range.

```tsx
import {
  DatePicker,
  DatePickerCalendar,
  DatePickerContent,
  DatePickerLabel,
  DatePickerPresetTrigger,
  DatePickerTrigger,
} from "@/registry/base/date-picker";

export default function DatePickerPresets() {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const last7 = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  return (
    <DatePicker selectionMode="range">
      <DatePickerLabel>Report period</DatePickerLabel>
      <DatePickerTrigger />
      <DatePickerContent>
        <DatePickerCalendar />
        <div className="flex flex-wrap items-center justify-center gap-2 border-t pt-4">
          <DatePickerPresetTrigger
            size="sm"
            value={[todayStart, todayEnd]}
            variant="ghost"
          >
            Today
          </DatePickerPresetTrigger>
          <DatePickerPresetTrigger
            size="sm"
            value={[last7, todayEnd]}
            variant="ghost"
          >
            Last 7 days
          </DatePickerPresetTrigger>
          <DatePickerPresetTrigger
            size="sm"
            value={[monthStart, monthEnd]}
            variant="ghost"
          >
            This month
          </DatePickerPresetTrigger>
        </div>
      </DatePickerContent>
    </DatePicker>
  );
}
```

### Date and time

Compose `DatePickerTimer` with the picker and manage the time separately from the calendar's date selection.

```tsx
"use client";

import { useState } from "react";

import {
  DatePicker,
  DatePickerContent,
  DatePickerLabel,
  DatePickerTimer,
  DatePickerTrigger,
} from "@/registry/base/date-picker";
import { Label } from "@/registry/base/label";

export default function DatePickerTime() {
  const [value, setValue] = useState<Date[]>([new Date(2026, 8, 15)]);
  const [time, setTime] = useState("14:30");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-3">
        <DatePicker
          onValueChange={(details) => setValue(details.value)}
          value={value}
        >
          <DatePickerLabel>Date</DatePickerLabel>
          <DatePickerTrigger />
          <DatePickerContent />
        </DatePicker>
        <div className="space-y-2">
          <Label htmlFor="appointment-time">Time</Label>
          <div>
            <DatePickerTimer
              id="appointment-time"
              onChange={(event) => setTime(event.target.value)}
              value={time}
            />
          </div>
        </div>
      </div>
      <p aria-live="polite" className="text-sm text-muted-foreground">
        {value[0] && time
          ? `${value[0].toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} at ${time}`
          : "Choose a date and time."}
      </p>
    </div>
  );
}
```

### Invalid

Submit without choosing a permitted weekday to mark the picker invalid. Selecting a weekday clears the error, while another failed submission replays the shake once.

```tsx
"use client";

import { revalidateLogic, useForm } from "@tanstack/react-form";
import { useId } from "react";

import { Button } from "@/registry/base/button";
import {
  DatePicker,
  DatePickerContent,
  DatePickerLabel,
  DatePickerTrigger,
} from "@/registry/base/date-picker";
import { Field, FieldError, FieldErrorSlot } from "@/registry/base/field";
import { Form } from "@/registry/base/form";

function validateDate(value: Date[]) {
  const date = value[0];

  if (!date) {
    return "Choose a date.";
  }

  if (Number.isNaN(date.getTime())) {
    return "Choose a valid date.";
  }

  return date.getDay() === 0 || date.getDay() === 6
    ? "Choose a weekday."
    : undefined;
}

export default function DatePickerInvalidDemo() {
  const dateErrorId = useId();
  const form = useForm({
    defaultValues: { date: [] as Date[] },
    onSubmit: () => undefined,
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "change",
    }),
  });

  return (
    <Form className="grid w-full max-w-sm gap-3" form={form}>
      <form.Field
        name="date"
        validators={{ onDynamic: ({ value }) => validateDate(value) }}
      >
        {(field) => {
          const error = field.state.meta.errors[0];
          const invalid = typeof error === "string";

          return (
            <Field invalid={invalid} name={field.name}>
              <DatePicker
                className="w-full"
                invalid={invalid}
                onValueChange={(details) => field.handleChange(details.value)}
                value={field.state.value}
              >
                <DatePickerLabel>Event date</DatePickerLabel>
                <DatePickerTrigger
                  aria-describedby={invalid ? dateErrorId : undefined}
                  className="w-full justify-start"
                  invalid={invalid}
                />
                <DatePickerContent />
              </DatePicker>
              <FieldErrorSlot>
                <FieldError id={dateErrorId} match={invalid}>
                  {error}
                </FieldError>
              </FieldErrorSlot>
            </Field>
          );
        }}
      </form.Field>
      <Button type="submit">Validate date</Button>
    </Form>
  );
}
```

### Sizes

Set the typed input's `size` to match adjacent form controls.

```tsx
import {
  DatePicker,
  DatePickerContent,
  DatePickerInput,
  DatePickerLabel,
} from "@/registry/base/date-picker";

export default function DatePickerSizes() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      {(["sm", "default", "lg"] as const).map((size) => (
        <DatePicker className="w-full" key={size}>
          <DatePickerLabel>{size}</DatePickerLabel>
          <DatePickerInput size={size} />
          <DatePickerContent />
        </DatePicker>
      ))}
    </div>
  );
}
```

| Size      | Description                      |
| --------- | -------------------------------- |
| `sm`      | Compact input for dense layouts. |
| `default` | Standard input height.           |
| `lg`      | Larger input for spacious forms. |

### Form

Use `DatePicker` inside a [Form](./form) `Field` with TanStack Form for validation and submission.

```tsx
"use client";

import { revalidateLogic, useForm } from "@tanstack/react-form";
import { useState } from "react";

import { Button } from "@/registry/base/button";
import {
  DatePicker,
  DatePickerContent,
  DatePickerTrigger,
} from "@/registry/base/date-picker";
import {
  Field,
  FieldControl,
  FieldError,
  FieldLabel,
} from "@/registry/base/field";
import { Form } from "@/registry/base/form";

export default function FormWithDatePickerDemo() {
  const [submitted, setSubmitted] = useState<{
    title: string;
    date: Date;
  }>();

  const form = useForm({
    defaultValues: {
      title: "",
      date: [] as Date[],
    },
    onSubmit: async ({ value }) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSubmitted({ title: value.title, date: value.date[0] });
    },
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "change",
    }),
  });

  return (
    <Form className="grid w-full max-w-sm gap-4" form={form}>
      <form.Field
        name="title"
        validators={{
          onDynamic: ({ value }) =>
            !value.trim() ? "Event title is required." : undefined,
        }}
      >
        {(field) => {
          const invalid = !field.state.meta.isValid;

          return (
            <Field
              dirty={field.state.meta.isDirty}
              invalid={invalid}
              name={field.name}
              touched={field.state.meta.isTouched}
            >
              <FieldLabel>Event title</FieldLabel>
              <FieldControl
                onBlur={field.handleBlur}
                onValueChange={(value) => {
                  setSubmitted(undefined);
                  field.handleChange(value);
                }}
                placeholder="Team standup"
                value={field.state.value}
              />
              <FieldError match={invalid}>
                {field.state.meta.errors.join(", ")}
              </FieldError>
            </Field>
          );
        }}
      </form.Field>

      <form.Field
        name="date"
        validators={{
          onDynamic: ({ value }) =>
            value.length === 0 ? "Pick a date." : undefined,
        }}
      >
        {(field) => {
          const invalid = !field.state.meta.isValid;

          return (
            <Field
              dirty={field.state.meta.isDirty}
              invalid={invalid}
              name={field.name}
              touched={field.state.meta.isTouched}
            >
              <DatePicker
                className="w-full max-w-sm"
                invalid={invalid}
                onValueChange={(details) => {
                  setSubmitted(undefined);
                  field.handleChange(details.value);
                }}
                value={field.state.value}
              >
                <FieldLabel>Event date</FieldLabel>
                <DatePickerTrigger className="w-full" />
                <DatePickerContent />
              </DatePicker>
              <FieldError match={invalid}>
                {field.state.meta.errors.join(", ")}
              </FieldError>
            </Field>
          );
        }}
      </form.Field>

      <form.Subscribe selector={(state) => state.isSubmitting}>
        {(isSubmitting) => (
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? "Creating event..." : "Create event"}
          </Button>
        )}
      </form.Subscribe>

      {submitted && (
        <output className="rounded-lg border bg-muted/40 p-3 text-sm text-muted-foreground">
          Created "{submitted.title}" on{" "}
          {submitted.date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
          .
        </output>
      )}
    </Form>
  );
}
```

## Accessibility

Use `DatePickerLabel` to label the picker. Give range inputs distinct accessible names, and associate descriptions or validation messages through `aria-describedby`. The calendar handles keyboard navigation, view switching, and popup focus.

## API Reference

`DatePicker` wraps [Ark UI Date Picker](https://ark-ui.com/react/docs/components/date-picker), with registry buttons, inputs, and [Calendar](./calendar) styling. Supported Ark UI props pass through, except public date values and date callbacks use native `Date`.

### Props

#### DatePicker

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `Date[]` | `-` | Controls the selected dates. Use one date for single selection, a start/end pair for a complete range, or an empty array to clear selection. |
| `defaultValue` | `Date[]` | `-` | Sets the initial selected dates for an uncontrolled picker. |
| `onValueChange` | `(details: { value: Date[]; valueAsString: string[]; view: "day" \| "month" \| "year" }) => void` | `-` | Receives the selected Date values and serialized strings. |
| `selectionMode` | `"single" \| "multiple" \| "range"` | `single` | Chooses single-date, independent multiple-date, or date-range selection. |
| `numOfMonths` | `number` | `1` | Sets the number of visible months on viewports at least 640px wide. Smaller viewports show one month while preserving the selected dates. |
| `min` | `Date` | `-` | Sets the earliest selectable date. |
| `max` | `Date` | `-` | Sets the latest selectable date. |
| `isDateUnavailable` | `(date: Date, locale: string) => boolean` | `-` | Marks dates unavailable for selection. |
| `focusedValue` | `Date` | `-` | Controls the focused date and visible calendar month. |
| `defaultFocusedValue` | `Date` | `-` | Sets the initial calendar focus without selecting a date. |
| `onFocusChange` | `(details: { value: Date[]; valueAsString: string[]; view: "day" \| "month" \| "year"; focusedValue: Date }) => void` | `-` | Receives calendar focus changes using Date values. |
| `onOpenChange` | `(details: { open: boolean; value: Date[] }) => void` | `-` | Receives popup visibility changes and the current selection. |
| `onVisibleRangeChange` | `(details: { view: "day" \| "month" \| "year"; visibleRange: { start: Date; end: Date } }) => void` | `-` | Receives the visible range after calendar navigation. |
| `format` | `(date: Date, details: { locale: string; timeZone: string }) => string` | `-` | Formats dates in the typed inputs. Pair a custom format with a matching `parse` function. |
| `parse` | `(value: string, details: { locale: string; timeZone: string }) => Date \| undefined` | `-` | Parses typed text into a Date object. Return `undefined` when the text cannot be parsed. |

#### DatePickerTrigger

Composes the Ark trigger with the registry [Button](./button). Button props set its size, variant, and rendering. Without children, it renders a calendar icon and `DatePickerValue`. In multiple-selection mode, it delegates to `DatePickerChips`.

#### DatePickerChips

Renders a non-interactive multi-chip group for `selectionMode="multiple"`. Each selected date label and the remaining empty surface open the calendar, while each remove button remains a separate sibling control.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `overflowBehavior` | `"wrap" \| "wrap-when-open" \| "cutoff"` | `wrap-when-open` | Controls chip wrapping and single-line +X overflow compression. |
| `maxCount` | `number` | `-` | Explicit limit on visible chips before showing the +X overflow badge. |

#### DatePickerChip

Renders an individual date badge with a formatted label and optional removal trigger.

#### DatePickerChipRemove

The remove button for a date chip.

#### DatePickerControl

Groups related inputs and triggers into a single popup anchor. Wrap both range inputs in one control. Supported Ark UI control props reach its root element.

#### DatePickerValue

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `placeholder` | `string` | `Pick a date` | Displays when no date is selected. |
| `format` | `string \| Intl.DateTimeFormatOptions \| ((date: Date) => string)` | `-` | Formats selected dates with a format pattern such as `"MMM D, YYYY"`, an `Intl.DateTimeFormatOptions` object, or a custom formatter function. |

#### DatePickerInput

Renders the registry [DateInput](./date-input) segmented field with an integrated calendar trigger. The picker supplies the value, selection mode, locale, time zone, date bounds, and unavailable-date handling. Remaining `DateInput` props pass through. Index `0` includes a calendar trigger by default, and both inputs include one in range mode.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `size` | `"sm" \| "default" \| "lg"` | `default` | Sets the input shell and trigger size. |
| `index` | `number` | `0` | Selects the date edited by this input. Use `0` for the start date and `1` for the end date in range mode. |
| `showTrigger` | `boolean` | `-` | Controls whether this input renders a calendar trigger. It defaults to `true` for index `0` and for every input in range mode. Set it to `false` to hide a trigger when a custom range layout supplies its own control. |

#### DatePickerContent

Portals the positioned popup and forwards content props to Ark's content element. Renders `DatePickerCalendar` when no children are supplied.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `reduceMotion` | `boolean` | `false` | Disables popup animation. The default treatment matches [Popover](./popover), and the operating system's reduced-motion preference is always respected. |

#### DatePickerCalendar

Renders `CalendarContent` in the current picker. Accepts the same owned props as [CalendarContent](./calendar#calendarcontent).

#### DatePickerPresetTrigger

Composes a registry `Button` with Ark's preset trigger.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `Date[]` | `-` | Selects these dates when the button is activated. Match the array to the root's selection mode. |

#### DatePickerClearTrigger

Composes Ark's clearing behavior with a registry `Button`. The default is an outline icon button with an X icon. Use `render` or `size` to supply a custom button; event handlers, refs, and disabled state are merged with the clearing behavior.

```tsx
<DatePickerClearTrigger />
```

#### DatePickerTimer

Renders an elevated, accessible time picker popup with scrollable hours, minutes, and period columns, styled consistently with the date picker and other elevated popups in the codebase. It owns a separate time value and does not change the calendar's selected date.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `string` | `-` | Controls the time value in 24-hour format, such as `"14:30"`. |
| `defaultValue` | `string` | `-` | Sets the initial time value for an uncontrolled timer. |
| `format` | `"12" \| "24"` | `12` | Chooses 12-hour or 24-hour time representation. |
| `step` | `number` | `1` | Sets the minute increment in the minutes column. |
| `size` | `"default" \| "xs" \| "sm" \| "lg" \| "xl" \| "icon-xs" \| "icon-sm" \| "icon" \| "icon-lg" \| "icon-xl"` | `default` | Sets the time trigger button size. The trigger remains content-sized and can shrink within its container. |
