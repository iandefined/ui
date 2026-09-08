"use client";

import { revalidateLogic, useForm } from "@tanstack/react-form";
import { useId } from "react";

import { Button } from "@/registry/base/button";
import {
  Field,
  FieldError,
  FieldErrorSlot,
  FieldLabel,
} from "@/registry/base/field";
import { Form } from "@/registry/base/form";
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/registry/base/number-field";

function validateQuantity(value: number) {
  return Number.isInteger(value) && value > 0
    ? undefined
    : "Enter a quantity greater than zero.";
}

export default function NumberFieldInvalidDemo() {
  const inputId = useId();
  const form = useForm({
    defaultValues: { quantity: 0 },
    onSubmit: () => undefined,
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "change",
    }),
  });

  return (
    <Form className="grid w-full max-w-sm gap-3" form={form}>
      <form.Field
        name="quantity"
        validators={{ onDynamic: ({ value }) => validateQuantity(value) }}
      >
        {(field) => {
          const error = field.state.meta.errors[0];
          const invalid = typeof error === "string";

          return (
            <Field invalid={invalid} name={field.name}>
              <FieldLabel htmlFor={inputId}>Quantity</FieldLabel>
              <NumberField
                className="max-w-none"
                min={0}
                onValueChange={(value) => field.handleChange(value ?? 0)}
                value={field.state.value}
              >
                <NumberFieldGroup>
                  <NumberFieldDecrement />
                  <NumberFieldInput
                    aria-label="Quantity"
                    id={inputId}
                    name={field.name}
                    onBlur={field.handleBlur}
                  />
                  <NumberFieldIncrement />
                </NumberFieldGroup>
              </NumberField>
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
