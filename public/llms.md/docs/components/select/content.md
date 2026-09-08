# Select

A form control for choosing one or more values from a popup list.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Select` to choose one or more values from a popup list.

## Preview

```tsx
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import {
  Select,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectList,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/base/select";

const languages = [
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
  { label: "C#", value: "csharp" },
  { label: "PHP", value: "php" },
  { label: "C++", value: "cpp" },
  { label: "Rust", value: "rust" },
  { label: "Go", value: "go" },
  { label: "Swift", value: "swift" },
];

export default function SelectDefaultDemo() {
  return (
    <Select items={languages}>
      <SelectTrigger className="min-w-46" aria-label="Select a language">
        <SelectValue placeholder="Select a language" />
        <SelectIcon>
          <ChevronsUpDownIcon className="size-3.5" />
        </SelectIcon>
      </SelectTrigger>
      <SelectPopup>
        <SelectList>
          {languages.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              <SelectItemText>{label}</SelectItemText>
              <SelectItemIndicator>
                <CheckIcon className="size-3" />
              </SelectItemIndicator>
            </SelectItem>
          ))}
        </SelectList>
      </SelectPopup>
    </Select>
  );
}
```

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/select.json
```

## Usage

```tsx
import {
  Select,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectList,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
```

```tsx
const items = [
  { label: "Next.js", value: "next" },
  { label: "Vite", value: "vite" },
  { label: "Astro", value: "astro" },
];

<Select items={items}>
  <SelectTrigger>
    <SelectValue placeholder="Select a framework" />
    <SelectIcon />
  </SelectTrigger>
  <SelectPopup>
    <SelectList>
      {items.map((item) => (
        <SelectItem key={item.value} value={item.value}>
          <SelectItemText>{item.label}</SelectItemText>
          <SelectItemIndicator />
        </SelectItem>
      ))}
    </SelectList>
  </SelectPopup>
</Select>;
```

Pass `items` to `Select` when `SelectValue` should resolve a selected value to its label. Without `items`, the value renders as-is. For a searchable list, use a combobox instead.

## Composition

```tsx
import {
  Select,
  SelectGroup,
  SelectGroupLabel,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectList,
  SelectPopup,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

<Select>
  <SelectTrigger>
    <SelectValue />
    <SelectIcon />
  </SelectTrigger>
  <SelectPopup>
    <SelectList>
      <SelectGroup>
        <SelectGroupLabel />
        <SelectItem>
          <SelectItemText />
          <SelectItemIndicator />
        </SelectItem>
      </SelectGroup>
      <SelectSeparator />
    </SelectList>
  </SelectPopup>
</Select>;
```

## Examples

### Basic

Use `alignItemWithTrigger` when the selected item should align with the trigger value while the popup is open.

```tsx
import { CheckIcon, ChevronDownIcon, ChevronsUpDownIcon } from "lucide-react";

import {
  Select,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectList,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/base/select";

const food = [
  { value: "pizza", label: "Pizza 🍕" },
  { value: "burger", label: "Burger 🍔" },
  { value: "ramen", label: "Ramen 🍜" },
];

const fonts = [
  { label: "Sans-serif", value: "sans" },
  { label: "Serif", value: "serif" },
  { label: "Monospace", value: "mono" },
  { label: "Cursive", value: "cursive" },
];

export default function SelectBasicDemo() {
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <Select items={food}>
        <SelectTrigger aria-label="Select a food">
          <SelectValue placeholder="Select a food" />
          <SelectIcon>
            <ChevronDownIcon className="size-4" />
          </SelectIcon>
        </SelectTrigger>
        <SelectPopup alignItemWithTrigger>
          <SelectList>
            {food.map(({ label, value }) => (
              <SelectItem key={value} value={value}>
                <SelectItemText>{label}</SelectItemText>
                <SelectItemIndicator>
                  <CheckIcon className="size-3" />
                </SelectItemIndicator>
              </SelectItem>
            ))}
          </SelectList>
        </SelectPopup>
      </Select>

      <Select items={fonts}>
        <SelectTrigger aria-label="Select a font">
          <SelectValue placeholder="Select a font" />
          <SelectIcon>
            <ChevronsUpDownIcon className="size-4" />
          </SelectIcon>
        </SelectTrigger>
        <SelectPopup>
          <SelectList>
            {fonts.map(({ label, value }) => (
              <SelectItem key={value} value={value}>
                <SelectItemText>{label}</SelectItemText>
                <SelectItemIndicator>
                  <CheckIcon className="size-3" />
                </SelectItemIndicator>
              </SelectItem>
            ))}
          </SelectList>
        </SelectPopup>
      </Select>
    </div>
  );
}
```

