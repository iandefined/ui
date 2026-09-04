# Breadcrumbs

A responsive breadcrumb trail with surface variants, custom separators, and collapsed paths.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Breadcrumb` to show a page's position in a hierarchy and provide parent navigation.

## Preview

## Installation

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
</Breadcrumb>;
```

## Composition

Use `BreadcrumbItem` for each location, `BreadcrumbLink` for navigable ancestors, and `BreadcrumbPage` for the current page.

## Examples

### Dropdown

Collapse intermediate locations into a dropdown.

### Basic

Show a short path.

### Variants

Use `surface` for a framed trail.

### Sizes

Adjust density for the surrounding layout.

### Custom Separator

Replace the default divider.

### With Icons

Add recognizable location icons.

### With Ellipsis

Represent omitted locations with `BreadcrumbEllipsis`.

## Accessibility

`Breadcrumb` renders a `nav` labeled “Breadcrumb” by default. `BreadcrumbPage` sets `aria-current="page"`; label an icon-only ellipsis trigger explicitly.

## API Reference

`BreadcrumbLink` supports [Base UI `useRender`](https://base-ui.com/react/utils/use-render); all parts otherwise accept their standard HTML props.

### Breadcrumb Props

Sets the breadcrumb presentation.
Sets spacing and text size.

### BreadcrumbSeparator Props

Replaces the default divider icon.
