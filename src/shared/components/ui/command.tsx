"use client";

import { Autocomplete } from "@base-ui/react/autocomplete";
import { SearchIcon } from "lucide-react";
import type { ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { cn } from "@/shared/lib/utils";

/**
 * Extra search terms can be attached to an item without changing the text
 * shown in the input or in the list. This keeps the old command palette API
 * useful while delegating filtering and keyboard navigation to Base UI.
 */
export type CommandFilter = (
  value: string,
  search: string,
  keywords?: string[]
) => boolean | number;

type CommandItemValue = {
  value?: string;
  label?: string;
  keywords?: readonly string[];
  [key: string]: unknown;
};

type CommandGroupValue = {
  items: readonly CommandItemValue[];
  value?: string;
  [key: string]: unknown;
};

type CommandRootProps = Omit<
  React.ComponentProps<typeof Autocomplete.Root>,
  "children" | "items" | "filter" | "itemToStringValue" | "inline" | "open"
> & {
  children?: ReactNode;
  className?: string;
  items?: readonly CommandItemValue[] | readonly CommandGroupValue[];
  filter?: CommandFilter;
  itemToStringValue?: (item: CommandItemValue | string) => string;
};

const getItemText = (item: unknown) => {
  if (typeof item === "string") {
    return item;
  }

  if (item && typeof item === "object") {
    const value = item as CommandItemValue;
    return String(value.label ?? value.value ?? "");
  }

  return String(item ?? "");
};

const getItemKeywords = (item: unknown) => {
  if (item && typeof item === "object") {
    const keywords = (item as CommandItemValue).keywords;
    return keywords ? [...keywords].map(String) : undefined;
  }

  return undefined;
};

/**
 * Base UI's Autocomplete.Root is intentionally headless and does not render
 * an element of its own. The wrapper supplies the visual command container,
 * while keeping the root inline/open so its list behaves like a command
 * palette rather than an anchored autocomplete popup.
 */
const Command = ({
  className,
  children,
  items = [],
  filter,
  itemToStringValue,
  autoHighlight = "always",
  keepHighlight = true,
  ...props
}: CommandRootProps) => {
  const toString = itemToStringValue ?? getItemText;
  const baseFilter = filter
    ? (
        item: unknown,
        search: string,
        itemToString?: (value: unknown) => string
      ) =>
        Boolean(
          filter(
            itemToString?.(item) ?? toString(item as CommandItemValue | string),
            search,
            getItemKeywords(item)
          )
        )
    : undefined;

  return (
    <div
      data-slot="command"
      className={cn(
        "bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md",
        className
      )}
    >
      <Autocomplete.Root
        {...props}
        inline
        open
        autoHighlight={autoHighlight}
        keepHighlight={keepHighlight}
        items={items}
        filter={baseFilter}
        itemToStringValue={(item) =>
          toString(item as CommandItemValue | string)
        }
      >
        {children}
      </Autocomplete.Root>
    </div>
  );
};

const CommandDialog = ({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = true,
  ...props
}: Omit<React.ComponentProps<typeof Dialog>, "children"> & {
  title?: string;
  description?: string;
  className?: string;
  showCloseButton?: boolean;
  children?: ReactNode;
}) => (
  <Dialog {...props}>
    <DialogHeader className="sr-only">
      <DialogTitle>{title}</DialogTitle>
      <DialogDescription>{description}</DialogDescription>
    </DialogHeader>
    <DialogContent
      className={cn("overflow-hidden p-0", className)}
      showCloseButton={showCloseButton}
    >
      <Command className="[&_[data-slot=command-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[data-slot=command-group-heading]]:px-2 [&_[data-slot=command-group-heading]]:font-medium [&_[data-slot=command-group]]:px-2 [&_[data-slot=command-group]:not([hidden])_~[data-slot=command-group]]:pt-0 [&_[data-slot=command-input-wrapper]_svg]:h-5 [&_[data-slot=command-input-wrapper]_svg]:w-5 [&_[data-slot=command-input]]:h-12 [&_[data-slot=command-item]]:px-2 [&_[data-slot=command-item]]:py-3 [&_[data-slot=command-item]_svg]:h-5 [&_[data-slot=command-item]_svg]:w-5">
        {children}
      </Command>
    </DialogContent>
  </Dialog>
);

const CommandInput = ({
  className,
  ...props
}: React.ComponentProps<typeof Autocomplete.Input>) => (
  <Autocomplete.InputGroup
    data-slot="command-input-wrapper"
    className="flex h-9 items-center gap-2 border-b px-3"
  >
    <SearchIcon className="size-4 shrink-0 opacity-50" />
    <Autocomplete.Input
      data-slot="command-input"
      className={cn(
        "placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  </Autocomplete.InputGroup>
);

type CommandListProps = Omit<
  React.ComponentProps<typeof Autocomplete.List>,
  "children"
> & {
  children?: ReactNode;
  renderItem?: (item: CommandItemValue, index: number) => ReactNode;
};

const CommandList = ({
  className,
  children,
  renderItem,
  ...props
}: CommandListProps) => (
  <Autocomplete.List
    data-slot="command-list"
    className={cn(
      "max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",
      className
    )}
    {...props}
  >
    {children}
    {renderItem ? (
      <Autocomplete.Collection>{renderItem}</Autocomplete.Collection>
    ) : null}
  </Autocomplete.List>
);

const CommandEmpty = ({
  className,
  ...props
}: React.ComponentProps<typeof Autocomplete.Empty>) => (
  <Autocomplete.Empty
    data-slot="command-empty"
    className={cn(
      "empty:h-0 empty:min-h-0 empty:overflow-hidden empty:p-0 py-6 text-center text-sm",
      className
    )}
    {...props}
  />
);

type CommandGroupProps = Omit<
  React.ComponentProps<typeof Autocomplete.Group>,
  "children" | "items"
> & {
  heading?: ReactNode;
  items?: readonly CommandItemValue[];
  children?: ReactNode;
  renderItem?: (item: CommandItemValue, index: number) => ReactNode;
};

const CommandGroup = ({
  className,
  heading,
  children,
  renderItem,
  items,
  ...props
}: CommandGroupProps) => (
  <Autocomplete.Group
    data-slot="command-group"
    className={cn(
      "text-foreground [&_[data-slot=command-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[data-slot=command-group-heading]]:px-2 [&_[data-slot=command-group-heading]]:py-1.5 [&_[data-slot=command-group-heading]]:text-xs [&_[data-slot=command-group-heading]]:font-medium",
      className
    )}
    items={items}
    {...props}
  >
    {heading ? (
      <Autocomplete.GroupLabel data-slot="command-group-heading">
        {heading}
      </Autocomplete.GroupLabel>
    ) : null}
    {renderItem ? (
      <Autocomplete.Collection>{renderItem}</Autocomplete.Collection>
    ) : (
      children
    )}
  </Autocomplete.Group>
);

type CommandItemProps = Omit<
  React.ComponentProps<typeof Autocomplete.Item>,
  "onClick"
> & {
  keywords?: readonly string[];
  onSelect?: () => void;
};

const CommandItem = ({
  className,
  onSelect,
  keywords: _keywords,
  ...props
}: CommandItemProps) => (
  <Autocomplete.Item
    data-slot="command-item"
    className={cn(
      "data-highlighted:bg-accent data-highlighted:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
      className
    )}
    onClick={onSelect ? () => onSelect() : undefined}
    {...props}
  />
);

const CommandSeparator = ({
  className,
  ...props
}: React.ComponentProps<typeof Autocomplete.Separator>) => (
  <Autocomplete.Separator
    data-slot="command-separator"
    className={cn("bg-border -mx-1 h-px", className)}
    {...props}
  />
);

const CommandShortcut = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    data-slot="command-shortcut"
    className={cn(
      "text-muted-foreground ml-auto text-xs tracking-widest",
      className
    )}
    {...props}
  />
);

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
};
