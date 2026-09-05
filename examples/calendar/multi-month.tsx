"use client";

import { useState } from "react";

import { Calendar } from "@/registry/base/calendar";

export default function CalendarMultiMonth() {
  const [value, setValue] = useState<Date[]>([
    new Date(2026, 8, 25),
    new Date(2026, 9, 5),
  ]);

  return (
    <div className="flex min-w-0 max-w-full flex-col items-center gap-4">
      <Calendar
        value={value}
        onValueChange={(details) => setValue(details.value)}
        numOfMonths={2}
        selectionMode="range"
      />
      <p
        aria-live="polite"
        className="text-center text-sm text-muted-foreground"
      >
        {value.length === 2
          ? `${value[0].toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${value[1].toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
          : value.length === 1
            ? "Choose an end date. Navigate to another month if needed."
            : "Choose a start date."}
      </p>
    </div>
  );
}
