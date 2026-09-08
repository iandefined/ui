"use client";

import { revalidateLogic, useForm } from "@tanstack/react-form";
import { useId } from "react";

import {
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
  AutocompleteRoot,
} from "@/registry/base/autocomplete";
import { Button } from "@/registry/base/button";
import {
  Field,
  FieldError,
  FieldErrorSlot,
  FieldLabel,
} from "@/registry/base/field";
import { Form } from "@/registry/base/form";

const tags = ["feature", "fix", "bug", "docs"];

type TagFieldValue = {
  accepted: boolean;
  text: string;
};

function validateTag(value: TagFieldValue) {
  if (!value.text.trim()) {
    return "Choose a tag.";
  }

  return value.accepted && tags.includes(value.text)
    ? undefined
    : "Choose a tag from the list.";
}

export default function AutocompleteInvalidDemo() {
  const inputId = useId();
  const tagErrorId = useId();
  const form = useForm({
    defaultValues: {
      tag: { accepted: false, text: "" } as TagFieldValue,
    },
    onSubmit: () => undefined,
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "change",
    }),
  });

  return (
    <Form className="grid w-full max-w-sm gap-3" form={form}>
      <form.Field
        name="tag"
        validators={{ onDynamic: ({ value }) => validateTag(value) }}
      >
        {(field) => {
          const error = field.state.meta.errors[0];
          const invalid = typeof error === "string";

          return (
            <Field invalid={invalid} name={field.name}>
              <FieldLabel htmlFor={inputId}>Tag</FieldLabel>
              <AutocompleteRoot
                items={tags}
                onValueChange={(value, eventDetails) =>
                  field.handleChange({
                    accepted: eventDetails.reason === "item-press",
                    text: value,
                  })
                }
                value={field.state.value.text}
              >
                <AutocompleteInput
                  aria-describedby={invalid ? tagErrorId : undefined}
                  aria-invalid={invalid || undefined}
                  id={inputId}
                  placeholder="Choose a tag..."
                />
                <AutocompletePopup>
                  <AutocompleteEmpty>No tags found.</AutocompleteEmpty>
                  <AutocompleteList>
                    {(tag: string) => (
                      <AutocompleteItem key={tag} value={tag}>
                        {tag}
                      </AutocompleteItem>
                    )}
                  </AutocompleteList>
                </AutocompletePopup>
              </AutocompleteRoot>
              <FieldErrorSlot>
                <FieldError id={tagErrorId} match={invalid}>
                  {error}
                </FieldError>
              </FieldErrorSlot>
            </Field>
          );
        }}
      </form.Field>
      <Button type="submit">Validate tag</Button>
    </Form>
  );
}
