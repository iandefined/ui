import { Calendar } from "@/registry/base/calendar";

export default function CalendarConstraints() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Calendar
        defaultValue={[new Date(2026, 8, 15)]}
        isDateUnavailable={(date) => date.getDay() === 0 || date.getDay() === 6}
        max={new Date(2026, 8, 25)}
        min={new Date(2026, 8, 7)}
      />
      <p className="max-w-72 text-center text-sm text-muted-foreground">
        Choose a weekday between September 7 and 25.
      </p>
    </div>
  );
}
