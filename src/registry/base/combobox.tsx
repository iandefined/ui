"use client";

// Adapted from Pure UI: https://github.com/MusKRI/pure-ui/tree/main/src/registry/pure-ui/ui/combobox

import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import {
  createContext,
  useContext,
  useRef,
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

function Combobox<Value, Multiple extends boolean | undefined = false>(
  props: ComboboxProps<Value, Multiple>
) {
  const chipsRef = useRef<HTMLDivElement | null>(null);
  return (
    <ComboboxContext.Provider
      value={{ chipsRef, multiple: Boolean(props.multiple) }}
    >
      <ComboboxPrimitive.Root data-slot="combobox" {...props} />
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
  const { multiple } = useComboboxContext();

  if (multiple) {
    return (
      <ComboboxPrimitive.Input
        className={cn(
          "min-w-12 flex-1 bg-transparent ps-2 text-base outline-none [[data-slot=combobox-chip]+&]:ps-0.5 sm:text-sm",
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
          className="absolute end-1 top-1/2 z-10 inline-flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md border border-transparent outline-none transition-[scale,opacity] data-ending-style:scale-98 data-ending-style:opacity-0 data-starting-style:scale-98 data-starting-style:opacity-0 in-data-[slot=combobox-chips]:hidden [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4.5 sm:size-7 sm:[&_svg:not([class*='size-'])]:size-4"
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

function ComboboxChips({ className, ...props }: ComboboxPrimitive.Chips.Props) {
  const { chipsRef } = useComboboxContext();

  return (
    <ComboboxPrimitive.Chips
      className={cn(
        "relative inline-flex min-h-9 w-full flex-wrap items-center gap-1 rounded-[12px] border border-input bg-background px-1 py-1 text-base/5 shadow-xs outline-0 outline-offset-0 outline-transparent outline-solid transition-[border-color,outline-width,outline-offset,outline-color] duration-100 ease-out has-data-popup-open:z-[51] focus-within:border-ring focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ring/50 data-invalid:border-destructive data-invalid:outline-2 data-invalid:outline-offset-2 data-invalid:outline-destructive/50 focus-within:data-invalid:outline-destructive/50 dark:bg-input/32 sm:text-sm",
        className
      )}
      data-slot="combobox-chips"
      ref={chipsRef}
      {...props}
    />
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
        "relative flex items-center gap-1 rounded-md bg-secondary border px-2 py-0.25 text-xs",
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
        "cursor-pointer rounded-md p-1 text-inherit hover:bg-secondary [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 sm:[&_svg:not([class*='size-'])]:size-3.5",
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
      className="min-h-0 flex-1 border-0 has-[[data-empty]]:hidden [&>[data-slot=scroll-area-vertical-shadow]]:[--scroll-area-fade:var(--popover)] [&>[data-slot=scroll-area-vertical-shadow]]:after:rounded-none [&>[data-slot=scroll-area-vertical-shadow]]:before:rounded-none"
      scrollShadow="vertical"
    >
      <ScrollAreaContent>
        <ComboboxPrimitive.List
          className={cn(
            "not-empty:p-1 not-empty:scroll-py-1 data-[empty]:hidden",
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
  const { chipsRef } = useComboboxContext();
  return (
    <ComboboxPortal>
      <ComboboxPositioner
        align={align}
        alignOffset={alignOffset}
        anchor={chipsRef}
        side={side}
        sideOffset={sideOffset}
      >
        <ComboboxPrimitive.Popup
          className={cn(
            "group relative flex max-h-full origin-(--transform-origin) overflow-hidden rounded-[16px] border border-border bg-popover text-popover-foreground shadow-md transition-[scale,opacity] duration-100 will-change-[scale,opacity] data-ending-style:scale-98 data-ending-style:opacity-0 data-starting-style:scale-98 data-starting-style:opacity-0",
            "[--safe-offset:calc(var(--anchor-height)+7px)]",
            "[&:not(:has([data-slot=combobox-input]))]:pointer-events-none",
            "data-[side=bottom]:not-has-data-[slot=combobox-input]:-translate-y-(--safe-offset) data-[side=bottom]:not-has-data-[slot=combobox-input]:pt-(--safe-offset)",
            "data-[side=top]:not-has-data-[slot=combobox-input]:translate-y-(--safe-offset) data-[side=top]:not-has-data-[slot=combobox-input]:pb-(--safe-offset)",
            className
          )}
          data-slot="combobox-popup"
          {...props}
        >
          <span className="pointer-events-auto flex max-h-[min(var(--available-height),20rem)] w-(--anchor-width) max-w-(--available-width) flex-col overflow-hidden not-has-data-[slot=combobox-input]:w-[calc(var(--anchor-width)+10px)] not-has-data-[slot=combobox-input]:max-w-[calc(var(--available-width)+10px)]">
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
        "px-2 py-2.5 text-center text-sm text-muted-foreground empty:m-0 empty:p-0",
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
        "sticky top-0 z-20 w-full bg-popover px-2 py-1.5 text-xs font-medium text-muted-foreground",
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
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxRow,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
};
