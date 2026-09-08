"use client";

import { revalidateLogic, useForm } from "@tanstack/react-form";
import { useId } from "react";

import { Button } from "@/registry/base/button";
import { DateInput } from "@/registry/base/date-input";
import {
  Field,
  FieldError,
  FieldErrorSlot,
  FieldLabel,
} from "@/registry/base/field";
import { Form } from "@/registry/base/form";

function validateDate(value: Date[]) {
  const date = value[0];

  if (!date) {
    return "Enter a date.";
  }

  if (Number.isNaN(date.getTime())) {
    return "Enter a valid date.";
  }

  return date.getDay() === 0 || date.getDay() === 6
    ? "Choose a weekday."
    : undefined;
}

export default function DateInputInvalidDemo() {
  const inputId = useId();
  const dateErrorId = useId();
  const form = useForm({
    defaultValues: { date: [] as Date[] },
    onSubmit: () => undefined,
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "change",
    }),
  });

  return (
    <Form className="grid w-full max-w-sm gap-3" form={form}>
      <form.Field
        name="date"
        validators={{ onDynamic: ({ value }) => validateDate(value) }}
      >
        {(field) => {
          const error = field.state.meta.errors[0];
          const invalid = typeof error === "string";

          return (
            <Field invalid={invalid} name={field.name}>
              <FieldLabel htmlFor={inputId}>Event date</FieldLabel>
              <DateInput
                aria-describedby={invalid ? dateErrorId : undefined}
                className="w-full"
                id={inputId}
                invalid={invalid}
                onValueChange={(details) => field.handleChange(details.value)}
                value={field.state.value}
              />
              <FieldErrorSlot>
                <FieldError id={dateErrorId} match={invalid}>
                  {error}
                </FieldError>
              </FieldErrorSlot>
            </Field>
          );
        }}
      </form.Field>
      <Button type="submit">Validate date</Button>
    </Form>
  );
}
