# Forms

Compose accessible native and TanStack Form workflows with registry controls.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Registry controls are composable rather than tied to one form library. Use a native `<form>` when browser constraints are enough, or use TanStack Form when fields need managed values, schemas, asynchronous validation, and submission state.

## Preview

```tsx
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
```

## Choose a Form Model

Use a native form for simple inputs and built-in browser validation. It requires no `Form` component or form-library state.

Use TanStack Form when validation spans fields, a schema owns validation, values must be controlled, or submission and asynchronous errors need coordinated state. The registry `Form` component is a native form wrapper that calls `form.handleSubmit()`.

## Native Constraint Validation

Compose `Field`, `Fieldset`, and registry controls inside a native `<form>`. Native controls such as `FieldControl`, Input, and Textarea support standard `required`, `type`, and `pattern` constraints.

```tsx
import { Button } from "@/components/ui/button";
import { Field, FieldControl, FieldLabel } from "@/components/ui/field";

<form onSubmit={(event) => event.preventDefault()}>
  <Field name="email">
    <FieldLabel>Email</FieldLabel>
    <FieldControl required type="email" />
  </Field>
  <Button type="submit">Continue</Button>
</form>;
```

```tsx
"use client";

import { useState } from "react";

import { Button } from "@/registry/base/button";
import {
  Field,
  FieldControl,
  FieldDescription,
  FieldLabel,
} from "@/registry/base/field";

export default function FormNativeConstraintDemo() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="grid w-full max-w-sm gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <Field name="email">
        <FieldLabel>Email</FieldLabel>
        <FieldControl
          autoComplete="email"
          onValueChange={() => setSubmitted(false)}
          placeholder="you@example.com"
          required
          type="email"
        />
        <FieldDescription>We use this to send your receipt.</FieldDescription>
      </Field>

      <Button type="submit">Continue</Button>

      {submitted && (
        <output className="text-sm text-muted-foreground">
          Email address accepted.
        </output>
      )}
    </form>
  );
}
```

## TanStack Form Quick Start

Create the form with `useForm`, connect each registry control to `form.Field`, and give the registry `Form` the form API.

```tsx
import { useForm } from "@tanstack/react-form";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldControl,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Form } from "@/components/ui/form";

function NewsletterForm() {
  const form = useForm({
    defaultValues: { email: "" },
    onSubmit: ({ value }) => console.info(value),
  });

  return (
    <Form form={form}>
      <form.Field
        name="email"
        validators={{
          onBlur: ({ value }) =>
            value.includes("@") ? undefined : "Enter a valid email address.",
        }}
      >
        {(field) => {
          const error = field.state.meta.errors[0];

          return (
            <Field
              dirty={field.state.meta.isDirty}
              invalid={typeof error === "string"}
              name={field.name}
              touched={field.state.meta.isTouched}
            >
              <FieldLabel>Email</FieldLabel>
              <FieldControl
                onBlur={field.handleBlur}
                onValueChange={field.handleChange}
                type="email"
                value={field.state.value}
              />
              <FieldError match={typeof error === "string"}>{error}</FieldError>
            </Field>
          );
        }}
      </form.Field>
      <Button type="submit">Subscribe</Button>
    </Form>
  );
}
```

```tsx
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
```

## Labels, Descriptions, and Errors

`Field` connects one control with its label and active description or error. Keep the active message immediately after the control. Map TanStack metadata into `dirty`, `invalid`, and `touched`; show a `FieldError` only when there is a current error.

- Use `FieldLabel` with text controls, Input, Textarea, and Number Field.
- Wrap Checkbox and Switch in `FieldLabel` for an implicit label.
- Use `FieldsetLegend` for Radio Group and related checkbox groups, then label every choice with `FieldItem` and `FieldLabel`.
- Use the built-in label/value composition for Slider and the trigger label supplied by Select or Combobox.
- Put `aria-invalid` and the group error's `aria-describedby` on a group root such as Radio Group, not on every option.

```tsx
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
```

## Grouped Controls

Use `Fieldset` for a shared context such as an address, plan, or notification preferences. `Fieldset` supplies native grouping while each nested `Field` keeps its own label and validation state.

```tsx
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
```

## Validation

Use field validators for small local rules. Use a schema when rules depend on multiple values. The Zod example validates on submission, then revalidates when a value changes so corrected fields clear their errors.

```tsx
import { revalidateLogic, useForm } from "@tanstack/react-form";
import { z } from "zod";

const accountSchema = z.object({
  email: z.string().email("Enter a valid email address."),
});

const form = useForm({
  defaultValues: { email: "" },
  validationLogic: revalidateLogic({
    mode: "submit",
    modeAfterSubmission: "change",
  }),
  validators: { onDynamic: accountSchema },
});
```

