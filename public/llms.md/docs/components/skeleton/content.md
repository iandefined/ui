# Skeleton

A shimmer placeholder for loading content.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Skeleton` as a temporary shape that preserves a loading layout.

## Preview

```tsx
import { Skeleton } from "@/registry/base/skeleton";

export default function SkeletonDefaultDemo() {
  return (
    <div className="flex w-full max-w-sm items-center gap-3">
      <Skeleton className="size-10" rounded="full" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}
```

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/skeleton.json
```

## Usage

```tsx
import { Skeleton } from "@/components/ui/skeleton";
```

```tsx
<Skeleton className="h-4 w-48" />
```

## Examples

### Card

```tsx
import { Skeleton } from "@/registry/base/skeleton";

export default function SkeletonCardDemo() {
  return (
    <div className="w-full max-w-sm space-y-3">
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-5 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  );
}
```

### No animation

```tsx
import { Skeleton } from "@/registry/base/skeleton";

export default function SkeletonNoAnimationDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Skeleton animate={false} className="h-4 w-3/4" />
      <Skeleton animate={false} className="h-4 w-full" />
      <Skeleton animate={false} className="h-4 w-5/6" />
    </div>
  );
}
```

## API Reference

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `rounded` | `"none" \| "sm" \| "md" \| "lg" \| "full"` | `lg` | Sets the placeholder corner radius. |
| `animate` | `boolean` | `true` | Controls the shimmer animation. |