### Country

Items can include rich content such as icons or images.

```tsx
import { CheckIcon, PlusIcon } from "lucide-react";

import {
  Select,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectList,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/base/select";

const countries = [
  {
    label: "Argentina",
    value: "argentina",
    flag: "https://flagcdn.com/ar.svg",
  },
  {
    label: "Venezuela",
    value: "venezuela",
    flag: "https://flagcdn.com/ve.svg",
  },
  { label: "Brazil", value: "brazil", flag: "https://flagcdn.com/br.svg" },
  {
    label: "Switzerland",
    value: "switzerland",
    flag: "https://flagcdn.com/ch.svg",
  },
  { label: "Germany", value: "germany", flag: "https://flagcdn.com/de.svg" },
  { label: "Spain", value: "spain", flag: "https://flagcdn.com/es.svg" },
  { label: "France", value: "france", flag: "https://flagcdn.com/fr.svg" },
  { label: "Italy", value: "italy", flag: "https://flagcdn.com/it.svg" },
  { label: "Mexico", value: "mexico", flag: "https://flagcdn.com/mx.svg" },
];

export default function SelectCountryDemo() {
  return (
    <Select items={countries}>
      <SelectTrigger className="min-w-46" aria-label="Select a country">
        <SelectValue placeholder="Select a country" />
        <SelectIcon>
          <PlusIcon className="size-4" />
        </SelectIcon>
      </SelectTrigger>
      <SelectPopup>
        <SelectList>
          {countries.map(({ label, value, flag }) => (
            <SelectItem key={value} value={value} className="h-fit">
              <img
                src={flag}
                alt=""
                className="size-5.5 rounded-full object-cover"
              />
              <SelectItemText>{label}</SelectItemText>
              <SelectItemIndicator>
                <CheckIcon className="size-3" />
              </SelectItemIndicator>
            </SelectItem>
          ))}
        </SelectList>
      </SelectPopup>
    </Select>
  );
}
```

### Formatting Values

Providing `items` lets `SelectValue` display the matching label instead of the raw value.

```tsx
import { CheckIcon, PlusIcon } from "lucide-react";

import {
  Select,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectList,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/base/select";

const themes = [
  { value: "system", label: "System default" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

function ThemeSelect({ useItems }: { useItems: boolean }) {
  return (
    <Select {...(useItems ? { items: themes } : {})}>
      <SelectTrigger className="min-w-46" aria-label="Select a theme">
        <SelectValue placeholder="Select a theme" />
        <SelectIcon>
          <PlusIcon className="size-4" />
        </SelectIcon>
      </SelectTrigger>
      <SelectPopup>
        <SelectList>
          {themes.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              <SelectItemText>{label}</SelectItemText>
              <SelectItemIndicator>
                <CheckIcon className="size-3" />
              </SelectItemIndicator>
            </SelectItem>
          ))}
        </SelectList>
      </SelectPopup>
    </Select>
  );
}

export default function SelectFormattingValueDemo() {
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="flex flex-col gap-2">
        <p className="text-sm">Raw value</p>
        <ThemeSelect useItems={false} />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm">Formatted value</p>
        <ThemeSelect useItems />
      </div>
    </div>
  );
}
```

Pass a function child to `SelectValue` when the trigger needs custom content.

