"use client";

// Adapted from Pure UI: https://github.com/MusKRI/pure-ui/tree/main/src/registry/pure-ui/ui/combobox

import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type RefObject,
  type SVGProps,
} from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea, ScrollAreaContent } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type ComboboxContextValue = {
  chipsRef: RefObject<HTMLDivElement | null>;
  multiple: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  isFocused: boolean;
  setIsFocused: (isFocused: boolean) => void;
};

const ComboboxContext = createContext<ComboboxContextValue | null>(null);

function useComboboxContext() {
  const context = useContext(ComboboxContext);
  if (!context) throw new Error("Combobox parts must be used within Combobox");
  return context;
}

type ComboboxProps<
  Value,
  Multiple extends boolean | undefined = false,
> = ComboboxPrimitive.Root.Props<Value, Multiple>;

function Combobox<Value, Multiple extends boolean | undefined = false>({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  multiple = false as Multiple,
  ...props
}: ComboboxProps<Value, Multiple>) {
  const chipsRef = useRef<HTMLDivElement | null>(null);
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [isFocused, setIsFocused] = useState(false);

  const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;

  const handleOpenChange = (
    nextOpen: boolean,
    eventDetails: ComboboxPrimitive.Root.ChangeEventDetails
  ) => {
    if (controlledOpen === undefined) {
      setUncontrolledOpen(nextOpen);
    }
    onOpenChange?.(nextOpen, eventDetails);
  };

  return (
    <ComboboxContext.Provider
      value={{
        chipsRef,
        multiple: Boolean(multiple),
        open,
        setOpen: (nextOpen) => {
          if (controlledOpen === undefined) {
            setUncontrolledOpen(nextOpen);
          }
        },
        isFocused,
        setIsFocused,
      }}
    >
      <ComboboxPrimitive.Root
        data-slot="combobox"
        multiple={multiple}
        open={open}
        onOpenChange={handleOpenChange}
        {...props}
      />
    </ComboboxContext.Provider>
  );
}

function ComboboxValue(props: ComboboxPrimitive.Value.Props) {
  return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />;
}

export function ChevronsUpDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      height="20"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        className="group-data-popup-open:translate-y-[8.5px] [transition-property:translate] duration-200 ease-out"
        d="M10.53 2.72a.75.75 0 0 0-1.06 0L5.22 6.97a.75.75 0 0 0 1.06 1.06L10 4.31l3.72 3.72a.75.75 0 1 0 1.06-1.06z"
        fill="currentColor"
      />
      <path
        className="group-data-popup-open:-translate-y-[8.5px] [transition-property:translate] duration-200 ease-out"
        d="M14.78 13.03l-4.25 4.25a.75.75 0 0 1-1.06 0l-4.25-4.25a.75.75 0 1 1 1.06-1.06L10 15.69l3.72-3.72a.75.75 0 1 1 1.06 1.06"
        fill="currentColor"
      />
    </svg>
  );
}

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18 6L6 18m12 0L6 6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        className="group-data-selected:[stroke-dashoffset:0] transition-[stroke-dashoffset] duration-200 ease-out"
        d="m5 12 5 5L20 7"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

type ComboboxInputProps = ComboboxPrimitive.Input.Props & {
  isClearable?: boolean;
  showTrigger?: boolean;
};

function ComboboxInput({
  isClearable = false,
  showTrigger = true,
  className,
  ...props
}: ComboboxInputProps) {
  const { multiple, open, isFocused } = useComboboxContext();
  const isSelecting = open || isFocused;

  if (multiple) {
    return (
      <ComboboxPrimitive.Input
        className={cn(
          "h-6 min-w-12 flex-1 order-last truncate bg-transparent px-1.5 py-0 text-xs sm:text-xs leading-6 outline-none placeholder:text-muted-foreground/80 [[data-slot=combobox-chip]+&]:ps-1",
          !isSelecting &&
            "[[data-slot=combobox-chip]~&]:flex-none [[data-slot=combobox-chip]~&]:grow-0 [[data-slot=combobox-chip]~&]:w-0 [[data-slot=combobox-chip]~&]:min-w-0 [[data-slot=combobox-chip]~&]:p-0 [[data-slot=combobox-chip]~&]:m-0 [[data-slot=combobox-chip]~&]:border-0 [[data-slot=combobox-chip]~&]:opacity-0 [[data-slot=combobox-chip]~&]:pointer-events-none [[data-slot=combobox-chip]~&]:overflow-hidden",
          className
        )}
        data-slot="combobox-input"
        {...props}
      />
    );
  }

  return (
    <div
      className="relative w-full has-data-popup-open:z-[51]"
      data-slot="combobox-input-wrapper"
    >
      <ComboboxPrimitive.Input
        className={cn(
          "relative rounded-[12px]",
          (showTrigger || isClearable) && "pe-8",
          className
        )}
        data-slot="combobox-input"
        render={<Input />}
        {...props}
      />
      {showTrigger && (
        <ComboboxTrigger
          aria-label="Toggle options"
          className="group absolute end-1 top-1/2 z-10 inline-flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md border border-transparent outline-none has-[+[data-slot=combobox-clear]]:hidden in-data-[slot=combobox-chips]:hidden [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4.5 sm:size-7 sm:[&_svg:not([class*='size-'])]:size-4"
        >
          <ChevronsUpDownIcon />
        </ComboboxTrigger>
      )}
      {isClearable && (
        <ComboboxClear
          aria-label="Clear selection"
          className="absolute end-1 top-1/2 z-10 inline-flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md border border-transparent outline-none transition-[scale,opacity] duration-100 data-starting-style:scale-98 data-ending-style:scale-98 data-starting-style:opacity-0 data-ending-style:opacity-0 in-data-[slot=combobox-chips]:hidden [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4.5 sm:size-7 sm:[&_svg:not([class*='size-'])]:size-4"
        >
          <CloseIcon />
        </ComboboxClear>
      )}
    </div>
  );
}

