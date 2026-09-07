# Card

A container with header, content, action, and footer regions.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Card` to group related content and actions into a distinct surface.

## Preview

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/base/card";

export default function CardDemo() {
  return (
    <Card className="w-full max-w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          This is a simple card component with a header and content section.
        </p>
      </CardContent>
    </Card>
  );
}
```

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/card.json
```

## Usage

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description.</CardDescription>
  </CardHeader>
  <CardContent>Card content.</CardContent>
</Card>;
```

## Composition

```tsx
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle />
    <CardDescription />
    <CardAction />
  </CardHeader>
  <CardContent />
  <CardFooter />
</Card>;
```

## Examples

### With Footer and Action

Use `CardFooter` below the content and `CardAction` for a header control.

```tsx
import { EllipsisVerticalIcon } from "lucide-react";

import { Button } from "@/registry/base/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/base/card";

export default function CardWithFooterAndActionDemo() {
  return (
    <Card className="w-full max-w-[350px]">
      <CardHeader>
        <CardTitle>Team Meeting</CardTitle>
        <CardDescription>Scheduled for tomorrow at 2:00 PM</CardDescription>
        <CardAction>
          <Button
            aria-label="More meeting options"
            size="icon-sm"
            variant="ghost"
            className="relative bottom-2 left-2"
          >
            <EllipsisVerticalIcon className="size-3" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          Discuss Q4 roadmap and project priorities with the team.
        </p>
      </CardContent>
      <CardFooter>
        <Button className="ml-auto" size="sm" variant="outline">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
```

### Variants

Use `inset` to place nested content on a card surface inside a muted frame. Keep the tray padding around its elevated inner surface. If a custom inner surface sits inside an `overflow-hidden` wrapper, add `mx-px` so the light-mode one-pixel outline shadow is not clipped.

## API Reference

`Card` is a styled `div`; standard HTML props pass through.

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `"default" \| "inset"` | `default` | Changes how the card is framed. |
