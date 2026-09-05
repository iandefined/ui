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
