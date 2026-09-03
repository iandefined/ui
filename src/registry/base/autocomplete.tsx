"use client";

import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import {
  createContext,
  useContext,
  type ComponentProps,
  type Ref,
  type SVGProps,
} from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea, ScrollAreaContent } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const AutocompleteRoot = BaseAutocomplete.Root;

const PositionerContext = createContext<boolean>(false);

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

interface AutocompleteInputProps extends BaseAutocomplete.Input.Props {
  isClearable?: boolean;
  showClear?: boolean;
  showTrigger?: boolean;
}

function AutocompleteInput({
  className,
  isClearable = false,
  showClear = false,
  showTrigger = false,
  ...props
}: AutocompleteInputProps) {
  const hasClear = isClearable || showClear;
  const hasBoth = hasClear && showTrigger;

  return (
    <div
      className="relative w-full has-data-popup-open:z-[51]"
      data-slot="autocomplete-input-wrapper"
    >
      <BaseAutocomplete.Input
        className={cn(
          "relative rounded-[12px]",
          hasBoth ? "pe-14" : (hasClear || showTrigger) && "pe-8",
          className
        )}
        data-slot="autocomplete-input"
        render={<Input />}
        {...props}
      />
      {hasBoth ? (
        <div className="absolute end-1 top-1/2 z-10 flex -translate-y-1/2 items-center">
          <AutocompleteClear className="static translate-y-0" />
          <AutocompleteTrigger className="static translate-y-0" />
        </div>
      ) : (
        <>
          {showTrigger && <AutocompleteTrigger />}
          {hasClear && <AutocompleteClear />}
        </>
      )}
    </div>
  );
}

function AutocompleteLabel(props: ComponentProps<typeof Label>) {
  return <Label data-slot="autocomplete-label" {...props} />;
}

function AutocompleteTrigger({
  className,
  children,
  ...props
}: BaseAutocomplete.Trigger.Props) {
  return (
    <BaseAutocomplete.Trigger
      aria-label="Toggle options"
      className={cn(
        "group absolute end-1 top-1/2 z-10 inline-flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md border border-transparent outline-none has-[+[data-slot=autocomplete-clear]]:hidden [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4.5 sm:size-7 sm:[&_svg:not([class*='size-'])]:size-4",
        className
      )}
      data-slot="autocomplete-trigger"
      {...props}
    >
      {children ?? <ChevronsUpDownIcon />}
    </BaseAutocomplete.Trigger>
  );
}

function AutocompleteIcon({
  className,
  ...props
}: ComponentProps<typeof BaseAutocomplete.Icon>) {
  return (
    <BaseAutocomplete.Icon
      className={cn("ml-2 size-4 shrink-0 opacity-50", className)}
      data-slot="autocomplete-icon"
      {...props}
    />
  );
}

function AutocompleteClear({
  className,
  children,
  ...props
}: BaseAutocomplete.Clear.Props) {
  return (
    <BaseAutocomplete.Clear
      aria-label="Clear selection"
      className={cn(
        "absolute end-1 top-1/2 z-10 inline-flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md border border-transparent outline-none transition-[scale,opacity] data-ending-style:scale-98 data-ending-style:opacity-0 data-starting-style:scale-98 data-starting-style:opacity-0 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4.5 sm:size-7 sm:[&_svg:not([class*='size-'])]:size-4",
        className
      )}
      data-slot="autocomplete-clear"
      {...props}
    >
      {children ?? <CloseIcon />}
    </BaseAutocomplete.Clear>
  );
}

function AutocompleteValue(props: BaseAutocomplete.Value.Props) {
  return <BaseAutocomplete.Value data-slot="autocomplete-value" {...props} />;
}

function AutocompletePortal(props: BaseAutocomplete.Portal.Props) {
  return <BaseAutocomplete.Portal data-slot="autocomplete-portal" {...props} />;
}

function AutocompleteBackdrop({
  className,
  ...props
}: BaseAutocomplete.Backdrop.Props) {
  return (
    <BaseAutocomplete.Backdrop
      className={cn(
        "fixed inset-0 z-30 bg-black/50 data-ending-style:opacity-0 data-starting-style:opacity-0",
        className
      )}
      data-slot="autocomplete-backdrop"
      {...props}
    />
  );
}

type AutocompletePositionerProps = BaseAutocomplete.Positioner.Props;

