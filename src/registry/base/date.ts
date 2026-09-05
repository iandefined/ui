import type { DatePickerRootProps, DateValue } from "@ark-ui/react/date-picker";
import {
  CalendarDate,
  CalendarDateTime,
  GregorianCalendar,
  toCalendar,
} from "@internationalized/date";
import { useSyncExternalStore } from "react";

function subscribeToCalendarViewport(onChange: () => void) {
  const query = window.matchMedia("(min-width: 640px)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

// Change the machine's visible range too, so navigation and keyboard focus
// never move into a second month that is merely hidden by CSS.
export function useResponsiveCalendarMonths(numOfMonths = 1) {
  const isWide = useSyncExternalStore(
    subscribeToCalendarViewport,
    () => window.matchMedia("(min-width: 640px)").matches,
    () => false
  );
  return isWide ? numOfMonths : 1;
}

export function toDateValue(value: Date, includeTime = false): DateValue {
  if (!(value instanceof Date) || Number.isNaN(value.getTime())) {
    throw new RangeError("Expected a valid Date.");
  }
  const year = value.getFullYear();
  if (year < 1 || year > 9999) {
    throw new RangeError("Date years must be between 1 and 9999.");
  }
  return includeTime
    ? new CalendarDateTime(
        year,
        value.getMonth() + 1,
        value.getDate(),
        value.getHours(),
        value.getMinutes(),
        value.getSeconds(),
        value.getMilliseconds()
      )
    : new CalendarDate(year, value.getMonth() + 1, value.getDate());
}

export function fromDateValue(value: DateValue): Date {
  const date = toCalendar(value, new GregorianCalendar());
  const result = new Date(2000, date.month - 1, date.day);
  result.setFullYear(date.year);
  if ("hour" in date) {
    result.setHours(date.hour, date.minute, date.second, date.millisecond);
  } else {
    result.setHours(0, 0, 0, 0);
  }
  return result;
}

export function formatDate(
  date: Date,
  format?:
    | string
    | Intl.DateTimeFormatOptions
    | ((date: Date, details: { locale: string; timeZone: string }) => string),
  locale = "en-US",
  timeZone = "UTC"
): string {
  if (typeof format === "function") {
    return format(date, { locale, timeZone });
  }
  if (typeof format === "object" && format !== null) {
    return new Intl.DateTimeFormat(locale, format).format(date);
  }
  if (typeof format === "string" && format.length > 0) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthNamesShort = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const pad = (n: number) => String(n).padStart(2, "0");
    const h12 = hours % 12 || 12;
    const period = hours >= 12 ? "PM" : "AM";

    return format.replace(
      /\b(YYYY|YY|MMMM|MMM|MM|M|DD|D|HH|H|hh|h|mm|m|ss|s|A|a)\b/g,
      (match) => {
        switch (match) {
          case "YYYY":
            return String(year);
          case "YY":
            return String(year).slice(-2);
          case "MMMM":
            return monthNames[month];
          case "MMM":
            return monthNamesShort[month];
          case "MM":
            return pad(month + 1);
          case "M":
            return String(month + 1);
          case "DD":
            return pad(day);
          case "D":
            return String(day);
          case "HH":
            return pad(hours);
          case "H":
            return String(hours);
          case "hh":
            return pad(h12);
          case "h":
            return String(h12);
          case "mm":
            return pad(minutes);
          case "m":
            return String(minutes);
          case "ss":
            return pad(seconds);
          case "s":
            return String(seconds);
          case "A":
            return period;
          case "a":
            return period.toLowerCase();
          default:
            return match;
        }
      }
    );
  }
  return date.toLocaleDateString(locale);
}

export type DateValueChangeDetails = {
  value: Date[];
  valueAsString: string[];
  view: "day" | "month" | "year";
};

type DateFields =
  | "value"
  | "defaultValue"
  | "focusedValue"
  | "defaultFocusedValue"
  | "min"
  | "max"
  | "onValueChange"
  | "onFocusChange"
  | "onOpenChange"
  | "onVisibleRangeChange"
  | "isDateUnavailable"
  | "format"
  | "parse";

export type DatePickerRootDateProps = Omit<DatePickerRootProps, DateFields> & {
  value?: Date[];
  defaultValue?: Date[];
  focusedValue?: Date;
  defaultFocusedValue?: Date;
  min?: Date;
  max?: Date;
  onValueChange?: (details: DateValueChangeDetails) => void;
  onFocusChange?: (
    details: DateValueChangeDetails & { focusedValue: Date }
  ) => void;
  onOpenChange?: (details: { open: boolean; value: Date[] }) => void;
  onVisibleRangeChange?: (details: {
    view: "day" | "month" | "year";
    visibleRange: { start: Date; end: Date };
  }) => void;
  isDateUnavailable?: (date: Date, locale: string) => boolean;
  format?: (
    date: Date,
    details: { locale: string; timeZone: string }
  ) => string;
  parse?: (
    value: string,
    details: { locale: string; timeZone: string }
  ) => Date | undefined;
};

export type DayjsDatePickerProps = DatePickerRootDateProps;

export function adaptDatePickerProps(
  props: DatePickerRootDateProps
): DatePickerRootProps {
  const {
    value,
    defaultValue,
    focusedValue,
    defaultFocusedValue,
    min,
    max,
    onValueChange,
    onFocusChange,
    onOpenChange,
    onVisibleRangeChange,
    isDateUnavailable,
    format,
    parse,
    ...rest
  } = props;
  return {
    ...rest,
    value: value?.map((date) => toDateValue(date)),
    defaultValue: defaultValue?.map((date) => toDateValue(date)),
    focusedValue: focusedValue && toDateValue(focusedValue),
    defaultFocusedValue:
      defaultFocusedValue && toDateValue(defaultFocusedValue),
    min: min && toDateValue(min),
    max: max && toDateValue(max),
    onValueChange:
      onValueChange &&
      ((details) =>
        onValueChange({ ...details, value: details.value.map(fromDateValue) })),
    onFocusChange:
      onFocusChange &&
      ((details) =>
        onFocusChange({
          ...details,
          value: details.value.map(fromDateValue),
          focusedValue: fromDateValue(details.focusedValue),
        })),
    onOpenChange:
      onOpenChange &&
      ((details) =>
        onOpenChange({ ...details, value: details.value.map(fromDateValue) })),
    onVisibleRangeChange:
      onVisibleRangeChange &&
      ((details) =>
        onVisibleRangeChange({
          ...details,
          visibleRange: {
            start: fromDateValue(details.visibleRange.start),
            end: fromDateValue(details.visibleRange.end),
          },
        })),
    isDateUnavailable:
      isDateUnavailable &&
      ((date, locale) => isDateUnavailable(fromDateValue(date), locale)),
    format: format
      ? (date, details) => format(fromDateValue(date), details)
      : (date, details) => {
          const jsDate = fromDateValue(date);
          return new Intl.DateTimeFormat(details.locale, {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
            timeZone: details.timeZone,
          }).format(jsDate);
        },
    parse:
      parse &&
      ((text, details) => {
        const date = parse(text, details);
        return date instanceof Date && !Number.isNaN(date.getTime())
          ? toDateValue(date)
          : undefined;
      }),
  };
}
