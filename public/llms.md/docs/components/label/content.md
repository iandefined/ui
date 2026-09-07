# Label

Renders an accessible label associated with controls.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Label` to give a control a visible, clickable name.

## Preview

```tsx
import { Input } from "@/registry/base/input";
import { Label } from "@/registry/base/label";

export default function LabelDemo() {
  return (
    <div className="flex flex-col items-start gap-2">
      <Label htmlFor="email">Email</Label>
      <Input
        aria-label="Email"
        id="email"
        placeholder="you@example.com"
        type="email"
      />
    </div>
  );
}
```

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/label.json
```

## Usage

```tsx
import { Label } from "@/components/ui/label";
```

```tsx
<Label htmlFor="email">Email</Label>
```

## Examples

### With Checkbox

```tsx
import { Checkbox } from "@/registry/base/checkbox";
import { Label } from "@/registry/base/label";

export default function LabelWithCheckboxDemo() {
  return (
    <Label className="cursor-pointer">
      <Checkbox />
      Accept terms and conditions
    </Label>
  );
}
```

## Accessibility

Associate the label with its control using `htmlFor` and the control's `id`, or nest the control inside `Label`.

## API Reference

`Label` wraps the native `<label>` element. Standard label attributes, including `htmlFor`, pass through.
