# Avatar

An image element with a fallback for representing the user.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Avatar` to represent a person, team, or account when an image may be unavailable.

## Preview

```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/base/avatar";

export default function AvatarDefaultDemo() {
  return (
    <Avatar>
      <AvatarImage
        alt="Luke Tracy"
        src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80"
      />
      <AvatarFallback>LT</AvatarFallback>
    </Avatar>
  );
}
```

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/avatar.json
```

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

<Avatar>
  <AvatarImage />
  <AvatarFallback />
</Avatar>;
```

## Examples

### Fallback Only

Use a short, recognizable fallback when no image is available.

```tsx
import { Avatar, AvatarFallback } from "@/registry/base/avatar";

export default function AvatarFallbackDemo() {
  return (
    <Avatar>
      <AvatarFallback>LT</AvatarFallback>
    </Avatar>
  );
}
```

### Sizes

Use a size appropriate to the surrounding content.

```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/base/avatar";

export default function AvatarSizesDemo() {
  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage
          alt="User"
          src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=96&h=96&dpr=2&q=80"
        />
        <AvatarFallback>AV</AvatarFallback>
      </Avatar>
      <Avatar className="size-12">
        <AvatarImage
          alt="User"
          src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=144&h=144&dpr=2&q=80"
        />
        <AvatarFallback>AV</AvatarFallback>
      </Avatar>
      <Avatar className="size-16">
        <AvatarImage
          alt="User"
          src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=192&h=192&dpr=2&q=80"
        />
        <AvatarFallback>AV</AvatarFallback>
      </Avatar>
    </div>
  );
}
```

### Radius

Change the image shape for the context.

```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/base/avatar";

export default function AvatarRadiusDemo() {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="rounded-md">
        <AvatarImage
          alt="User"
          src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80"
        />
        <AvatarFallback>AV</AvatarFallback>
      </Avatar>
      <Avatar className="rounded-xl">
        <AvatarImage
          alt="User"
          src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80"
        />
        <AvatarFallback>AV</AvatarFallback>
      </Avatar>
      <Avatar className="rounded-full">
        <AvatarImage
          alt="User"
          src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80"
        />
        <AvatarFallback>AV</AvatarFallback>
      </Avatar>
    </div>
  );
}
```

### Group Avatars

Stack related people or accounts.

```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/base/avatar";

const users = [
  {
    alt: "U1",
    src: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=96&h=96&dpr=2&q=80",
  },
  {
    alt: "U2",
    src: "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=96&h=96&dpr=2&q=80",
  },
  {
    alt: "U3",
    src: "https://images.unsplash.com/photo-1655874819398-c6dfbec68ac7?w=96&h=96&dpr=2&q=80",
  },
];

export default function AvatarGroupDemo() {
  return (
    <div className="flex -space-x-[0.6rem]">
      {users.map(({ alt, src }) => (
        <Avatar className="ring-2 ring-background" key={alt}>
          <AvatarImage alt={alt} src={src} />
          <AvatarFallback>{alt}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
}
```

### Random Hash Avatar

Use [Hashvatar](https://www.hashvatar.com/) to generate a deterministic avatar from a username or any string. Install it in your app, then customize the input, colors, and download behavior for your product.

```tsx
"use client";

import { Hashvatar } from "hashvatar/react";
import { DownloadIcon } from "lucide-react";
import * as React from "react";

import { Avatar } from "@/registry/base/avatar";
import { Button } from "@/registry/base/button";
import { Input } from "@/registry/base/input";

const usernameInputId = "hashvatar-username";

export default function AvatarHashvatarDemo() {
  const [username, setUsername] = React.useState("sophia.martinez");
  const avatarRef = React.useRef<HTMLDivElement>(null);
  const hash = username.trim() || "anonymous";

  const downloadAvatar = () => {
    const canvas = avatarRef.current?.querySelector("canvas");
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (!blob) return;

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${hash.replaceAll(/[^a-z0-9]+/gi, "-")}-avatar.png`;
      link.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  };

  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      <div className="flex items-center gap-4">
        <div ref={avatarRef}>
          <Avatar
            className="size-20"
            aria-label={`Generated avatar for ${hash}`}
          >
            <Hashvatar
              hash={hash}
              mode="dither"
              size={160}
              className="size-full"
            />
          </Avatar>
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{hash}</p>
          <p className="text-muted-foreground text-sm">
            Deterministic dither avatar
          </p>
        </div>
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium" htmlFor={usernameInputId}>
          Username
        </label>
        <Input
          id={usernameInputId}
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Enter a username"
        />
      </div>

      <Button className="w-fit" variant="outline" onClick={downloadAvatar}>
        <DownloadIcon aria-hidden="true" />
        Download PNG
      </Button>
    </div>
  );
}
```

## API Reference

`Avatar` wraps [Base UI Avatar](https://base-ui.com/react/components/avatar). Supported Base UI props pass through; this registry item owns no additional props.
