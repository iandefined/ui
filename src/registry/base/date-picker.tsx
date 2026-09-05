"use client";

import {
  DatePicker as DatePickerPrimitive,
  useDatePickerContext,
} from "@ark-ui/react/date-picker";
import { Portal } from "@ark-ui/react/portal";
import { mergeProps } from "@base-ui/react/merge-props";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { useRender } from "@base-ui/react/use-render";
import {
  Calendar,
  ChevronDownIcon,
  ChevronUpIcon,
  Clock,
  XIcon,
} from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
} from "react";

import { Button, type ButtonProps } from "@/components/ui/button";
import {
  CalendarContent,
  type CalendarContentProps,
} from "@/components/ui/calendar";
import { DateInput, type DateInputProps } from "@/components/ui/date-input";
import { Label } from "@/components/ui/label";
import {
  adaptDatePickerProps,
  formatDate,
  fromDateValue,
  toDateValue,
  useResponsiveCalendarMonths,
  type DatePickerRootDateProps,
} from "@/lib/date";
import { cn } from "@/lib/utils";

export type DatePickerProps = Omit<DatePickerRootDateProps, "inline">;

const DatePickerControlContext = createContext(false);
const DatePickerInputContext = createContext<
  Pick<DatePickerProps, "locale" | "timeZone" | "min" | "max">
>({});

export type DatePickerControlProps = ComponentProps<
  typeof DatePickerPrimitive.Control
>;
function DatePickerControl({ className, ...props }: DatePickerControlProps) {
  return (
    <DatePickerControlContext value={true}>
      <DatePickerPrimitive.Control
        data-slot="date-picker-control"
        className={cn("flex items-center gap-2", className)}
        {...props}
      />
    </DatePickerControlContext>
  );
}

function DatePicker({
  className,
  selectionMode = "single",
  positioning,
  numOfMonths,
  ...props
}: DatePickerProps) {
  const visibleMonths = useResponsiveCalendarMonths(numOfMonths);
  return (
    <DatePickerInputContext
      value={{
        locale: props.locale,
        timeZone: props.timeZone,
        min: props.min,
        max: props.max,
      }}
    >
      <DatePickerPrimitive.Root
        fixedWeeks
        lazyMount
        unmountOnExit
        closeOnSelect={selectionMode !== "multiple"}
        {...adaptDatePickerProps(props)}
        selectionMode={selectionMode}
        numOfMonths={visibleMonths}
        positioning={{ placement: "bottom-start", gutter: 4, ...positioning }}
        className={cn(
          selectionMode === "multiple"
            ? "w-full max-w-sm space-y-2"
            : "w-fit max-w-full space-y-2",
          className
        )}
        data-slot="date-picker"
      />
    </DatePickerInputContext>
  );
}

export type DatePickerLabelProps = ComponentProps<typeof Label>;
function DatePickerLabel({ className, ...props }: DatePickerLabelProps) {
  return (
    <DatePickerPrimitive.Label asChild>
      <Label
        data-slot="date-picker-label"
        className={cn("data-disabled:opacity-64", className)}
        {...props}
      />
    </DatePickerPrimitive.Label>
  );
}

export type DatePickerTriggerProps = Omit<ButtonProps, "color">;
function DatePickerTrigger({
  children,
  className,
  size = "default",
  ...props
}: DatePickerTriggerProps) {
  const hasControl = useContext(DatePickerControlContext);
  const picker = useDatePickerContext();

  if (picker.selectionMode === "multiple") {
    return (
      <DatePickerChips
        className={typeof className === "function" ? undefined : className}
        {...(props as DatePickerChipsProps)}
      >
        {children ?? <DatePickerValue />}
      </DatePickerChips>
    );
  }

  const trigger = (
    <DatePickerPrimitive.Trigger asChild>
      <Button
        variant="outline"
        type="button"
        className={cn(
          "gap-2 font-normal tabular-nums data-invalid:border-destructive data-invalid:outline-2 data-invalid:outline-offset-2 data-invalid:outline-destructive/50 motion-reduce:transition-none",
          size.startsWith("icon") ? "justify-center hitbox-2" : "justify-start",
          className
        )}
        data-slot="date-picker-trigger"
        size={size}
        data-invalid={picker.invalid ? "" : undefined}
        aria-invalid={picker.invalid || undefined}
        disabled={picker.disabled || picker.readOnly}
        {...props}
      >
        {children ?? (
          <>
            <Calendar
              className="size-4 shrink-0 text-muted-foreground"
              aria-hidden="true"
            />
            <DatePickerValue />
          </>
        )}
      </Button>
    </DatePickerPrimitive.Trigger>
  );
  return hasControl ? (
    trigger
  ) : (
    <DatePickerControl className="w-fit">{trigger}</DatePickerControl>
  );
}

