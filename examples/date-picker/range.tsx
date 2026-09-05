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
      defaultValue={[new Date(2026, 8, 10), new Date(2026, 8, 17)]}
      numOfMonths={2}
      selectionMode="range"
    >
      <DatePickerLabel>Travel dates</DatePickerLabel>
      <DatePickerControl className="flex-wrap">
        <DatePickerInput aria-label="Start date" index={0} />
        <span aria-hidden="true" className="text-muted-foreground">
          to
        </span>
        <DatePickerInput aria-label="End date" index={1} />
      </DatePickerControl>
      <DatePickerContent />
    </DatePicker>
  );
}
