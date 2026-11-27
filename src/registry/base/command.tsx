"use client";

import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import { cn } from "cn";
import { SearchIcon } from "lucide-react";
import { type ComponentProps, type ReactNode, type Ref } from "react";

import {
  AutocompleteCollection,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteItem,
  AutocompleteRoot,
  AutocompleteSeparator,
  useAutocompleteFilter,
  useAutocompleteFilteredItems,
} from "@/components/ui/autocomplete";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd";
import { ScrollArea, ScrollAreaContent } from "@/components/ui/scroll-area";

const commandSurface =
  "rounded-xl border-none bg-popover bg-clip-padding text-popover-foreground shadow-2xl ring-4 ring-neutral-200/80 dark:bg-neutral-900 dark:ring-neutral-800";

type CommandProps<ItemValue> = Omit<
  BaseAutocomplete.Root.Props<ItemValue>,
  "defaultOpen" | "inline" | "items"
> & {
  className?: string;
  items: NonNullable<BaseAutocomplete.Root.Props<ItemValue>["items"]>;
};

function Command<ItemValue>({
  autoHighlight = "always",
  className,
  items,
  keepHighlight = true,
  open = true,
  ...props
}: CommandProps<ItemValue>) {
  return (
    <div
      className={cn(
        "flex max-h-[min(28rem,calc(100dvh-3rem))] min-h-0 w-full min-w-0 flex-col overflow-hidden",
        commandSurface,
        "in-data-[slot=command-dialog-popup]:rounded-none in-data-[slot=command-dialog-popup]:bg-transparent in-data-[slot=command-dialog-popup]:shadow-none in-data-[slot=command-dialog-popup]:ring-0",
        className
      )}
      data-slot="command"
    >
      <AutocompleteRoot
        {...props}
        autoHighlight={autoHighlight}
        inline
        // Base UI's overloads accept either shape, but cannot accept their union.
        items={items as readonly ItemValue[]}
        keepHighlight={keepHighlight}
        open={open}
      />
    </div>
  );
}

const CommandDialog = Dialog;

type CommandDialogTriggerProps<Payload> = ComponentProps<
  typeof DialogTrigger<Payload>
>;

function CommandDialogTrigger<Payload>(
  props: CommandDialogTriggerProps<Payload>
) {
  return <DialogTrigger data-slot="command-dialog-trigger" {...props} />;
}

type CommandDialogPopupProps = Omit<
  ComponentProps<typeof DialogContent>,
  "showCloseButton"
> & {
  description?: string;
};

function CommandDialogPopup({
  children,
  className,
  description,
  title = "Command palette",
  ...props
}: CommandDialogPopupProps) {
  return (
    <DialogContent
      className={cn(commandSurface, className)}
      data-slot="command-dialog-popup"
      {...props}
      showCloseButton={false}
    >
      <DialogTitle className="sr-only">{title}</DialogTitle>
      {description && (
        <DialogDescription className="sr-only">{description}</DialogDescription>
      )}
      {children}
    </DialogContent>
  );
}

type CommandInputProps = ComponentProps<typeof BaseAutocomplete.Input> & {
  loading?: boolean;
};

function CommandInput({ loading = false, ...props }: CommandInputProps) {
  return (
    <InputGroup
      className="mx-2 mt-2 h-9 shrink-0 rounded-md border-input bg-input/50 shadow-none dark:border-input dark:bg-input/50"
      data-slot="command-input"
    >
      <BaseAutocomplete.Input
        aria-busy={loading || undefined}
        render={<InputGroupInput className="h-full py-0" />}
        {...props}
      />
      <InputGroupAddon className="text-muted-foreground/75">
        <SearchIcon
          aria-hidden="true"
          className={cn(loading && "motion-safe:animate-pulse")}
        />
      </InputGroupAddon>
    </InputGroup>
  );
}

type CommandContentProps = ComponentProps<"div">;

function CommandContent({ className, ...props }: CommandContentProps) {
  return (
    <div
      className={cn(
        "flex min-h-0 flex-1 flex-col",
        "in-data-[slot=command-dialog-popup]:min-h-[min(22.75rem,60dvh)]",
        className
      )}
      data-slot="command-content"
      {...props}
    />
  );
}

