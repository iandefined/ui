# Spinner

An SVG indicator for loading states.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Spinner` to communicate that an action or content is loading.

## Preview

```tsx
import { Spinner } from "@/registry/base/spinner";

export default function SpinnerDefaultDemo() {
  return <Spinner />;
}
```

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/spinner.json
```

## Usage

```tsx
import { Spinner } from "@/components/ui/spinner";
```

```tsx
<Spinner />
```

## Examples

### Sizes

```tsx
import { Spinner } from "@/registry/base/spinner";

const sizes = [
  ["Small", "sm"],
  ["Medium", "md"],
  ["Large", "lg"],
  ["Extra Large", "xl"],
] as const;

export default function SpinnerSizesDemo() {
  return (
    <div className="flex flex-wrap items-end gap-6">
      {sizes.map(([label, size]) => (
        <div className="flex flex-col items-center gap-2" key={size}>
          <Spinner size={size} />
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>
  );
}
```

## API Reference

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `size` | `"sm" \| "md" \| "lg" \| "xl"` | `md` | Sets the spinner dimensions. |
