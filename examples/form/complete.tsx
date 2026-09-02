"use client";

import { revalidateLogic, useForm } from "@tanstack/react-form";
import { useState } from "react";
import { z } from "zod";

import { Button } from "@/registry/base/button";
import { Checkbox } from "@/registry/base/checkbox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldItem,
  FieldLabel,
} from "@/registry/base/field";
import { Fieldset, FieldsetLegend } from "@/registry/base/fieldset";
import { Form } from "@/registry/base/form";
import { Input } from "@/registry/base/input";
import { Radio, RadioGroup } from "@/registry/base/radio-group";
import {
  Slider,
  SliderContent,
  SliderControl,
  SliderLabel,
  SliderValue,
} from "@/registry/base/slider";
import { Switch } from "@/registry/base/switch";
import { Textarea } from "@/registry/base/textarea";

const profileSchema = z.object({
  bio: z.string().trim().min(10, "Tell us a little more about yourself."),
  experience: z.number().min(1, "Choose at least one year."),
  name: z.string().trim().min(3, "Name must be at least 3 characters."),
  plan: z.enum(["starter", "pro", "business"]),
  productUpdates: z.boolean(),
  terms: z.boolean().refine(Boolean, "You must accept the terms."),
});

type ProfileValues = z.infer<typeof profileSchema>;

const defaultValues: ProfileValues = {
  bio: "",
  experience: 3,
  name: "",
  plan: "pro",
  productUpdates: true,
  terms: false,
};

const plans = [
  { description: "For personal projects.", label: "Starter", value: "starter" },
  { description: "For growing products.", label: "Pro", value: "pro" },
  { description: "For larger teams.", label: "Business", value: "business" },
] as const;

function getErrorMessage(error: unknown) {
  if (typeof error === "string") {
    return error;
  }

  if (
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }

  return undefined;
}

export default function FormCompleteDemo() {
  const [submittedValues, setSubmittedValues] = useState<ProfileValues>();
  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSubmittedValues(value);
    },
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "change",
    }),
    validators: {
      onDynamic: profileSchema,
    },
  });

  return (
    <Form className="grid w-full max-w-md gap-6" form={form}>
      <form.Field name="name">
        {(field) => {
          const error = field.state.meta.errors
            .map(getErrorMessage)
            .find(Boolean);

          return (
            <Field
              dirty={field.state.meta.isDirty}
              invalid={Boolean(error)}
              name={field.name}
              touched={field.state.meta.isTouched}
            >
              <FieldLabel>Display name</FieldLabel>
              <Input
                autoComplete="name"
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(event) => {
                  setSubmittedValues(undefined);
                  field.handleChange(event.target.value);
                }}
                placeholder="Ada Lovelace"
                value={field.state.value}
              />
              <FieldError match={Boolean(error)}>{error}</FieldError>
            </Field>
          );
        }}
      </form.Field>

      <form.Field name="bio">
        {(field) => {
          const error = field.state.meta.errors
            .map(getErrorMessage)
            .find(Boolean);

          return (
            <Field
              dirty={field.state.meta.isDirty}
              invalid={Boolean(error)}
              name={field.name}
              touched={field.state.meta.isTouched}
            >
              <FieldLabel>Bio</FieldLabel>
              <Textarea
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(event) => {
                  setSubmittedValues(undefined);
                  field.handleChange(event.target.value);
                }}
                placeholder="Tell us what you are building."
                value={field.state.value}
              />
              <FieldDescription>At least 10 characters.</FieldDescription>
              <FieldError match={Boolean(error)}>{error}</FieldError>
            </Field>
          );
        }}
      </form.Field>

      <form.Field name="plan">
        {(field) => (
          <Field name={field.name}>
            <Fieldset>
              <FieldsetLegend>Plan</FieldsetLegend>
              <RadioGroup
                value={field.state.value}
                onValueChange={(value) => {
                  setSubmittedValues(undefined);
                  field.handleChange(value);
                }}
              >
                {plans.map((plan) => (
                  <FieldItem key={plan.value}>
                    <FieldLabel className="cursor-pointer items-start">
                      <Radio value={plan.value} />
                      <span className="grid gap-1">
                        <span>{plan.label}</span>
                        <span className="text-xs/4 font-normal text-muted-foreground">
                          {plan.description}
                        </span>
                      </span>
                    </FieldLabel>
                  </FieldItem>
                ))}
              </RadioGroup>
            </Fieldset>
          </Field>
        )}
      </form.Field>

      <form.Field name="experience">
        {(field) => (
          <Field name={field.name}>
            <Slider
              formatValue={(value) => `${value} years`}
              max={10}
              min={1}
              value={field.state.value}
              onValueChange={(value) => {
                setSubmittedValues(undefined);
                field.handleChange(value as number);
              }}
            >
              <SliderControl>
                <SliderContent>
                  <SliderLabel>Experience</SliderLabel>
                  <SliderValue className="ms-auto" />
                </SliderContent>
              </SliderControl>
            </Slider>
            <FieldDescription>
              How long have you worked with component libraries?
            </FieldDescription>
          </Field>
        )}
      </form.Field>

      <form.Field name="productUpdates">
        {(field) => (
          <Field name={field.name}>
            <FieldLabel className="justify-between">
              Product updates
              <Switch
                checked={field.state.value}
                onCheckedChange={(checked) => {
                  setSubmittedValues(undefined);
                  field.handleChange(checked);
                }}
              />
            </FieldLabel>
            <FieldDescription>
              Receive occasional emails about new features.
            </FieldDescription>
          </Field>
        )}
      </form.Field>

      <form.Field name="terms">
        {(field) => {
          const error = field.state.meta.errors
            .map(getErrorMessage)
            .find(Boolean);

          return (
            <Field
              dirty={field.state.meta.isDirty}
              invalid={Boolean(error)}
              name={field.name}
              touched={field.state.meta.isTouched}
            >
              <FieldLabel className="cursor-pointer items-start">
                <Checkbox
                  checked={field.state.value}
                  onCheckedChange={(checked) => {
                    setSubmittedValues(undefined);
                    field.handleChange(checked);
                  }}
                />
                I accept the terms and privacy policy.
              </FieldLabel>
              <FieldError match={Boolean(error)}>{error}</FieldError>
            </Field>
          );
        }}
      </form.Field>

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <Button disabled={!canSubmit} type="submit">
            {isSubmitting ? "Creating profile..." : "Create profile"}
          </Button>
        )}
      </form.Subscribe>

      {submittedValues && (
        <output className="rounded-lg border bg-muted/40 p-3 text-sm text-muted-foreground">
          Profile created for {submittedValues.name} on the{" "}
          {submittedValues.plan} plan.
        </output>
      )}
    </Form>
  );
}
