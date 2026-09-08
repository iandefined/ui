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
import { Textarea } from "@/registry/base/textarea";

function validateMessage(value: string) {
  const message = value.trim();

  if (!message) {
    return "Message is required.";
  }

  return message.length >= 10 ? undefined : "Enter at least 10 characters.";
}

export default function TextareaInvalidDemo() {
  const form = useForm({
    defaultValues: { message: "" },
    onSubmit: () => undefined,
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "change",
    }),
  });

  return (
    <Form className="grid w-full max-w-sm gap-3" form={form}>
      <form.Field
        name="message"
        validators={{ onDynamic: ({ value }) => validateMessage(value) }}
      >
        {(field) => {
          const error = field.state.meta.errors[0];
          const invalid = typeof error === "string";

          return (
            <Field invalid={invalid} name={field.name}>
              <FieldLabel>Message</FieldLabel>
              <Textarea
                aria-label="Message"
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                placeholder="Tell us more..."
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
