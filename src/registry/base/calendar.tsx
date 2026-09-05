"use client";

import {
  DatePicker as CalendarPrimitive,
  useDatePickerContext,
} from "@ark-ui/react/date-picker";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { type ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import { adaptDatePickerProps, type DatePickerRootDateProps } from "@/lib/date";
import { cn } from "@/lib/utils";

interface CalendarProps extends Omit<
  DatePickerRootDateProps,
  "inline" | "closeOnSelect"
> {
  size?: "sm" | "default" | "lg";
}

function Calendar({
  children,
  className,
  size = "default",
  ...props
}: CalendarProps) {
  return (
    <CalendarPrimitive.Root
      data-slot="calendar"
      data-size={size}
      className={cn(
        "w-fit max-w-full rounded-xl border border-border bg-background p-3 text-foreground [--calendar-cell-size:--spacing(10)]",
        size === "sm" && "sm:[--calendar-cell-size:--spacing(7)]",
        size === "default" && "sm:[--calendar-cell-size:--spacing(8)]",
        size === "lg" && "sm:[--calendar-cell-size:--spacing(9)]",
        className
      )}
      fixedWeeks
      {...adaptDatePickerProps(props)}
      inline
      closeOnSelect={false}
    >
      <CalendarPrimitive.Content
        data-slot="calendar-inline-content"
        className="outline-none"
      >
        {children ?? <CalendarContent />}
      </CalendarPrimitive.Content>
    </CalendarPrimitive.Root>
  );
}

interface CalendarContentProps extends ComponentProps<"div"> {}

function CalendarContent({
  className,
  children,
  ...props
}: CalendarContentProps) {
  return (
    <div
      data-slot="calendar-content"
      className={cn(
        "mx-auto w-fit max-w-full [--calendar-day-size:var(--calendar-cell-size,40px)] sm:[--calendar-day-size:var(--calendar-cell-size,32px)]",
        className
      )}
      {...props}
    >
      <CalendarView view="day">
        <CalendarHeader>
          <CalendarPreviousButton />
          <CalendarHeading />
          <CalendarNextButton />
        </CalendarHeader>
        <CalendarDayGrids />
      </CalendarView>
      <CalendarView view="month">
        <CalendarHeader>
          <CalendarPreviousButton />
          <CalendarHeading />
          <CalendarNextButton />
        </CalendarHeader>
        <CalendarPeriodGrid view="month" />
      </CalendarView>
      <CalendarView view="year">
        <CalendarHeader>
          <CalendarPreviousButton />
          <CalendarHeading />
          <CalendarNextButton />
        </CalendarHeader>
        <CalendarPeriodGrid view="year" />
      </CalendarView>
      {children && <div className="mt-3">{children}</div>}
    </div>
  );
}

type CalendarViewProps = ComponentProps<typeof CalendarPrimitive.View>;

function CalendarView({ className, ...props }: CalendarViewProps) {
  return (
    <CalendarPrimitive.View
      data-slot="calendar-view"
      className={cn("space-y-3", className)}
      {...props}
    />
  );
}

type CalendarHeaderProps = ComponentProps<typeof CalendarPrimitive.ViewControl>;

function CalendarHeader({ className, ...props }: CalendarHeaderProps) {
  return (
    <CalendarPrimitive.ViewControl
      data-slot="calendar-header"
      className={cn("flex items-center justify-between gap-1", className)}
      {...props}
    />
  );
}

type CalendarPreviousButtonProps = ComponentProps<
  typeof CalendarPrimitive.PrevTrigger
>;

function CalendarPreviousButton({
  children,
  className,
  asChild,
  ...props
}: CalendarPreviousButtonProps) {
  return (
    <CalendarPrimitive.PrevTrigger
      data-slot="calendar-previous-button"
      className={className}
      asChild
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "size-10 touch-manipulation sm:size-8 motion-reduce:transition-none",
            className
          )}
        >
          {children ?? <ChevronLeftIcon className="size-4 rtl:rotate-180" />}
        </Button>
      )}
    </CalendarPrimitive.PrevTrigger>
  );
}

type CalendarNextButtonProps = ComponentProps<
  typeof CalendarPrimitive.NextTrigger
>;

function CalendarNextButton({
  children,
  className,
  asChild,
  ...props
}: CalendarNextButtonProps) {
  return (
    <CalendarPrimitive.NextTrigger
      data-slot="calendar-next-button"
      className={className}
      asChild
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "size-10 touch-manipulation sm:size-8 motion-reduce:transition-none",
            className
          )}
        >
          {children ?? <ChevronRightIcon className="size-4 rtl:rotate-180" />}
        </Button>
      )}
    </CalendarPrimitive.NextTrigger>
  );
}

type CalendarHeadingProps = ComponentProps<
  typeof CalendarPrimitive.ViewTrigger
>;