function ComboboxLabel(props: ComponentProps<typeof Label>) {
  return <Label data-slot="combobox-label" {...props} />;
}

function ComboboxClear({ className, ...props }: ComboboxPrimitive.Clear.Props) {
  return (
    <ComboboxPrimitive.Clear
      className={cn(className)}
      data-slot="combobox-clear"
      {...props}
    />
  );
}

function ComboboxTrigger({
  className,
  ...props
}: ComboboxPrimitive.Trigger.Props) {
  return (
    <ComboboxPrimitive.Trigger
      className={cn("rounded-[12px]", className)}
      data-slot="combobox-trigger"
      {...props}
    />
  );
}

type ComboboxChipsProps = ComboboxPrimitive.Chips.Props & {
  overflowBehavior?: "wrap" | "wrap-when-open" | "cutoff";
  maxCount?: number;
};

function ComboboxChips({
  className,
  overflowBehavior = "wrap-when-open",
  maxCount,
  children,
  onFocus,
  onBlur,
  ...props
}: ComboboxChipsProps) {
  const { chipsRef, open, isFocused, setIsFocused } = useComboboxContext();
  const overflowBadgeRef = useRef<HTMLSpanElement | null>(null);
  const [overflowAmount, setOverflowAmount] = useState(0);

  const isSelecting = open || isFocused;
  const shouldWrap =
    overflowBehavior === "wrap" ||
    (overflowBehavior === "wrap-when-open" && isSelecting);

  const checkOverflow = useCallback(() => {
    const container = chipsRef.current;
    if (!container) return;

    const items = container.querySelectorAll<HTMLElement>(
      "[data-slot=combobox-chip]"
    );
    const badge = overflowBadgeRef.current;

    if (shouldWrap) {
      items.forEach((item) => {
        item.style.removeProperty("display");
      });
      if (badge) {
        badge.style.display = "none";
      }
      setOverflowAmount(0);
      return;
    }

    // Reset items to visible, hide badge
    items.forEach((item) => {
      item.style.removeProperty("display");
    });
    if (badge) {
      badge.style.display = "none";
    }

    if (items.length === 0) {
      setOverflowAmount(0);
      return;
    }

    if (maxCount !== undefined && items.length > maxCount) {
      const amount = items.length - maxCount;
      for (let i = items.length - 1; i >= maxCount; i--) {
        const item = items[i];
        if (item) item.style.display = "none";
      }
      if (badge) {
        badge.style.removeProperty("display");
        badge.textContent = `+${amount}`;
      }
      setOverflowAmount(amount);
      return;
    }

    // Dynamic single line check
    if (container.scrollWidth <= container.clientWidth + 1) {
      setOverflowAmount(0);
      return;
    }

    let amount = 0;
    for (let i = items.length - 1; i >= 0; i--) {
      amount = items.length - i;
      const item = items[i];
      if (item) {
        item.style.display = "none";
      }
      if (badge) {
        badge.style.removeProperty("display");
        badge.textContent = `+${amount}`;
      }
      if (container.scrollWidth <= container.clientWidth + 1) {
        break;
      }
    }
    setOverflowAmount(amount);
  }, [chipsRef, shouldWrap, maxCount]);

  useEffect(() => {
    checkOverflow();
  }, [checkOverflow]);

  useEffect(() => {
    const container = chipsRef.current;
    if (!container) return;

    let rafId: number | null = null;
    const scheduleCheck = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        checkOverflow();
      });
    };

    const resizeObserver = new ResizeObserver(scheduleCheck);
    resizeObserver.observe(container);

    const mutationObserver = new MutationObserver(scheduleCheck);
    mutationObserver.observe(container, { childList: true, subtree: true });

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [checkOverflow, chipsRef]);

  return (
    <ComboboxPrimitive.Chips
      className={cn(
        "relative inline-flex w-full items-center gap-1 rounded-[12px] border border-input bg-background px-1.5 py-1 text-base/5 shadow-xs outline-0 outline-offset-0 outline-transparent outline-solid transition-[border-color,outline-width,outline-offset,outline-color] duration-100 ease-out has-data-popup-open:z-[51] focus-within:border-ring focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ring/50 data-invalid:border-destructive data-invalid:outline-2 data-invalid:outline-offset-2 data-invalid:outline-destructive/50 focus-within:data-invalid:outline-destructive/50 dark:bg-input/32 sm:text-sm",
        shouldWrap
          ? "min-h-9 flex-wrap"
          : "h-9 min-h-9 flex-nowrap overflow-hidden",
        className
      )}
      data-slot="combobox-chips"
      ref={chipsRef}
      onFocus={(e) => {
        setIsFocused(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsFocused(false);
        }
        onBlur?.(e);
      }}
      {...props}
    >
      {children}
      <span
        ref={overflowBadgeRef}
        data-slot="combobox-overflow"
        style={{ display: "none" }}
        className="relative flex h-6 shrink-0 items-center justify-center rounded-md bg-secondary border px-2 text-xs tabular-nums select-none"
      >
        +{overflowAmount}
      </span>
    </ComboboxPrimitive.Chips>
  );
}

