# Button

A button with a glossy default treatment, custom colors, variants, sections, and sizes.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Button` for actions that submit, confirm, navigate, or change application state.

## Preview

## Installation

## Usage

```tsx
import { Button } from "@/components/ui/button";

<Button>Get started</Button>;
```

The default variant uses the glossy treatment. Pass a CSS color to `color` to generate its gradient and ring.

```tsx
<Button className="text-white" color="#2563eb">
  Get started
</Button>
```

## Examples

### Variants

Choose a visual treatment for the action.

### Custom Colors

Apply `color` to the default variant.

### Sizes

Match the button to its surrounding controls.

### With Icons

Use `leftSection` and `rightSection` to place icons beside the label.

### Loading

Disable the action while work is in progress.

### Disabled

Show an unavailable action without changing its layout.

### As Link

Use Base UI's `render` prop and set `nativeButton={false}` when rendering a link.

## Accessibility

Give icon-only buttons an `aria-label`. Use `nativeButton={false}` only when `render` supplies a real non-button target.

## API Reference

`Button` wraps [Base UI Button](https://base-ui.com/react/components/button). Supported Base UI props pass through.

### Props

Sets the visual treatment. `color` is available only when this is
`"default"` or omitted.
Generates the glossy gradient and ring for the default variant.
Sets the button dimensions.
Sets the corner radius.
Renders content before the label.
Renders content after the label.
