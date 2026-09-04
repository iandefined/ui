# Card

A container with header, content, action, and footer regions.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Card` to group related content and actions into a distinct surface.

## Preview

## Installation

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
<Card>
  <CardHeader>
    <CardTitle />
    <CardDescription />
    <CardAction />
  </CardHeader>
  <CardContent />
  <CardFooter />
</Card>
```

## Examples

### With Footer and Action

Use `CardFooter` below the content and `CardAction` for a header control.

### Variants

Use `inset` to place nested content on a card surface inside a muted frame.

## API Reference

`Card` is a styled `div`; standard HTML props pass through.

### Props

Changes how the card is framed.
