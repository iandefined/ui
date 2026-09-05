"use client";

import { useState } from "react";

import {
  DatePicker,
  DatePickerClearTrigger,
  DatePickerContent,
  DatePickerControl,
  DatePickerLabel,
  DatePickerTrigger,
} from "@/registry/base/date-picker";

export default function DatePickerControlled() {
  const [value, setValue] = useState<Date[]>([new Date(2026, 8, 15)]);
  const hasValue = value.length > 0 && value[0] != null;

  return (
    <div className="w-full max-w-xs space-y-3">
      <DatePicker
        className="w-full max-w-xs"
        onValueChange={(details) => setValue(details.value)}
        value={value}
      >
        <DatePickerLabel>Optional deadline</DatePickerLabel>
        <DatePickerControl className="w-full">
          <DatePickerTrigger className="w-full flex-1" />
          {hasValue && <DatePickerClearTrigger className="shrink-0" />}
        </DatePickerControl>
        <DatePickerContent />
      </DatePicker>
      <p aria-live="polite" className="text-sm text-muted-foreground">
        {hasValue ? value[0].toLocaleDateString("en-CA") : "No deadline set."}
      </p>
    </div>
  );
}