```tsx
"use client";

import { revalidateLogic, useForm } from "@tanstack/react-form";
import { useState } from "react";
import { z } from "zod";

import { Button } from "@/registry/base/button";
import {
  Field,
  FieldControl,
  FieldError,
  FieldLabel,
} from "@/registry/base/field";
import { Form } from "@/registry/base/form";

const accountSchema = z
  .object({
    confirmPassword: z.string(),
    email: z.string().email("Enter a valid email address."),
    password: z.string().min(8, "Password must be at least 8 characters."),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

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

export default function FormZodValidationDemo() {
  const [submitted, setSubmitted] = useState(false);
  const form = useForm({
    defaultValues: {
      confirmPassword: "",
      email: "",
      password: "",
    },
    onSubmit: () => {
      setSubmitted(true);
    },
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "change",
    }),
    validators: {
      onDynamic: accountSchema,
    },
  });

  return (
    <Form className="grid w-full max-w-sm gap-4" form={form}>
      <form.Field name="email">
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
              <FieldLabel>Email</FieldLabel>
              <FieldControl
                autoComplete="email"
                onBlur={field.handleBlur}
                onValueChange={(value) => {
                  setSubmitted(false);
                  field.handleChange(value);
                }}
                placeholder="you@example.com"
                type="email"
                value={field.state.value}
              />
              <FieldError match={Boolean(error)}>{error}</FieldError>
            </Field>
          );
        }}
      </form.Field>

      <form.Field name="password">
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
              <FieldLabel>Password</FieldLabel>
              <FieldControl
                autoComplete="new-password"
                onBlur={field.handleBlur}
                onValueChange={(value) => {
                  setSubmitted(false);
                  field.handleChange(value);
                }}
                type="password"
                value={field.state.value}
              />
              <FieldError match={Boolean(error)}>{error}</FieldError>
            </Field>
          );
        }}
      </form.Field>

      <form.Field name="confirmPassword">
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
              <FieldLabel>Confirm password</FieldLabel>
              <FieldControl
                autoComplete="new-password"
                onBlur={field.handleBlur}
                onValueChange={(value) => {
                  setSubmitted(false);
                  field.handleChange(value);
                }}
                type="password"
                value={field.state.value}
              />
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
            {isSubmitting ? "Creating account..." : "Create account"}
          </Button>
        )}
      </form.Subscribe>

      {submitted && (
        <output className="text-sm text-muted-foreground">
          Account details validated successfully.
        </output>
      )}
    </Form>
  );
}
```

For availability and other server checks, use an asynchronous validator such as `onSubmitAsync`. Keep the field pending/submission state visible, and return an actionable message rather than a generic failure.

```tsx
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

async function validateUsername(value: string) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (value === "admin") {
    return "This username is reserved. Choose another username.";
  }

  if (value.length < 3) {
    return "Enter at least 3 characters.";
  }

  return undefined;
}

export default function FormServerValidationDemo() {
  const [submitted, setSubmitted] = useState(false);
  const form = useForm({
    defaultValues: {
      username: "",
    },
    onSubmit: () => {
      setSubmitted(true);
    },
  });

  return (
    <Form className="grid w-full max-w-sm gap-4" form={form}>
      <form.Field
        name="username"
        validators={{
          onSubmitAsync: ({ value }) => validateUsername(value),
        }}
      >
        {(field) => {
          const error = field.state.meta.errors[0];
          const invalid = typeof error === "string";

          return (
            <Field
              dirty={field.state.meta.isDirty}
              invalid={invalid}
              name={field.name}
              touched={field.state.meta.isTouched}
            >
              <FieldLabel>Username</FieldLabel>
              <FieldControl
                autoComplete="username"
                onBlur={field.handleBlur}
                onValueChange={(value) => {
                  setSubmitted(false);
                  field.handleChange(value);
                }}
                placeholder="Try admin"
                value={field.state.value}
              />
              <FieldError match={invalid}>{error}</FieldError>
            </Field>
          );
        }}
      </form.Field>

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <Button disabled={!canSubmit} type="submit">
            {isSubmitting ? "Checking..." : "Submit"}
          </Button>
        )}
      </form.Subscribe>

      {submitted && (
        <output className="text-sm text-muted-foreground">
          Username is available.
        </output>
      )}
    </Form>
  );
}
```

## Submission State

Use `form.Subscribe` to read `canSubmit` and `isSubmitting`. Disable submission while a request is pending, reset any success feedback when values change, and render a success or failure message in the form itself.

```tsx
<form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
  {([canSubmit, isSubmitting]) => (
    <Button disabled={!canSubmit} type="submit">
      {isSubmitting ? "Saving..." : "Save changes"}
    </Button>
  )}
</form.Subscribe>
```

## Component Reference

| Component                                                                                                             | Use it for                                           |
| --------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| [Form](/docs/components/form)                                                                                         | TanStack Form submission and native form attributes. |
| [Field](/docs/components/field)                                                                                       | Labels, descriptions, validation state, and errors.  |
| [Fieldset](/docs/components/fieldset)                                                                                 | Native semantic groups and legends.                  |
| [Input](/docs/components/input), [Textarea](/docs/components/textarea), [Number Field](/docs/components/number-field) | Text and numeric entry.                              |
| [Checkbox](/docs/components/checkbox), [Switch](/docs/components/switch), [Radio Group](/docs/components/radio-group) | Boolean and choice controls.                         |
| [Select](/docs/components/select), [Combobox](/docs/components/combobox), [Slider](/docs/components/slider)           | Trigger-based, searchable, and range controls.       |
