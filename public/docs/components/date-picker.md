# Date Picker

A date selector with typed input, button triggers, and a calendar popup.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `DatePicker` to browse a calendar or type a date into an input. The calendar heading opens month and year selection. Use [Calendar](./calendar) for an inline calendar or [Date Input](./date-input) for segmented entry without a popup.

## Preview

## Installation

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

Use `DatePickerTrigger` for a button or `DatePickerInput` for typed entry with an integrated calendar trigger. `DatePickerContent` renders the default calendar unless you supply children.

Wrap grouped inputs or triggers in one `DatePickerControl` so they share a popup anchor. A standalone input or trigger supplies this wrapper automatically.

```tsx
<DatePicker>
  <DatePickerLabel />
  <DatePickerInput />
  <DatePickerContent>
    <DatePickerCalendar />
    <DatePickerPresetTrigger value={presetDates} />
  </DatePickerContent>
</DatePicker>
```

## Examples

### Typed input

Use `DatePickerInput` to allow keyboard entry alongside the calendar popup.

### Controlled and clearable

Control the `Date` value array and add `DatePickerClearTrigger` to reset an optional date. The trigger flexibly adapts its size within a stable `max-w-xs` container to fit the clear icon button without shifting the layout.

### Date range

Set `selectionMode="range"` and group input indexes `0` and `1` in one `DatePickerControl` for the start and end dates.

### Multiple dates

Set `selectionMode="multiple"` and use `DatePickerChips` to render selected dates as removable pill chips matching multi-select combobox styling.

### Presets

Compose `DatePickerPresetTrigger` beside the calendar to select a named date or range.

### Date and time

Compose `DatePickerTimer` with the picker and manage the time separately from the calendar's date selection.

### Sizes

Set the typed input's `size` to match adjacent form controls.

| Size      | Description                      |
| --------- | -------------------------------- |
| `sm`      | Compact input for dense layouts. |
| `default` | Standard input height.           |
| `lg`      | Larger input for spacious forms. |

### Form

Use `DatePicker` inside a [Form](./form) `Field` with TanStack Form for validation and submission.

## Accessibility

Use `DatePickerLabel` to label the picker. Give range inputs distinct accessible names, and associate descriptions or validation messages through `aria-describedby`. The calendar handles keyboard navigation, view switching, and popup focus.

## API Reference

`DatePicker` wraps [Ark UI Date Picker](https://ark-ui.com/react/docs/components/date-picker), with registry buttons, inputs, and [Calendar](./calendar) styling. Supported Ark UI props pass through, except public date values and date callbacks use native `Date`.

### Props

#### DatePicker

Controls the selected dates. Use one date for single selection, a start/end
pair for a complete range, or an empty array to clear selection.
Sets the initial selected dates for an uncontrolled picker.
>
Receives the selected Date values and serialized strings.
Chooses single-date, independent multiple-date, or date-range selection.
Sets the earliest selectable date.
Sets the latest selectable date.
>
Marks dates unavailable for selection.
Controls the focused date and visible calendar month.
Sets the initial calendar focus without selecting a date.
>
Receives calendar focus changes using Date values.
>
Receives popup visibility changes and the current selection.
>
Receives the visible range after calendar navigation.
>
Formats dates in the typed inputs. Pair a custom format with a matching
`parse` function.
>
Parses typed text into a Date object. Return `undefined` when the text
cannot be parsed.

#### DatePickerTrigger

Composes the Ark trigger with the registry [Button](./button). Button props set its size, variant, and rendering. Without children, it renders a calendar icon and `DatePickerValue`. In multiple-selection mode, it delegates to `DatePickerChips`.

#### DatePickerChips

Renders a multi-chip container trigger for `selectionMode="multiple"`. Selected dates appear as removable pills with keyboard and pointer interactions.

Controls chip wrapping and single-line +X overflow compression.
Explicit limit on visible chips before showing the +X overflow badge.

#### DatePickerChip

Renders an individual date badge with a formatted label and optional removal trigger.

#### DatePickerChipRemove

The remove button for a date chip.

#### DatePickerControl

Groups related inputs and triggers into a single popup anchor. Wrap both range inputs in one control. Supported Ark UI control props reach its root element.

#### DatePickerValue

Displays when no date is selected.
>
Formats selected dates with a format pattern such as `"MMM D, YYYY"`, an
`Intl.DateTimeFormatOptions` object, or a custom formatter function.

#### DatePickerInput

Renders the Ark typed input inside a registry input group. Index `0` includes the calendar trigger; subsequent inputs share it. Supported input props reach the text input.

Sets the input shell and trigger size.
Selects the date edited by this input. Use `0` for the start date and `1`
for the end date in range mode.

#### DatePickerContent

Portals the positioned popup and forwards content props to Ark's content element. Renders `DatePickerCalendar` when no children are supplied.

Disables popup animation. The default treatment matches
[Popover](./popover), and the operating system's reduced-motion preference
is always respected.

#### DatePickerCalendar

Renders `CalendarContent` in the current picker. Accepts the same owned props as [CalendarContent](./calendar#calendarcontent).

#### DatePickerPresetTrigger

Composes a registry `Button` with Ark's preset trigger.

Selects these dates when the button is activated. Match the array to the
root's selection mode.

#### DatePickerClearTrigger

Composes Ark's clearing behavior with a registry `Button`. The default is an outline icon button with an X icon. Use `render` or `size` to supply a custom button; event handlers, refs, and disabled state are merged with the clearing behavior.

```tsx
<DatePickerClearTrigger />
```

#### DatePickerTimer

Renders an elevated, accessible time picker popup with scrollable hours, minutes, and period columns, styled consistently with the date picker and other elevated popups in the codebase. It owns a separate time value and does not change the calendar's selected date.

Controls the time value in 24-hour format, such as `"14:30"`.
Sets the initial time value for an uncontrolled timer.
Chooses 12-hour or 24-hour time representation.
Sets the minute increment in the minutes column.
Sets the time trigger button size.
