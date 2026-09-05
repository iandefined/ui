# Calendar

A calendar with day, month, and year views for selecting dates and ranges.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Calendar` for inline date selection. Click the month and year heading to switch to a month grid, then click it again to choose a year. Use [Date Picker](./date-picker) when the calendar belongs in a popup.

## Preview

## Installation

## Usage

```tsx
import { Calendar } from "@/components/ui/calendar";
```

```tsx
<Calendar defaultValue={[new Date(2026, 8, 15)]} />
```

## Composition

`Calendar` renders the full calendar when no children are supplied. Compose `CalendarContent` explicitly to add a footer or adjacent controls.

```tsx
<Calendar>
  <CalendarContent />
  <div>{/* Footer controls */}</div>
</Calendar>
```

## Examples

### Date range

Set `selectionMode="range"` and control the start and end dates through a `Date` array.

### Multiple dates

Set `selectionMode="multiple"` to toggle individual dates independently.

### Multiple months

Set `numOfMonths={2}` to display adjacent months for range selection.

### Date restrictions

Use `min`, `max`, and `isDateUnavailable` to limit selectable dates.

### Today and presets

Compose footer buttons and update the selected and focused dates to select a preset and display its month.

### Sizes

Set `size` to adjust calendar density on desktop; touch layouts retain larger date targets.

| Size      | Description                  |
| --------- | ---------------------------- |
| `sm`      | Compact desktop date cells.  |
| `default` | Standard desktop date cells. |
| `lg`      | Larger desktop date cells.   |

## API Reference

`Calendar` uses [Ark UI Date Picker](https://ark-ui.com/react/docs/components/date-picker) in inline mode. Supported Ark UI props pass through, except date values and date callbacks use native `Date` at the public boundary.

### Props

#### Calendar

Controls the selected dates. Use an empty array to clear selection, one date
for single selection, and a start/end pair for a complete range.
Sets the initial selected dates for an uncontrolled calendar.
>
Receives the selected Date values and their serialized strings.
Chooses single-date, independent multiple-date, or date-range selection.
Sets desktop date-cell density while preserving touch target sizes on
smaller viewports.
Controls the focused date and the month shown in the calendar.
Sets the initial focused date without selecting it.
>
Receives date-focus changes. Update `focusedValue` from this callback when
controlling it.
>
Receives the visible date range after navigation.
Sets the earliest selectable date.
Sets the latest selectable date.
>
Marks individual dates unavailable, such as weekends or holidays.

#### CalendarContent

Renders the header and the day, month, and year grids inside a `Calendar` or `DatePicker` root. Accepts standard HTML `div` attributes.
