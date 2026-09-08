"use client";

import { useState } from "react";

import { Button } from "@/registry/base/button";
import { Field } from "@/registry/base/field";
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/registry/base/number-field";

export default function NumberFieldInvalidDemo() {
  const [invalid, setInvalid] = useState(false);

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-3">
      <Field className="w-full" invalid={invalid}>
        <NumberField defaultValue={10} className="max-w-none">
          <NumberFieldGroup>
            <NumberFieldDecrement />
            <NumberFieldInput aria-label="Quantity" />
            <NumberFieldIncrement />
          </NumberFieldGroup>
        </NumberField>
      </Field>
      <Button
        onClick={() => setInvalid((current) => !current)}
        variant={invalid ? "default" : "destructive"}
      >
        {invalid ? "Reset" : "Trigger Error"}
      </Button>
    </div>
  );
}
