"use client";

import { revalidateLogic, useForm } from "@tanstack/react-form";
import { useId, useState } from "react";
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
  SliderControl,
  SliderLabel,
  SliderValue,
} from "@/registry/base/slider";
import { Switch } from "@/registry/base/switch";
import { Textarea } from "@/registry/base/textarea";

const profileSchema = z.object({
  bio: z.string().trim().min(10, "Please enter at least 10 characters."),
  experience: z.number().min(1, "Choose at least one year."),
  name: z.string().trim().min(3, "Name must be at least 3 characters."),
  plan: z
    .union([z.enum(["starter", "pro", "business"]), z.literal("")])
    .refine((value) => value !== "", "Choose a plan."),
  productUpdates: z.boolean(),
  terms: z.boolean().refine(Boolean, "You must accept the terms."),
});

type ProfileValues = z.input<typeof profileSchema>;

const defaultValues: ProfileValues = {
  bio: "",
  experience: 3,
  name: "",
  plan: "",
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
  const planErrorId = useId();
  const termsErrorId = useId();
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
              {error ? (
                <FieldError match>{error}</FieldError>
              ) : (
                <FieldDescription>
                  Tell us a little more about yourself.
                </FieldDescription>
              )}
            </Field>
          );
        }}
      </form.Field>

      <form.Field name="plan">
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
              <Fieldset>
                <FieldsetLegend>Plan</FieldsetLegend>
                <RadioGroup
                  aria-describedby={error ? planErrorId : undefined}
                  aria-invalid={Boolean(error)}
                  name={field.name}
                  onValueChange={(value) => {
                    setSubmittedValues(undefined);
                    field.handleChange(value);
                  }}
                  required
                  value={field.state.value}
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
              <FieldError id={planErrorId} match={Boolean(error)}>
                {error}
              </FieldError>
            </Field>
          );
        }}
      </form.Field>

      <form.Field name="experience">
        {(field) => (
          <Field name={field.name}>
            <Slider
              className="grid gap-2"
              formatValue={(value) => `${value} years`}
              hideTooltip
              max={10}
              min={1}
              variant="compact"
              value={field.state.value}
              onValueChange={(value) => {
                setSubmittedValues(undefined);
                field.handleChange(
                  Array.isArray(value) ? (value[0] ?? 1) : value
                );
              }}
            >
              <div className="flex items-center">
                <SliderLabel className="font-medium text-foreground">
                  Experience
                </SliderLabel>
                <SliderValue className="ms-auto" />
              </div>
              <SliderControl />
            </Slider>
            <FieldDescription>
              How long have you worked with component libraries?
            </FieldDescription>
          </Field>
        )}
      </form.Field>

      <form.Field name="productUpdates">
        {(field) => (
          <Field className="space-y-0" name={field.name}>
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
              <FieldLabel className="cursor-pointer">
                <Checkbox
                  aria-describedby={error ? termsErrorId : undefined}
                  aria-invalid={Boolean(error)}
                  checked={field.state.value}
                  onCheckedChange={(checked) => {
                    setSubmittedValues(undefined);
                    field.handleChange(checked);
                  }}
                />
                I accept the terms and privacy policy.
              </FieldLabel>
              <FieldError id={termsErrorId} match={Boolean(error)}>
                {error}
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