function CalendarHeading({
  children,
  className,
  asChild,
  ...props
}: CalendarHeadingProps) {
  return (
    <CalendarPrimitive.ViewTrigger
      data-slot="calendar-heading"
      className={className}
      asChild
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <Button
          variant="ghost"
          className={cn(
            "h-10 touch-manipulation px-2.5 font-medium tabular-nums sm:h-8 disabled:opacity-100 motion-reduce:transition-none",
            className
          )}
        >
          {children ?? (
            <CalendarPrimitive.RangeText data-slot="calendar-range-text" />
          )}
        </Button>
      )}
    </CalendarPrimitive.ViewTrigger>
  );
}

type CalendarGridProps = ComponentProps<typeof CalendarPrimitive.Table>;

function CalendarGrid({ className, ...props }: CalendarGridProps) {
  return (
    <CalendarPrimitive.Table
      data-slot="calendar-grid"
      className={cn(
        "w-full table-fixed border-separate border-spacing-x-0 border-spacing-y-1 text-sm outline-none",
        className
      )}
      {...props}
    />
  );
}

type CalendarGridHeadProps = ComponentProps<typeof CalendarPrimitive.TableHead>;
function CalendarGridHead(props: CalendarGridHeadProps) {
  return (
    <CalendarPrimitive.TableHead data-slot="calendar-grid-head" {...props} />
  );
}

type CalendarGridBodyProps = ComponentProps<typeof CalendarPrimitive.TableBody>;
function CalendarGridBody(props: CalendarGridBodyProps) {
  return (
    <CalendarPrimitive.TableBody data-slot="calendar-grid-body" {...props} />
  );
}

type CalendarGridRowProps = ComponentProps<typeof CalendarPrimitive.TableRow>;
function CalendarGridRow(props: CalendarGridRowProps) {
  return (
    <CalendarPrimitive.TableRow data-slot="calendar-grid-row" {...props} />
  );
}

type CalendarGridHeaderCellProps = ComponentProps<
  typeof CalendarPrimitive.TableHeader
