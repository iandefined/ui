# Radio Group

A set of checkable buttons where only one item can be checked at a time.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `RadioGroup` when a person must choose exactly one option from a related set.

## Preview

```tsx
import { Label } from "@/registry/base/label";
import { Radio, RadioGroup } from "@/registry/base/radio-group";

export default function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="virat">
      <div className="text-sm font-medium">
        Choose your favorite cricket player
      </div>
      <Label>
        <Radio value="virat" /> Virat Kohli
      </Label>
      <Label>
        <Radio value="rohit" /> Rohit Sharma
      </Label>
      <Label>
        <Radio value="sachin" /> Sachin Tendulkar
      </Label>
      <Label>
        <Radio value="dhoni" /> MS Dhoni
      </Label>
    </RadioGroup>
  );
}
```

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/radio-group.json
```

## Usage

```tsx
import { Label } from "@/components/ui/label";
import { Radio, RadioGroup } from "@/components/ui/radio-group";
```

```tsx
<RadioGroup defaultValue="react-query">
  <div className="text-sm font-medium">
    Choose your favorite Tanstack library
  </div>
  <Label>
    <Radio value="react-query" /> React Query
  </Label>
  <Label>
    <Radio value="tanstack-router" /> Tanstack Router
  </Label>
  <Label>
    <Radio value="tanstack-table" /> Tanstack Table
  </Label>
</RadioGroup>
```

## Composition

```tsx
import {
  Radio,
  RadioGroup,
  RadioIndicator,
  RadioRoot,
} from "@/components/ui/radio-group";

<RadioGroup>
  <Radio value="one" />
  <RadioRoot value="two">
    <RadioIndicator />
  </RadioRoot>
</RadioGroup>;
```

## Examples

### Basic

```tsx
import { Label } from "@/registry/base/label";
import { Radio, RadioGroup } from "@/registry/base/radio-group";

export default function RadioGroupBasicDemo() {
  return (
    <RadioGroup defaultValue="light">
      <Label>
        <Radio value="light" /> Light Theme
      </Label>
      <Label>
        <Radio value="dark" /> Dark Theme
      </Label>
      <Label>
        <Radio value="system" /> System Default
      </Label>
    </RadioGroup>
  );
}
```

### With Description

```tsx
import { Label } from "@/registry/base/label";
import { Radio, RadioGroup } from "@/registry/base/radio-group";

export default function RadioGroupWithDescriptionDemo() {
  return (
    <RadioGroup className="max-w-sm" defaultValue="all">
      <Label className="items-start">
        <Radio value="all" />
        <span className="flex flex-col gap-1">
          <span className="font-medium">All Notifications</span>
          <span className="text-xs text-muted-foreground">
            Receive all notifications including system, marketing, and activity
            alerts.
          </span>
        </span>
      </Label>
      <Label className="items-start">
        <Radio value="mentions" />
        <span className="flex flex-col gap-1">
          <span className="font-medium">Only Mentions</span>
          <span className="text-xs text-muted-foreground">
            Get notified only when someone mentions you or replies to your
            posts.
          </span>
        </span>
      </Label>
      <Label className="items-start">
        <Radio value="direct" />
        <span className="flex flex-col gap-1">
          <span className="font-medium">Direct Messages</span>
          <span className="text-xs text-muted-foreground">
            Only receive notifications for direct messages.
          </span>
        </span>
      </Label>
      <Label className="items-start">
        <Radio value="none" />
        <span className="flex flex-col gap-1">
          <span className="font-medium">None</span>
          <span className="text-xs text-muted-foreground">
            Do not receive any notifications.
          </span>
        </span>
      </Label>
    </RadioGroup>
  );
}
```

### Orientation

Change the orientation of the radio group with the `orientation` prop.

```tsx
import { Label } from "@/registry/base/label";
import { Radio, RadioGroup } from "@/registry/base/radio-group";

