# Avatar

An image element with a fallback for representing the user.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Avatar` to represent a person, team, or account when an image may be unavailable.

## Preview

## Installation

## Usage

```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

<Avatar>
  <AvatarImage src="/avatars/01.png" alt="User avatar" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>;
```

## Composition

```tsx
<Avatar>
  <AvatarImage />
  <AvatarFallback />
</Avatar>
```

## Examples

### Fallback Only

Use a short, recognizable fallback when no image is available.

### Sizes

Use a size appropriate to the surrounding content.

### Radius

Change the image shape for the context.

### Group Avatars

Stack related people or accounts.

## API Reference

`Avatar` wraps [Base UI Avatar](https://base-ui.com/react/components/avatar). Supported Base UI props pass through; this registry item owns no additional props.