export type DatePickerChipsProps = ComponentProps<"div"> & {
  overflowBehavior?: "wrap" | "wrap-when-open" | "cutoff";
  maxCount?: number;
};
function DatePickerChips({
  children,
  className,
  overflowBehavior = "wrap-when-open",
  maxCount,
  onFocus,
  onBlur,
  ...props
}: DatePickerChipsProps) {
  const hasControl = useContext(DatePickerControlContext);
  const picker = useDatePickerContext();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const overflowBadgeRef = useRef<HTMLSpanElement | null>(null);
  const [overflowAmount, setOverflowAmount] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  const isSelecting = picker.open || isFocused;
  const shouldWrap =
    overflowBehavior === "wrap" ||
    (overflowBehavior === "wrap-when-open" && isSelecting);

  const checkOverflow = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll<HTMLElement>(
      "[data-slot=date-picker-chip]"
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
  }, [shouldWrap, maxCount]);

  useEffect(() => {
    checkOverflow();
  }, [checkOverflow, picker.value]);

  useEffect(() => {
    const container = containerRef.current;
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
  }, [checkOverflow]);

  const chips = (
    <DatePickerPrimitive.Trigger asChild>
      <div
        ref={containerRef}
        role="button"
        tabIndex={picker.disabled ? undefined : 0}
        data-slot="date-picker-chips"
        data-state={picker.open ? "open" : "closed"}
        data-invalid={picker.invalid ? "" : undefined}
        data-disabled={picker.disabled || picker.readOnly ? "" : undefined}
        className={cn(
          "relative inline-flex w-full min-w-48 cursor-pointer items-center gap-1 rounded-[12px] border border-input bg-background px-1.5 py-1 text-base/5 shadow-xs outline-0 outline-offset-0 outline-transparent outline-solid transition-[border-color,outline-width,outline-offset,outline-color] duration-100 ease-out has-data-popup-open:z-[51] focus-within:border-ring focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ring/50 data-[state=open]:border-ring data-invalid:border-destructive data-invalid:outline-2 data-invalid:outline-offset-2 data-invalid:outline-destructive/50 data-disabled:pointer-events-none data-disabled:opacity-64 dark:bg-input/32 sm:text-sm",
          shouldWrap
            ? "min-h-9 flex-wrap"
            : "h-9 min-h-9 flex-nowrap overflow-hidden",
          className
        )}
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
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            if (
              (e.target as HTMLElement).closest(
                "[data-slot=date-picker-chip-remove]"
              )
            ) {
              return;
            }
            e.preventDefault();
            picker.setOpen(!picker.open);
          }
        }}
        {...props}
      >
        {children ?? <DatePickerValue />}
        <span
          ref={overflowBadgeRef}
          data-slot="date-picker-overflow"
          style={{ display: overflowAmount > 0 ? undefined : "none" }}
          className="relative inline-flex h-6 shrink-0 items-center justify-center rounded-md border border-border bg-secondary px-2 text-xs tabular-nums select-none"
        >
          +{overflowAmount}
        </span>
      </div>
    </DatePickerPrimitive.Trigger>
  );

  return hasControl ? (
    chips
  ) : (
    <DatePickerControl className="w-full max-w-full">{chips}</DatePickerControl>
  );
}

export type DatePickerChipProps = ComponentProps<"div"> & {
  onRemove?: () => void;
  disabled?: boolean;
};
function DatePickerChip({
  className,
  children,
  onRemove,
  disabled,
  ...props
}: DatePickerChipProps) {
  const picker = useDatePickerContext();
  const isDisabled = disabled || picker.disabled || picker.readOnly;
  return (
    <div
      className={cn(
        "relative flex h-6 shrink-0 items-center rounded-md bg-secondary border px-2 pr-1 text-xs tabular-nums select-none",
        className
      )}
      data-slot="date-picker-chip"
      {...props}
    >
      {children}
      {onRemove && (
        <DatePickerChipRemove
          disabled={isDisabled}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRemove();
          }}
        />
      )}
    </div>
  );
}

