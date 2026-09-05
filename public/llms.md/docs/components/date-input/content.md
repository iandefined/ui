# Date Input

A segmented field for entering dates, date ranges, and times without a calendar popup.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `DateInput` when people know the date they want to enter. Each date or time segment can be edited with the keyboard. Use [Date Picker](./date-picker) when people also need to browse a calendar.

## Preview

## Installation

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

### Sizes

Set `size` to match adjacent form controls.

| Size      | Description                      |
| --------- | -------------------------------- |
| `sm`      | Compact input for dense layouts. |
| `default` | Standard input height.           |
| `lg`      | Larger input for spacious forms. |

### Disabled, read-only, and invalid

Use `disabled`, `readOnly`, and `invalid` to communicate the field state, and associate explanatory text with `aria-describedby`.

### Date range

Set `selectionMode="range"` to edit a start and end date in one field.

### Date and time

Set `granularity` to include time segments, or add `timeOnly` to hide the date segments.

### Clearable

Add `clearable` to let people reset an optional value.

### Field composition

Associate the segmented group with a [Field](./field) label and description using explicit IDs.

## Accessibility

Compose with `Label` or `FieldLabel` using matching `id` and `htmlFor`, or provide `aria-label` or `aria-labelledby` directly on the input. Associate validation text with `aria-describedby`. People can type into each segment and use the arrow keys to adjust or move between segments.

## API Reference

`DateInput` composes [Ark UI Date Input](https://ark-ui.com/react/docs/components/date-input) into a complete segmented field. Its public date values use native `Date`; supported Ark UI root props pass through.

### Props

Sets the field's ID, enabling label click activation when paired with a
matching `Label` or `FieldLabel` via `htmlFor`.
Controls the selected date or date range. Use an empty array to clear the
field.
Sets the initial value for an uncontrolled field.
>
Receives the completed date values as Date objects and serialized strings.
Renders one date or a start/end pair.
Sets the height and spacing of the input shell.
Displays a button that clears the selected dates.
Sets the clear button's accessible name.
Sets the smallest editable date or time unit. Defaults to `"minute"` when
`timeOnly` is enabled.
Shows time segments without date segments. Pair with a time granularity.
Chooses 12-hour or 24-hour time display when time segments are shown.
Sets the minimum allowed value.
Sets the maximum allowed value.
Controls the reference date used when editing an empty segment.
Sets the initial reference date for editing an empty field.
>
Receives reference-date changes while editing incomplete values.
>
Marks individual dates unavailable using Date values.
>
Customizes the serialized display string using a Date.
Adds an accessible name for the range's start segment group.
Adds an accessible name for the range's end segment group.
Overrides the start date's form name in range mode; otherwise the field uses
`name[0]`.
Overrides the end date's form name in range mode; otherwise the field uses
`name[1]`.
