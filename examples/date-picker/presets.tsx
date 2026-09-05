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