function ComboboxChip({
  className,
  children,
  ...props
}: ComboboxPrimitive.Chip.Props) {
  return (
    <ComboboxPrimitive.Chip
      className={cn(
        "relative flex h-6 shrink-0 items-center rounded-md bg-secondary border px-2 pr-1 text-xs tabular-nums select-none",
        className
      )}
      data-slot="combobox-chip"
      {...props}
    >
      {children}
      <ComboboxChipRemove />
    </ComboboxPrimitive.Chip>
  );
}

function ComboboxChipRemove({
  className,
  children,
  ...props
}: ComboboxPrimitive.ChipRemove.Props) {
  return (
    <ComboboxPrimitive.ChipRemove
      aria-label="Remove"
      className={cn(
        "cursor-pointer rounded-md p-0.5 text-inherit hover:bg-secondary/80 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
        className
      )}
      data-slot="combobox-chip-remove"
      {...props}
    >
      {children ?? <CloseIcon />}
    </ComboboxPrimitive.ChipRemove>
  );
}

function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props) {
  return (
    <ScrollArea
      className="min-h-0 flex-1 border-0 has-[[data-empty]]:hidden [--scroll-area-fade:var(--popover)] [&>[data-slot=scroll-area-vertical-shadow]]:[--scroll-area-fade:var(--popover)] [&>[data-slot=scroll-area-vertical-shadow]]:after:rounded-none [&>[data-slot=scroll-area-vertical-shadow]]:before:rounded-none"
      scrollShadow="vertical"
    >
      <ScrollAreaContent>
        <ComboboxPrimitive.List
          className={cn(
            "not-empty:px-1 not-empty:py-2 not-empty:scroll-py-2 data-[empty]:hidden",
            className
          )}
          data-slot="combobox-list"
          {...props}
        />
      </ScrollAreaContent>
    </ScrollArea>
  );
}

function ComboboxPortal(props: ComboboxPrimitive.Portal.Props) {
  return <ComboboxPrimitive.Portal data-slot="combobox-portal" {...props} />;
}

type ComboboxPositionerProps = ComboboxPrimitive.Positioner.Props;

function ComboboxPositioner({ className, ...props }: ComboboxPositionerProps) {
  return (
    <ComboboxPrimitive.Positioner
      className={cn("z-50 select-none outline-none", className)}
      data-slot="combobox-positioner"
      {...props}
    />
  );
}

type ComboboxPopupProps = ComboboxPrimitive.Popup.Props &
  Pick<
    ComboboxPositionerProps,
    "align" | "alignOffset" | "side" | "sideOffset"
  >;