export default function RadioGroupOrientationDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-sm font-medium">
        How would you rate your experience?
      </div>
      <RadioGroup defaultValue={4} orientation="horizontal">
        {[1, 2, 3, 4, 5].map((item) => (
          <Label key={item}>
            <Radio value={item} /> {item}
          </Label>
        ))}
      </RadioGroup>
    </div>
  );
}
```

### Controlled

Control the selected value with the `value` prop and `onValueChange` callback.

```tsx
"use client";

import { useState } from "react";

import { Label } from "@/registry/base/label";
import { Radio, RadioGroup } from "@/registry/base/radio-group";

export default function RadioGroupControlledDemo() {
  const [value, setValue] = useState("virat");

  return (
    <div className="flex flex-col gap-4">
      <RadioGroup value={value} onValueChange={setValue}>
        <div className="text-sm font-medium">
          Choose your favorite cricket player
        </div>
        <Label>
          <Radio value="virat" /> Virat Kohli
        </Label>
        <Label>
          <Radio value="rohit" /> Rohit Sharma
        </Label>
        <Label>
          <Radio value="sachin" /> Sachin Tendulkar
        </Label>
        <Label>
          <Radio value="dhoni" /> MS Dhoni
        </Label>
      </RadioGroup>

      <span className="px-1 text-sm text-muted-foreground">
        Selected Value: {value}
      </span>
    </div>
  );
}
```

### Custom Layout

```tsx
import { BotIcon, CodeIcon, SparklesIcon } from "lucide-react";

import { Label } from "@/registry/base/label";
import { Radio, RadioGroup } from "@/registry/base/radio-group";

const models = [
  {
    description: "Built for long coding tasks and large project context.",
    icon: CodeIcon,
    name: "OpenAI GPT-5.1 Codex Max",
    value: "openai-gpt-5-1-codex-max",
  },
  {
    description: "A fast daily model for lightweight iteration.",
    icon: SparklesIcon,
    name: "Google Gemini 3 Flash",
    value: "google-gemini-3-flash",
  },
  {
    description: "A balanced option for writing, analysis, and coding.",
    icon: BotIcon,
    name: "Anthropic Claude 4.5 Sonnet",
    value: "anthropic-claude-4-5-sonnet",
  },
];

export default function RadioGroupCustomLayoutDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <div className="flex flex-col">
        <div className="text-lg font-medium">AI Model Selection</div>
        <p className="text-sm text-muted-foreground">
          Choose your preferred AI model
        </p>
      </div>

      <RadioGroup className="w-full" defaultValue={models[0].value}>
        {models.map((model) => {
          const Icon = model.icon;

          return (
            <Label
              className="relative flex cursor-pointer items-center gap-3 rounded-lg border bg-card p-3 shadow-xs transition-[border-color,box-shadow] duration-100 ease-linear has-data-checked:border-primary has-data-checked:ring-1 has-data-checked:ring-primary"
              key={model.value}
            >
              <Icon className="size-5 shrink-0 text-muted-foreground" />
              <span className="flex flex-col gap-1">
                <span className="font-medium">{model.name}</span>
                <span className="text-sm text-muted-foreground">
                  {model.description}
                </span>
              </span>
              <span className="absolute -right-2.5 -top-3 flex items-center justify-center rounded-full bg-card p-0.5">
                <Radio value={model.value} />
              </span>
            </Label>
          );
        })}
      </RadioGroup>
    </div>
  );
}
```

### Disabled

```tsx
import { Label } from "@/registry/base/label";
import { Radio, RadioGroup } from "@/registry/base/radio-group";

export default function RadioGroupDisabledDemo() {
  return (
    <RadioGroup defaultValue="dhoni">
      <div className="text-sm font-medium">
        Choose your favorite cricket player
      </div>
      <Label>
        <Radio value="virat" /> Virat Kohli
      </Label>
      <Label className="text-muted-foreground">
        <Radio disabled value="rohit" /> Rohit Sharma
      </Label>
      <Label className="text-muted-foreground">
        <Radio disabled value="sachin" /> Sachin Tendulkar
      </Label>
      <Label>
        <Radio value="dhoni" /> MS Dhoni
      </Label>
    </RadioGroup>
  );
}
```

### Sizes

```tsx
import { Radio, RadioGroup } from "@/registry/base/radio-group";

