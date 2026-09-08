"use client";

import { revalidateLogic, useForm } from "@tanstack/react-form";

import { Button } from "@/registry/base/button";
import {
  Field,
  FieldError,
  FieldErrorSlot,
  FieldLabel,
} from "@/registry/base/field";
import { Form } from "@/registry/base/form";
import { Input } from "@/registry/base/input";

function validateEmail(value: string) {
  if (!value.trim()) {
    return "Enter your email address.";
  }

  return /^\S+@\S+\.\S+$/.test(value)
    ? undefined
    : "Enter a valid email address.";
}

export default function InputInvalidDemo() {
  const form = useForm({
    defaultValues: { email: "" },
    onSubmit: () => undefined,
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "change",
    }),
  });

  return (
    <Form className="grid w-full max-w-sm gap-3" form={form}>
      <form.Field
        name="email"
        validators={{ onDynamic: ({ value }) => validateEmail(value) }}
      >
        {(field) => {
          const error = field.state.meta.errors[0];
          const invalid = typeof error === "string";

          return (
            <Field invalid={invalid} name={field.name}>
              <FieldLabel>Email address</FieldLabel>
              <Input
                autoComplete="email"
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                placeholder="you@example.com"
                type="email"
                value={field.state.value}
              />
              <FieldErrorSlot>
                <FieldError match={invalid}>{error}</FieldError>
              </FieldErrorSlot>
            </Field>
          );
        }}
      </form.Field>
      <Button type="submit">Continue</Button>
    </Form>
  );
}
