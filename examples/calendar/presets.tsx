"use client";

import { useState } from "react";

import { Button } from "@/registry/base/button";
import { Calendar, CalendarContent } from "@/registry/base/calendar";

export default function CalendarPresets() {
  const [value, setValue] = useState<Date[]>([]);
  const [focusedValue, setFocusedValue] = useState(new Date());

  function selectPreset(date: Date) {
    setValue([date]);
    setFocusedValue(date);
  }

  return (
    <Calendar
      focusedValue={focusedValue}
      onFocusChange={(details) => setFocusedValue(details.focusedValue)}
      onValueChange={(details) => setValue(details.value)}
      value={value}
    >
      <CalendarContent />
      <div className="flex gap-2 border-t pt-3">
        <Button
          onClick={() => selectPreset(new Date())}
          size="sm"
          variant="ghost"
        >
          Today
        </Button>
        <Button
          onClick={() => {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            selectPreset(tomorrow);
          }}
          size="sm"
          variant="ghost"
        >
          Tomorrow
        </Button>
      </div>
    </Calendar>
  );
}
