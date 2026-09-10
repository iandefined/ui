"use client";

import { useForm } from "@tanstack/react-form";
import { useState } from "react";

import { Button } from "@/registry/base/button";
import { Field, FieldDescription } from "@/registry/base/field";
import { Fieldset, FieldsetLegend } from "@/registry/base/fieldset";
import { Form } from "@/registry/base/form";
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@/registry/base/segmented-control";

export default function SegmentedControlFormDemo() {
  const [submittedSize, setSubmittedSize] = useState<string>();
  const form = useForm({
    defaultValues: { shirtSize: "m" },
    onSubmit: async ({ value }) => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setSubmittedSize(value.shirtSize);
    },
  });

  return (
    <Form className="grid w-full max-w-sm gap-4" form={form}>
      <form.Field name="shirtSize">
        {(field) => (
          <Field name={field.name}>
            <Fieldset className="mb-2">
              <FieldsetLegend>Shirt size</FieldsetLegend>
              <SegmentedControl
                aria-label="Shirt size"
                className="w-full"
                name={field.name}
                onBlur={field.handleBlur}
                onValueChange={field.handleChange}
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
            <FieldDescription>
              Your selection is submitted with the rest of the form values.
            </FieldDescription>
          </Field>
        )}
      </form.Field>

      <form.Subscribe selector={(state) => state.isSubmitting}>
        {(isSubmitting) => (
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? "Saving..." : "Save size"}
          </Button>
        )}
      </form.Subscribe>

      {submittedSize && (
        <output className="text-sm text-muted-foreground">
          Saved shirt size: {submittedSize.toUpperCase()}
        </output>
      )}
    </Form>
  );
}
