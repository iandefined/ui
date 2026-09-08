"use client";

import { useState } from "react";

import { Button } from "@/registry/base/button";
import { Radio, RadioGroup } from "@/registry/base/radio-group";

export default function RadioGroupInvalidDemo() {
  const [invalid, setInvalid] = useState(false);

  return (
    <div className="flex flex-col items-center gap-3">
      <RadioGroup
        aria-invalid={invalid || undefined}
        aria-label="Choose a plan"
        defaultValue="pro"
      >
        <label
          className="flex items-center gap-2 text-sm"
          htmlFor="radio-invalid-starter"
        >
          <Radio id="radio-invalid-starter" value="starter" /> Starter
        </label>
        <label
          className="flex items-center gap-2 text-sm"
          htmlFor="radio-invalid-pro"
        >
          <Radio id="radio-invalid-pro" value="pro" /> Pro
        </label>
      </RadioGroup>
      <Button
        onClick={() => setInvalid((current) => !current)}
        variant={invalid ? "default" : "destructive"}
      >
        {invalid ? "Reset" : "Trigger Error"}
      </Button>
    </div>
  );
}
