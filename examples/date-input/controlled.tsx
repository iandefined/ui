"use client";

import { useState } from "react";

import { DateInput } from "@/registry/base/date-input";
import { Label } from "@/registry/base/label";

export default function DateInputControlled() {
  const [value, setValue] = useState<Date[]>([new Date(2026, 8, 15)]);

  return (
    <div className="grid w-full max-w-xs gap-3">
      <div className="grid gap-2">
        <Label htmlFor="release-date">Release date</Label>
        <DateInput
          id="release-date"
          onValueChange={(details) => setValue(details.value)}
          value={value}
        />
      </div>
      <p aria-live="polite" className="text-sm text-muted-foreground">
        {value[0]
          ? value[0].toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })
          : "No date selected."}
      </p>
    </div>
  );
}