function AutocompletePositioner({
  className,
  sideOffset = 0,
  ...props
}: AutocompletePositionerProps) {
  return (
    <PositionerContext.Provider value={true}>
      <BaseAutocomplete.Positioner
        className={cn("z-50 select-none outline-none", className)}
        data-slot="autocomplete-positioner"
        sideOffset={sideOffset}
        {...props}
      />
    </PositionerContext.Provider>
  );
}

interface AutocompletePopupProps
  extends
    BaseAutocomplete.Popup.Props,
    Pick<
      AutocompletePositionerProps,
      "align" | "alignOffset" | "side" | "sideOffset"
    > {}

function AutocompletePopup({
  align = "center",
  alignOffset = 0,
  className,
  side = "bottom",
  sideOffset = 0,
  children,
  ...props
}: AutocompletePopupProps) {
  const hasPositioner = useContext(PositionerContext);

  const popupContent = (
    <BaseAutocomplete.Popup
      className={cn(
        "group relative flex max-h-full origin-(--transform-origin) overflow-hidden rounded-[16px] border border-border bg-popover text-popover-foreground shadow-md transition-[scale,opacity] duration-100 will-change-[scale,opacity] data-ending-style:scale-98 data-ending-style:opacity-0 data-starting-style:scale-98 data-starting-style:opacity-0",
        "[--safe-offset:calc(var(--anchor-height)+7px)]",
        "[&:not(:has([data-slot=autocomplete-input]))]:pointer-events-none",
        "data-[side=bottom]:not-has-data-[slot=autocomplete-input]:-translate-y-(--safe-offset) data-[side=bottom]:not-has-data-[slot=autocomplete-input]:pt-(--safe-offset)",
        "data-[side=top]:not-has-data-[slot=autocomplete-input]:translate-y-(--safe-offset) data-[side=top]:not-has-data-[slot=autocomplete-input]:pb-(--safe-offset)",
        className
      )}
      data-slot="autocomplete-popup"
      {...props}
    >
      <span className="pointer-events-auto flex max-h-[min(var(--available-height),20rem)] w-(--anchor-width) max-w-(--available-width) flex-col overflow-hidden not-has-data-[slot=autocomplete-input]:w-[calc(var(--anchor-width)+10px)] not-has-data-[slot=autocomplete-input]:max-w-[calc(var(--available-width)+10px)]">
        {children}
      </span>
    </BaseAutocomplete.Popup>
  );

  if (hasPositioner) {
    return popupContent;
  }

  return (
    <AutocompletePortal>
      <AutocompletePositioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        {popupContent}
      </AutocompletePositioner>
    </AutocompletePortal>
  );
}

function AutocompleteArrow({
  className,
  ...props
}: BaseAutocomplete.Arrow.Props) {
  return (
    <BaseAutocomplete.Arrow
      className={cn(
        "data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180",
        className
      )}
      data-slot="autocomplete-arrow"
      {...props}
    >
      <svg fill="none" height="10" viewBox="0 0 20 10" width="20">
        <path
          className="fill-popover"
          d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V9H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
        />
        <path
          className="fill-border/70"
          d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z"
        />
      </svg>
    </BaseAutocomplete.Arrow>
  );
}

function AutocompleteStatus({
  className,
  ...props
}: BaseAutocomplete.Status.Props) {
  return (
    <BaseAutocomplete.Status
      className={cn(
        "text-muted-foreground px-3 py-2 text-sm leading-5 empty:m-0 empty:p-0",
        className
      )}
      data-slot="autocomplete-status"
      {...props}
    />
  );
}

function AutocompleteEmpty({
  className,
  ...props
}: BaseAutocomplete.Empty.Props) {
  return (
    <BaseAutocomplete.Empty
      className={cn(
        "px-2 py-2.5 text-center text-sm text-muted-foreground empty:m-0 empty:p-0",
        className
      )}
      data-slot="autocomplete-empty"
      {...props}
    />
  );
}

interface AutocompleteListProps extends BaseAutocomplete.List.Props {
  hideScrollbar?: boolean;
  scrollShadow?: "vertical" | "horizontal" | "both" | "none";
}

function AutocompleteList({
  className,
  hideScrollbar = false,
  scrollShadow = "vertical",
  ...props
}: AutocompleteListProps) {
  return (
    <ScrollArea
      className="min-h-0 flex-1 border-0 has-[[data-empty]]:hidden [&>[data-slot=scroll-area-vertical-shadow]]:[--scroll-area-fade:var(--popover)] [&>[data-slot=scroll-area-vertical-shadow]]:after:rounded-none [&>[data-slot=scroll-area-vertical-shadow]]:before:rounded-none"
      hideScrollbar={hideScrollbar}
      scrollShadow={scrollShadow}
    >
      <ScrollAreaContent>
        <BaseAutocomplete.List
          className={cn(
            "not-empty:p-1 not-empty:scroll-py-1 data-[empty]:hidden",
            className
          )}
          data-slot="autocomplete-list"
          {...props}
        />
      </ScrollAreaContent>
    </ScrollArea>
  );
}