export default function RadioGroupSizesDemo() {
  return (
    <div className="flex items-center gap-5">
      <RadioGroup className="contents" defaultValue="sm">
        <Radio aria-label="Small radio" size="sm" value="sm" />
      </RadioGroup>
      <RadioGroup className="contents" defaultValue="default">
        <Radio aria-label="Default radio" size="default" value="default" />
      </RadioGroup>
      <RadioGroup className="contents" defaultValue="lg">
        <Radio aria-label="Large radio" size="lg" value="lg" />
      </RadioGroup>
    </div>
  );
}
```

### Custom Indicator

```tsx
import { CircleIcon, HeartIcon, StarIcon } from "lucide-react";

import {
  RadioGroup,
  RadioIndicator,
  RadioRoot,
} from "@/registry/base/radio-group";

export default function RadioGroupCustomIndicatorDemo() {
  return (
    <RadioGroup defaultValue="star" orientation="horizontal">
      <RadioRoot aria-label="Circle radio" value="circle">
        <RadioIndicator>
          <CircleIcon className="size-3 fill-current" />
        </RadioIndicator>
      </RadioRoot>
      <RadioRoot aria-label="Star radio" value="star">
        <RadioIndicator>
          <StarIcon className="size-3 fill-current" />
        </RadioIndicator>
      </RadioRoot>
      <RadioRoot aria-label="Heart radio" value="heart">
        <RadioIndicator>
          <HeartIcon className="size-3 fill-current" />
        </RadioIndicator>
      </RadioRoot>
    </RadioGroup>
  );
}
```

### Invalid

Submit without choosing a plan to mark the radio group invalid and show one group-level error. Selecting an option clears the error, and later failed submissions replay the shake once.

```tsx
"use client";

import { revalidateLogic, useForm } from "@tanstack/react-form";
import { useId } from "react";

import { Button } from "@/registry/base/button";
import {
  Field,
  FieldError,
  FieldErrorSlot,
  FieldItem,
  FieldLabel,
} from "@/registry/base/field";
import { Fieldset, FieldsetLegend } from "@/registry/base/fieldset";
import { Form } from "@/registry/base/form";
import { Radio, RadioGroup } from "@/registry/base/radio-group";

const plans = [
  { label: "Starter", value: "starter" },
  { label: "Pro", value: "pro" },
  { label: "Business", value: "business" },
] as const;

export default function RadioGroupInvalidDemo() {
  const errorId = useId();
  const form = useForm({
    defaultValues: { plan: "" },
    onSubmit: () => undefined,
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "change",
    }),
  });

  return (
    <Form className="grid w-full max-w-sm gap-3" form={form}>
      <form.Field
        name="plan"
        validators={{
          onDynamic: ({ value }) =>
            plans.some((plan) => plan.value === value)
              ? undefined
              : "Choose a plan to continue.",
        }}
      >
        {(field) => {
          const error = field.state.meta.errors[0];
          const invalid = typeof error === "string";

          return (
            <Field invalid={invalid} name={field.name}>
              <Fieldset className="mb-4">
                <FieldsetLegend>Choose a plan</FieldsetLegend>
                <RadioGroup
                  aria-describedby={invalid ? errorId : undefined}
                  aria-invalid={invalid || undefined}
                  name={field.name}
                  onValueChange={(value) => field.handleChange(value)}
                  required
                  value={field.state.value}
                >
                  {plans.map((plan) => (
                    <FieldItem key={plan.value}>
                      <FieldLabel className="cursor-pointer">
                        <Radio value={plan.value} />
                        {plan.label}
                      </FieldLabel>
                    </FieldItem>
                  ))}
                </RadioGroup>
              </Fieldset>
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
```

## API Reference

`RadioGroup`, `Radio`, and the composable radio parts wrap [Base UI Radio Group primitives](https://base-ui.com/react/components/radio-group). Supported Base UI props pass through.

### Props

#### Radio and RadioRoot

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `size` | `"sm" \| "default" \| "lg"` | `default` | Sets the radio control size. |
