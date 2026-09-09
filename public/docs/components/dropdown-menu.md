# Dropdown Menu

A list of actions in a dropdown, enhanced with keyboard navigation.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `DropdownMenu` to expose contextual actions without permanently occupying space.

## Preview

```tsx
import {
  BellIcon,
  Building2Icon,
  LayoutGridIcon,
  LogOutIcon,
  SettingsIcon,
  TrashIcon,
  UserCircleIcon,
} from "lucide-react";

import { Button } from "@/registry/base/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/registry/base/dropdown-menu";

const menuItems = [
  { icon: UserCircleIcon, label: "Profile", shortcut: "⌘P" },
  { icon: LayoutGridIcon, label: "Applications", shortcut: "⌘A" },
  { icon: Building2Icon, label: "Teams", shortcut: "⌘T" },
  { icon: BellIcon, label: "Notifications", shortcut: "⌘N" },
];

export default function DropdownMenuDefaultDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            className="flex items-center gap-2 active:scale-100"
            size="sm"
            variant="ghost"
          />
        }
      >
        <SettingsIcon />
        <span>Account settings</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {menuItems.map(({ icon: Icon, label, shortcut }) => (
          <DropdownMenuItem key={label}>
            <div className="flex w-full items-center gap-3">
              <Icon />
              <span className="flex-1">{label}</span>
              <DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut>
            </div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-muted-foreground hover:text-foreground">
          <div className="flex w-full items-center gap-3">
            <LogOutIcon />
            <span>Sign out</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-400" variant="destructive">
          <div className="flex w-full items-center gap-3">
            <TrashIcon />
            <span>Delete account</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/dropdown-menu.json
```

## Usage

```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

<DropdownMenu>
  <DropdownMenuTrigger>Open</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Account settings</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>;
```

## Composition

Compose items, groups, checkbox or radio groups, separators, and nested submenus inside `DropdownMenuContent`.

```tsx
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

<DropdownMenu>
  <DropdownMenuTrigger />
  <DropdownMenuContent>
    <DropdownMenuLabel />
    <DropdownMenuGroup>
      <DropdownMenuItem />
      <DropdownMenuSeparator />
      <DropdownMenuCheckboxItem />
      <DropdownMenuRadioGroup>
        <DropdownMenuRadioItem />
      </DropdownMenuRadioGroup>
    </DropdownMenuGroup>
    <DropdownMenuSub>
      <DropdownMenuSubTrigger />
      <DropdownMenuSubContent>
        <DropdownMenuItem />
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  </DropdownMenuContent>
</DropdownMenu>;
```

## Examples

### With Arrow

Set `showArrow` on the content.

```tsx
import { SettingsIcon } from "lucide-react";

import { Button } from "@/registry/base/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/registry/base/dropdown-menu";

import { AccountMenuItems } from "./menu-items";

export default function DropdownMenuWithArrowDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            className="flex items-center gap-2 active:scale-100"
            size="sm"
            variant="ghost"
          />
        }
      >
        <SettingsIcon />
        <span>Account settings</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" showArrow sideOffset={8}>
        <AccountMenuItems />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### Sides

Set `side` to control the opening direction.

```tsx
import { Button } from "@/registry/base/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/registry/base/dropdown-menu";

import { AccountMenuItems } from "./menu-items";

const sides = [
  "top",
  "right",
  "bottom",
  "left",
  "inline-start",
  "inline-end",
] as const;

export default function DropdownMenuSidesDemo() {
  return (
    <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3">
      {sides.map((side) => (
        <DropdownMenu key={side}>
          <DropdownMenuTrigger
            render={<Button className="w-full" size="sm" variant="outline" />}
          >
            <span className="capitalize">{side}</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent showArrow side={side} sideOffset={8}>
            <AccountMenuItems />
          </DropdownMenuContent>
        </DropdownMenu>
      ))}
    </div>
  );
}
```

### Open on Hover

Set `openOnHover` on the trigger.

```tsx
import { Button } from "@/registry/base/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/base/dropdown-menu";

export default function DropdownMenuHoverDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger openOnHover render={<Button variant="outline" />}>
        Hover for actions
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
        <DropdownMenuItem>Archive</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### Checkboxes

Checkbox items remain open by default; set `closeOnClick` to close after selection.

