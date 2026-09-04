"use client";

import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Transition,
} from "motion/react";
import * as React from "react";

import { cn } from "@/lib/utils";

import { TooltipSurface } from "./tooltip";

type SliderValueType = number | [number, number];
type SliderVariant = NonNullable<SliderProps["variant"]>;

interface SliderProps extends Omit<
  SliderPrimitive.Root.Props<SliderValueType>,
  | "children"
  | "defaultValue"
  | "onValueChange"
  | "onValueCommitted"
  | "thumbAlignment"
  | "value"
> {
  value?: SliderValueType;
  defaultValue?: SliderValueType;
  onValueChange?: (value: SliderValueType) => void;
  onValueCommitted?: (value: SliderValueType) => void;
  children?: React.ReactNode;
  formatValue?: (value: number) => string;
  hideTooltip?: boolean;
  variant?: "compact" | "default";
  showSteps?: boolean;
  reduceMotion?: boolean;
  getAriaLabel?: (index: number) => string;
}

interface SliderContextValue {
  disabled: boolean;
  formatValue: (value: number) => string;
  getAriaLabel?: (index: number) => string;
  hideTooltip: boolean;
  max: number;
  min: number;
  onValueChange: (value: SliderValueType) => void;
  onValueCommitted?: (value: SliderValueType) => void;
  reduceMotion: boolean;
  showSteps: boolean;
  step: number;
  value: SliderValueType;
  variant: SliderVariant;
}

interface SliderControlProps extends Omit<
  SliderPrimitive.Control.Props,
  "children"
> {
  children?: React.ReactNode;
}

interface SliderContentProps extends React.ComponentProps<"div"> {}

interface SliderLabelProps extends SliderPrimitive.Label.Props {}

interface SliderValueProps extends Omit<
  SliderPrimitive.Value.Props,
  "children"
> {
  children?: (
    formattedValues: readonly string[],
    values: readonly number[]
  ) => React.ReactNode;
  editable?: boolean;
}

const SliderContext = React.createContext<SliderContextValue | null>(null);

function useSlider() {
  const context = React.useContext(SliderContext);

  if (!context) {
    throw new Error("Slider parts must be used within Slider");
  }

  return context;
}

type SliderControlPointerEvent = Parameters<
  NonNullable<SliderPrimitive.Control.Props["onPointerDown"]>
>[0];

interface HoverPreview {
  percent: number;
  value: number;
}

interface TrackPosition {
  offset: number;
  percent: number;
}

const COMPACT_INSET = 10;
const COMPACT_RAIL_INSET = 0;
const DEFAULT_INSET = 12;

const spring: Transition = {
  type: "spring",
  duration: 0.16,
  bounce: 0.12,
};

function toValues(value: SliderValueType) {
  return Array.isArray(value) ? value : [value];
}

function getPrecision(step: number) {
  return step.toString().split(".")[1]?.length ?? 0;
}

function snapValue(value: number, min: number, max: number, step: number) {
  const snapped = min + Math.round((value - min) / step) * step;
  return Number(
    Math.min(max, Math.max(min, snapped)).toFixed(getPrecision(step))
  );
}

function getPercent(value: number, min: number, max: number) {
  return max === min ? 0 : ((value - min) / (max - min)) * 100;
}

function getInsetPosition(percent: number, inset: number) {
  return getTrackPositionStyle(getInsetTrackPosition(percent, inset));
}

function getInsetTrackPosition(percent: number, inset: number): TrackPosition {
  return {
    offset: inset - (2 * inset * percent) / 100,
    percent,
  };
}

function getEdgeTrackPosition(
  percent: number,
  inset: number,
  edgeInset: number
): TrackPosition {
  if (percent === 0) {
    return { offset: edgeInset, percent: 0 };
  }

  if (percent === 100) {
    return { offset: -edgeInset, percent: 100 };
  }

  return getInsetTrackPosition(percent, inset);
}

function getTrackPositionStyle(position: TrackPosition) {
  return `calc(${position.percent}% + ${position.offset}px)`;
}

function getTrackSegmentStyle(first: TrackPosition, second: TrackPosition) {
  const firstComesBefore =
    first.percent < second.percent ||
    (first.percent === second.percent && first.offset <= second.offset);
  const start = firstComesBefore ? first : second;
  const end = firstComesBefore ? second : first;

  return {
    insetInlineStart: getTrackPositionStyle(start),
    width: `calc(${end.percent - start.percent}% + ${end.offset - start.offset}px)`,
  };
}