function AutocompleteCollection(props: BaseAutocomplete.Collection.Props) {
  return (
    <BaseAutocomplete.Collection
      data-slot="autocomplete-collection"
      {...props}
    />
  );
}

function AutocompleteRow({ className, ...props }: BaseAutocomplete.Row.Props) {
  return (
    <BaseAutocomplete.Row
      className={cn("flex", className)}
      data-slot="autocomplete-row"
      {...props}
    />
  );
}

function AutocompleteItem({
  className,
  children,
  ref,
  ...props
}: BaseAutocomplete.Item.Props & {
  ref?: Ref<HTMLDivElement>;
}) {
  return (
    <BaseAutocomplete.Item
      className={cn(
        "relative flex w-full min-w-0 cursor-pointer select-none items-center gap-2 rounded-[12px] px-2 py-1.5 text-sm outline-hidden data-disabled:pointer-events-none data-disabled:opacity-50",
        "data-highlighted:z-0 data-highlighted:text-accent-foreground data-highlighted:before:absolute data-highlighted:before:-inset-px data-highlighted:before:z-[-1] data-highlighted:before:rounded-[12px] data-highlighted:before:border data-highlighted:before:border-border/30 data-highlighted:before:bg-accent/70 dark:data-highlighted:before:bg-accent",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4",
        className
      )}
      data-slot="autocomplete-item"
      ref={ref}
      {...props}
    >
      {children}
    </BaseAutocomplete.Item>
  );
}

function AutocompleteGroup({
  className,
  ...props
}: BaseAutocomplete.Group.Props) {
  return (
    <BaseAutocomplete.Group
      className={cn("text-foreground block", className)}
      data-slot="autocomplete-group"
      {...props}
    />
  );
}

function AutocompleteGroupLabel({
  className,
  ...props
}: BaseAutocomplete.GroupLabel.Props) {
  return (
    <BaseAutocomplete.GroupLabel
      className={cn(
        "sticky top-0 z-20 w-full bg-popover px-2 py-1.5 text-xs font-medium text-muted-foreground",
        className
      )}
      data-slot="autocomplete-group-label"
      {...props}
    />
  );
}

function AutocompleteSeparator({
  className,
  ...props
}: BaseAutocomplete.Separator.Props) {
  return (
    <BaseAutocomplete.Separator
      className={cn("mx-2 my-1 h-px bg-border last:hidden", className)}
      data-slot="autocomplete-separator"
      {...props}
    />
  );
}

const Autocomplete = Object.assign(AutocompleteRoot, {
  Arrow: AutocompleteArrow,
  Backdrop: AutocompleteBackdrop,
  Clear: AutocompleteClear,
  Collection: AutocompleteCollection,
  Empty: AutocompleteEmpty,
  Group: AutocompleteGroup,
  GroupLabel: AutocompleteGroupLabel,
  Icon: AutocompleteIcon,
  Input: AutocompleteInput,
  Item: AutocompleteItem,
  Label: AutocompleteLabel,
  List: AutocompleteList,
  Popup: AutocompletePopup,
  Portal: AutocompletePortal,
  Positioner: AutocompletePositioner,
  Root: AutocompleteRoot,
  Row: AutocompleteRow,
  Separator: AutocompleteSeparator,
  Status: AutocompleteStatus,
  Trigger: AutocompleteTrigger,
  Value: AutocompleteValue,
});

const useAutocompleteFilter = BaseAutocomplete.useFilter;
const useAutocompleteFilteredItems = BaseAutocomplete.useFilteredItems;

export {
  Autocomplete,
  AutocompleteArrow,
  AutocompleteBackdrop,
  AutocompleteClear,
  AutocompleteCollection,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteIcon,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteLabel,
  AutocompleteList,
  AutocompletePopup,
  AutocompletePortal,
  AutocompletePositioner,
  AutocompleteRoot,
  AutocompleteRow,
  AutocompleteSeparator,
  AutocompleteStatus,
  AutocompleteTrigger,
  AutocompleteValue,
  useAutocompleteFilter,
  useAutocompleteFilteredItems,
};
