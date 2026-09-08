"use client";

import { useState } from "react";

import { Button } from "@/registry/base/button";
import { DateInput } from "@/registry/base/date-input";

export default function DateInputInvalidDemo() {
  const [invalid, setInvalid] = useState(false);

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-3">
      <DateInput aria-label="Event date" className="w-full" invalid={invalid} />
      <Button
        onClick={() => setInvalid((current) => !current)}
        variant={invalid ? "default" : "destructive"}
      >
        {invalid ? "Reset" : "Trigger Error"}
      </Button>
    </div>
  );
}
