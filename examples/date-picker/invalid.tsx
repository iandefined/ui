"use client";

import { useState } from "react";

import { Button } from "@/registry/base/button";
import {
  DatePicker,
  DatePickerContent,
  DatePickerLabel,
  DatePickerTrigger,
} from "@/registry/base/date-picker";

export default function DatePickerInvalidDemo() {
  const [invalid, setInvalid] = useState(false);

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-3">
      <DatePicker className="w-full" invalid={invalid}>
        <DatePickerLabel>Event date</DatePickerLabel>
        <DatePickerTrigger className="w-full justify-start" invalid={invalid} />
        <DatePickerContent />
      </DatePicker>
      <Button
        onClick={() => setInvalid((current) => !current)}
        variant={invalid ? "default" : "destructive"}
      >
        {invalid ? "Reset" : "Trigger Error"}
      </Button>
    </div>
  );
}