```tsx
"use client";

import { useState } from "react";

import { Button } from "@/registry/base/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/base/dropdown-menu";

export default function DropdownMenuCheckboxesDemo() {
  const [showStatus, setShowStatus] = useState(true);
  const [showActivity, setShowActivity] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        View options
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuCheckboxItem
          checked={showStatus}
          onCheckedChange={setShowStatus}
        >
          Show status bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={showActivity}
          onCheckedChange={setShowActivity}
        >
          Show activity
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### Radio Group

Radio items remain open by default and support a custom `activeIcon`.

```tsx
"use client";

import { useState } from "react";

import { Button } from "@/registry/base/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/registry/base/dropdown-menu";

export default function DropdownMenuRadioGroupDemo() {
  const [theme, setTheme] = useState("system");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        Theme
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup onValueChange={setTheme} value={theme}>
          <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

```tsx
"use client";

import { CheckIcon } from "lucide-react";

import { Button } from "@/registry/base/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/registry/base/dropdown-menu";

export default function DropdownMenuCustomRadioIconDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        Density
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          activeIcon={<CheckIcon />}
          defaultValue="comfortable"
        >
          <DropdownMenuRadioItem value="compact">Compact</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="comfortable">
            Comfortable
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="spacious">
            Spacious
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### With Groups

Organize related actions.

```tsx
import { Button } from "@/registry/base/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuGroupLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/base/dropdown-menu";

export default function DropdownMenuGroupsDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        Share
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuGroupLabel>People</DropdownMenuGroupLabel>
          <DropdownMenuItem>Invite a teammate</DropdownMenuItem>
          <DropdownMenuItem>Copy invite link</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuGroupLabel>Project</DropdownMenuGroupLabel>
          <DropdownMenuItem>Duplicate</DropdownMenuItem>
          <DropdownMenuItem>Archive</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### Nested Menu

Use a submenu for secondary actions.

```tsx
import { Button } from "@/registry/base/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/registry/base/dropdown-menu";

export default function DropdownMenuSubmenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        Actions
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Share</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Copy link</DropdownMenuItem>
            <DropdownMenuItem>Email</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### Navigate to Another Page

Use Base UI's `render` prop to make an item a link.

```tsx
<DropdownMenuItem render={<a href="/projects" />}>
  Go to projects
</DropdownMenuItem>
```

### Open a Dialog

Open application state from an item's `onClick` handler.

```tsx
<DropdownMenuItem onClick={() => setDialogOpen(true)}>
  Open dialog
</DropdownMenuItem>
```

### Popup Animations

Choose an `animationPreset` on `DropdownMenuContent`. This gallery uses each preset's exact prop value as its trigger label.

```tsx
import type { ComponentProps } from "react";

import { Button } from "@/registry/base/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/registry/base/dropdown-menu";

const presets = [
  "scale",
  "fade",
  "slideOutside",
  "slideInside",
  "motion",
  "motionBlur",
] as const satisfies readonly NonNullable<
  ComponentProps<typeof DropdownMenuContent>["animationPreset"]
>[];

type AnimationPreset = (typeof presets)[number];

function AnimationMenu({
  animationPreset,
}: {
  animationPreset: AnimationPreset;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button className="w-full" size="sm" variant="outline" />}
      >
        {animationPreset}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        animationPreset={animationPreset}
        className="w-52"
        sideOffset={8}
      >
        <DropdownMenuItem>Add to Library</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Add to Playlist</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Get Up!</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Dancing Queen</DropdownMenuItem>
            <DropdownMenuItem>Shape of You</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Play Next</DropdownMenuItem>
        <DropdownMenuItem>Favorite</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function DropdownMenuAnimationDemo() {
  return (
    <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3">
      {presets.map((preset) => (
        <AnimationMenu key={preset} animationPreset={preset} />
      ))}
    </div>
  );
}
```

## Accessibility

Use clear item labels. Give an icon-only trigger an `aria-label`, and keep destructive actions visually and verbally distinct.

## API Reference

`DropdownMenu` wraps [Base UI Menu](https://base-ui.com/react/components/menu). Supported Base UI menu props pass through.

### DropdownMenuContent Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `animationPreset` | `"none" \| "scale" \| "fade" \| "slideOutside" \| "slideInside" \| "motion" \| "motionBlur"` | `scale` | Sets the entry and exit animation. |
| `backdrop` | `"dim" \| "blur" \| "transparent"` | `transparent` | Sets the modal backdrop treatment. |

### DropdownMenuItem Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `"default" \| "destructive"` | `default` | Sets the item treatment. |

### DropdownMenuRadioGroup Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `activeIcon` | `ReactNode` | `-` | Replaces the default selected-item indicator. |
