"use client";

import { useState } from "react";

import {
  DatePicker,
  DatePickerContent,
  DatePickerLabel,
  DatePickerTimer,
  DatePickerTrigger,
} from "@/registry/base/date-picker";
import { Label } from "@/registry/base/label";

export default function DatePickerTime() {
  const [value, setValue] = useState<Date[]>([new Date(2026, 8, 15)]);
  const [time, setTime] = useState("14:30");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-3">
        <DatePicker
          onValueChange={(details) => setValue(details.value)}
          value={value}
        >
          <DatePickerLabel>Date</DatePickerLabel>
          <DatePickerTrigger />
          <DatePickerContent />
        </DatePicker>
        <div className="space-y-2">
          <Label htmlFor="appointment-time">Time</Label>
          <div>
            <DatePickerTimer
              id="appointment-time"
              onChange={(event) => setTime(event.target.value)}
              value={time}
            />
          </div>
        </div>
      </div>
      <p aria-live="polite" className="text-sm text-muted-foreground">
        {value[0] && time
          ? `${value[0].toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} at ${time}`
          : "Choose a date and time."}
      </p>
    </div>
  );
}
