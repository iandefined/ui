"use client";

import { revalidateLogic, useForm } from "@tanstack/react-form";
import { useId } from "react";

import { Button } from "@/registry/base/button";
import { Field, FieldError, FieldErrorSlot } from "@/registry/base/field";
import { Form } from "@/registry/base/form";
import {
  Slider,
  SliderContent,
  SliderControl,
  SliderLabel,
  SliderValue,
} from "@/registry/base/slider";

export default function SliderInvalidDemo() {
  const errorId = useId();
  const form = useForm({
    defaultValues: { volume: 0 },
    onSubmit: () => undefined,
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "change",
    }),
  });

  return (
    <Form className="grid w-full max-w-sm gap-3" form={form}>
      <form.Field
        name="volume"
        validators={{
          onDynamic: ({ value }) =>
            value >= 20 ? undefined : "Choose a volume of at least 20%.",
        }}
      >
        {(field) => {
          const error = field.state.meta.errors[0];
          const invalid = typeof error === "string";

          return (
            <Field invalid={invalid} name={field.name}>
              <Slider
                className="w-full max-w-sm"
                max={100}
                min={0}
                value={field.state.value}
                onValueChange={(value) =>
                  field.handleChange(
                    Array.isArray(value) ? (value[0] ?? 0) : value
                  )
                }
              >
                <SliderControl
                  aria-describedby={invalid ? errorId : undefined}
                  aria-invalid={invalid || undefined}
                >
                  <SliderContent>
                    <SliderLabel>Volume</SliderLabel>
                    <SliderValue className="ms-auto" />
                  </SliderContent>
                </SliderControl>
              </Slider>
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