type CommandListProps = ComponentProps<typeof BaseAutocomplete.List> & {
  emptyMessage?: ReactNode;
  hideScrollbar?: boolean;
  nativeScroll?: boolean;
  persistScrollbar?: boolean;
  scrollbarGutter?: boolean;
  scrollShadow?: "vertical" | "horizontal" | "both" | "none";
};

function CommandEmptyState({ children }: { children: ReactNode }) {
  return (
    <AutocompleteEmpty className="py-12" data-slot="command-empty">
      {children}
    </AutocompleteEmpty>
  );
}

function CommandList({
  className,
  emptyMessage = "No results found.",
  hideScrollbar = true,
  nativeScroll = false,
  persistScrollbar = false,
  scrollbarGutter = false,
  scrollShadow = "vertical",
  ...props
}: CommandListProps) {
  const viewportClassName = cn(
    "overflow-x-hidden scroll-pt-2 scroll-pb-1.5",
    scrollbarGutter && "[scrollbar-gutter:stable]"
  );
  const list = (
    <BaseAutocomplete.List
      className={(state) =>
        cn(
          "data-empty:hidden px-2 py-1.5",
          nativeScroll && "min-h-0 flex-1 overscroll-contain",
          nativeScroll && viewportClassName,
          nativeScroll &&
            (persistScrollbar ? "overflow-y-scroll" : "overflow-y-auto"),
          nativeScroll && hideScrollbar && "[scrollbar-width:none]",
          typeof className === "function" ? className(state) : className
        )
      }
      data-slot="command-list"
      {...props}
    />
  );

  return (
    <>
      <CommandEmptyState>{emptyMessage}</CommandEmptyState>
      {nativeScroll ? (
        list
      ) : (
        <ScrollArea
          className="min-h-0 flex-1 overflow-hidden has-[[data-slot=command-list][data-empty]]:hidden"
          hideScrollbar={hideScrollbar}
          scrollbarClassName={persistScrollbar ? "opacity-100" : undefined}
          scrollShadow={scrollShadow}
          viewportClassName={viewportClassName}
        >
          <ScrollAreaContent>{list}</ScrollAreaContent>
        </ScrollArea>
      )}
    </>
  );
}

type CommandVirtualizedListProps = Omit<
  ComponentProps<typeof BaseAutocomplete.List>,
  "children"
> & {
  children?: ReactNode;
  emptyMessage?: ReactNode;
  hideScrollbar?: boolean;
  nativeScroll?: boolean;
  scrollShadow?: "vertical" | "horizontal" | "both" | "none";
  scrollRef: Ref<HTMLDivElement>;
  totalSize: number;
};

function CommandVirtualizedList({
  children,
  emptyMessage = "No results found.",
  hideScrollbar = false,
  nativeScroll = false,
  scrollShadow = "vertical",
  scrollRef,
  totalSize,
  ...props
}: CommandVirtualizedListProps) {
  const rows = (
    <div className="relative" role="presentation" style={{ height: totalSize }}>
      {children}
    </div>
  );

  return (
    <>
      <CommandEmptyState>{emptyMessage}</CommandEmptyState>
      <BaseAutocomplete.List
        data-slot="command-list"
        render={
          <div className="flex min-h-0 flex-1 flex-col data-empty:hidden" />
        }
        {...props}
      >
        {nativeScroll ? (
          <div
            className={cn(
              "min-h-0 flex-1 overflow-y-auto overscroll-contain scroll-py-2",
              hideScrollbar && "[scrollbar-width:none]"
            )}
            data-slot="command-virtualized-viewport"
            ref={scrollRef}
            role="presentation"
          >
            {rows}
          </div>
        ) : (
          <ScrollArea
            className="min-h-0 flex-1 overflow-hidden"
            hideScrollbar={hideScrollbar}
            scrollShadow={scrollShadow}
            viewportClassName="scroll-py-2"
            viewportProps={{
              "data-slot": "command-virtualized-viewport",
              ref: scrollRef,
              role: "presentation",
            }}
          >
            <ScrollAreaContent>{rows}</ScrollAreaContent>
          </ScrollArea>
        )}
      </BaseAutocomplete.List>
    </>
  );
}

type CommandGroupProps = ComponentProps<typeof AutocompleteGroup>;