export type DatePickerChipRemoveProps = ComponentProps<"button">;
function DatePickerChipRemove({
  className,
  children,
  ...props
}: DatePickerChipRemoveProps) {
  return (
    <button
      type="button"
      aria-label="Remove"
      className={cn(
        "cursor-pointer rounded-md p-0.5 text-inherit hover:bg-secondary/80 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
        className
      )}
      data-slot="date-picker-chip-remove"
      {...props}
    >
      {children ?? <XIcon aria-hidden="true" />}
    </button>
  );
}

export type DatePickerValueProps = Omit<
  ComponentProps<typeof DatePickerPrimitive.ValueText>,
  "children"
> & {
  children?:
    | React.ReactNode
    | ((details: {
        value: Date;
        index: number;
        valueAsString: string;
        remove: () => void;
      }) => React.ReactNode);
  format?: string | Intl.DateTimeFormatOptions | ((date: Date) => string);
};
function DatePickerValue({
  className,
  children,
  format,
  placeholder = "Pick a date",
  separator,
  ...props
}: DatePickerValueProps) {
  const picker = useDatePickerContext();
  const hasValue = picker.value.length > 0;

  if (typeof children === "function") {
    if (!hasValue) {
      return (
        <span
          className={cn("min-w-0 truncate text-muted-foreground", className)}
          data-slot="date-picker-value"
        >
          {placeholder}
        </span>
      );
    }
    return (
      <>
        {picker.value.map((dateValue, index) =>
          children({
            value: fromDateValue(dateValue),
            index,
            valueAsString: picker.valueAsString[index],
            remove: () => {
              picker.setValue(picker.value.filter((_, i) => i !== index));
            },
          })
        )}
      </>
    );
  }

  if (picker.selectionMode === "multiple") {
    if (!hasValue) {
      return (
        <span
          className={cn(
            "min-w-0 truncate px-1 py-0.5 text-muted-foreground",
            className
          )}
          data-slot="date-picker-value"
        >
          {placeholder}
        </span>
      );
    }
    return (
      <>
        {picker.value.map((dateValue, index) => {
          const dateObj = fromDateValue(dateValue);
          const label = format
            ? formatDate(dateObj, format)
            : picker.valueAsString[index];
          return (
            <DatePickerChip
              key={dateValue.toString()}
              onRemove={() => {
                picker.setValue(picker.value.filter((_, i) => i !== index));
              }}
            >
              {label}
            </DatePickerChip>
          );
        })}
      </>
    );
  }

  if (children !== undefined) {
    return (
      <span
        data-scope="date-picker"
        data-part="value-text"
        data-slot="date-picker-value"
        className={cn("min-w-0 truncate tabular-nums", className)}
        {...props}
      >
        {children}
      </span>
    );
  }

  const rangeSeparator =
    separator ?? (picker.selectionMode === "range" ? " – " : ", ");

  if (format) {
    if (!hasValue) {
      return (
        <span
          data-scope="date-picker"
          data-part="value-text"
          data-slot="date-picker-value"
          className={cn(
            "min-w-0 truncate tabular-nums text-muted-foreground",
            className
          )}
          {...props}
        >
          {placeholder}
        </span>
      );
    }
    return (
      <span
        data-scope="date-picker"
        data-part="value-text"
        data-slot="date-picker-value"
        className={cn("min-w-0 truncate tabular-nums", className)}
        {...props}
      >
        {picker.value
          .map((dateValue) => formatDate(fromDateValue(dateValue), format))
          .join(rangeSeparator)}
      </span>
    );
  }

  return (
    <DatePickerPrimitive.ValueText
      data-slot="date-picker-value"
      className={cn(
        "min-w-0 truncate tabular-nums data-placeholder:text-muted-foreground",
        className
      )}
      placeholder={placeholder}
      separator={rangeSeparator}
      {...props}
    />
  );
}

