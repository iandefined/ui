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
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/base/input-group";

function validateDomain(value: string) {
  const domain = value.trim();

  if (!domain) {
    return "Website is required.";
  }

  try {
    const url = new URL(`https://${domain}`);

    return url.hostname === domain && domain.includes(".")
      ? undefined
      : "Enter a valid domain such as example.com.";
  } catch {
    return "Enter a valid domain such as example.com.";
  }
}

export default function InputGroupInvalidDemo() {
  const inputId = useId();
  const form = useForm({
    defaultValues: { website: "" },
    onSubmit: () => undefined,
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "change",
    }),
  });

  return (
    <Form className="grid w-full max-w-sm gap-3" form={form}>
      <form.Field
        name="website"
        validators={{ onDynamic: ({ value }) => validateDomain(value) }}
      >
        {(field) => {
          const error = field.state.meta.errors[0];
          const invalid = typeof error === "string";

          return (
            <Field invalid={invalid} name={field.name}>
              <FieldLabel htmlFor={inputId}>Website</FieldLabel>
              <InputGroup>
                <InputGroupAddon>https://</InputGroupAddon>
                <InputGroupInput
                  aria-label="Website"
                  id={inputId}
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="example.com"
                  value={field.state.value}
                />
              </InputGroup>
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
