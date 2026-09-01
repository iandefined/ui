# Breadcrumbs

A responsive breadcrumb trail with surface variants, custom separators, and collapsed paths.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/breadcrumbs.json
```

```bash
npm install @base-ui/react tailwind-variants clsx tailwind-merge
```

```bash
npx shadcn@latest add https://ui.iandefined.com/r/button.json https://ui.iandefined.com/r/dropdown-menu.json
```

```ts filename="lib/utils.ts"
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## Usage

```tsx
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumbs";
```

```tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumbs</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

## Anatomy

```tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink />
      <BreadcrumbPage />
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbEllipsis />
  </BreadcrumbList>
</Breadcrumb>
```

## Examples

### Dropdown

Compose the ellipsis with Dropdown Menu to collapse part of a long path into an accessible menu.

### Basic

### Variants

Use `variant="surface"` for a framed breadcrumb track with an elevated current-page item.

### Sizes

| Value | Description          |
| ----- | -------------------- |
| `sm`  | Compact breadcrumb.  |
| `md`  | Default breadcrumb.  |
| `lg`  | Spacious breadcrumb. |

### Custom Separator

Pass an icon through `separator` or render it as a child. This example uses Lucide's `SlashIcon`.

### With Icons

### With Ellipsis

Use `BreadcrumbEllipsis` to represent collapsed items in a long path.

## Accessibility

Breadcrumb renders a `nav` labeled “Breadcrumb” by default. `BreadcrumbPage` marks the current location with `aria-current="page"`, and separators are hidden from assistive technology. When `BreadcrumbEllipsis` is inside an icon-only menu trigger, give the Button an explicit `aria-label`.

## API Reference

### Breadcrumb

| Prop         | Type                     | Default        | Description                           |
| ------------ | ------------------------ | -------------- | ------------------------------------- |
| `variant`    | `"default" \| "surface"` | `"default"`    | Controls the breadcrumb presentation. |
| `size`       | `"sm" \| "md" \| "lg"`   | `"md"`         | Controls spacing and text size.       |
| `aria-label` | `string`                 | `"Breadcrumb"` | Labels the navigation landmark.       |

### BreadcrumbLink

Accepts anchor props and Base UI's polymorphic `render` prop.

### BreadcrumbSeparator

| Prop        | Type        | Default              | Description                        |
| ----------- | ----------- | -------------------- | ---------------------------------- |
| `separator` | `ReactNode` | `<ChevronRightIcon>` | Replaces the default divider icon. |

### BreadcrumbEllipsis

Represents omitted breadcrumb items. Label the interactive control that contains it when it is used as a trigger.
