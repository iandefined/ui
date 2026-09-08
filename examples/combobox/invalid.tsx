"use client";

import { revalidateLogic, useForm } from "@tanstack/react-form";
import { useId } from "react";

import { Button } from "@/registry/base/button";
import {
  Combobox,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
} from "@/registry/base/combobox";
import {
  Field,
  FieldError,
  FieldErrorSlot,
  FieldLabel,
} from "@/registry/base/field";
import { Form } from "@/registry/base/form";

const fruits = ["Apple", "Banana", "Cherry", "Orange"];

export default function ComboboxInvalidDemo() {
  const inputId = useId();
  const fruitErrorId = useId();
  const form = useForm({
    defaultValues: { fruit: null as string | null },
    onSubmit: () => undefined,
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "change",
    }),
  });

  return (
    <Form className="grid w-full max-w-sm gap-3" form={form}>
      <form.Field
        name="fruit"
        validators={{
          onDynamic: ({ value }) =>
            value ? undefined : "Choose a fruit from the list.",
        }}
      >
        {(field) => {
          const error = field.state.meta.errors[0];
          const invalid = typeof error === "string";

          return (
            <Field invalid={invalid} name={field.name}>
              <FieldLabel htmlFor={inputId}>Fruit</FieldLabel>
              <Combobox
                items={fruits}
                onValueChange={(value) => field.handleChange(value)}
                value={field.state.value}
              >
                <ComboboxInput
                  aria-describedby={invalid ? fruitErrorId : undefined}
                  aria-invalid={invalid || undefined}
                  className="w-full"
                  id={inputId}
                  placeholder="Choose a fruit..."
                />
                <ComboboxPopup>
                  <ComboboxList>
                    {(fruit: string) => (
                      <ComboboxItem key={fruit} value={fruit}>
                        {fruit}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxPopup>
              </Combobox>
              <FieldErrorSlot>
                <FieldError id={fruitErrorId} match={invalid}>
                  {error}
                </FieldError>
              </FieldErrorSlot>
            </Field>
          );
        }}
      </form.Field>
      <Button type="submit">Validate fruit</Button>
    </Form>
  );
}
