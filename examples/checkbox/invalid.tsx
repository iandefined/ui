"use client";

import { useState } from "react";

import { Button } from "@/registry/base/button";
import { Checkbox } from "@/registry/base/checkbox";

export default function CheckboxInvalidDemo() {
  const [invalid, setInvalid] = useState(false);

  return (
    <div className="flex flex-col items-center gap-3">
      <Checkbox aria-invalid={invalid || undefined} aria-label="Accept terms" />
      <Button
        onClick={() => setInvalid((current) => !current)}
        variant={invalid ? "default" : "destructive"}
      >
        {invalid ? "Reset" : "Trigger Error"}
      </Button>
    </div>
  );
}
