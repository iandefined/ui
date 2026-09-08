"use client";

import { useState } from "react";

import { Button } from "@/registry/base/button";
import { Textarea } from "@/registry/base/textarea";

export default function TextareaInvalidDemo() {
  const [invalid, setInvalid] = useState(false);

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-3">
      <Textarea
        aria-label="Message"
        aria-invalid={invalid || undefined}
        className="w-full"
        placeholder="Tell us more..."
      />
      <Button
        onClick={() => setInvalid((current) => !current)}
        variant={invalid ? "default" : "destructive"}
      >
        {invalid ? "Reset" : "Trigger Error"}
      </Button>
    </div>
  );
}