function getDefaultFillOffset(percent: number) {
  return percent === 0 ? 0 : 20 - percent / 5;
}

function getDefaultFillWidth(percent: number) {
  const offset = getDefaultFillOffset(percent);
  return `calc(${percent}% + ${offset}px)`;
}

function getDefaultPosition(percent: number) {
  return getInsetPosition(percent, DEFAULT_INSET);
}

function getStepValues(min: number, max: number, step: number) {
  const count = Math.floor((max - min) / step);

  if (count > 200) {
    return [];
  }

  return Array.from({ length: count + 1 }, (_, index) =>
    snapValue(min + index * step, min, max, step)
  );
}

function getPreviewSegment(
  previewPercent: number,
  values: number[],
  min: number,
  max: number
) {
  const valuePercents = values.map((value) => getPercent(value, min, max));
  const closest = valuePercents.reduce((current, percent) =>
    Math.abs(percent - previewPercent) < Math.abs(current - previewPercent)
      ? percent
      : current
  );

  return {
    anchor: closest,
    target: previewPercent,
  };
}

function useHoverPreview({
  disabled,
  min,
  max,
  step,
}: {
  disabled: boolean;
  min: number;
  max: number;
  step: number;
}) {
  const [preview, setPreview] = React.useState<HoverPreview | null>(null);

  const updatePreview = React.useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (disabled) {
        return;
      }

      const control = event.currentTarget.querySelector<HTMLElement>(
        '[data-slot="slider-control"]'
      );
      const rect =
        control?.getBoundingClientRect() ??
        event.currentTarget.getBoundingClientRect();
      const pointerOffset =
        getComputedStyle(event.currentTarget).direction === "rtl"
          ? rect.right - event.clientX
          : event.clientX - rect.left;
      const percent = Math.min(
        100,
        Math.max(0, (pointerOffset / rect.width) * 100)
      );
      const value = snapValue(
        min + (percent / 100) * (max - min),
        min,
        max,
        step
      );

      setPreview((current) =>
        current?.value === value
          ? current
          : {
              percent: getPercent(value, min, max),
              value,
            }
      );
    },
    [disabled, max, min, step]
  );

  return { preview, setPreview, updatePreview };
}

function SliderValueDisplay({
  className,
  disabled,
  editable,
  formatValue,
  max,
  min,
  onValueChange,
  value,
}: {
  className?: string;
  disabled: boolean;
  editable: boolean;
  formatValue: (value: number) => string;
  max: number;
  min: number;
  onValueChange: (value: number) => void;
  value: number;
}) {
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState(String(value));
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (editing) {
      inputRef.current?.select();
    }
  }, [editing]);

  const commit = () => {
    const nextValue = Number(draft);

    if (Number.isFinite(nextValue)) {
      onValueChange(Math.min(max, Math.max(min, nextValue)));
    }

    setEditing(false);
  };

  if (editable && editing) {
    return (
      <input
        ref={inputRef}
        aria-label="Edit slider value"
        className={cn(
          "min-w-0 bg-transparent text-right text-inherit tabular-nums outline-none",
          className
        )}
        inputMode="decimal"
        max={max}
        min={min}
        type="number"
        value={draft}
        onBlur={commit}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            commit();
          }

          if (event.key === "Escape") {
            setEditing(false);
            setDraft(String(value));
          }
        }}
      />
    );
  }

  if (!editable) {
    return (
      <span className={cn("tabular-nums", className)}>
        {formatValue(value)}
      </span>
    );
  }

  return (
    <button
      className={cn(
        "bg-transparent text-right text-inherit tabular-nums outline-none disabled:cursor-default",
        className
      )}
      disabled={disabled}
      type="button"
      onClick={() => {
        setDraft(String(value));
        setEditing(true);
      }}
    >
      {formatValue(value)}
    </button>
  );
}

function SliderLabel({ className, ...props }: SliderLabelProps) {
  const { variant } = useSlider();

  return (
    <SliderPrimitive.Label
      className={cn(
        "text-sm",
        variant === "default" ? "text-foreground" : "text-muted-foreground",
        className
      )}
      data-slot="slider-label"
      {...props}
    />
  );
}

