"use client";

import { revalidateLogic, useForm } from "@tanstack/react-form";
import { useId } from "react";

import { Button } from "@/registry/base/button";
import {
  DatePicker,
  DatePickerContent,
  DatePickerLabel,
  DatePickerTrigger,
} from "@/registry/base/date-picker";
import { Field, FieldError, FieldErrorSlot } from "@/registry/base/field";
import { Form } from "@/registry/base/form";

function validateDate(value: Date[]) {
  const date = value[0];

  if (!date) {
    return "Choose a date.";
  }

  if (Number.isNaN(date.getTime())) {
    return "Choose a valid date.";
  }

  return date.getDay() === 0 || date.getDay() === 6
    ? "Choose a weekday."
    : undefined;
}

export default function DatePickerInvalidDemo() {
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
              <DatePicker
                className="w-full"
                invalid={invalid}
                onValueChange={(details) => field.handleChange(details.value)}
                value={field.state.value}
              >
                <DatePickerLabel>Event date</DatePickerLabel>
                <DatePickerTrigger
                  aria-describedby={invalid ? dateErrorId : undefined}
                  className="w-full justify-start"
                  invalid={invalid}
                />
                <DatePickerContent />
              </DatePicker>
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