>;
function CalendarGridHeaderCell({
  className,
  ...props
}: CalendarGridHeaderCellProps) {
  return (
    <CalendarPrimitive.TableHeader
      data-slot="calendar-grid-header-cell"
      className={cn(
        "h-8 p-0 text-center text-xs font-normal text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

type CalendarCellProps = ComponentProps<typeof CalendarPrimitive.TableCell>;
function CalendarCell({ className, ...props }: CalendarCellProps) {
  return (
    <CalendarPrimitive.TableCell
      data-slot="calendar-cell"
      className={cn("relative p-0 text-center", className)}
      {...props}
    />
  );
}

type CalendarCellButtonProps = ComponentProps<
  typeof CalendarPrimitive.TableCellTrigger
>;
function CalendarCellButton({
  className,
  children,
  asChild,
  ...props
}: CalendarCellButtonProps) {
  return (
    <CalendarPrimitive.TableCellTrigger
      data-slot="calendar-cell-button"
      className={className}
      asChild
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <Button
          variant="ghost"
          className={cn(
            "relative mx-auto size-(--calendar-day-size) hitbox-1 touch-manipulation rounded-md p-0 font-normal tabular-nums motion-reduce:transition-none",
            "data-[view=month]:h-14 data-[view=month]:w-full data-[view=year]:h-14 data-[view=year]:w-full",
            "data-outside-range:text-muted-foreground/50 data-disabled:pointer-events-none data-disabled:opacity-40 data-unavailable:line-through",
            "data-today:font-semibold data-today:after:absolute data-today:after:bottom-1 data-today:after:size-1 data-today:after:rounded-full data-today:after:bg-current",
            "data-in-range:rounded-none data-in-range:bg-accent data-in-hover-range:rounded-none data-in-hover-range:bg-accent/60",
            "data-range-start:rounded-s-md data-range-start:rounded-e-none data-range-end:rounded-e-md data-range-end:rounded-s-none",
            "data-range-start:data-range-end:rounded-md",
            "data-selected:bg-primary data-selected:text-primary-foreground data-selected:hover:bg-primary data-range-start:bg-primary data-range-start:text-primary-foreground data-range-end:bg-primary data-range-end:text-primary-foreground",
            className
          )}
        >
          {children}
        </Button>
      )}
    </CalendarPrimitive.TableCellTrigger>
  );
}

function CalendarDayGrids() {
  const calendar = useDatePickerContext();
  return (
    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
      {Array.from({ length: calendar.numOfMonths }, (_, index) => {
        const month = calendar.getOffset({ months: index });
        const visibleRange = {
          start: month.visibleRange.start,
          end: month.visibleRange.start
            .add({ months: 1 })
            .subtract({ days: 1 }),
        };
        return (
          <div
            key={month.visibleRange.start.toString()}
            className={cn(
              "shrink-0",
              calendar.showWeekNumbers
                ? "w-[calc(var(--calendar-day-size)*8)]"
                : "w-[calc(var(--calendar-day-size)*7)]"
            )}
          >
            {calendar.numOfMonths > 1 && (
              <div className="mb-2 text-center text-sm font-medium">
                {month.visibleRangeText.start}
              </div>
            )}
            <CalendarGrid>
              <CalendarGridHead>
                <CalendarGridRow>
                  {calendar.showWeekNumbers && (
                    <CalendarPrimitive.WeekNumberHeaderCell
                      data-slot="calendar-week-number-header"
                      className="text-xs font-normal text-muted-foreground tabular-nums"
                    />
                  )}
                  {calendar.weekDays.map((day) => (
                    <CalendarGridHeaderCell
                      key={day.long}
                      aria-label={day.long}
                    >
                      {day.narrow}
                    </CalendarGridHeaderCell>
                  ))}
                </CalendarGridRow>
              </CalendarGridHead>
              <CalendarGridBody>
                {month.weeks.map((week, weekIndex) => (
                  <CalendarGridRow key={week[0]?.toString()}>
                    {calendar.showWeekNumbers && (
                      <CalendarPrimitive.WeekNumberCell
                        data-slot="calendar-week-number"
                        week={week}
                        weekIndex={weekIndex}
                        className="text-xs text-muted-foreground tabular-nums"
                      />
                    )}
                    {week.map((day, dayIndex) => {
                      const isCurrentMonth =
                        day.month === month.visibleRange.start.month;
                      const isOverlapping =
                        calendar.numOfMonths > 1 && !isCurrentMonth;
                      const isRowStart = dayIndex === 0;
                      const isRowEnd = dayIndex === week.length - 1;

                      if (isOverlapping) {
                        const cellState = calendar.getDayTableCellState({
                          value: day,
                          visibleRange,
                        });
                        const isRangeActive =
                          cellState.inRange || cellState.inHoveredRange;
                        const isStart = cellState.firstInRange;
                        const isEnd = cellState.lastInRange;

                        return (
                          <CalendarCell
                            key={day.toString()}
                            value={day}
                            visibleRange={visibleRange}
                            className="pointer-events-none select-none"
                          >
                            <div
                              aria-hidden="true"
                              className={cn(
                                "relative mx-auto flex size-(--calendar-day-size) items-center justify-center p-0 font-normal tabular-nums text-muted-foreground/50 select-none motion-reduce:transition-none",
                                !isRangeActive && "rounded-md",
                                isRangeActive && [
                                  "rounded-none bg-accent text-muted-foreground",
                                  cellState.inHoveredRange &&
                                    !cellState.inRange &&
                                    "bg-accent/60",
                                  (isStart || isRowStart) && "rounded-s-md",
                                  (isEnd || isRowEnd) && "rounded-e-md",
                                ],
                                cellState.today &&
                                  "font-semibold after:absolute after:bottom-1 after:size-1 after:rounded-full after:bg-current"
                              )}
                            >
                              {day.day}
                            </div>
                          </CalendarCell>
                        );
                      }

                      return (
                        <CalendarCell
                          key={day.toString()}
                          value={day}
                          visibleRange={visibleRange}
                        >
                          <CalendarCellButton
                            className={cn(
                              isRowStart &&
                                "data-in-range:rounded-s-md data-in-hover-range:rounded-s-md data-range-end:rounded-s-md",
                              isRowEnd &&
                                "data-in-range:rounded-e-md data-in-hover-range:rounded-e-md data-range-start:rounded-e-md"
                            )}
                          >
                            {day.day}
                          </CalendarCellButton>
                        </CalendarCell>
                      );
                    })}
                  </CalendarGridRow>
                ))}
              </CalendarGridBody>
            </CalendarGrid>
          </div>
        );
      })}
    </div>
  );
}

function CalendarPeriodGrid({ view }: { view: "month" | "year" }) {
  const calendar = useDatePickerContext();
  const rows =
    view === "month"
      ? calendar.getMonthsGrid({ columns: 3, format: "short" })
      : calendar.getYearsGrid({ columns: 3 });
  return (
    <CalendarGrid
      columns={3}
      className="mx-auto w-[calc(var(--calendar-day-size)*7)]"
    >
      <CalendarGridBody>
        {rows.map((row) => (
          <CalendarGridRow key={row[0]?.value}>
            {row.map((cell) => (
              <CalendarCell
                key={cell.value}
                value={cell.value}
                disabled={cell.disabled}
              >
                <CalendarCellButton>{cell.label}</CalendarCellButton>
              </CalendarCell>
            ))}
          </CalendarGridRow>
        ))}
      </CalendarGridBody>
    </CalendarGrid>
  );
}

export {
  Calendar,
  CalendarContent,
  CalendarView,
  CalendarHeader,
  CalendarPreviousButton,
  CalendarNextButton,
  CalendarHeading,
  CalendarGrid,
  CalendarGridHead,
  CalendarGridBody,
  CalendarGridRow,
  CalendarGridHeaderCell,
  CalendarCell,
  CalendarCellButton,
};
export type {
  CalendarProps,
  CalendarContentProps,
  CalendarViewProps,
  CalendarHeaderProps,
  CalendarPreviousButtonProps,
  CalendarNextButtonProps,
  CalendarHeadingProps,
  CalendarGridProps,
  CalendarGridHeadProps,
  CalendarGridBodyProps,
  CalendarGridRowProps,
  CalendarGridHeaderCellProps,
  CalendarCellProps,
  CalendarCellButtonProps,
};