function SliderValue({
  children,
  className,
  editable = true,
  ...props
}: SliderValueProps) {
  const { disabled, formatValue, max, min, onValueChange, value } = useSlider();
  const values = toValues(value);
  const formattedValues = values.map(formatValue);

  return (
    <SliderPrimitive.Value
      className={cn(
        "inline-flex shrink-0 items-center gap-1 text-sm tabular-nums text-muted-foreground",
        editable ? "pointer-events-auto" : "pointer-events-none",
        className
      )}
      data-slot="slider-value"
      {...props}
    >
      {children
        ? () => children(formattedValues, values)
        : () =>
            values.length > 1 ? (
              <>
                <SliderValueDisplay
                  disabled={disabled}
                  editable={editable}
                  formatValue={formatValue}
                  max={values[1] ?? max}
                  min={min}
                  value={values[0]}
                  onValueChange={(nextValue) =>
                    onValueChange([nextValue, values[1] ?? max])
                  }
                />
                <span aria-hidden="true">–</span>
                <SliderValueDisplay
                  disabled={disabled}
                  editable={editable}
                  formatValue={formatValue}
                  max={max}
                  min={values[0]}
                  value={values[1] ?? max}
                  onValueChange={(nextValue) =>
                    onValueChange([values[0], nextValue])
                  }
                />
              </>
            ) : (
              <SliderValueDisplay
                disabled={disabled}
                editable={editable}
                formatValue={formatValue}
                max={max}
                min={min}
                value={values[0] ?? min}
                onValueChange={(nextValue) => onValueChange(nextValue)}
              />
            )}
    </SliderPrimitive.Value>
  );
}

function SliderContent({ className, ...props }: SliderContentProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-[5] flex items-center gap-4 px-5.5",
        className
      )}
      data-slot="slider-content"
      {...props}
    />
  );
}

