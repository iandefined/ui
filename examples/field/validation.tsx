"use client";

import { useState } from "react";

import {
  Field,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldErrorSlot,
  FieldLabel,
} from "@/registry/base/field";

export default function FieldValidationDemo() {
  const [touched, setTouched] = useState(false);
  const [value, setValue] = useState("");
  const invalid = touched && value.trim().length < 3;

  return (
    <Field
      className="w-full max-w-sm"
      dirty={value.length > 0}
      invalid={invalid}
      name="displayName"
      touched={touched}
    >
      <FieldLabel>Display name</FieldLabel>
      <FieldControl
        onBlur={() => setTouched(true)}
        onValueChange={setValue}
        placeholder="Ada Lovelace"
        value={value}
      />
      <FieldDescription>Enter at least 3 characters.</FieldDescription>
      <FieldErrorSlot>
        <FieldError match={invalid}>Display name is too short.</FieldError>
      </FieldErrorSlot>
    </Field>
  );
}
