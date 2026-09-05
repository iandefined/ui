import { Calendar } from "@/registry/base/calendar";

export default function CalendarSizes() {
  return (
    <div className="flex min-w-0 max-w-full flex-wrap items-start justify-center gap-6">
      {(["sm", "default", "lg"] as const).map((size) => (
        <div
          className="flex min-w-0 max-w-full flex-col items-center space-y-3"
          key={size}
        >
          <p className="text-center text-sm font-medium">{size}</p>
          <Calendar defaultValue={[new Date(2026, 8, 15)]} size={size} />
        </div>
      ))}
    </div>
  );
}
