import { Calendar } from "@/registry/base/calendar";

export default function CalendarMultiple() {
  return (
    <Calendar
      defaultValue={[
        new Date(2026, 8, 8),
        new Date(2026, 8, 15),
        new Date(2026, 8, 22),
      ]}
      selectionMode="multiple"
    />
  );
}
