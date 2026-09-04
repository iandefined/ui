# Label

Renders an accessible label associated with controls.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Label` to give a control a visible, clickable name.

## Preview

## Installation

## Usage

```tsx
import { Label } from "@/components/ui/label";
```

```tsx
<Label htmlFor="email">Email</Label>
```

## Examples

### With Checkbox

## Accessibility

Associate the label with its control using `htmlFor` and the control's `id`, or nest the control inside `Label`.

## API Reference

`Label` wraps the native `<label>` element. Standard label attributes, including `htmlFor`, pass through.