export type DatePickerInputProps = Omit<
  DateInputProps,
  | "value"
  | "defaultValue"
  | "onValueChange"
  | "selectionMode"
  | "locale"
  | "timeZone"
  | "min"
  | "max"
  | "isDateUnavailable"
  | "endAdornment"
  | "granularity"
  | "timeOnly"
> & {
  index?: number;
  showTrigger?: boolean;
};
function DatePickerInput({
  className,
  size = "default",
  index = 0,
  showTrigger,
  ...props
}: DatePickerInputProps) {
  const hasControl = useContext(DatePickerControlContext);
  const picker = useDatePickerContext();
  const settings = useContext(DatePickerInputContext);
  const inputProps = picker.getInputProps({ index });
  const selectedValue = picker.value[index];
  const shouldShowTrigger =
    showTrigger ?? (picker.selectionMode === "range" || index === 0);
  const input = (
    <DateInput
      {...props}
      {...settings}
      className={className}
      data-slot="date-picker-input"
      size={size}
      id={props.id ?? inputProps.id}
      aria-labelledby={
        props["aria-label"]
          ? undefined
          : (props["aria-labelledby"] ?? picker.getLabelProps({ index }).id)
      }
      disabled={picker.disabled || props.disabled}
      readOnly={picker.readOnly || props.readOnly}
      invalid={picker.invalid || props.invalid}
      required={inputProps.required || props.required}
      name={props.name ?? inputProps.name}
      selectionMode="single"
      value={selectedValue ? [fromDateValue(selectedValue)] : []}
      defaultPlaceholderValue={fromDateValue(picker.focusedValue)}
      isDateUnavailable={(date) => picker.isUnavailable(toDateValue(date))}
      onValueChange={({ value }) => {
        const nextValue = [...picker.value];
        const date = value[0];
        if (date) {
          const nextDate = toDateValue(date);
          // Retain a separately selected time when editing only the date segments.
          nextValue[index] = selectedValue
            ? selectedValue.set({
                year: nextDate.year,
                month: nextDate.month,
                day: nextDate.day,
              })
            : nextDate;
          picker.setValue(nextValue.filter(Boolean));
          picker.setFocusedValue(nextValue[index]);
        } else {
          nextValue.splice(index, 1);
          picker.setValue(nextValue);
        }
      }}
      endAdornment={
        shouldShowTrigger && (
          <DatePickerTrigger
            aria-label={
              index === 0
                ? "Open start date calendar"
                : "Open end date calendar"
            }
            className="-me-1 shrink-0 hitbox-2"
            id={`${inputProps.id}-trigger`}
            size="icon-xs"
            variant="ghost"
          >
            <Calendar aria-hidden="true" />
          </DatePickerTrigger>
        )
      }
    />
  );
  return hasControl ? input : <DatePickerControl>{input}</DatePickerControl>;
}

export type DatePickerContentProps = ComponentProps<
  typeof DatePickerPrimitive.Content
> & { reduceMotion?: boolean };
function DatePickerContent({
  children,
  className,
  reduceMotion = false,
  ...props
}: DatePickerContentProps) {
  return (
    <Portal>
      <DatePickerPrimitive.Positioner
        className="z-50"
        data-slot="date-picker-positioner"
      >
        <DatePickerPrimitive.Content
          className={cn(
            "pointer-events-auto z-50 max-h-[var(--available-height)] max-w-[var(--available-width)] origin-(--transform-origin) overflow-auto rounded-lg border border-border bg-popover p-4 text-popover-foreground shadow-md outline-none",
            !reduceMotion &&
              "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-80 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-80 duration-[0.35s] ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:animate-none",
            className
          )}
          data-slot="date-picker-content"
          {...props}
        >
          {children ?? <DatePickerCalendar />}
        </DatePickerPrimitive.Content>
      </DatePickerPrimitive.Positioner>
    </Portal>
  );
}

export type DatePickerCalendarProps = CalendarContentProps;
function DatePickerCalendar(props: DatePickerCalendarProps) {
  return <CalendarContent data-slot="date-picker-calendar" {...props} />;
}

