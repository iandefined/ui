"use client";

import { revalidateLogic, useForm } from "@tanstack/react-form";
import { useId } from "react";

import { Button } from "@/registry/base/button";
import {
  Field,
  FieldError,
  FieldErrorSlot,
  FieldItem,
  FieldLabel,
} from "@/registry/base/field";
import { Fieldset, FieldsetLegend } from "@/registry/base/fieldset";
import { Form } from "@/registry/base/form";
import { Radio, RadioGroup } from "@/registry/base/radio-group";

const plans = [
  { label: "Starter", value: "starter" },
  { label: "Pro", value: "pro" },
  { label: "Business", value: "business" },
] as const;

export default function RadioGroupInvalidDemo() {
  const errorId = useId();
  const form = useForm({
    defaultValues: { plan: "" },
    onSubmit: () => undefined,
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "change",
    }),
  });

  return (
    <Form className="grid w-full max-w-sm gap-3" form={form}>
      <form.Field
        name="plan"
        validators={{
          onDynamic: ({ value }) =>
            plans.some((plan) => plan.value === value)
              ? undefined
              : "Choose a plan to continue.",
        }}
      >
        {(field) => {
          const error = field.state.meta.errors[0];
          const invalid = typeof error === "string";

          return (
            <Field invalid={invalid} name={field.name}>
              <Fieldset>
                <FieldsetLegend>Choose a plan</FieldsetLegend>
                <RadioGroup
                  aria-describedby={invalid ? errorId : undefined}
                  aria-invalid={invalid || undefined}
                  name={field.name}
                  onValueChange={(value) => field.handleChange(value)}
                  required
                  value={field.state.value}
                >
                  {plans.map((plan) => (
                    <FieldItem key={plan.value}>
                      <FieldLabel className="cursor-pointer">
                        <Radio value={plan.value} />
                        {plan.label}
                      </FieldLabel>
                    </FieldItem>
                  ))}
                </RadioGroup>
              </Fieldset>
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
