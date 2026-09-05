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
      <DatePickerInput placeholder="mm/dd/yyyy" />
      <DatePickerContent />
    </DatePicker>
  );
}
