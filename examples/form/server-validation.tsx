"use client";

import { useForm } from "@tanstack/react-form";
import { useState } from "react";

import { Button } from "@/registry/base/button";
import {
  Field,
  FieldControl,
  FieldError,
  FieldLabel,
} from "@/registry/base/field";
import { Form } from "@/registry/base/form";

async function validateUsername(value: string) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (value === "admin") {
    return "This username is reserved.";
  }

  if (value.length < 3) {
    return "Username must be at least 3 characters.";
  }

  return undefined;
}

export default function FormServerValidationDemo() {
  const [submitted, setSubmitted] = useState(false);
  const form = useForm({
    defaultValues: {
      username: "",
    },
    onSubmit: () => {
      setSubmitted(true);
    },
  });

  return (
    <Form className="grid w-full max-w-sm gap-4" form={form}>
      <form.Field
        name="username"
        validators={{
          onSubmitAsync: ({ value }) => validateUsername(value),
        }}
      >
        {(field) => {
          const error = field.state.meta.errors[0];
          const invalid = typeof error === "string";

          return (
            <Field
              dirty={field.state.meta.isDirty}
              invalid={invalid}
              name={field.name}
              touched={field.state.meta.isTouched}
            >
              <FieldLabel>Username</FieldLabel>
              <FieldControl
                autoComplete="username"
                onBlur={field.handleBlur}
                onValueChange={(value) => {
                  setSubmitted(false);
                  field.handleChange(value);
                }}
                placeholder="Try admin"
                value={field.state.value}
              />
              <FieldError match={invalid}>{error}</FieldError>
            </Field>
          );
        }}
      </form.Field>

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <Button disabled={!canSubmit} type="submit">
            {isSubmitting ? "Checking..." : "Submit"}
          </Button>
        )}
      </form.Subscribe>

      {submitted && (
        <output className="text-sm text-muted-foreground">
          Username is available.
        </output>
      )}
    </Form>
  );
}
