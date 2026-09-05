"use client";

import { useForm } from "@tanstack/react-form";
import { useState } from "react";

import { Button } from "@/registry/base/button";
import {
  DatePicker,
  DatePickerContent,
  DatePickerTrigger,
} from "@/registry/base/date-picker";
import {
  Field,
  FieldControl,
  FieldError,
  FieldLabel,
} from "@/registry/base/field";
import { Form } from "@/registry/base/form";

export default function FormWithDatePickerDemo() {
  const [submitted, setSubmitted] = useState<{
    title: string;
    date: Date;
  }>();

  const form = useForm({
    defaultValues: {
      title: "",
      date: [] as Date[],
    },
    onSubmit: async ({ value }) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSubmitted({ title: value.title, date: value.date[0] });
    },
  });

  return (
    <Form className="grid w-full max-w-sm gap-4" form={form}>
      <form.Field
        name="title"
        validators={{
          onSubmit: ({ value }) =>
            !value.trim() ? "Event title is required." : undefined,
        }}
      >
        {(field) => {
          const invalid = !field.state.meta.isValid;

          return (
            <Field
              dirty={field.state.meta.isDirty}
              invalid={invalid}
              name={field.name}
              touched={field.state.meta.isTouched}
            >
              <FieldLabel>Event title</FieldLabel>
              <FieldControl
                onBlur={field.handleBlur}
                onValueChange={(value) => {
                  setSubmitted(undefined);
                  field.handleChange(value);
                }}
                placeholder="Team standup"
                value={field.state.value}
              />
              <FieldError match={invalid}>
                {field.state.meta.errors.join(", ")}
              </FieldError>
            </Field>
          );
        }}
      </form.Field>

      <form.Field
        name="date"
        validators={{
          onSubmit: ({ value }) =>
            value.length === 0 ? "Pick a date." : undefined,
        }}
      >
        {(field) => {
          const invalid = !field.state.meta.isValid;

          return (
            <Field
              dirty={field.state.meta.isDirty}
              invalid={invalid}
              name={field.name}
              touched={field.state.meta.isTouched}
            >
              <DatePicker
                className="w-full max-w-sm"
                invalid={invalid}
                onValueChange={(details) => {
                  setSubmitted(undefined);
                  field.handleChange(details.value);
                }}
                value={field.state.value}
              >
                <FieldLabel>Event date</FieldLabel>
                <DatePickerTrigger className="w-full" />
                <DatePickerContent />
              </DatePicker>
              <FieldError match={invalid}>
                {field.state.meta.errors.join(", ")}
              </FieldError>
            </Field>
          );
        }}
      </form.Field>

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <Button disabled={!canSubmit} type="submit">
            {isSubmitting ? "Creating event..." : "Create event"}
          </Button>
        )}
      </form.Subscribe>

      {submitted && (
        <output className="rounded-lg border bg-muted/40 p-3 text-sm text-muted-foreground">
          Created "{submitted.title}" on{" "}
          {submitted.date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
          .
        </output>
      )}
    </Form>
  );
}
