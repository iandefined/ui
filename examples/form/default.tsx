"use client";

import { useForm } from "@tanstack/react-form";
import { useState } from "react";

import { Button } from "@/registry/base/button";
import { Form } from "@/registry/base/form";
import { Input } from "@/registry/base/input";
import { Label } from "@/registry/base/label";

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
            <div className="grid gap-2">
              <Label htmlFor={field.name}>Homepage</Label>
              <Input
                aria-describedby={`${field.name}-error`}
                aria-invalid={invalid || undefined}
                id={field.name}
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(event) => {
                  setSubmittedUrl(undefined);
                  field.handleChange(event.target.value);
                }}
                placeholder="https://your-site.com"
                type="url"
                value={field.state.value}
              />
              {invalid && (
                <p
                  className="text-sm text-destructive"
                  id={`${field.name}-error`}
                  role="alert"
                >
                  {field.state.meta.errors.join(", ")}
                </p>
              )}
            </div>
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
