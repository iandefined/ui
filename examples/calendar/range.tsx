"use client";

import { useState } from "react";

import { Calendar } from "@/registry/base/calendar";

export default function CalendarRange() {
  const [value, setValue] = useState<Date[]>([
    new Date(2026, 8, 10),
    new Date(2026, 8, 17),
  ]);

  return (
    <div className="flex flex-col items-center gap-4">
      <Calendar
        onValueChange={(details) => setValue(details.value)}
        selectionMode="range"
        value={value}
      />
      <p aria-live="polite" className="text-sm text-muted-foreground">
        {value.length === 2
          ? `${value[0].toLocaleDateString("en-US", { month: "short", day: "numeric" })} to ${value[1].toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
          : "Choose an end date."}
      </p>
    </div>
  );
}
