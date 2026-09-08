"use client";

import { useState } from "react";

import { Button } from "@/registry/base/button";
import { Input } from "@/registry/base/input";

export default function InputInvalidDemo() {
  const [invalid, setInvalid] = useState(false);

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-3">
      <Input
        aria-label="Email address"
        aria-invalid={invalid || undefined}
        className="w-full"
        placeholder="you@example.com"
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
