"use client";

import {
  DateInput as DateInputPrimitive,
  useDateInputContext,
} from "@ark-ui/react/date-input";
import { DateFormatter } from "@internationalized/date";
import { XIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { InputGroup } from "@/components/ui/input-group";
import { fromDateValue, toDateValue } from "@/lib/date";
import { cn } from "@/lib/utils";

export interface DateInputValueChangeDetails {
  value: Date[];
  valueAsString: string[];
}

export interface DateInputPlaceholderChangeDetails extends DateInputValueChangeDetails {
  placeholderValue: Date;
}

export interface DateInputProps extends Omit<
  React.ComponentProps<typeof DateInputPrimitive.Root>,
  | "asChild"
  | "children"
  | "defaultPlaceholderValue"
  | "defaultValue"
  | "format"
  | "granularity"
  | "isDateUnavailable"
  | "max"
  | "min"
  | "onPlaceholderChange"
  | "onValueChange"
  | "placeholderValue"
  | "value"
> {
  value?: Date[];
  defaultValue?: Date[];
  min?: Date;
  max?: Date;
  placeholderValue?: Date;
  defaultPlaceholderValue?: Date;
  onValueChange?: (details: DateInputValueChangeDetails) => void;
  onPlaceholderChange?: (details: DateInputPlaceholderChangeDetails) => void;
  isDateUnavailable?: (date: Date, locale: string) => boolean;
  format?: (
    date: Date,
    details: { locale: string; timeZone: string }
  ) => string;
  id?: string;
  size?: "sm" | "default" | "lg";
  granularity?: "day" | "hour" | "minute" | "second";
  clearable?: boolean;
  clearLabel?: string;
  timeOnly?: boolean;
  startName?: string;
  endName?: string;
  startLabel?: string;
  endLabel?: string;
  endAdornment?: React.ReactNode;
  shouldForceLeadingZeros?: boolean;
}

function DateInput({
  className,
  value,
  defaultValue,
  min,
  max,
  placeholderValue,
  defaultPlaceholderValue,
  onValueChange,
  onPlaceholderChange,
  isDateUnavailable,
  format,
  id,
  size = "default",
  granularity = "day",
  clearable = false,
  clearLabel = "Clear date",
  timeOnly = false,
  startName,
  endName,
  startLabel = "Start date",
  endLabel = "End date",
  endAdornment,
  selectionMode = "single",
  locale = "en-US",
  timeZone = "UTC",
  hourCycle,
  formatter,
  name,
  readOnly,
  shouldForceLeadingZeros = true,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  ...props
}: DateInputProps) {
  const generatedId = React.useId();
  const [resetKey, setResetKey] = React.useState(0);
  const handleFormReset = React.useCallback(() => {
    setResetKey((previous) => previous + 1);
  }, []);
  const resolvedGranularity =
    timeOnly && granularity === "day" ? "minute" : granularity;
  const includeTime = resolvedGranularity !== "day";
  const timeFormatter = React.useMemo(
    () =>
      timeOnly
        ? new DateFormatter(locale, {
            hour: "numeric",
            minute: resolvedGranularity !== "hour" ? "2-digit" : undefined,
            second: resolvedGranularity === "second" ? "2-digit" : undefined,
            hourCycle:
              hourCycle === 12 ? "h12" : hourCycle === 24 ? "h23" : undefined,
            timeZone,
          })
        : undefined,
    [hourCycle, locale, resolvedGranularity, timeOnly, timeZone]
  );

  return (
    <DateInputPrimitive.Root
      {...props}
      key={resetKey}
      className={cn("w-full", className)}
      data-size={size}
      data-slot="date-input"
      shouldForceLeadingZeros={shouldForceLeadingZeros}
      defaultPlaceholderValue={
        defaultPlaceholderValue
          ? toDateValue(defaultPlaceholderValue, includeTime)
          : undefined
      }
      defaultValue={defaultValue?.map((date) => toDateValue(date, includeTime))}
      format={
        format
          ? (date, details) => format(fromDateValue(date), details)
          : undefined
      }
      formatter={formatter ?? timeFormatter}
      granularity={resolvedGranularity}
      hourCycle={hourCycle}
      isDateUnavailable={
        isDateUnavailable
          ? (date, dateLocale) =>
              isDateUnavailable(fromDateValue(date), dateLocale)
          : undefined
      }
      locale={locale}
      max={max ? toDateValue(max, includeTime) : undefined}
      min={min ? toDateValue(min, includeTime) : undefined}
      name={name}
      onPlaceholderChange={
        onPlaceholderChange
          ? (details) =>
              onPlaceholderChange({
                ...details,
                value: details.value.map(fromDateValue),
                placeholderValue: fromDateValue(details.placeholderValue),
              })
          : undefined
      }
      onValueChange={
        onValueChange
          ? (details) =>
              onValueChange({
                ...details,
                value: details.value.map(fromDateValue),
              })
          : undefined
      }
      placeholderValue={
        placeholderValue
          ? toDateValue(placeholderValue, includeTime)
          : undefined
      }
      readOnly={readOnly}
      selectionMode={selectionMode}
      timeZone={timeZone}
      value={value?.map((date) => toDateValue(date, includeTime))}
    >
      <DateInputPrimitive.Context>
        {(api) => (
          <>
            <DateInputPrimitive.Control asChild>
              <InputGroup
                aria-invalid={api.invalid || undefined}
                className={cn(
                  "flex w-full gap-2 px-3 text-base tabular-nums sm:text-sm focus-within:border-ring focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ring/50 data-invalid:border-destructive data-invalid:outline-2 data-invalid:outline-offset-2 data-invalid:outline-destructive/50 focus-within:data-invalid:border-destructive focus-within:data-invalid:outline-destructive/50 data-disabled:opacity-64 motion-reduce:transition-none",
                  size === "sm"
                    ? "min-h-8"
                    : size === "lg"
                      ? "min-h-10"
                      : "min-h-9"
                )}
                data-size={size}
                data-slot="date-input-control"
              >
                <div
                  className={cn(
                    "flex min-w-0 flex-1 items-center gap-x-2 gap-y-1 overflow-hidden py-1",
                    selectionMode === "range" && "flex-wrap"
                  )}
                >
                  {(selectionMode === "range" ? [0, 1] : [0]).map((index) => (
                    <React.Fragment key={index}>
                      {index === 1 && (
                        <span
                          aria-hidden="true"
                          className="shrink-0 text-muted-foreground select-none cursor-default"
                          data-slot="date-input-separator"
                        >
                          –
                        </span>
                      )}
                      {selectionMode === "range" && (
                        <span
                          className="sr-only"
                          id={`${generatedId}-endpoint-${index}`}
                        >
                          {index === 0 ? startLabel : endLabel}
                        </span>
                      )}
                      <DateInputPrimitive.SegmentGroup
                        aria-describedby={ariaDescribedBy}
                        aria-label={
                          !ariaLabelledBy
                            ? (ariaLabel ?? (timeOnly ? "Time" : "Date"))
                            : undefined
                        }
                        aria-labelledby={
                          ariaLabelledBy
                            ? selectionMode === "range"
                              ? [
                                  ariaLabelledBy,
                                  `${generatedId}-endpoint-${index}`,
                                ]
                                  .filter(Boolean)
                                  .join(" ")
                              : ariaLabelledBy
                            : undefined
                        }
                        className="inline-flex shrink-0 items-center whitespace-pre tabular-nums"
                        data-slot="date-input-segment-group"
                        index={index}
                      >
                        {api
                          .getSegments({ index })
                          .map((segment, segmentIndex) => (
                            <DateInputPrimitive.Segment
                              className="shrink-0 rounded-sm px-0.5 py-0.5 outline-none data-placeholder:text-muted-foreground data-[type=literal]:px-0 data-[type=literal]:text-muted-foreground data-[type=literal]:select-none data-[type=literal]:cursor-default data-[type=literal]:data-disabled:cursor-default focus:bg-accent focus:text-accent-foreground not-data-[type=literal]:data-disabled:cursor-not-allowed"
                              data-slot="date-input-segment"
                              key={`${segment.type}-${segmentIndex}`}
                              segment={segment}
                            />
                          ))}
                      </DateInputPrimitive.SegmentGroup>
                    </React.Fragment>
                  ))}
                </div>
                {clearable && !api.disabled && !readOnly && (
                  <Button
                    aria-label={clearLabel}
                    className={cn(
                      "shrink-0 rounded-[calc(var(--radius)-5px)] shadow-none text-muted-foreground hover:text-foreground",
                      endAdornment ? "-me-1" : "-me-1.5"
                    )}
                    data-slot="date-input-clear"
                    onClick={() => {
                      api.clearValue();
                      api.focus();
                    }}
                    size="icon-xs"
                    type="button"
                    variant="ghost"
                  >
                    <XIcon aria-hidden="true" />
                  </Button>
                )}
                {endAdornment}
              </InputGroup>
            </DateInputPrimitive.Control>
            <DateInputHiddenFields
              endName={endName}
              id={id}
              name={name}
              onFormReset={handleFormReset}
              selectionMode={selectionMode}
              startName={startName}
            />
          </>
        )}
      </DateInputPrimitive.Context>
    </DateInputPrimitive.Root>
  );
}

function DateInputHiddenFields({
  endName,
  id,
  name,
  onFormReset,
  selectionMode,
  startName,
}: Pick<
  DateInputProps,
  "endName" | "id" | "name" | "selectionMode" | "startName"
> & {
  onFormReset: () => void;
}) {
  const api = useDateInputContext();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const formId = api.getHiddenInputProps({ index: 0 }).form;

  React.useEffect(() => {
    const form = inputRef.current?.form;
    if (!form) return;

    let mounted = true;
    const handleReset = (event: Event) => {
      queueMicrotask(() => {
        if (mounted && !event.defaultPrevented) onFormReset();
      });
    };
    form.addEventListener("reset", handleReset);
    return () => {
      mounted = false;
      form.removeEventListener("reset", handleReset);
    };
  }, [formId, onFormReset]);

  return (selectionMode === "range" ? [0, 1] : [0]).map((index) => {
    const hiddenProps = api.getHiddenInputProps({ index });
    return (
      <input
        {...hiddenProps}
        aria-hidden={index === 0 && id ? true : undefined}
        className="sr-only"
        data-slot="date-input-hidden-input"
        id={index === 0 ? id : hiddenProps.id}
        key={index}
        name={
          selectionMode === "range"
            ? ((index === 0 ? startName : endName) ??
              (name ? `${name}[${index}]` : undefined))
            : name
        }
        onChange={hiddenProps.onChange ?? (() => {})}
        onFocus={(event) => {
          hiddenProps.onFocus?.(event);
          if (index === 0 && id) {
            api.focus();
          }
        }}
        ref={index === 0 ? inputRef : undefined}
        tabIndex={index === 0 && id ? -1 : undefined}
        type={index === 0 && id ? "text" : hiddenProps.type}
      />
    );
  });
}

export { DateInput };
