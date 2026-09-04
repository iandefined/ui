"use client";

import { useState } from "react";

import { Button } from "@/registry/base/button";
import {
  Field,
  FieldControl,
  FieldDescription,
  FieldLabel,
} from "@/registry/base/field";

export default function FormNativeConstraintDemo() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="grid w-full max-w-sm gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <Field name="email">
        <FieldLabel>Email</FieldLabel>
        <FieldControl
          autoComplete="email"
          onValueChange={() => setSubmitted(false)}
          placeholder="you@example.com"
          required
          type="email"
        />
        <FieldDescription>We use this to send your receipt.</FieldDescription>
      </Field>

      <Button type="submit">Continue</Button>

      {submitted && (
        <output className="text-sm text-muted-foreground">
          Email address accepted.
        </output>
      )}
    </form>
  );
}