```tsx
import { CheckIcon, PlusIcon } from "lucide-react";

import {
  Select,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectList,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/base/select";

const countries = [
  {
    label: "Argentina",
    value: "argentina",
    flag: "https://flagcdn.com/ar.svg",
  },
  {
    label: "Venezuela",
    value: "venezuela",
    flag: "https://flagcdn.com/ve.svg",
  },
  { label: "Brazil", value: "brazil", flag: "https://flagcdn.com/br.svg" },
  {
    label: "Switzerland",
    value: "switzerland",
    flag: "https://flagcdn.com/ch.svg",
  },
  { label: "Germany", value: "germany", flag: "https://flagcdn.com/de.svg" },
  { label: "Spain", value: "spain", flag: "https://flagcdn.com/es.svg" },
  { label: "France", value: "france", flag: "https://flagcdn.com/fr.svg" },
  { label: "Italy", value: "italy", flag: "https://flagcdn.com/it.svg" },
  { label: "Mexico", value: "mexico", flag: "https://flagcdn.com/mx.svg" },
];

export default function SelectFormattingCountryDemo() {
  return (
    <Select items={countries}>
      <SelectTrigger className="min-w-56" aria-label="Select a country">
        <SelectValue placeholder="Select a country">
          {(value: string) => {
            const country = countries.find((item) => item.value === value);

            if (!country) return null;

            return (
              <span className="flex items-center gap-2">
                <img
                  src={country.flag}
                  alt=""
                  className="size-5.5 rounded-full object-cover"
                />
                {country.label}
              </span>
            );
          }}
        </SelectValue>
        <SelectIcon>
          <PlusIcon className="size-4" />
        </SelectIcon>
      </SelectTrigger>
      <SelectPopup>
        <SelectList>
          {countries.map(({ label, value, flag }) => (
            <SelectItem key={value} value={value} className="h-fit">
              <img
                src={flag}
                alt=""
                className="size-5.5 rounded-full object-cover"
              />
              <SelectItemText>{label}</SelectItemText>
              <SelectItemIndicator>
                <CheckIcon className="size-3" />
              </SelectItemIndicator>
            </SelectItem>
          ))}
        </SelectList>
      </SelectPopup>
    </Select>
  );
}
```

### Object Values

Items can use objects as values. Set `itemToStringValue` so forms and hidden inputs receive a stable string.

```tsx
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import {
  Select,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectList,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/base/select";

interface ShippingMethod {
  id: string;
  name: string;
  duration: string;
  price: string;
}

const shippingMethods: ShippingMethod[] = [
  {
    id: "standard",
    name: "Standard",
    duration: "Delivers in 4-6 business days",
    price: "$4.99",
  },
  {
    id: "express",
    name: "Express",
    duration: "Delivers in 2-3 business days",
    price: "$9.99",
  },
  {
    id: "overnight",
    name: "Overnight",
    duration: "Delivers next business day",
    price: "$19.99",
  },
];

function ShippingMethodContent({ method }: { method: ShippingMethod }) {
  return (
    <span className="flex flex-col items-start gap-0.5">
      <span className="text-sm leading-6">{method.name}</span>
      <span className="text-xs leading-4 text-muted-foreground">
        {method.duration} ({method.price})
      </span>
    </span>
  );
}

export default function SelectObjectValuesDemo() {
  return (
    <Select
      defaultValue={shippingMethods[0]}
      itemToStringValue={(item: unknown) => (item as ShippingMethod).id}
    >
      <SelectTrigger
        className="h-fit min-w-46"
        aria-label="Select a shipping method"
      >
        <SelectValue placeholder="Select a shipping method">
          {(method: ShippingMethod) => (
            <ShippingMethodContent method={method} />
          )}
        </SelectValue>
        <SelectIcon className="flex items-center self-center">
          <ChevronsUpDownIcon className="size-3.5" />
        </SelectIcon>
      </SelectTrigger>
      <SelectPopup alignItemWithTrigger>
        <SelectList>
          {shippingMethods.map((method) => (
            <SelectItem key={method.id} value={method} className="h-fit">
              <SelectItemText className="flex flex-col items-start gap-0.5">
                <span className="text-sm leading-6">{method.name}</span>
                <span className="text-xs leading-4 text-muted-foreground">
                  {method.duration} ({method.price})
                </span>
              </SelectItemText>
              <SelectItemIndicator>
                <CheckIcon className="size-3" />
              </SelectItemIndicator>
            </SelectItem>
          ))}
        </SelectList>
      </SelectPopup>
    </Select>
  );
}
```

### Multiple Selection

Set `multiple` to work with an array of selected values.