function ComboboxPopup({
  align = "center",
  alignOffset = 0,
  className,
  side = "bottom",
  sideOffset = 0,
  children,
  ...props
}: ComboboxPopupProps) {
  const { chipsRef, multiple } = useComboboxContext();

  return (
    <ComboboxPortal>
      <ComboboxPositioner
        align={align}
        alignOffset={alignOffset}
        anchor={multiple ? chipsRef : undefined}
        side={side}
        sideOffset={sideOffset}
      >
        <ComboboxPrimitive.Popup
          className={cn(
            "group relative flex max-h-full origin-(--transform-origin) overflow-hidden rounded-[16px] border border-border bg-popover text-popover-foreground shadow-md transition-[scale,opacity] will-change-[scale,opacity] duration-100 data-starting-style:scale-98 data-ending-style:scale-98 data-starting-style:opacity-0 data-ending-style:opacity-0",
            "[--safe-offset:calc(var(--anchor-height)+7px)]",
            "[&:not(:has([data-slot=combobox-input]))]:pointer-events-none",
            "data-[side=bottom]:not-has-data-[slot=combobox-input]:-translate-y-(--safe-offset) data-[side=bottom]:not-has-data-[slot=combobox-input]:pt-[calc(var(--anchor-height)+4px)]",
            "data-[side=top]:not-has-data-[slot=combobox-input]:translate-y-(--safe-offset) data-[side=top]:not-has-data-[slot=combobox-input]:pb-[calc(var(--anchor-height)+4px)]",
            className
          )}
          data-slot="combobox-popup"
          {...props}
        >
          <span className="pointer-events-auto flex min-w-0 max-h-[min(var(--available-height),20rem)] w-(--anchor-width) max-w-(--available-width) flex-col overflow-hidden not-has-data-[slot=combobox-input]:w-[calc(var(--anchor-width)+10px)] not-has-data-[slot=combobox-input]:max-w-[calc(var(--available-width)+10px)]">
            {children}
          </span>
        </ComboboxPrimitive.Popup>
      </ComboboxPositioner>
    </ComboboxPortal>
  );
}

function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props) {
  return (
    <ComboboxPrimitive.Empty
      className={cn(
        "px-2 py-3.5 text-center text-sm text-muted-foreground empty:m-0 empty:p-0",
        className
      )}
      data-slot="combobox-empty"
      {...props}
    />
  );
}

function ComboboxCollection(props: ComboboxPrimitive.Collection.Props) {
  return (
    <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />
  );
}

function ComboboxRow(props: ComboboxPrimitive.Row.Props) {
  return <ComboboxPrimitive.Row data-slot="combobox-row" {...props} />;
}

function ComboboxItem({
  className,
  children,
  ...props
}: ComboboxPrimitive.Item.Props) {
  return (
    <ComboboxPrimitive.Item
      className={cn(
        "group relative grid w-full min-w-0 cursor-pointer select-none grid-cols-[1rem_1fr] items-center gap-2 rounded-[12px] px-2 py-1.5 pe-4 text-sm outline-hidden data-disabled:pointer-events-none data-disabled:opacity-50",
        "data-highlighted:z-0 data-highlighted:text-accent-foreground data-highlighted:before:absolute data-highlighted:before:-inset-px data-highlighted:before:z-[-1] data-highlighted:before:rounded-[12px] data-highlighted:before:border data-highlighted:before:border-border/30 data-highlighted:before:bg-accent/70 dark:data-highlighted:before:bg-accent",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4",
        className
      )}
      data-slot="combobox-item"
      {...props}
    >
      <ComboboxPrimitive.ItemIndicator className="col-start-1">
        <CheckIcon />
      </ComboboxPrimitive.ItemIndicator>
      <div className="col-start-2">{children}</div>
    </ComboboxPrimitive.Item>
  );
}

function ComboboxGroup(props: ComboboxPrimitive.Group.Props) {
  return <ComboboxPrimitive.Group data-slot="combobox-group" {...props} />;
}

function ComboboxGroupLabel({
  className,
  ...props
}: ComboboxPrimitive.GroupLabel.Props) {
  return (
    <ComboboxPrimitive.GroupLabel
      className={cn(
        "sticky top-0 z-10 w-full bg-popover px-2 py-1.5 text-xs font-medium text-muted-foreground",
        className
      )}
      data-slot="combobox-group-label"
      {...props}
    />
  );
}

function ComboboxSeparator({
  className,
  ...props
}: ComboboxPrimitive.Separator.Props) {
  return (
    <ComboboxPrimitive.Separator
      className={cn("mx-2 my-1 h-px bg-border last:hidden", className)}
      data-slot="combobox-separator"
      {...props}
    />
  );
}

export {
  Combobox,
  ComboboxChip,
  ComboboxChipRemove,
  ComboboxChips,
  type ComboboxChipsProps,
  ComboboxClear,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxPopup,
  type ComboboxPopupProps,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxRow,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
};