function parseTime24(
  timeStr?: string
): { hour: number; minute: number } | null {
  if (!timeStr) return null;
  const match = timeStr.trim().match(/^(\d{1,2}):(\d{2})/);
  if (!match) return null;
  const hour = parseInt(match[1], 10);
  const minute = parseInt(match[2], 10);
  if (
    isNaN(hour) ||
    isNaN(minute) ||
    hour < 0 ||
    hour > 23 ||
    minute < 0 ||
    minute > 59
  ) {
    return null;
  }
  return { hour, minute };
}

function to12Hour(hour24: number): { hour12: string; period: "AM" | "PM" } {
  const period: "AM" | "PM" = hour24 >= 12 ? "PM" : "AM";
  let h = hour24 % 12;
  if (h === 0) h = 12;
  return { hour12: String(h).padStart(2, "0"), period };
}

function to24Hour(hour12: number, period: "AM" | "PM"): number {
  let h = hour12 % 12;
  if (period === "PM") h += 12;
  return h;
}

type DatePickerTimerScrollColumnProps = {
  ariaLabel: string;
  items: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
  itemClassName: string;
  open: boolean;
  reduceMotion: boolean;
};

function DatePickerTimerScrollColumn({
  ariaLabel,
  items,
  selectedValue,
  onSelect,
  itemClassName,
  open,
  reduceMotion,
}: DatePickerTimerScrollColumnProps) {
  const columnRef = useRef<HTMLDivElement>(null);
  const autoScrollTimeoutRef = useRef<number | null>(null);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);

  useEffect(() => {
    const column = columnRef.current;
    if (!column) return;

    const updateScrollState = () => {
      setCanScrollUp(column.scrollTop > 0);
      setCanScrollDown(
        column.scrollTop + column.clientHeight < column.scrollHeight - 1
      );
    };

    updateScrollState();
    column.addEventListener("scroll", updateScrollState, { passive: true });

    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(column);

    return () => {
      column.removeEventListener("scroll", updateScrollState);
      resizeObserver.disconnect();
    };
  }, [items.length]);

  useEffect(() => {
    if (!open) return;

    const frame = requestAnimationFrame(() => {
      const column = columnRef.current;
      const selected = column?.querySelector<HTMLElement>("[data-selected]");
      if (!column || !selected) return;

      column.scrollTop =
        selected.offsetTop - (column.clientHeight - selected.clientHeight) / 2;
    });

    return () => cancelAnimationFrame(frame);
  }, [open, selectedValue]);

  const stopAutoScroll = useCallback(() => {
    if (autoScrollTimeoutRef.current !== null) {
      window.clearTimeout(autoScrollTimeoutRef.current);
      autoScrollTimeoutRef.current = null;
    }
  }, []);

  const startAutoScroll = useCallback(
    (direction: "up" | "down") => {
      if (reduceMotion || autoScrollTimeoutRef.current !== null) return;

      const scroll = () => {
        const column = columnRef.current;
        if (!column) return;

        const maxScrollTop = Math.max(
          0,
          column.scrollHeight - column.clientHeight
        );
        const scrollTop = Math.min(Math.max(column.scrollTop, 0), maxScrollTop);
        const isAtEdge = scrollTop === (direction === "up" ? 0 : maxScrollTop);
        if (isAtEdge) {
          stopAutoScroll();
          return;
        }

        const items = Array.from(
          column.querySelectorAll<HTMLElement>("[role=option]")
        );
        const scrollArrowHeight = 24;
        let nextScrollTop = direction === "up" ? 0 : maxScrollTop;

        if (direction === "up") {
          let firstVisibleIndex = 0;
          const visibleTop = scrollTop + scrollArrowHeight - 1;
          for (let i = 0; i < items.length; i += 1) {
            const item = items[i];
            if (item && item.offsetTop >= visibleTop) {
              firstVisibleIndex = i;
              break;
            }
          }
          const target = items[Math.max(0, firstVisibleIndex - 1)];
          if (target) {
            nextScrollTop = Math.max(0, target.offsetTop - scrollArrowHeight);
          }
        } else {
          let lastVisibleIndex = items.length - 1;
          const visibleBottom =
            scrollTop + column.clientHeight - scrollArrowHeight + 1;
          for (let i = 0; i < items.length; i += 1) {
            const item = items[i];
            if (item && item.offsetTop + item.offsetHeight > visibleBottom) {
              lastVisibleIndex = Math.max(0, i - 1);
              break;
            }
          }
          const target =
            items[Math.min(items.length - 1, lastVisibleIndex + 1)];
          if (target) {
            nextScrollTop = Math.min(
              maxScrollTop,
              target.offsetTop +
                target.offsetHeight -
                column.clientHeight +
                scrollArrowHeight
            );
          }
        }

        if (nextScrollTop === scrollTop) {
          stopAutoScroll();
          return;
        }

        column.scrollTop = nextScrollTop;
        autoScrollTimeoutRef.current = window.setTimeout(scroll, 40);
      };

      autoScrollTimeoutRef.current = window.setTimeout(scroll, 40);
    },
    [reduceMotion, stopAutoScroll]
  );

  useEffect(() => stopAutoScroll, [stopAutoScroll]);

  const scrollColumn = (direction: "up" | "down") => {
    const column = columnRef.current;
    if (!column) return;

    stopAutoScroll();
    const distance = column.clientHeight / 2;
    const nextTop = Math.min(
      Math.max(
        column.scrollTop + (direction === "up" ? -distance : distance),
        0
      ),
      column.scrollHeight - column.clientHeight
    );

    column.scrollTo({
      top: nextTop,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <div className="relative h-full py-1">
      <div
        ref={columnRef}
        aria-label={ariaLabel}
        role="listbox"
        data-slot="date-picker-timer-column"
        className="relative flex h-full flex-col gap-y-2 overflow-y-auto px-1 py-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => {
          const isSelected = selectedValue === item;
          return (
            <button
              key={item}
              type="button"
              role="option"
              aria-selected={isSelected}
              data-selected={isSelected ? "" : undefined}
              className={cn(
                "cursor-pointer flex h-8 items-center justify-center rounded-sm text-sm font-normal tabular-nums transition-colors motion-reduce:transition-none outline-none",
                itemClassName,
                "hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground",
                isSelected
                  ? "bg-primary text-primary-foreground font-medium hover:bg-primary hover:text-primary-foreground"
                  : "text-foreground"
              )}
              onClick={() => onSelect(item)}
            >
              {item}
            </button>
          );
        })}
      </div>

      {canScrollUp && (
        <button
          type="button"
          aria-label={`Scroll ${ariaLabel.toLowerCase()} up`}
          className={cn(
            "absolute inset-x-0 top-0 z-20 flex h-6 w-full cursor-default items-center justify-center text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/50 motion-reduce:transition-none",
            "before:pointer-events-none before:absolute before:inset-x-px before:top-[-2px] before:h-[140%] before:rounded-t-[calc(var(--radius-lg)-1px)] before:bg-linear-to-b before:from-popover before:from-50%"
          )}
          data-slot="date-picker-timer-scroll-up-arrow"
          onMouseMove={() => startAutoScroll("up")}
          onMouseLeave={stopAutoScroll}
          onClick={() => scrollColumn("up")}
        >
          <ChevronUpIcon className="relative size-4" aria-hidden="true" />
        </button>
      )}

      {canScrollDown && (
        <button
          type="button"
          aria-label={`Scroll ${ariaLabel.toLowerCase()} down`}
          className={cn(
            "absolute inset-x-0 bottom-0 z-20 flex h-6 w-full cursor-default items-center justify-center text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/50 motion-reduce:transition-none",
            "before:pointer-events-none before:absolute before:inset-x-px before:bottom-[-2px] before:h-[140%] before:rounded-b-[calc(var(--radius-lg)-1px)] before:bg-linear-to-t before:from-popover before:from-50%"
          )}
          data-slot="date-picker-timer-scroll-down-arrow"
          onMouseMove={() => startAutoScroll("down")}
          onMouseLeave={stopAutoScroll}
          onClick={() => scrollColumn("down")}
        >
          <ChevronDownIcon className="relative size-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

export type DatePickerTimerProps = Omit<
  ComponentProps<"button">,
  "onChange" | "value" | "defaultValue"
> & {
  value?: string;
  defaultValue?: string;
  onChange?: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | { target: { value: string; name?: string; id?: string } }
  ) => void;
  onValueChange?: (value: string) => void;
  format?: "12" | "24";
  step?: number;
  placeholder?: string;
  size?:
    | "default"
    | "xs"
    | "sm"
    | "lg"
    | "xl"
    | "icon-xs"
    | "icon-sm"
    | "icon"
    | "icon-lg"
    | "icon-xl";
  popupClassName?: string;
  reduceMotion?: boolean;
  readOnly?: boolean;
};

function DatePickerTimer({
  id,
  name,
  value: propValue,
  defaultValue,
  onChange,
  onValueChange,
  format = "12",
  step = 1,
  placeholder = "Select time",
  size = "default",
  className,
  popupClassName,
  reduceMotion = false,
  disabled,
  readOnly,
  ...props
}: DatePickerTimerProps) {
  const isControlled = propValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const currentValue = isControlled ? propValue : internalValue;

  const parsed = parseTime24(currentValue);
  const [open, setOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<"AM" | "PM">(
    parsed ? to12Hour(parsed.hour).period : "AM"
  );

  useEffect(() => {
    if (parsed) {
      setSelectedPeriod(to12Hour(parsed.hour).period);
    }
  }, [parsed?.hour]);

  const activePeriod = parsed ? to12Hour(parsed.hour).period : selectedPeriod;

  const displayTime = parsed
    ? format === "24"
      ? `${String(parsed.hour).padStart(2, "0")}:${String(parsed.minute).padStart(2, "0")}`
      : `${to12Hour(parsed.hour).hour12}:${String(parsed.minute).padStart(2, "0")} ${to12Hour(parsed.hour).period}`
    : "";

  const commitTime = (h: number, m: number) => {
    const next24 = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    if (!isControlled) {
      setInternalValue(next24);
    }
    if (onChange) {
      const syntheticEvent = {
        target: { value: next24, name, id },
        currentTarget: { value: next24, name, id },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
    onValueChange?.(next24);
  };

  const handleHourSelect = (selectedH: string) => {
    if (disabled || readOnly) return;
    const hNum = parseInt(selectedH, 10);
    const nextHour = format === "24" ? hNum : to24Hour(hNum, activePeriod);
    const nextMinute = parsed ? parsed.minute : 0;
    commitTime(nextHour, nextMinute);
  };

  const handleMinuteSelect = (selectedM: string) => {
    if (disabled || readOnly) return;
    const mNum = parseInt(selectedM, 10);
    const nextHour = parsed
      ? parsed.hour
      : format === "24"
        ? 12
        : to24Hour(12, activePeriod);
    commitTime(nextHour, mNum);
  };

  const handlePeriodSelect = (p: "AM" | "PM") => {
    if (disabled || readOnly) return;
    setSelectedPeriod(p);
    if (parsed) {
      const current12 = parseInt(to12Hour(parsed.hour).hour12, 10);
      commitTime(to24Hour(current12, p), parsed.minute);
    }
  };

  const hours =
    format === "24"
      ? Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"))
      : [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
        ];

  const stepVal = Math.max(1, step);
  const minutes = Array.from({ length: Math.ceil(60 / stepVal) }, (_, i) =>
    String(i * stepVal).padStart(2, "0")
  );

  const activeHourStr = parsed
    ? format === "24"
      ? String(parsed.hour).padStart(2, "0")
      : to12Hour(parsed.hour).hour12
    : "";

  const activeMinuteStr = parsed ? String(parsed.minute).padStart(2, "0") : "";

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger
        render={
          <Button
            variant="outline"
            type="button"
            size={size}
            id={id}
            disabled={disabled}
            aria-label={props["aria-label"] ?? "Choose time"}
            className={cn(
              "h-9 min-w-0 max-w-full justify-start gap-2 px-3 font-normal tabular-nums data-invalid:border-destructive data-invalid:outline-2 data-invalid:outline-offset-2 data-invalid:outline-destructive/50 motion-reduce:transition-none",
              size.startsWith("icon") && "hitbox-2",
              className
            )}
            data-slot="date-picker-timer-trigger"
            {...(props as Record<string, unknown>)}
          />
        }
      >
        <Clock
          className="size-4 shrink-0 text-muted-foreground"
          aria-hidden="true"
        />
        <span
          className={cn(
            "min-w-0 truncate",
            !currentValue && "text-muted-foreground"
          )}
        >
          {displayTime || placeholder}
        </span>
      </PopoverPrimitive.Trigger>
      {name && <input type="hidden" name={name} value={currentValue} />}

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Positioner
          side="bottom"
          align="start"
          sideOffset={4}
          className="z-50"
          data-slot="date-picker-timer-positioner"
        >
          <PopoverPrimitive.Popup
            data-slot="date-picker-timer-popup"
            className={cn(
              "pointer-events-auto origin-(--transform-origin) rounded-lg border border-border bg-popover p-0 text-popover-foreground shadow-md outline-none",
              !reduceMotion &&
                "[transition-property:scale,opacity] [will-change:scale,opacity] data-starting-style:scale-80 data-starting-style:opacity-0 data-ending-style:opacity-0 data-ending-style:scale-80 duration-[0.35s] ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none",
              popupClassName
            )}
          >
            <div className="flex h-56 divide-x divide-border text-sm">
              <DatePickerTimerScrollColumn
                ariaLabel="Hours"
                items={hours}
                selectedValue={activeHourStr}
                onSelect={handleHourSelect}
                itemClassName="w-11"
                open={open}
                reduceMotion={reduceMotion}
              />

              <DatePickerTimerScrollColumn
                ariaLabel="Minutes"
                items={minutes}
                selectedValue={activeMinuteStr}
                onSelect={handleMinuteSelect}
                itemClassName="w-11"
                open={open}
                reduceMotion={reduceMotion}
              />

              {format === "12" && (
                <div
                  aria-label="Period"
                  role="listbox"
                  className="flex flex-col gap-y-2 px-1 py-1"
                >
                  {(["AM", "PM"] as const).map((p) => {
                    const isSelected = activePeriod === p;
                    return (
                      <button
                        key={p}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        data-selected={isSelected ? "" : undefined}
                        className={cn(
                          "cursor-pointer flex h-8 w-12 items-center justify-center rounded-sm text-sm font-normal tabular-nums transition-colors motion-reduce:transition-none outline-none",
                          "hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground",
                          isSelected
                            ? "bg-primary text-primary-foreground font-medium hover:bg-primary hover:text-primary-foreground"
                            : "text-foreground"
                        )}
                        onClick={() => handlePeriodSelect(p)}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </PopoverPrimitive.Popup>
        </PopoverPrimitive.Positioner>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}

export type DatePickerClearTriggerProps = Omit<ButtonProps, "color">;
function DatePickerClearTrigger({
  children,
  className,
  render,
  size = "icon",
  ref,
  ...props
}: DatePickerClearTriggerProps) {
  const picker = useDatePickerContext();
  const disabled = picker.disabled || picker.readOnly || !!props.disabled;
  return useRender({
    defaultTagName: "button",
    render: render ?? <Button variant="outline" size={size} />,
    ref,
    state: { disabled },
    props: mergeProps(
      picker.getClearTriggerProps(),
      {
        "aria-label": "Clear date",
        "data-slot": "date-picker-clear-trigger",
        className: cn("motion-reduce:transition-none", className),
        ...(children !== undefined || !render
          ? { children: children ?? <XIcon aria-hidden="true" /> }
          : {}),
      },
      props,
      { disabled }
    ),
  });
}

export type DatePickerPresetTriggerProps = Omit<
  ButtonProps,
  "value" | "color"
> & { value: Date[] };
function DatePickerPresetTrigger({
  value,
  className,
  ...props
}: DatePickerPresetTriggerProps) {
  return (
    <DatePickerPrimitive.PresetTrigger
      value={value.map((date) => toDateValue(date))}
      asChild
    >
      <Button
        type="button"
        size="sm"
        variant="ghost"
        className={cn("hitbox-2 motion-reduce:transition-none", className)}
        data-slot="date-picker-preset-trigger"
        {...props}
      />
    </DatePickerPrimitive.PresetTrigger>
  );
}

export {
  DatePicker,
  DatePickerControl,
  DatePickerLabel,
  DatePickerTrigger,
  DatePickerChips,
  DatePickerChip,
  DatePickerChipRemove,
  DatePickerValue,
  DatePickerInput,
  DatePickerContent,
  DatePickerCalendar,
  DatePickerTimer,
  DatePickerClearTrigger,
  DatePickerPresetTrigger,
};
