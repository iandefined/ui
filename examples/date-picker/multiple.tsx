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