function HoverValue({
  className,
  formatValue,
  isPressed,
  position,
  preview,
  reduceMotion,
}: {
  className?: string;
  formatValue: (value: number) => string;
  isPressed: boolean;
  position: string;
  preview: HoverPreview | null;
  reduceMotion: boolean;
}) {
  return (
    <AnimatePresence>
      {preview ? (
        <motion.div
          aria-hidden="true"
          animate={{
            insetInlineStart: position,
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          className={cn(
            "pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-full",
            className
          )}
          data-slot="slider-hover-value"
          exit={{ opacity: 0, scale: 0.94, y: 2 }}
          initial={{
            insetInlineStart: position,
            opacity: 0,
            scale: 0.94,
            y: 2,
          }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : isPressed
                ? { type: "spring", duration: 0.08, bounce: 0 }
                : spring
          }
        >
          <TooltipSurface className="whitespace-nowrap tabular-nums">
            {formatValue(preview.value)}
          </TooltipSurface>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function CompactSliderControl({
  children,
  className,
  onPointerCancel,
  onPointerDown,
  onPointerUp,
  ...props
}: SliderControlProps) {
  const {
    disabled,
    formatValue,
    getAriaLabel,
    hideTooltip,
    max,
    min,
    onValueChange,
    onValueCommitted,
    reduceMotion,
    showSteps,
    step,
    value,
  } = useSlider();
  const [isPressed, setIsPressed] = React.useState(false);
  const values = toValues(value);
  const primaryValue = values.at(-1) ?? min;
  const steps = showSteps ? getStepValues(min, max, step) : [];
  const { preview, setPreview, updatePreview } = useHoverPreview({
    disabled,
    min,
    max,
    step,
  });
  const previewSegment = preview
    ? getPreviewSegment(preview.percent, values, min, max)
    : null;
  const sortedValues = [...values].sort((first, second) => first - second);
  const fillStartValue = sortedValues[0] ?? min;
  const fillEndValue = sortedValues.at(-1) ?? min;
  const compactFillStyle = getTrackSegmentStyle(
    values.length > 1
      ? getEdgeTrackPosition(
          getPercent(fillStartValue, min, max),
          COMPACT_INSET,
          COMPACT_RAIL_INSET
        )
      : { offset: COMPACT_RAIL_INSET, percent: 0 },
    getEdgeTrackPosition(
      getPercent(fillEndValue, min, max),
      COMPACT_INSET,
      COMPACT_RAIL_INSET
    )
  );
  const compactPreviewStyle =
    previewSegment && previewSegment.anchor !== previewSegment.target
      ? getTrackSegmentStyle(
          getInsetTrackPosition(previewSegment.anchor, COMPACT_INSET),
          getEdgeTrackPosition(
            previewSegment.target,
            COMPACT_INSET,
            COMPACT_RAIL_INSET
          )
        )
      : null;
  const handleCollapsedRangePointerDown = (
    event: SliderControlPointerEvent
  ) => {
    if (
      disabled ||
      event.button !== 0 ||
      values.length !== 2 ||
      fillStartValue !== fillEndValue ||
      (event.target instanceof Element &&
        event.target.closest('[data-slot="slider-thumb"]'))
    ) {
      return;
    }

    const control = event.currentTarget;
    const rect = control.getBoundingClientRect();
    const pointerOffset =
      getComputedStyle(control).direction === "rtl"
        ? rect.right - event.clientX
        : event.clientX - rect.left;
    const usableWidth = Math.max(1, rect.width - COMPACT_INSET * 2);
    const pointerPercent = Math.min(
      1,
      Math.max(0, (pointerOffset - COMPACT_INSET) / usableWidth)
    );
    const nextValue = snapValue(
      min + pointerPercent * (max - min),
      min,
      max,
      step
    );

    if (nextValue === fillStartValue) {
      return;
    }

    event.preventBaseUIHandler();
    const targetIndex = nextValue < fillStartValue ? 0 : 1;
    const nextRange: [number, number] =
      targetIndex === 0
        ? [nextValue, fillStartValue]
        : [fillStartValue, nextValue];

    onValueChange(nextRange);
    onValueCommitted?.(nextRange);

    requestAnimationFrame(() => {
      control
        .querySelectorAll<HTMLInputElement>('input[type="range"]')
        [targetIndex]?.focus({ preventScroll: true });
    });
  };
  return (
    <div
      className="relative w-full"
      data-slot="slider-compact-wrapper"
      onPointerLeave={() => setPreview(null)}
      onPointerMove={updatePreview}
    >
      {hideTooltip ? null : (
        <HoverValue
          className="-top-1"
          formatValue={formatValue}
          isPressed={isPressed}
          position={getInsetPosition(preview?.percent ?? 0, COMPACT_INSET)}
          preview={preview}
          reduceMotion={reduceMotion}
        />
      )}
      <SliderPrimitive.Control
        {...props}
        className={cn(
          "group/compact-slider relative flex h-5 w-full cursor-pointer touch-none items-center outline-none data-disabled:cursor-not-allowed",
          className
        )}
        data-slot="slider-control"
        onPointerCancel={(event) => {
          onPointerCancel?.(event);
          setIsPressed(false);
        }}
        onPointerDown={(event) => {
          onPointerDown?.(event);

          if (event.defaultPrevented) {
            return;
          }

          setIsPressed(true);
          handleCollapsedRangePointerDown(event);
        }}
        onPointerUp={(event) => {
          onPointerUp?.(event);
          setIsPressed(false);
        }}
      >
        <SliderPrimitive.Track
          className="relative isolate h-1.5 w-full"
          data-slot="slider-track"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 z-0 rounded-full bg-muted-foreground/20"
            data-slot="slider-rail"
            style={{
              insetInlineEnd: COMPACT_RAIL_INSET,
              insetInlineStart: COMPACT_RAIL_INSET,
            }}
          />
          <motion.span
            aria-hidden="true"
            animate={compactFillStyle}
            className="pointer-events-none absolute inset-y-0 z-[1] rounded-full bg-foreground/75 dark:bg-foreground/80"
            data-slot="slider-indicator"
            initial={false}
            transition={reduceMotion ? { duration: 0 } : spring}
          />
          {compactPreviewStyle && !isPressed ? (
            <motion.span
              animate={compactPreviewStyle}
              className="pointer-events-none absolute inset-y-0 z-[2] rounded-full bg-foreground/20"
              data-slot="slider-preview"
              initial={false}
              transition={reduceMotion ? { duration: 0 } : spring}
            />
          ) : null}
          {steps.length > 0 ? (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-[3]"
              data-slot="slider-steps"
            >
              {steps.slice(1, -1).map((stepValue) => (
                <span
                  key={stepValue}
                  className={cn(
                    "absolute top-1/2 size-1 -translate-x-1/2 -translate-y-1/2 rounded-full",
                    values.length > 1
                      ? stepValue >= fillStartValue && stepValue <= fillEndValue
                        ? "opacity-0"
                        : "bg-muted-foreground/55"
                      : stepValue <= primaryValue
                        ? "opacity-0"
                        : "bg-muted-foreground/55"
                  )}
                  data-slot="slider-step"
                  style={{
                    insetInlineStart: getInsetPosition(
                      getPercent(stepValue, min, max),
                      COMPACT_INSET
                    ),
                  }}
                />
              ))}
            </span>
          ) : null}
          {values.map((_, index) => (
            <SliderPrimitive.Thumb
              key={index}
              className="group/compact-thumb z-30 flex size-5 items-center justify-center rounded-full bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              data-slot="slider-thumb"
              getAriaLabel={getAriaLabel}
              getAriaValueText={(_formattedValue, nextValue) =>
                formatValue(nextValue)
              }
              index={index}
            >
              <span className="relative z-10 size-5 shrink-0 rounded-full border border-border bg-white shadow-md transition-transform duration-150 group-hover/compact-slider:scale-110 group-focus-visible/compact-thumb:scale-110" />
            </SliderPrimitive.Thumb>
          ))}
          {children}
        </SliderPrimitive.Track>
      </SliderPrimitive.Control>
    </div>
  );
}

function DefaultSliderControl({
  children,
  className,
  onPointerCancel,
  onPointerDown,
  onPointerUp,
  ...props
}: SliderControlProps) {
  const {
    disabled,
    formatValue,
    getAriaLabel,
    hideTooltip,
    max,
    min,
    reduceMotion,
    showSteps,
    step,
    value,
  } = useSlider();
  const [isPressed, setIsPressed] = React.useState(false);
  const numericValue = Array.isArray(value) ? value[0] : value;
  const valuePercent = getPercent(numericValue, min, max);
  const steps = showSteps ? getStepValues(min, max, step) : [];
  const { preview, setPreview, updatePreview } = useHoverPreview({
    disabled,
    min,
    max,
    step,
  });
  const previewSegment = preview
    ? getPreviewSegment(preview.percent, [numericValue], min, max)
    : null;
  const defaultPreviewStyle =
    previewSegment && previewSegment.anchor !== previewSegment.target
      ? getTrackSegmentStyle(
          {
            offset: getDefaultFillOffset(previewSegment.anchor),
            percent: previewSegment.anchor,
          },
          {
            offset: getDefaultFillOffset(previewSegment.target),
            percent: previewSegment.target,
          }
        )
      : null;

  return (
    <div
      className="relative w-full"
      data-slot="slider-default-wrapper"
      onPointerLeave={() => setPreview(null)}
      onPointerMove={updatePreview}
    >
      {hideTooltip ? null : (
        <HoverValue
          className="-top-1"
          formatValue={formatValue}
          isPressed={isPressed}
          position={getInsetPosition(preview?.percent ?? 0, DEFAULT_INSET)}
          preview={preview}
          reduceMotion={reduceMotion}
        />
      )}
      <SliderPrimitive.Control
        {...props}
        className={cn(
          "group/default-slider relative flex h-9 w-full cursor-ew-resize touch-none items-center overflow-hidden rounded-lg border border-input/70 not-dark:border-input bg-background shadow-xs outline-0 outline-offset-0 outline-transparent outline-solid [transition:border-color_150ms_ease-out,outline-width_100ms_ease-out,outline-offset_100ms_ease-out,outline-color_100ms_ease-out] has-[input:focus-visible]:border-ring has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-ring/50 data-invalid:border-destructive data-invalid:outline-2 data-invalid:outline-offset-2 data-invalid:outline-destructive/50 data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-64 dark:bg-input/32",
          className
        )}
        data-slot="slider-control"
        onPointerCancel={(event) => {
          onPointerCancel?.(event);
          setIsPressed(false);
        }}
        onPointerDown={(event) => {
          onPointerDown?.(event);

          if (!event.defaultPrevented) {
            setIsPressed(true);
          }
        }}
        onPointerUp={(event) => {
          onPointerUp?.(event);
          setIsPressed(false);
        }}
      >
        <SliderPrimitive.Track
          className="group/default-track relative h-full w-full"
          data-slot="slider-track"
        >
          {steps.length > 0 ? (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-[1]"
              data-slot="slider-steps"
            >
              {steps.slice(1, -1).map((stepValue) => (
                <span
                  key={stepValue}
                  className={cn(
                    "absolute top-1/2 size-1.25 -translate-x-1/2 -translate-y-1/2 rounded-full bg-muted-foreground/40",
                    stepValue <= numericValue && "opacity-0"
                  )}
                  data-slot="slider-step"
                  style={{
                    insetInlineStart: getInsetPosition(
                      getPercent(stepValue, min, max),
                      DEFAULT_INSET
                    ),
                  }}
                />
              ))}
            </span>
          ) : null}
          <motion.span
            aria-hidden="true"
            animate={{ width: getDefaultFillWidth(valuePercent) }}
            className="pointer-events-none absolute inset-y-0 start-0 z-[2] bg-(--slider-color)"
            data-slot="slider-indicator"
            initial={false}
            transition={reduceMotion ? { duration: 0 } : spring}
          />
          {defaultPreviewStyle && !isPressed ? (
            <motion.span
              animate={defaultPreviewStyle}
              className="pointer-events-none absolute inset-y-0 z-[3] bg-accent/55"
              data-slot="slider-preview"
              initial={false}
              transition={reduceMotion ? { duration: 0 } : spring}
            />
          ) : null}
          <SliderPrimitive.Thumb
            className="absolute z-[4] size-5 opacity-0 outline-none"
            data-slot="slider-thumb"
            getAriaLabel={getAriaLabel}
            getAriaValueText={(_formattedValue, nextValue) =>
              formatValue(nextValue)
            }
          />
          <motion.span
            aria-hidden="true"
            animate={{
              insetInlineStart: getDefaultPosition(valuePercent),
            }}
            className="pointer-events-none absolute top-1/2 z-[4] h-4 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/35 transition-[height,background-color] group-hover/default-slider:h-5 group-hover/default-slider:bg-foreground/55"
            data-slot="slider-position-indicator"
            initial={false}
            transition={reduceMotion ? { duration: 0 } : spring}
          />
          {children}
        </SliderPrimitive.Track>
      </SliderPrimitive.Control>
    </div>
  );
}

function SliderControl(props: SliderControlProps) {
  const { variant } = useSlider();

  return variant === "compact" ? (
    <CompactSliderControl {...props} />
  ) : (
    <DefaultSliderControl {...props} />
  );
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(function Slider(
  {
    children,
    className,
    defaultValue = 0,
    disabled = false,
    formatValue = String,
    getAriaLabel,
    hideTooltip = false,
    max = 100,
    min = 0,
    onValueChange,
    onValueCommitted,
    reduceMotion,
    showSteps = false,
    step = 1,
    thumbCollisionBehavior,
    value: valueProp,
    variant = "default",
    ...props
  },
  ref
) {
  const prefersReducedMotion = useReducedMotion();
  const [uncontrolledValue, setUncontrolledValue] =
    React.useState<SliderValueType>(defaultValue);
  const value = valueProp ?? uncontrolledValue;
  const resolvedVariant =
    variant === "compact" || Array.isArray(value) ? "compact" : "default";
  const resolvedThumbCollisionBehavior =
    thumbCollisionBehavior ?? (resolvedVariant === "compact" ? "none" : "push");
  const resolvedReduceMotion = reduceMotion ?? Boolean(prefersReducedMotion);
  const updateValue = (nextValue: SliderValueType) => {
    if (valueProp === undefined) {
      setUncontrolledValue(nextValue);
    }

    onValueChange?.(nextValue);
  };

  return (
    <SliderContext.Provider
      value={{
        disabled,
        formatValue,
        getAriaLabel,
        hideTooltip,
        max,
        min,
        onValueChange: updateValue,
        onValueCommitted,
        reduceMotion: resolvedReduceMotion,
        showSteps,
        step,
        value,
        variant: resolvedVariant,
      }}
    >
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          "w-full touch-none select-none text-sm text-muted-foreground [--slider-color:color-mix(in_oklab,var(--muted-foreground)_25%,transparent)]",
          className
        )}
        data-disabled={disabled ? "" : undefined}
        data-slot="slider"
        data-variant={resolvedVariant}
        disabled={disabled}
        max={max}
        min={min}
        step={step}
        thumbAlignment={resolvedVariant === "compact" ? "edge" : "center"}
        thumbCollisionBehavior={resolvedThumbCollisionBehavior}
        value={value}
        onValueChange={(nextValue) => updateValue(nextValue as SliderValueType)}
        onValueCommitted={(nextValue) =>
          onValueCommitted?.(nextValue as SliderValueType)
        }
        {...props}
      >
        {children ?? <SliderControl />}
      </SliderPrimitive.Root>
    </SliderContext.Provider>
  );
});

export { Slider, SliderContent, SliderControl, SliderLabel, SliderValue };
export type {
  SliderContentProps,
  SliderControlProps,
  SliderLabelProps,
  SliderProps,
  SliderVariant,
  SliderValueType,
  SliderValueProps,
};
