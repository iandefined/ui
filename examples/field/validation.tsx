"use client";

import { revalidateLogic, useForm } from "@tanstack/react-form";

import { Button } from "@/registry/base/button";
import {
  Field,
  FieldControl,
  FieldError,
  FieldErrorSlot,
  FieldLabel,
} from "@/registry/base/field";
import { Form } from "@/registry/base/form";

function validateDisplayName(value: string) {
  const displayName = value.trim();

  if (!displayName) {
    return "Display name is required.";
  }

  return displayName.length >= 2 ? undefined : "Enter at least 2 characters.";
}

export default function FieldValidationDemo() {
  const form = useForm({
    defaultValues: { displayName: "" },
    onSubmit: () => undefined,
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "change",
    }),
  });

  return (
    <Form className="grid w-full max-w-sm gap-3" form={form}>
      <form.Field
        name="displayName"
        validators={{ onDynamic: ({ value }) => validateDisplayName(value) }}
      >
        {(field) => {
          const error = field.state.meta.errors[0];
          const invalid = typeof error === "string";

          return (
            <Field invalid={invalid} name={field.name}>
              <FieldLabel>Display name</FieldLabel>
              <FieldControl
                onBlur={field.handleBlur}
                onValueChange={field.handleChange}
                placeholder="Ada Lovelace"
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
