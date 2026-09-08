"use client";

import { useState } from "react";

import { Button } from "@/registry/base/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/base/input-group";

export default function InputGroupInvalidDemo() {
  const [invalid, setInvalid] = useState(false);

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-3">
      <InputGroup className="w-full">
        <InputGroupInput
          aria-invalid={invalid || undefined}
          aria-label="Website"
          placeholder="example.com"
        />
        <InputGroupAddon>https://</InputGroupAddon>
      </InputGroup>
      <Button
        onClick={() => setInvalid((current) => !current)}
        variant={invalid ? "default" : "destructive"}
      >
        {invalid ? "Reset" : "Trigger Error"}
      </Button>
    </div>
  );
}