```tsx
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import {
  Select,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectList,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/base/select";

const languages = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  python: "Python",
  java: "Java",
  csharp: "C#",
  php: "PHP",
  cpp: "C++",
  rust: "Rust",
  go: "Go",
  swift: "Swift",
};

type Language = keyof typeof languages;

const values = Object.keys(languages) as Language[];

function renderValue(value: Language[]) {
  if (value.length === 0) {
    return "Select languages...";
  }

  const firstLanguage = languages[value[0]];
  const additionalLanguages =
    value.length > 1 ? ` (+${value.length - 1} more)` : "";
  return firstLanguage + additionalLanguages;
}

export default function SelectMultipleSelectionDemo() {
  return (
    <Select multiple defaultValue={["javascript", "typescript"]}>
      <SelectTrigger
        className="h-fit min-w-66"
        aria-label="Select programming languages"
      >
        <SelectValue>{renderValue}</SelectValue>
        <SelectIcon className="flex items-center self-center">
          <ChevronsUpDownIcon className="size-3.5" />
        </SelectIcon>
      </SelectTrigger>
      <SelectPopup>
        <SelectList>
          {values.map((value) => (
            <SelectItem key={value} value={value}>
              <SelectItemText className="flex flex-col items-start gap-0.5">
                <span className="text-sm leading-6">{languages[value]}</span>
              </SelectItemText>
              <SelectItemIndicator>
                <CheckIcon className="size-3" />
              </SelectItemIndicator>
            </SelectItem>
          ))}
        </SelectList>
      </SelectPopup>
    </Select>
  );
}
```

### Invalid

Submit without choosing a framework to mark the select trigger invalid. Selecting a permitted value clears the error immediately, while shaking remains tied to failed submissions.

```tsx
"use client";

import { revalidateLogic, useForm } from "@tanstack/react-form";
import { ChevronsUpDownIcon } from "lucide-react";
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
                  <SelectIcon className="flex items-center self-center">
                    <ChevronsUpDownIcon className="size-3.5" />
                  </SelectIcon>
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
```

### Groups

Use `SelectGroup`, `SelectGroupLabel`, and `SelectSeparator` to organize related options.

```tsx
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { Fragment } from "react";

import {
  Select,
  SelectGroup,
  SelectGroupLabel,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectList,
  SelectPopup,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/registry/base/select";

const groupedItems = [
  {
    value: "Fruits",
    items: [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana" },
      { value: "mango", label: "Mango" },
      { value: "kiwi", label: "Kiwi" },
    ],
  },
  {
    value: "Vegetables",
    items: [
      { value: "broccoli", label: "Broccoli" },
      { value: "carrot", label: "Carrot" },
      { value: "cucumber", label: "Cucumber" },
      { value: "spinach", label: "Spinach" },
    ],
  },
];

export default function SelectGroupsDemo() {
  return (
    <Select items={groupedItems}>
      <SelectTrigger className="min-w-46" aria-label="Select produce">
        <SelectValue placeholder="Select produce" />
        <SelectIcon>
          <ChevronsUpDownIcon className="size-3.5" />
        </SelectIcon>
      </SelectTrigger>
      <SelectPopup>
        <SelectList>
          {groupedItems.map((group, index) => (
            <Fragment key={group.value}>
              <SelectGroup>
                <SelectGroupLabel className="px-2 py-1.5 text-xs text-muted-foreground">
                  {group.value}
                </SelectGroupLabel>
                {group.items.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>
                    <SelectItemText>{label}</SelectItemText>
                    <SelectItemIndicator>
                      <CheckIcon className="size-3" />
                    </SelectItemIndicator>
                  </SelectItem>
                ))}
              </SelectGroup>
              {index < groupedItems.length - 1 && <SelectSeparator />}
            </Fragment>
          ))}
        </SelectList>
      </SelectPopup>
    </Select>
  );
}
```

### Disabled

Disable the entire control or individual items with the `disabled` prop.

```tsx
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import {
  Select,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectList,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/base/select";

const options = [
  { label: "Available", value: "available" },
  { label: "Temporarily unavailable", value: "unavailable", disabled: true },
  { label: "Coming soon", value: "soon", disabled: true },
];

export default function SelectDisabledDemo() {
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <Select items={options} disabled>
        <SelectTrigger className="min-w-52" aria-label="Disabled select">
          <SelectValue placeholder="Disabled select" />
          <SelectIcon>
            <ChevronsUpDownIcon className="size-3.5" />
          </SelectIcon>
        </SelectTrigger>
        <SelectPopup>
          <SelectList>
            {options.map(({ label, value }) => (
              <SelectItem key={value} value={value}>
                <SelectItemText>{label}</SelectItemText>
              </SelectItem>
            ))}
          </SelectList>
        </SelectPopup>
      </Select>

      <Select items={options} defaultValue="available">
        <SelectTrigger className="min-w-52" aria-label="Select availability">
          <SelectValue placeholder="Select availability" />
          <SelectIcon>
            <ChevronsUpDownIcon className="size-3.5" />
          </SelectIcon>
        </SelectTrigger>
        <SelectPopup>
          <SelectList>
            {options.map(({ label, value, disabled }) => (
              <SelectItem key={value} value={value} disabled={disabled}>
                <SelectItemText>{label}</SelectItemText>
                <SelectItemIndicator>
                  <CheckIcon className="size-3" />
                </SelectItemIndicator>
              </SelectItem>
            ))}
          </SelectList>
        </SelectPopup>
      </Select>
    </div>
  );
}
```

