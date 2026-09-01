"use client";

import { useForm } from "@tanstack/react-form";
import { useState } from "react";

import { Button } from "@/registry/base/button";
import { Form } from "@/registry/base/form";
import { Input } from "@/registry/base/input";
import { Label } from "@/registry/base/label";

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
            <div className="grid gap-2">
              <Label
                className={invalid ? "text-destructive" : undefined}
                htmlFor={field.name}
              >
                Username
              </Label>
              <Input
                aria-describedby={invalid ? `${field.name}-error` : undefined}
                aria-invalid={invalid || undefined}
                autoComplete="username"
                id={field.name}
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(event) => {
                  setSubmitted(false);
                  field.handleChange(event.target.value);
                }}
                placeholder="Try admin"
                value={field.state.value}
              />
              {invalid && (
                <p
                  className="text-sm text-destructive"
                  id={`${field.name}-error`}
                  role="alert"
                >
                  {error}
                </p>
              )}
            </div>
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
