"use client";

import { revalidateLogic, useForm } from "@tanstack/react-form";
import { useState } from "react";
import { z } from "zod";

import { Button } from "@/registry/base/button";
import {
  Field,
  FieldControl,
  FieldError,
  FieldLabel,
} from "@/registry/base/field";
import { Form } from "@/registry/base/form";

const accountSchema = z
  .object({
    confirmPassword: z.string(),
    email: z.string().email("Enter a valid email address."),
    password: z.string().min(8, "Password must be at least 8 characters."),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

function getErrorMessage(error: unknown) {
  if (typeof error === "string") {
    return error;
  }

  if (
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }

  return undefined;
}

export default function FormZodValidationDemo() {
  const [submitted, setSubmitted] = useState(false);
  const form = useForm({
    defaultValues: {
      confirmPassword: "",
      email: "",
      password: "",
    },
    onSubmit: () => {
      setSubmitted(true);
    },
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "change",
    }),
    validators: {
      onDynamic: accountSchema,
    },
  });

  return (
    <Form className="grid w-full max-w-sm gap-4" form={form}>
      <form.Field name="email">
        {(field) => {
          const error = field.state.meta.errors
            .map(getErrorMessage)
            .find(Boolean);

          return (
            <Field
              dirty={field.state.meta.isDirty}
              invalid={Boolean(error)}
              name={field.name}
              touched={field.state.meta.isTouched}
            >
              <FieldLabel>Email</FieldLabel>
              <FieldControl
                autoComplete="email"
                onBlur={field.handleBlur}
                onValueChange={(value) => {
                  setSubmitted(false);
                  field.handleChange(value);
                }}
                placeholder="you@example.com"
                type="email"
                value={field.state.value}
              />
              <FieldError match={Boolean(error)}>{error}</FieldError>
            </Field>
          );
        }}
      </form.Field>

      <form.Field name="password">
        {(field) => {
          const error = field.state.meta.errors
            .map(getErrorMessage)
            .find(Boolean);

          return (
            <Field
              dirty={field.state.meta.isDirty}
              invalid={Boolean(error)}
              name={field.name}
              touched={field.state.meta.isTouched}
            >
              <FieldLabel>Password</FieldLabel>
              <FieldControl
                autoComplete="new-password"
                onBlur={field.handleBlur}
                onValueChange={(value) => {
                  setSubmitted(false);
                  field.handleChange(value);
                }}
                type="password"
                value={field.state.value}
              />
              <FieldError match={Boolean(error)}>{error}</FieldError>
            </Field>
          );
        }}
      </form.Field>

      <form.Field name="confirmPassword">
        {(field) => {
          const error = field.state.meta.errors
            .map(getErrorMessage)
            .find(Boolean);

          return (
            <Field
              dirty={field.state.meta.isDirty}
              invalid={Boolean(error)}
              name={field.name}
              touched={field.state.meta.isTouched}
            >
              <FieldLabel>Confirm password</FieldLabel>
              <FieldControl
                autoComplete="new-password"
                onBlur={field.handleBlur}
                onValueChange={(value) => {
                  setSubmitted(false);
                  field.handleChange(value);
                }}
                type="password"
                value={field.state.value}
              />
              <FieldError match={Boolean(error)}>{error}</FieldError>
            </Field>
          );
        }}
      </form.Field>

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <Button disabled={!canSubmit} type="submit">
            {isSubmitting ? "Creating account..." : "Create account"}
          </Button>
        )}
      </form.Subscribe>

      {submitted && (
        <output className="text-sm text-muted-foreground">
          Account details validated successfully.
        </output>
      )}
    </Form>
  );
}