function CommandGroup(props: CommandGroupProps) {
  return <AutocompleteGroup data-slot="command-group" {...props} />;
}

type CommandGroupLabelProps = ComponentProps<typeof AutocompleteGroupLabel>;

function CommandGroupLabel({ className, ...props }: CommandGroupLabelProps) {
  return (
    <AutocompleteGroupLabel
      className={cn("static bg-transparent px-3", className)}
      data-slot="command-group-label"
      {...props}
    />
  );
}

type CommandCollectionProps = ComponentProps<typeof AutocompleteCollection>;

function CommandCollection(props: CommandCollectionProps) {
  return <AutocompleteCollection data-slot="command-collection" {...props} />;
}

type CommandItemProps = ComponentProps<typeof AutocompleteItem>;

function CommandItem({ className, ...props }: CommandItemProps) {
  return (
    <AutocompleteItem
      className={cn(
        "h-9 cursor-default rounded-md border border-transparent px-3 py-0 font-medium",
        "data-highlighted:border-input data-highlighted:bg-input/50 data-highlighted:before:hidden",
        "forced-colors:data-highlighted:outline-2 forced-colors:data-highlighted:-outline-offset-2 forced-colors:data-highlighted:outline-[Highlight]",
        "[&_svg:not([class*='text-'])]:text-muted-foreground [&_svg:not([class*='size-'])]:size-4 sm:[&_svg:not([class*='size-'])]:size-4",
        className
      )}
      data-slot="command-item"
      {...props}
    />
  );
}

type CommandSeparatorProps = ComponentProps<typeof AutocompleteSeparator>;

function CommandSeparator(props: CommandSeparatorProps) {
  return <AutocompleteSeparator data-slot="command-separator" {...props} />;
}

type CommandShortcutProps = ComponentProps<typeof Kbd>;

function CommandShortcut({ className, ...props }: CommandShortcutProps) {
  return (
    <Kbd
      className={cn("ms-auto shrink-0", className)}
      data-slot="command-shortcut"
      {...props}
    />
  );
}

type CommandHighlightProps = Omit<ComponentProps<"span">, "children"> & {
  query: string;
  text: string;
};

function CommandHighlight({ query, text, ...props }: CommandHighlightProps) {
  const search = query.trim();
  const parts: ReactNode[] = [];
  let offset = 0;

  if (search) {
    const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    for (const match of text.matchAll(new RegExp(escaped, "giu"))) {
      parts.push(text.slice(offset, match.index));
      parts.push(
        <mark
          className="rounded-xs bg-accent font-semibold text-accent-foreground"
          key={match.index}
        >
          {match[0]}
        </mark>
      );
      offset = match.index + match[0].length;
    }
  }

  parts.push(text.slice(offset));

  return (
    <span data-slot="command-highlight" {...props}>
      {parts}
    </span>
  );
}

type CommandFooterProps = ComponentProps<"div">;

function CommandFooter({ className, ...props }: CommandFooterProps) {
  return (
    <div
      className={cn(
        "flex min-h-10 shrink-0 flex-wrap items-center gap-x-4 gap-y-2 border-t border-neutral-100 bg-neutral-50 px-4 py-2 text-xs font-medium text-muted-foreground dark:border-neutral-700 dark:bg-neutral-800",
        className
      )}
      data-slot="command-footer"
      {...props}
    />
  );
}

const useCommandFilter = useAutocompleteFilter;
const useCommandFilteredItems = useAutocompleteFilteredItems;

export {
  Command,
  CommandCollection,
  CommandContent,
  CommandDialog,
  CommandDialogPopup,
  CommandDialogTrigger,
  CommandFooter,
  CommandGroup,
  CommandGroupLabel,
  CommandHighlight,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  CommandVirtualizedList,
  useCommandFilter,
  useCommandFilteredItems,
};
export type {
  CommandCollectionProps,
  CommandContentProps,
  CommandDialogPopupProps,
  CommandDialogTriggerProps,
  CommandFooterProps,
  CommandGroupLabelProps,
  CommandGroupProps,
  CommandHighlightProps,
  CommandInputProps,
  CommandItemProps,
  CommandListProps,
  CommandProps,
  CommandSeparatorProps,
  CommandShortcutProps,
  CommandVirtualizedListProps,
};
