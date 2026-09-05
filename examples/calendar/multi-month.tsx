import { Calendar } from "@/registry/base/calendar";

export default function CalendarMultiMonth() {
  return (
    <Calendar
      defaultValue={[new Date(2026, 8, 25), new Date(2026, 9, 5)]}
      numOfMonths={2}
      selectionMode="range"
    />
  );
}
