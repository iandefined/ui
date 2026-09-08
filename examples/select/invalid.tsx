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
  Select,
  SelectIcon,
  SelectItem,
  SelectItemText,
  SelectList,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/base/select";

const frameworks = [
  { label: "Next.js", value: "next" },
  { label: "Vite", value: "vite" },
  { label: "Astro", value: "astro" },
] as const;

export default function SelectInvalidDemo() {
  const errorId = useId();
  const labelId = useId();
  const form = useForm({
    defaultValues: { framework: "" },
    onSubmit: () => undefined,
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "change",
    }),
  });

  return (
    <Form className="grid w-full max-w-sm gap-3" form={form}>
      <form.Field
        name="framework"
        validators={{
          onDynamic: ({ value }) =>
            frameworks.some((framework) => framework.value === value)
              ? undefined
              : "Choose a framework to continue.",
        }}
      >
        {(field) => {
          const error = field.state.meta.errors[0];
          const invalid = typeof error === "string";

          return (
            <Field className="w-full" invalid={invalid} name={field.name}>
              <FieldLabel id={labelId}>Framework</FieldLabel>
              <Select
                items={frameworks}
                name={field.name}
                value={field.state.value}
                onValueChange={(value) =>
                  field.handleChange((value as string | null) ?? "")
                }
              >
                <SelectTrigger
                  aria-describedby={invalid ? errorId : undefined}
                  aria-invalid={invalid || undefined}
                  aria-labelledby={labelId}
                  className="w-full"
                >
                  <SelectValue placeholder="Select a framework" />
                  <SelectIcon />
                </SelectTrigger>
                <SelectPopup>
                  <SelectList>
                    {frameworks.map((framework) => (
                      <SelectItem key={framework.value} value={framework.value}>
                        <SelectItemText>{framework.label}</SelectItemText>
                      </SelectItem>
                    ))}
                  </SelectList>
                </SelectPopup>
              </Select>
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
