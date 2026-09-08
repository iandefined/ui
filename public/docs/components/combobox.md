# Combobox

A filterable input for selecting one or more predefined values.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Combobox` when users choose from a list and need to filter it first.

## Preview

```tsx
import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
} from "@/registry/base/combobox";

const users = [
  { id: "u1", label: "Alice Johnson", email: "alice@example.com" },
  { id: "u2", label: "Bob Lee", email: "bob@example.com" },
  { id: "u3", label: "Cathy Kim", email: "cathy@example.com" },
  { id: "u4", label: "David Smith", email: "david@example.com" },
  { id: "u5", label: "Emily Davis", email: "emily@example.com" },
  { id: "u6", label: "Frank Miller", email: "frank@example.com" },
  { id: "u7", label: "Grace Lee", email: "grace@example.com" },
  { id: "u8", label: "Henry Walker", email: "henry@example.com" },
];

type User = (typeof users)[number];

export default function ComboboxDefaultDemo() {
  return (
    <Combobox items={users}>
      <div className="w-full max-w-xs">
        <ComboboxInput
          aria-label="Select a user"
          placeholder="Select a user..."
        />
      </div>
      <ComboboxPopup>
        <ComboboxEmpty>No users found.</ComboboxEmpty>
        <ComboboxList>
          {(user: User) => (
            <ComboboxItem key={user.id} value={user}>
              <div className="font-medium">{user.label}</div>
              <div className="truncate text-xs text-muted-foreground">
                {user.email}
              </div>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>
  );
}
```

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/combobox.json
```

## Usage

```tsx
import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
} from "@/components/ui/combobox";

const fruits = ["Apple", "Banana", "Orange"];

<Combobox items={fruits}>
  <ComboboxInput aria-label="Select a fruit" placeholder="Select a fruit..." />
  <ComboboxPopup>
    <ComboboxEmpty>No fruits found.</ComboboxEmpty>
    <ComboboxList>
      {(fruit: string) => (
        <ComboboxItem key={fruit} value={fruit}>
          {fruit}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxPopup>
</Combobox>;
```

## Composition

Use `ComboboxChips`, `ComboboxValue`, and `ComboboxChip` for multiple selection; keep `ComboboxInput` inside the chips container.

```tsx
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxValue,
} from "@/components/ui/combobox";

<Combobox multiple>
  <ComboboxChips>
    <ComboboxValue>
      <ComboboxChip>Selected value</ComboboxChip>
      <ComboboxInput />
    </ComboboxValue>
  </ComboboxChips>
  <ComboboxPopup>
    <ComboboxList>
      <ComboboxItem value="option">Option</ComboboxItem>
    </ComboboxList>
  </ComboboxPopup>
</Combobox>;
```

## Examples

### Basic

Filter primitive values.

```tsx
import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
} from "@/registry/base/combobox";

const fruits = [
  "Apple",
  "Banana",
  "Blackberry",
  "Blueberry",
  "Cherry",
  "Grape",
  "Mango",
  "Orange",
  "Peach",
  "Pear",
  "Pineapple",
  "Raspberry",
  "Strawberry",
];

export default function ComboboxBasicDemo() {
  return (
    <Combobox autoHighlight items={fruits}>
      <div className="w-full max-w-xs">
        <ComboboxInput
          aria-label="Select a fruit"
          placeholder="Select a fruit..."
        />
      </div>
      <ComboboxPopup>
        <ComboboxEmpty>No fruits found.</ComboboxEmpty>
        <ComboboxList>
          {(fruit: string) => (
            <ComboboxItem key={fruit} value={fruit}>
              {fruit}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>
  );
}
```

### Controlled Object Value

Control object selections with `value` and `onValueChange`.

```tsx
"use client";

import { useState } from "react";

import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
} from "@/registry/base/combobox";

const users = [
  { id: "u1", name: "Alice Johnson", email: "alice@example.com" },
  { id: "u2", name: "Bob Lee", email: "bob@example.com" },
  { id: "u3", name: "Cathy Kim", email: "cathy@example.com" },
  { id: "u4", name: "David Smith", email: "david@example.com" },
];

type User = (typeof users)[number];

export default function ComboboxControlledDemo() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <div className="grid w-full max-w-xs gap-4">
      <Combobox
        items={users}
        itemToStringLabel={(user: User) => user.name}
        onValueChange={setSelectedUser}
        value={selectedUser}
      >
        <ComboboxInput
          aria-label="Select a user"
          placeholder="Select a user..."
        />
        <ComboboxPopup>
          <ComboboxEmpty>No users found.</ComboboxEmpty>
          <ComboboxList>
            {(user: User) => (
              <ComboboxItem key={user.id} value={user}>
                <div className="font-medium">{user.name}</div>
                <div className="truncate text-xs text-muted-foreground">
                  {user.email}
                </div>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxPopup>
      </Combobox>
      <p className="text-sm text-muted-foreground">
        Selected: {selectedUser?.name ?? "None"}
      </p>
    </div>
  );
}
```

### With Label

Associate a visible label with the input.

```tsx
import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxPopup,
} from "@/registry/base/combobox";

const frameworks = ["Astro", "Next.js", "Nuxt", "Remix", "SvelteKit", "Vite"];

export default function ComboboxWithLabelDemo() {
  return (
    <Combobox items={frameworks}>
      <div className="grid w-full max-w-xs gap-2">
        <ComboboxLabel htmlFor="framework">Framework</ComboboxLabel>
        <ComboboxInput id="framework" placeholder="Select a framework..." />
      </div>
      <ComboboxPopup>
        <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
        <ComboboxList>
          {(framework: string) => (
            <ComboboxItem key={framework} value={framework}>
              {framework}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>
  );
}
```

### Multiple Selection

Render selected values as removable chips.

```tsx
"use client";

import { useState } from "react";

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxValue,
} from "@/registry/base/combobox";

const languages = [
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "Python", value: "python" },
  { label: "Rust", value: "rust" },
  { label: "Go", value: "go" },
  { label: "Swift", value: "swift" },
];

type Language = (typeof languages)[number];

export default function ComboboxMultipleSelectionDemo() {
  const [selected, setSelected] = useState<Language[]>([
    languages[0],
    languages[1],
    languages[2],
    languages[3],
  ]);

  return (
    <div className="grid w-full max-w-sm gap-4">
      <Combobox
        items={languages}
        multiple
        onValueChange={setSelected}
        value={selected}
      >
        <ComboboxChips>
          <ComboboxValue>
            {(value: Language[]) => (
              <>
                {value.map((language) => (
                  <ComboboxChip key={language.value}>
                    {language.label}
                  </ComboboxChip>
                ))}
                <ComboboxInput
                  aria-label="Select programming languages"
                  placeholder={value.length === 0 ? "Select languages..." : ""}
                />
              </>
            )}
          </ComboboxValue>
        </ComboboxChips>
        <ComboboxPopup>
          <ComboboxEmpty>No languages found.</ComboboxEmpty>
          <ComboboxList>
            {(language: Language) => (
              <ComboboxItem key={language.value} value={language}>
                {language.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxPopup>
      </Combobox>
      <p className="text-sm text-muted-foreground">
        {selected.length === 0
          ? "No languages selected"
          : `${selected.length} selected`}
      </p>
    </div>
  );
}
```

### Input Inside Popup

Move filtering into the popup when the trigger is the form control.

```tsx
import { Button } from "@/registry/base/button";
import {
  ChevronsUpDownIcon,
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxTrigger,
  ComboboxValue,
} from "@/registry/base/combobox";

const countries = [
  { code: "au", label: "Australia" },
  { code: "br", label: "Brazil" },
  { code: "ca", label: "Canada" },
  { code: "de", label: "Germany" },
  { code: "jp", label: "Japan" },
  { code: "mx", label: "Mexico" },
  { code: "gb", label: "United Kingdom" },
  { code: "us", label: "United States" },
];

type Country = (typeof countries)[number];

export default function ComboboxInputInsidePopupDemo() {
  return (
    <Combobox items={countries}>
      <ComboboxTrigger
        render={
          <Button
            className="w-full max-w-xs justify-between font-normal active:scale-100"
            variant="outline"
          />
        }
      >
        <ComboboxValue>
          {(country: Country | null) => country?.label ?? "Select a country..."}
        </ComboboxValue>
        <ChevronsUpDownIcon className="-me-1 ms-auto shrink-0 text-muted-foreground" />
      </ComboboxTrigger>
      <ComboboxPopup aria-label="Select a country" sideOffset={8}>
        <div className="border-b p-2">
          <ComboboxInput
            aria-label="Search countries"
            placeholder="Select a country..."
            showTrigger={false}
          />
        </div>
        <ComboboxEmpty>No countries found.</ComboboxEmpty>
        <ComboboxList>
          {(country: Country) => (
            <ComboboxItem key={country.code} value={country}>
              {country.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>
  );
}
```

### Clearable Combobox

Replace the toggle with a clear action after selection.

```tsx
import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
} from "@/registry/base/combobox";

const users = [
  { id: "u1", label: "Alice Johnson", value: "alice@example.com" },
  { id: "u2", label: "Bob Lee", value: "bob@example.com" },
  { id: "u3", label: "Cathy Kim", value: "cathy@example.com" },
  { id: "u4", label: "David Smith", value: "david@example.com" },
  { id: "u5", label: "Emily Davis", value: "emily@example.com" },
  { id: "u6", label: "Frank Miller", value: "frank@example.com" },
  { id: "u7", label: "Grace Lee", value: "grace@example.com" },
  { id: "u8", label: "Henry Walker", value: "henry@example.com" },
];

type User = (typeof users)[number];

export default function ComboboxClearableDemo() {
  return (
    <Combobox items={users}>
      <div className="w-full max-w-xs">
        <ComboboxInput
          aria-label="Select a user"
          isClearable
          placeholder="Select a user..."
        />
      </div>
      <ComboboxPopup>
        <ComboboxEmpty>No users found.</ComboboxEmpty>
        <ComboboxList>
          {(user: User) => (
            <ComboboxItem key={user.id} value={user}>
              <div>
                <div className="font-medium">{user.label}</div>
                <div className="text-xs text-muted-foreground">
                  {user.value}
                </div>
              </div>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>
  );
}
```

### Groups

Organize option families in collections.

```tsx
"use client";

import { Fragment, useState } from "react";

import {
  Combobox,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxSeparator,
} from "@/registry/base/combobox";

type ColorFamily =
  | "Gray"
  | "Red"
  | "Blue"
  | "Green"
  | "Purple"
  | "Amber"
  | "Pink"
  | "Teal";

type ColorShade = {
  family: ColorFamily;
  hex: string;
  id: string;
  name: string;
  rgb: string;
  shade: string;
};

type ColorGroup = {
  items: ColorShade[];
  value: ColorFamily;
};

const colorsData: ColorShade[] = [
  {
    family: "Gray",
    id: "gray-100",
    name: "Gray 100",
    shade: "100",
    hex: "#f4f4f5",
    rgb: "244, 244, 245",
  },
  {
    family: "Gray",
    id: "gray-500",
    name: "Gray 500",
    shade: "500",
    hex: "#71717a",
    rgb: "113, 113, 122",
  },
  {
    family: "Gray",
    id: "gray-900",
    name: "Gray 900",
    shade: "900",
    hex: "#18181b",
    rgb: "24, 24, 27",
  },
  {
    family: "Red",
    id: "red-100",
    name: "Red 100",
    shade: "100",
    hex: "#fee2e2",
    rgb: "254, 226, 226",
  },
  {
    family: "Red",
    id: "red-500",
    name: "Red 500",
    shade: "500",
    hex: "#ef4444",
    rgb: "239, 68, 68",
  },
  {
    family: "Red",
    id: "red-900",
    name: "Red 900",
    shade: "900",
    hex: "#7f1d1d",
    rgb: "127, 29, 29",
  },
  {
    family: "Blue",
    id: "blue-100",
    name: "Blue 100",
    shade: "100",
    hex: "#dbeafe",
    rgb: "219, 234, 254",
  },
  {
    family: "Blue",
    id: "blue-500",
    name: "Blue 500",
    shade: "500",
    hex: "#3b82f6",
    rgb: "59, 130, 246",
  },
  {
    family: "Blue",
    id: "blue-900",
    name: "Blue 900",
    shade: "900",
    hex: "#1e3a8a",
    rgb: "30, 58, 138",
  },
  {
    family: "Green",
    id: "green-100",
    name: "Green 100",
    shade: "100",
    hex: "#dcfce7",
    rgb: "220, 252, 231",
  },
  {
    family: "Green",
    id: "green-500",
    name: "Green 500",
    shade: "500",
    hex: "#22c55e",
    rgb: "34, 197, 94",
  },
  {
    family: "Green",
    id: "green-900",
    name: "Green 900",
    shade: "900",
    hex: "#14532d",
    rgb: "20, 83, 45",
  },
  {
    family: "Purple",
    id: "purple-100",
    name: "Purple 100",
    shade: "100",
    hex: "#f3e8ff",
    rgb: "243, 232, 255",
  },
  {
    family: "Purple",
    id: "purple-500",
    name: "Purple 500",
    shade: "500",
    hex: "#a855f7",
    rgb: "168, 85, 247",
  },
  {
    family: "Purple",
    id: "purple-900",
    name: "Purple 900",
    shade: "900",
    hex: "#581c87",
    rgb: "88, 28, 135",
  },
  {
    family: "Amber",
    id: "amber-100",
    name: "Amber 100",
    shade: "100",
    hex: "#fef3c7",
    rgb: "254, 243, 199",
  },
  {
    family: "Amber",
    id: "amber-500",
    name: "Amber 500",
    shade: "500",
    hex: "#f59e0b",
    rgb: "245, 158, 11",
  },
  {
    family: "Amber",
    id: "amber-900",
    name: "Amber 900",
    shade: "900",
    hex: "#78350f",
    rgb: "120, 53, 15",
  },
  {
    family: "Pink",
    id: "pink-100",
    name: "Pink 100",
    shade: "100",
    hex: "#fce7f3",
    rgb: "252, 231, 243",
  },
  {
    family: "Pink",
    id: "pink-500",
    name: "Pink 500",
    shade: "500",
    hex: "#ec4899",
    rgb: "236, 72, 153",
  },
  {
    family: "Pink",
    id: "pink-900",
    name: "Pink 900",
    shade: "900",
    hex: "#831843",
    rgb: "131, 24, 67",
  },
  {
    family: "Teal",
    id: "teal-100",
    name: "Teal 100",
    shade: "100",
    hex: "#ccfbf1",
    rgb: "204, 251, 241",
  },
  {
    family: "Teal",
    id: "teal-500",
    name: "Teal 500",
    shade: "500",
    hex: "#14b8a6",
    rgb: "20, 184, 166",
  },
  {
    family: "Teal",
    id: "teal-900",
    name: "Teal 900",
    shade: "900",
    hex: "#134e4a",
    rgb: "19, 78, 74",
  },
];

const familyOrder: ColorFamily[] = [
  "Gray",
  "Red",
  "Blue",
  "Green",
  "Purple",
  "Amber",
  "Pink",
  "Teal",
];

const groupedColors: ColorGroup[] = familyOrder.map((value) => ({
  items: colorsData.filter((color) => color.family === value),
  value,
}));

export default function ComboboxGroupsDemo() {
  const [selectedColor, setSelectedColor] = useState<ColorShade | null>(null);

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Combobox
        itemToStringLabel={(color: ColorShade) => color.name}
        items={groupedColors}
        onValueChange={(color: ColorShade | null) => setSelectedColor(color)}
        value={selectedColor}
      >
        <ComboboxInput
          aria-label="Search colors"
          className="w-full"
          placeholder="Search color palette..."
        />
        <ComboboxPopup>
          <ComboboxEmpty>No colors found.</ComboboxEmpty>
          <ComboboxList>
            {(group: ColorGroup) => (
              <Fragment key={group.value}>
                <ComboboxGroup items={group.items}>
                  <ComboboxGroupLabel>{group.value}</ComboboxGroupLabel>
                  <ComboboxCollection>
                    {(color: ColorShade) => (
                      <ComboboxItem key={color.id} value={color}>
                        <div className="flex w-full items-center justify-between gap-3">
                          <div className="flex min-w-0 flex-1 items-center gap-3">
                            <div
                              aria-hidden="true"
                              className="size-6 shrink-0 rounded border shadow-sm"
                              style={{ backgroundColor: color.hex }}
                            />
                            <div className="flex min-w-0 flex-col">
                              <span className="truncate font-medium">
                                {color.name}
                              </span>
                              <span className="truncate font-mono text-xs opacity-60">
                                {color.hex}
                              </span>
                            </div>
                          </div>
                          <span className="shrink-0 text-xs font-medium opacity-50">
                            {color.shade}
                          </span>
                        </div>
                      </ComboboxItem>
                    )}
                  </ComboboxCollection>
                </ComboboxGroup>
                {group.value !== "Teal" && <ComboboxSeparator />}
              </Fragment>
            )}
          </ComboboxList>
        </ComboboxPopup>
      </Combobox>

      {selectedColor && (
        <div className="space-y-3 rounded-lg border p-4">
          <div className="flex items-center gap-3">
            <div
              aria-hidden="true"
              className="size-12 shrink-0 rounded-lg border shadow-sm"
              style={{ backgroundColor: selectedColor.hex }}
            />
            <div className="flex min-w-0 flex-col">
              <p className="text-sm font-semibold">{selectedColor.name}</p>
              <p className="text-xs text-muted-foreground">
                {selectedColor.family} family
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="space-y-1">
              <p className="text-muted-foreground">HEX</p>
              <p className="font-mono font-medium">{selectedColor.hex}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">RGB</p>
              <p className="font-mono font-medium">{selectedColor.rgb}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

### Invalid

Submit without choosing an accepted fruit to mark the combobox invalid. Typing alone does not count as a valid selection; choosing a listed value clears the error without another shake.

```tsx
"use client";

import { revalidateLogic, useForm } from "@tanstack/react-form";
import { useId } from "react";

import { Button } from "@/registry/base/button";
import {
  Combobox,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
} from "@/registry/base/combobox";
import {
  Field,
  FieldError,
  FieldErrorSlot,
  FieldLabel,
} from "@/registry/base/field";
import { Form } from "@/registry/base/form";

const fruits = ["Apple", "Banana", "Cherry", "Orange"];

export default function ComboboxInvalidDemo() {
  const inputId = useId();
  const fruitErrorId = useId();
  const form = useForm({
    defaultValues: { fruit: null as string | null },
    onSubmit: () => undefined,
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "change",
    }),
  });

  return (
    <Form className="grid w-full max-w-sm gap-3" form={form}>
      <form.Field
        name="fruit"
        validators={{
          onDynamic: ({ value }) =>
            value ? undefined : "Choose a fruit from the list.",
        }}
      >
        {(field) => {
          const error = field.state.meta.errors[0];
          const invalid = typeof error === "string";

          return (
            <Field invalid={invalid} name={field.name}>
              <FieldLabel htmlFor={inputId}>Fruit</FieldLabel>
              <Combobox
                items={fruits}
                onValueChange={(value) => field.handleChange(value)}
                value={field.state.value}
              >
                <ComboboxInput
                  aria-describedby={invalid ? fruitErrorId : undefined}
                  aria-invalid={invalid || undefined}
                  className="w-full"
                  id={inputId}
                  placeholder="Choose a fruit..."
                />
                <ComboboxPopup>
                  <ComboboxList>
                    {(fruit: string) => (
                      <ComboboxItem key={fruit} value={fruit}>
                        {fruit}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxPopup>
              </Combobox>
              <FieldErrorSlot>
                <FieldError id={fruitErrorId} match={invalid}>
                  {error}
                </FieldError>
              </FieldErrorSlot>
            </Field>
          );
        }}
      </form.Field>
      <Button type="submit">Validate fruit</Button>
    </Form>
  );
}
```

## API Reference

`Combobox` wraps [Base UI Combobox](https://base-ui.com/react/components/combobox). Supported Base UI props pass through.

### ComboboxInput Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `showTrigger` | `boolean` | `true` | Shows the popup toggle button. |
| `isClearable` | `boolean` | `false` | Shows a clear action after selection. |

### ComboboxPopup Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `side` | `"top" \| "bottom"` | `bottom` | Sets the preferred side of the input. |
| `sideOffset` | `number` | `0` | Sets the distance from the input in pixels. |
| `align` | `"start" \| "center" \| "end"` | `center` | Sets alignment relative to the input. |
| `alignOffset` | `number` | `0` | Offsets the popup along the alignment axis. |

### ComboboxChips Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `overflowBehavior` | `"wrap" \| "wrap-when-open" \| "cutoff"` | `wrap-when-open` | Controls chip wrapping and single-line +X overflow compression. |
| `maxCount` | `number` | `-` | Explicit limit on visible chips before showing the +X overflow badge. |
