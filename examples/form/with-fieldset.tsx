"use client";

import { useForm } from "@tanstack/react-form";
import { useState } from "react";

import { Button } from "@/registry/base/button";
import { Checkbox } from "@/registry/base/checkbox";
import { Field, FieldLabel } from "@/registry/base/field";
import { Fieldset, FieldsetLegend } from "@/registry/base/fieldset";
import { Form } from "@/registry/base/form";
import { Input } from "@/registry/base/input";

export default function FormWithFieldsetDemo() {
  const [submitted, setSubmitted] = useState(false);
  const form = useForm({
    defaultValues: {
      address: "",
      city: "",
      saveAddress: true,
    },
    onSubmit: () => {
      setSubmitted(true);
    },
  });

  return (
    <Form className="grid w-full max-w-sm gap-5" form={form}>
      <Fieldset>
        <FieldsetLegend>Shipping address</FieldsetLegend>

        <form.Field name="address">
          {(field) => (
            <Field name={field.name}>
              <FieldLabel>Street address</FieldLabel>
              <Input
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(event) => {
                  setSubmitted(false);
                  field.handleChange(event.target.value);
                }}
                placeholder="123 Main St"
                value={field.state.value}
              />
            </Field>
          )}
        </form.Field>

        <form.Field name="city">
          {(field) => (
            <Field name={field.name}>
              <FieldLabel>City</FieldLabel>
              <Input
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(event) => {
                  setSubmitted(false);
                  field.handleChange(event.target.value);
                }}
                placeholder="San Francisco"
                value={field.state.value}
              />
            </Field>
          )}
        </form.Field>

        <form.Field name="saveAddress">
          {(field) => (
            <Field name={field.name}>
              <FieldLabel className="w-fit cursor-pointer">
                <Checkbox
                  checked={field.state.value}
                  name={field.name}
                  onBlur={field.handleBlur}
                  onCheckedChange={(checked) => {
                    setSubmitted(false);
                    field.handleChange(checked);
                  }}
                />
                Save this address
              </FieldLabel>
            </Field>
          )}
        </form.Field>
      </Fieldset>

      <Button type="submit">Continue</Button>

      {submitted && (
        <output className="text-sm text-muted-foreground">
          Shipping address saved.
        </output>
      )}
    </Form>
  );
}
