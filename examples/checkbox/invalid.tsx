"use client";

import { revalidateLogic, useForm } from "@tanstack/react-form";
import { useId } from "react";

import { Button } from "@/registry/base/button";
import { Checkbox } from "@/registry/base/checkbox";
import {
  Field,
  FieldError,
  FieldErrorSlot,
  FieldLabel,
} from "@/registry/base/field";
import { Form } from "@/registry/base/form";

export default function CheckboxInvalidDemo() {
  const errorId = useId();
  const form = useForm({
    defaultValues: { terms: false },
    onSubmit: () => undefined,
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "change",
    }),
  });

  return (
    <Form className="grid w-full max-w-sm gap-3" form={form}>
      <form.Field
        name="terms"
        validators={{
          onDynamic: ({ value }) =>
            value ? undefined : "Accept the terms to continue.",
        }}
      >
        {(field) => {
          const error = field.state.meta.errors[0];
          const invalid = typeof error === "string";

          return (
            <Field invalid={invalid} name={field.name}>
              <FieldLabel className="cursor-pointer">
                <Checkbox
                  aria-describedby={invalid ? errorId : undefined}
                  aria-invalid={invalid || undefined}
                  checked={field.state.value}
                  name={field.name}
                  onBlur={field.handleBlur}
                  onCheckedChange={(checked) => field.handleChange(checked)}
                />
                I accept the terms and privacy policy.
              </FieldLabel>
              <FieldErrorSlot>
                <FieldError id={errorId} match={invalid}>
                  {error}
                </FieldError>
              </FieldErrorSlot>
            </Field>
          );
        }}
      </form.Field>
      <Button type="submit">Continue</Button>
    </Form>
  );
}
