"use client";

import { revalidateLogic, useForm } from "@tanstack/react-form";
import { useId } from "react";

import { Button } from "@/registry/base/button";
import { Field, FieldError, FieldErrorSlot } from "@/registry/base/field";
import { Fieldset, FieldsetLegend } from "@/registry/base/fieldset";
import { Form } from "@/registry/base/form";
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@/registry/base/segmented-control";

const shirtSizes = ["s", "m", "l"] as const;

export default function SegmentedControlInvalidDemo() {
  const errorId = useId();
  const form = useForm({
    defaultValues: { shirtSize: "" },
    onSubmit: () => undefined,
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "change",
    }),
  });

  return (
    <Form className="grid w-full max-w-sm gap-3" form={form}>
      <form.Field
        name="shirtSize"
        validators={{
          onDynamic: ({ value }) =>
            shirtSizes.includes(value as (typeof shirtSizes)[number])
              ? undefined
              : "Choose a shirt size to continue.",
        }}
      >
        {(field) => {
          const error = field.state.meta.errors[0];
          const invalid = typeof error === "string";

          return (
            <Field invalid={invalid} name={field.name}>
              <Fieldset className="mb-2">
                <FieldsetLegend>Shirt size</FieldsetLegend>
                <SegmentedControl
                  aria-describedby={invalid ? errorId : undefined}
                  aria-invalid={invalid || undefined}
                  className="w-full"
                  name={field.name}
                  onBlur={field.handleBlur}
                  onValueChange={(value) => field.handleChange(value)}
                  required
                  value={field.state.value}
                >
                  <SegmentedControlItem className="flex-1" value="s">
                    S
                  </SegmentedControlItem>
                  <SegmentedControlItem className="flex-1" value="m">
                    M
                  </SegmentedControlItem>
                  <SegmentedControlItem className="flex-1" value="l">
                    L
                  </SegmentedControlItem>
                </SegmentedControl>
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