### Controlled

Control the selection with `value` and `onValueChange` when application state owns the current value.

```tsx
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { useState } from "react";

import {
  Select,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
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
];

export default function SelectControlledDemo() {
  const [value, setValue] = useState<string | null>("next");

  return (
    <div className="flex flex-col gap-3">
      <Select
        items={frameworks}
        value={value}
        onValueChange={(nextValue) => setValue(nextValue as string | null)}
      >
        <SelectTrigger className="min-w-46" aria-label="Select a framework">
          <SelectValue placeholder="Select a framework" />
          <SelectIcon>
            <ChevronsUpDownIcon className="size-3.5" />
          </SelectIcon>
        </SelectTrigger>
        <SelectPopup>
          <SelectList>
            {frameworks.map(({ label, value: optionValue }) => (
              <SelectItem key={optionValue} value={optionValue}>
                <SelectItemText>{label}</SelectItemText>
                <SelectItemIndicator>
                  <CheckIcon className="size-3" />
                </SelectItemIndicator>
              </SelectItem>
            ))}
          </SelectList>
        </SelectPopup>
      </Select>
      <output className="text-sm text-muted-foreground" aria-live="polite">
        Current value: {value ?? "none"}
      </output>
    </div>
  );
}
```

## Popup Animation

Set `animationPreset` on `SelectPopup`. This gallery uses each preset's exact prop value as its trigger label. Set `reduceMotion` to disable popup animation.

```tsx
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import type { ComponentProps } from "react";

import {
  Select,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectList,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/base/select";

const presets = [
  "scale",
  "fade",
  "slideOutside",
  "slideInside",
  "motion",
  "motionBlur",
] as const satisfies readonly NonNullable<
  ComponentProps<typeof SelectPopup>["animationPreset"]
>[];

const options = [
  { label: "Sans-serif", value: "sans" },
  { label: "Serif", value: "serif" },
  { label: "Monospace", value: "mono" },
];

type AnimationPreset = (typeof presets)[number];

function AnimationSelect({
  animationPreset,
}: {
  animationPreset: AnimationPreset;
}) {
  return (
    <Select items={options}>
      <SelectTrigger
        className="w-32 min-w-0 justify-self-center sm:w-full sm:min-w-36 sm:justify-self-auto"
        aria-label={`${animationPreset} animation`}
      >
        <SelectValue className="min-w-0" placeholder={animationPreset} />
        <SelectIcon>
          <ChevronsUpDownIcon className="size-3.5" />
        </SelectIcon>
      </SelectTrigger>
      <SelectPopup animationPreset={animationPreset}>
        <SelectList>
          {options.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              <SelectItemText>{label}</SelectItemText>
              <SelectItemIndicator>
                <CheckIcon className="size-3" />
              </SelectItemIndicator>
            </SelectItem>
          ))}
        </SelectList>
      </SelectPopup>
    </Select>
  );
}

export default function SelectAnimationDemo() {
  return (
    <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3">
      {presets.map((preset) => (
        <AnimationSelect key={preset} animationPreset={preset} />
      ))}
    </div>
  );
}
```

## API Reference

`Select` and its parts wrap the corresponding [Base UI Select primitives](https://base-ui.com/react/components/select). Supported Base UI props pass through.

### Props

#### Select

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `backdrop` | `"transparent" \| "opaque" \| "blur"` | `transparent` | Sets the backdrop rendered while the popup is open. |

#### SelectPopup

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `animationPreset` | `"none" \| "scale" \| "fade" \| "slideOutside" \| "slideInside" \| "motion" \| "motionBlur"` | `scale` | Sets the popup enter and exit animation. |
| `reduceMotion` | `boolean` | `false` | Disables the popup animation. |
| `portalContainer` | `HTMLElement \| ShadowRoot \| React.RefObject<HTMLElement \| ShadowRoot \| null> \| null` | `-` | Mounts the popup inside a specific container. Use this when nesting a Select in an overlay from another primitive library so its focus and outside-click handling include the popup. |
