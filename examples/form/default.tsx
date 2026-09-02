"use client";

import { useForm } from "@tanstack/react-form";
import { useState } from "react";

import { Button } from "@/registry/base/button";
import {
  Field,
  FieldControl,
  FieldError,
  FieldLabel,
} from "@/registry/base/field";
import { Form } from "@/registry/base/form";

function validateUrl(value: string) {
  if (!value) {
    return "Homepage is required.";
  }

  try {
    const url = new URL(value);

    if (url.hostname.endsWith("example.com")) {
      return "The example domain is not allowed.";
    }
  } catch {
    return "Enter a valid URL.";
  }

  return undefined;
}

export default function FormDefaultDemo() {
  const [submittedUrl, setSubmittedUrl] = useState<string>();
  const form = useForm({
    defaultValues: {
      url: "https://example.com",
    },
    onSubmit: async ({ value }) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSubmittedUrl(value.url);
    },
  });

  return (
    <Form className="grid w-full max-w-sm gap-4" form={form}>
      <form.Field
        name="url"
        validators={{
          onBlur: ({ value }) => validateUrl(value),
          onSubmit: ({ value }) => validateUrl(value),
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
              <FieldLabel>Homepage</FieldLabel>
              <FieldControl
                onBlur={field.handleBlur}
                onValueChange={(value) => {
                  setSubmittedUrl(undefined);
                  field.handleChange(value);
                }}
                placeholder="https://your-site.com"
                type="url"
                value={field.state.value}
              />
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
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        )}
      </form.Subscribe>

      {submittedUrl && (
        <output className="text-sm text-muted-foreground">
          Saved {submittedUrl}
        </output>
      )}
    </Form>
  );
}
