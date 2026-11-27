# Command

A searchable command palette for actions and navigation.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Command` for quick actions, navigation, or switching between workspaces. Render it inline or open it in a dialog.

## Preview

```tsx
import {
  FilePlusIcon,
  FolderOpenIcon,
  HistoryIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import { useState } from "react";

import {
  Command,
  CommandCollection,
  CommandContent,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/registry/base/command";

const groups = [
  {
    label: "Files",
    items: [
      { label: "New file", icon: FilePlusIcon },
      { label: "Open project", icon: FolderOpenIcon },
      { label: "Recent files", icon: HistoryIcon },
    ],
  },
  {
    label: "Workspace",
    items: [
      { label: "Team members", icon: UsersIcon },
      { label: "Project settings", icon: SettingsIcon },
    ],
  },
];

type CommandGroupData = (typeof groups)[number];
type CommandAction = CommandGroupData["items"][number];

export default function CommandDemo() {
  const [action, setAction] = useState<string>();

  return (
    <div className="grid w-full max-w-sm gap-2">
      <Command items={groups}>
        <CommandContent>
          <CommandInput
            aria-label="Search actions"
            placeholder="Search actions…"
          />
          <CommandList>
            {(group: CommandGroupData) => (
              <CommandGroup
                className="group/command-group"
                key={group.label}
                items={group.items}
              >
                <CommandSeparator className="group-first/command-group:hidden" />
                <CommandGroupLabel>{group.label}</CommandGroupLabel>
                <CommandCollection>
                  {(item: CommandAction) => (
                    <CommandItem
                      key={item.label}
                      onClick={() => setAction(item.label)}
                      value={item}
                    >
                      <item.icon aria-hidden="true" />
                      {item.label}
                    </CommandItem>
                  )}
                </CommandCollection>
              </CommandGroup>
            )}
          </CommandList>
        </CommandContent>
      </Command>
      <output className="min-h-5 text-center text-xs text-muted-foreground">
        {action && `Selected ${action}`}
      </output>
    </div>
  );
}
```

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/command.json
```

## Usage

```tsx
import {
  Command,
  CommandCollection,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const actions = ["New file", "Open project", "Project settings"];

<Command items={actions}>
  <CommandInput aria-label="Search actions" placeholder="Search actions…" />
  <CommandList>
    <CommandGroup>
      <CommandCollection>
        {(action: string) => (
          <CommandItem
            key={action}
            value={action}
            onClick={() => runAction(action)}
          >
            {action}
          </CommandItem>
        )}
      </CommandCollection>
    </CommandGroup>
  </CommandList>
</Command>;
```

## Composition

Use `CommandDialogPopup` inside `CommandDialog` to open the palette as a modal. `CommandContent` keeps the input and scrollable list together above the optional `CommandFooter`.

```tsx
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandCollection,
  CommandContent,
  CommandDialog,
  CommandDialogPopup,
  CommandDialogTrigger,
  CommandFooter,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

<CommandDialog>
  <CommandDialogTrigger render={<Button />}>Open commands</CommandDialogTrigger>
  <CommandDialogPopup title="Project commands">
    <Command items={actions}>
      <CommandContent>
        <CommandInput aria-label="Search project commands" />
        <CommandList>
          <CommandGroup>
            <CommandGroupLabel>Project</CommandGroupLabel>
            <CommandCollection>
              {(action: string) => (
                <CommandItem key={action} value={action}>
                  {action}
                </CommandItem>
              )}
            </CommandCollection>
          </CommandGroup>
        </CommandList>
      </CommandContent>
      <CommandFooter>Press Enter to run a command.</CommandFooter>
    </Command>
  </CommandDialogPopup>
</CommandDialog>;
```

## Examples

### Dialog

The demo binds `Ctrl+L`. Use **Open workspace commands** when the browser reserves that shortcut for the address bar.

```tsx
import { FileTextIcon, HistoryIcon, LayoutGridIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

import { Button } from "@/registry/base/button";
import {
  Command,
  CommandCollection,
  CommandContent,
  CommandDialog,
  CommandDialogPopup,
  CommandDialogTrigger,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/registry/base/command";
import { Kbd } from "@/registry/base/kbd";

const actions = [
  { label: "Documents", icon: FileTextIcon },
  { label: "Projects", icon: LayoutGridIcon },
  { label: "Recent activity", icon: HistoryIcon },
];

export default function CommandDialogDemo() {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState<string>();
  const triggerRef = useRef<HTMLButtonElement>(null);

  useHotkeys("ctrl+l", () => setOpen(true), { preventDefault: true });

  return (
    <div className="grid justify-items-center gap-2">
      <CommandDialog onOpenChange={setOpen} open={open}>
        <CommandDialogTrigger
          ref={triggerRef}
          render={<Button variant="outline" />}
        >
          Open workspace commands
        </CommandDialogTrigger>
        <CommandDialogPopup
          description="Search for a workspace view to open."
          finalFocus={triggerRef}
          title="Workspace commands"
        >
          <Command items={actions}>
            <CommandContent>
              <CommandInput
                aria-label="Search workspace commands"
                placeholder="Search workspace…"
              />
              <CommandList>
                <CommandGroup>
                  <CommandCollection>
                    {(item: (typeof actions)[number]) => (
                      <CommandItem
                        key={item.label}
                        onClick={() => {
                          setAction(item.label);
                          setOpen(false);
                        }}
                        value={item}
                      >
                        <item.icon aria-hidden="true" />
                        {item.label}
                      </CommandItem>
                    )}
                  </CommandCollection>
                </CommandGroup>
              </CommandList>
            </CommandContent>
          </Command>
        </CommandDialogPopup>
      </CommandDialog>
      <span className="text-xs text-muted-foreground">
        Press <Kbd>Ctrl</Kbd> <Kbd>L</Kbd>
      </span>
      <output className="min-h-5 text-xs text-muted-foreground">
        {action && `Opened ${action}`}
      </output>
    </div>
  );
}
```

### With Footer

Use `CommandFooter` to show navigation, selection, and dismissal keys below the scrollable results.

```tsx
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CalendarDaysIcon,
  CornerDownLeftIcon,
  InboxIcon,
  NotebookPenIcon,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/registry/base/button";
import {
  Command,
  CommandCollection,
  CommandContent,
  CommandDialog,
  CommandDialogPopup,
  CommandDialogTrigger,
  CommandFooter,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/registry/base/command";
import { Kbd, KbdGroup } from "@/registry/base/kbd";

const views = [
  { label: "Inbox", icon: InboxIcon },
  { label: "Calendar", icon: CalendarDaysIcon },
  { label: "Notes", icon: NotebookPenIcon },
];

export default function CommandFooterDemo() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<string>();

  return (
    <div className="grid justify-items-center gap-2">
      <CommandDialog onOpenChange={setOpen} open={open}>
        <CommandDialogTrigger render={<Button variant="outline" />}>
          Switch view
        </CommandDialogTrigger>
        <CommandDialogPopup title="Switch view">
          <Command items={views}>
            <CommandContent>
              <CommandInput
                aria-label="Find a view"
                placeholder="Find a view…"
              />
              <CommandList>
                <CommandGroup>
                  <CommandGroupLabel>Views</CommandGroupLabel>
                  <CommandCollection>
                    {(item: (typeof views)[number]) => (
                      <CommandItem
                        key={item.label}
                        onClick={() => {
                          setView(item.label);
                          setOpen(false);
                        }}
                        value={item}
                      >
                        <item.icon aria-hidden="true" />
                        {item.label}
                      </CommandItem>
                    )}
                  </CommandCollection>
                </CommandGroup>
              </CommandList>
            </CommandContent>
            <CommandFooter>
              <span className="inline-flex items-center gap-2">
                <KbdGroup aria-label="Up or down arrow">
                  <Kbd>
                    <ArrowUpIcon aria-hidden="true" />
                  </Kbd>
                  <Kbd>
                    <ArrowDownIcon aria-hidden="true" />
                  </Kbd>
                </KbdGroup>
                Navigate
              </span>
              <span className="inline-flex items-center gap-2">
                <Kbd aria-label="Enter">
                  <CornerDownLeftIcon aria-hidden="true" />
                </Kbd>
                Open
              </span>
              <span className="ms-auto inline-flex items-center gap-2">
                <CommandShortcut>Esc</CommandShortcut>
                Close
              </span>
            </CommandFooter>
          </Command>
        </CommandDialogPopup>
      </CommandDialog>
      <output className="min-h-5 text-xs text-muted-foreground">
        {view && `Opened ${view}`}
      </output>
    </div>
  );
}
```

### Fuzzy Search

Pass `filterItem` from [useFuzzyFilter](/docs/hooks/use-fuzzy-filter) as the `filter` prop to match labels and keywords.

```tsx
import { useState } from "react";

import {
  Command,
  CommandCollection,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/registry/base/command";
import { useFuzzyFilter } from "@/registry/base/use-fuzzy-filter";

const actions = [
  { label: "Invite member", keywords: "add person team" },
  { label: "Change theme", keywords: "dark light appearance" },
  { label: "View invoices", keywords: "payments receipts billing" },
  { label: "Update profile", keywords: "account name avatar" },
];

type CommandAction = (typeof actions)[number];

export default function CommandFuzzyDemo() {
  const { filterItem } = useFuzzyFilter<CommandAction>({
    keys: ["label", "keywords"],
  });
  const [action, setAction] = useState<string>();

  return (
    <div className="grid w-full max-w-sm gap-2">
      <Command filter={filterItem} items={actions}>
        <CommandInput
          aria-label="Find account actions"
          placeholder="Try “billing” or “thme”…"
        />
        <CommandList>
          <CommandGroup>
            <CommandCollection>
              {(item: CommandAction) => (
                <CommandItem
                  key={item.label}
                  onClick={() => setAction(item.label)}
                  value={item}
                >
                  {item.label}
                </CommandItem>
              )}
            </CommandCollection>
          </CommandGroup>
        </CommandList>
      </Command>
      <output className="min-h-5 text-center text-xs text-muted-foreground">
        {action && `Selected ${action}`}
      </output>
    </div>
  );
}
```

### Manual Filtering and Match Highlights

Filter with `useCommandFilter().endsWith`, pass the results through `filteredItems`, and mark matching text with `CommandHighlight`. This example also uses a native scrollbar with a stable gutter.

```tsx
import { useState } from "react";

import {
  Command,
  CommandCollection,
  CommandGroup,
  CommandHighlight,
  CommandInput,
  CommandItem,
  CommandList,
  useCommandFilter,
} from "@/registry/base/command";

const actions = [
  "Create project",
  "Find project",
  "Archive project",
  "Duplicate project",
  "Export project",
  "Rename project",
  "Share project",
  "Create workspace",
  "Find workspace",
  "Rename workspace",
];

export default function CommandManualFilterDemo() {
  const [query, setQuery] = useState("project");
  const [action, setAction] = useState<string>();
  const { endsWith } = useCommandFilter();
  const filteredItems = actions.filter((item) => endsWith(item, query.trim()));

  return (
    <div className="grid w-full max-w-sm gap-2">
      <Command
        className="max-h-56"
        filter={null}
        filteredItems={filteredItems}
        items={actions}
        onValueChange={setQuery}
        value={query}
      >
        <CommandInput
          aria-label="Find actions by suffix"
          placeholder="Search by suffix…"
        />
        <CommandList
          emptyMessage="No actions end with that text."
          hideScrollbar={false}
          nativeScroll
          scrollbarGutter
        >
          <CommandGroup>
            <CommandCollection>
              {(item: string) => (
                <CommandItem
                  key={item}
                  onClick={() => setAction(item)}
                  value={item}
                >
                  <CommandHighlight query={query} text={item} />
                </CommandItem>
              )}
            </CommandCollection>
          </CommandGroup>
        </CommandList>
      </Command>
      <output className="min-h-5 text-xs text-muted-foreground">
        {action && `Selected ${action}`}
      </output>
    </div>
  );
}
```

### Virtualized Results

Use `CommandVirtualizedList` and TanStack Virtual to search a large collection while rendering only the rows near the viewport.

```tsx
import { useVirtualizer } from "@tanstack/react-virtual";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  Command,
  CommandContent,
  CommandInput,
  CommandItem,
  CommandVirtualizedList,
  useCommandFilteredItems,
} from "@/registry/base/command";

type Action = {
  id: number;
  label: string;
  description: string;
};

const actions: Action[] = Array.from({ length: 2_000 }, (_, index) => {
  return {
    id: index + 1,
    label: `Open ${["project", "document", "report", "dashboard"][index % 4]} ${String(index + 1).padStart(4, "0")}`,
    description: `Workspace item ${index + 1}`,
  };
});

type ActionVirtualizer = ReturnType<
  typeof useVirtualizer<HTMLDivElement, Element>
>;

export default function CommandVirtualizedDemo() {
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);
  const virtualizerRef = useRef<ActionVirtualizer | null>(null);
  const setVirtualizer = useCallback(
    (virtualizer: ActionVirtualizer | null) => {
      virtualizerRef.current = virtualizer;
    },
    []
  );

  return (
    <div className="grid w-full max-w-lg gap-3">
      <Command
        className="h-96"
        itemToStringValue={(action) => action.label}
        items={actions}
        onItemHighlighted={(action, { index, reason }) => {
          if (
            !action ||
            index < 0 ||
            (reason !== "keyboard" && reason !== "none")
          ) {
            return;
          }

          queueMicrotask(() => {
            virtualizerRef.current?.scrollToIndex(index, { align: "auto" });
          });
        }}
        virtualized
      >
        <CommandContent>
          <CommandInput
            aria-label="Search workspace actions"
            placeholder="Search 2,000 workspace actions…"
          />
          <VirtualizedActions
            onSelect={setSelectedAction}
            setVirtualizer={setVirtualizer}
          />
        </CommandContent>
      </Command>
      <output
        aria-live="polite"
        className="min-h-5 text-center text-xs text-muted-foreground"
      >
        {selectedAction
          ? `Selected ${selectedAction.label}`
          : "Choose an action with the arrow keys or pointer."}
      </output>
    </div>
  );
}

function VirtualizedActions({
  onSelect,
  setVirtualizer,
}: {
  onSelect: (action: Action) => void;
  setVirtualizer: (virtualizer: ActionVirtualizer | null) => void;
}) {
  const actions = useCommandFilteredItems<Action>();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  // TanStack Virtual's instance methods must stay live for scroll coordination.
  // eslint-disable-next-line react/incompatible-library, react-hooks-js/incompatible-library -- The virtualizer is consumed directly by this list.
  const virtualizer = useVirtualizer({
    count: actions.length,
    estimateSize: () => 56,
    getScrollElement: () => scrollRef.current,
    overscan: 6,
    paddingEnd: 8,
    paddingStart: 8,
    scrollPaddingEnd: 8,
    scrollPaddingStart: 8,
  });

  useEffect(() => {
    setVirtualizer(virtualizer);
    return () => setVirtualizer(null);
  }, [setVirtualizer, virtualizer]);

  return (
    <CommandVirtualizedList
      scrollRef={scrollRef}
      totalSize={virtualizer.getTotalSize()}
    >
      {virtualizer.getVirtualItems().map((virtualItem) => {
        const action = actions[virtualItem.index];
        if (!action) {
          return null;
        }

        return (
          <CommandItem
            aria-posinset={virtualItem.index + 1}
            aria-setsize={actions.length}
            className="absolute top-0 left-0 flex h-14 w-full items-center justify-between gap-3 px-3"
            data-index={virtualItem.index}
            index={virtualItem.index}
            key={virtualItem.key}
            onClick={() => onSelect(action)}
            ref={virtualizer.measureElement}
            style={{
              height: virtualItem.size,
              transform: `translateY(${virtualItem.start}px)`,
            }}
            value={action}
          >
            <span className="grid min-w-0 text-start">
              <span className="truncate font-medium">{action.label}</span>
              <span className="truncate text-xs text-muted-foreground">
                {action.description}
              </span>
            </span>
            <span className="shrink-0 text-xs text-muted-foreground">
              #{action.id}
            </span>
          </CommandItem>
        );
      })}
    </CommandVirtualizedList>
  );
}
```

## Accessibility

Give `CommandInput` an accessible name with `aria-label` or an associated label. Use the up and down arrow keys to move the highlight and Enter to run the highlighted action. A dialog also supports Escape to close it.

## API Reference

`Command` renders an inline [Base UI Autocomplete](https://base-ui.com/react/components/autocomplete) using the registry's [Autocomplete](./autocomplete) parts. `CommandDialog` and its popup use the registry's [Dialog](./dialog). Supported props pass through to the corresponding primitives.

### Props

#### Command

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `items` | `readonly Item[] \| readonly { items: readonly Item[] }[]` | `-` | Supplies flat or grouped action data for filtering. Base UI Autocomplete makes this prop optional. |
| `autoHighlight` | `boolean \| "always"` | `always` | Highlights the first available action automatically. Base UI defaults to `false`. |
| `keepHighlight` | `boolean` | `true` | Preserves the highlighted action when the pointer leaves the list. Base UI defaults to `false`. |
| `open` | `boolean` | `true` | Keeps the inline autocomplete open. Base UI leaves `open` unset by default. |

#### CommandInput

Composes the autocomplete input with [Input Group](./input-group). The input receives the forwarded props.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `loading` | `boolean` | `false` | Marks the input as busy and animates the search icon when reduced motion is disabled. |

#### CommandList

Composes the Base UI list with [Scroll Area](./scroll-area). The results fade at edges with more items to scroll to. Pass a render function or use `CommandCollection` to render filtered data.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `emptyMessage` | `ReactNode` | `No results found.` | Supplies the message announced when there are no matching actions. |
| `nativeScroll` | `boolean` | `false` | Uses the browser's native scrollbar and skips the Scroll Area edge fades. |
| `hideScrollbar` | `boolean` | `true` | Hides the scrollbar while keeping the results scrollable. |
| `persistScrollbar` | `boolean` | `false` | Keeps an enabled scrollbar visible. In native mode, the browser controls its appearance. |
| `scrollbarGutter` | `boolean` | `false` | Requests a stable gutter in the scrolling viewport. |
| `scrollShadow` | `"vertical" \| "horizontal" \| "both" \| "none"` | `vertical` | Sets the fade axis when using the registry Scroll Area. |

#### CommandDialogPopup

The popup forwards focus props such as `initialFocus` and `finalFocus` to `DialogContent`. With the default dismissal settings, Escape and outside presses close the palette.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | `Command palette` | Sets the visually hidden dialog title. |
| `description` | `string` | `-` | Adds a visually hidden description of the palette. |

#### CommandVirtualizedList

Use this list with `virtualized` on `Command` and an external virtualizer. Pass the filtered items from `useCommandFilteredItems<Item>()` to the virtualizer and use each filtered index on the corresponding `CommandItem`. Connect `onItemHighlighted` to the virtualizer's scroll method so keyboard navigation can reach rows outside the viewport. See the [Base UI virtualized example](https://base-ui.com/react/components/autocomplete#virtualized) for scroller wiring, item positioning, and accessible row counts.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `scrollRef` | `React.Ref<HTMLDivElement>` | `-` | Connects the virtualizer to the scrolling viewport. |
| `totalSize` | `number` | `-` | Sets the height of the virtualizer's spacer in pixels. |
| `nativeScroll` | `boolean` | `false` | Uses the browser's native scrollbar and skips the Scroll Area edge fades. |
| `hideScrollbar` | `boolean` | `false` | Hides the scrollbar while keeping the rows scrollable. |
| `scrollShadow` | `"vertical" \| "horizontal" \| "both" \| "none"` | `vertical` | Sets the fade axis when using the registry Scroll Area. |
| `emptyMessage` | `ReactNode` | `No results found.` | Supplies the message announced when there are no matching actions. |

#### Other parts

Use `CommandSeparator` between groups and `CommandShortcut` to display a key using the [Kbd](./kbd) primitive. `CommandShortcut` displays the binding you provide and leaves registration to your application. `CommandItem` uses `onClick` for both pointer activation and Enter.

#### Filtering hooks

`useCommandFilter()` exposes Base UI's `contains`, `startsWith`, and `endsWith` matchers for manual filtering. Call `useCommandFilteredItems<Item>()` inside `Command` to read the currently matching items.

#### CommandHighlight

Renders a label and wraps every case-insensitive occurrence of the query in a `<mark>`.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `text` | `string` | `-` | Supplies the full label to render. |
| `query` | `string` | `-` | Supplies the text to highlight. An empty query leaves the label as plain text. |
