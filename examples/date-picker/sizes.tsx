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
