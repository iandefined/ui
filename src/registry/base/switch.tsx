"use client";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { animate, motion, useMotionValue, type Transition } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface SwitchProps extends Omit<
  SwitchPrimitive.Root.Props,
  "checked" | "defaultChecked" | "onCheckedChange"
> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  thumbTransition?: Transition;
  size?: "sm" | "default" | "lg";
}

const METRICS = {
  sm: {
    trackWidth: 28,
    trackHeight: 16,
    thumbSize: 12,
    pillExtend: 2,
    pressExtend: 3,
    pressShrink: 3,
  },
  default: {
    trackWidth: 34,
    trackHeight: 20,
    thumbSize: 16,
    pillExtend: 2,
    pressExtend: 4,
    pressShrink: 4,
  },
  lg: {
    trackWidth: 40,
    trackHeight: 24,
    thumbSize: 20,
    pillExtend: 3,
    pressExtend: 5,
    pressShrink: 5,
  },
} as const;

const THUMB_OFFSET = 2;
const DRAG_DEAD_ZONE = 2;

type SwitchPointerEvent = Parameters<
  NonNullable<SwitchPrimitive.Root.Props["onPointerDown"]>
>[0];

const spring = {
  moderate: {
    type: "spring" as const,
    duration: 0.16,
    bounce: 0,
  },
};

function Switch({
  checked,
  defaultChecked = false,
  disabled = false,
  onCheckedChange,
  thumbTransition,
  size = "default",
  className,
  ...props
}: SwitchProps) {
  const hasMounted = useRef(false);
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const dragging = useRef(false);
  const didDrag = useRef(false);
  const pointerStart = useRef<{
    clientX: number;
    originX: number;
  } | null>(null);
  const isControlled = checked !== undefined;
  const isChecked = checked ?? internalChecked;
  const metrics = METRICS[size];
  const thumbTravel = metrics.trackWidth - metrics.thumbSize - THUMB_OFFSET * 2;
  const motionX = useMotionValue(
    isChecked ? THUMB_OFFSET + thumbTravel : THUMB_OFFSET
  );
  const activeHovered = !disabled && hovered;
  const activePressed = !disabled && pressed;

  useEffect(() => {
    hasMounted.current = true;
  }, []);

  const thumbWidth = activePressed
    ? metrics.thumbSize + metrics.pressExtend
    : activeHovered
      ? metrics.thumbSize + metrics.pillExtend
      : metrics.thumbSize;
  const thumbHeight = activePressed
    ? metrics.thumbSize - metrics.pressShrink
    : metrics.thumbSize;
  const thumbY = activePressed
    ? THUMB_OFFSET + metrics.pressShrink / 2
    : THUMB_OFFSET;
  const extraWidth = thumbWidth - metrics.thumbSize;
  const thumbX = isChecked
    ? THUMB_OFFSET + thumbTravel - extraWidth
    : THUMB_OFFSET;

  useEffect(() => {
    if (dragging.current) {
      return;
    }

    if (!hasMounted.current) {
      motionX.set(thumbX);
    } else {
      animate(motionX, thumbX, thumbTransition ?? spring.moderate);
    }
  }, [motionX, thumbTransition, thumbX]);

  const handleCheckedChange = useCallback(
    (nextChecked: boolean) => {
      if (!isControlled) {
        setInternalChecked(nextChecked);
      }

      onCheckedChange?.(nextChecked);
    },
    [isControlled, onCheckedChange]
  );

  const handlePointerDown = useCallback(
    (event: SwitchPointerEvent) => {
      if (disabled || (event.pointerType === "mouse" && event.button !== 0)) {
        return;
      }

      setPressed(true);
      dragging.current = false;
      didDrag.current = false;
      pointerStart.current = {
        clientX: event.clientX,
        originX: motionX.get(),
      };
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [disabled, motionX]
  );

  const handlePointerMove = useCallback(
    (event: SwitchPointerEvent) => {
      if (!pointerStart.current) {
        return;
      }

      const delta = event.clientX - pointerStart.current.clientX;

      if (!dragging.current) {
        if (Math.abs(delta) < DRAG_DEAD_ZONE) {
          return;
        }

        dragging.current = true;
      }

      const dragMin = THUMB_OFFSET;
      const pressedThumbWidth = metrics.thumbSize + metrics.pressExtend;
      const dragMax = metrics.trackWidth - THUMB_OFFSET - pressedThumbWidth;
      const rawX = pointerStart.current.originX + delta;
      motionX.set(Math.max(dragMin, Math.min(dragMax, rawX)));
    },
    [metrics, motionX]
  );

  const handlePointerUp = useCallback(() => {
    if (!pointerStart.current) {
      return;
    }

    setPressed(false);

    if (dragging.current) {
      didDrag.current = true;
      dragging.current = false;

      const currentX = motionX.get();
      const dragMin = THUMB_OFFSET;
      const pressedThumbWidth = metrics.thumbSize + metrics.pressExtend;
      const dragMax = metrics.trackWidth - THUMB_OFFSET - pressedThumbWidth;
      const shouldBeChecked = currentX > (dragMin + dragMax) / 2;

      if (shouldBeChecked !== isChecked) {
        handleCheckedChange(shouldBeChecked);
      } else {
        const snapTarget = isChecked
          ? THUMB_OFFSET + thumbTravel
          : THUMB_OFFSET;
        animate(motionX, snapTarget, thumbTransition ?? spring.moderate);
      }

      requestAnimationFrame(() => {
        didDrag.current = false;
      });
    }

    pointerStart.current = null;
  }, [
    handleCheckedChange,
    isChecked,
    metrics,
    motionX,
    thumbTransition,
    thumbTravel,
  ]);

  const handlePointerCancel = useCallback(() => {
    if (!pointerStart.current) {
      return;
    }

    setPressed(false);

    if (dragging.current) {
      dragging.current = false;
      const snapTarget = isChecked ? THUMB_OFFSET + thumbTravel : THUMB_OFFSET;
      animate(motionX, snapTarget, thumbTransition ?? spring.moderate);
    }

    pointerStart.current = null;
  }, [isChecked, motionX, thumbTransition, thumbTravel]);

  return (
    <SwitchPrimitive.Root
      {...props}
      checked={isChecked}
      className={cn(
        "relative inline-flex shrink-0 cursor-pointer touch-none select-none rounded-full bg-input outline-none transition-colors duration-80 data-checked:bg-primary data-disabled:cursor-not-allowed data-disabled:opacity-50",
        "focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
      disabled={disabled}
      onCheckedChange={(nextChecked) => {
        if (!didDrag.current) {
          handleCheckedChange(nextChecked);
        }
      }}
      onPointerCancel={handlePointerCancel}
      onPointerDown={handlePointerDown}
      onPointerEnter={() => {
        if (!disabled) {
          setHovered(true);
        }
      }}
      onPointerLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        width: metrics.trackWidth,
        height: metrics.trackHeight,
      }}
    >
      <SwitchPrimitive.Thumb
        render={(thumbProps) => {
          const {
            style: baseStyle,
            onAnimationEnd: _onAnimationEnd,
            onAnimationIteration: _onAnimationIteration,
            onAnimationStart: _onAnimationStart,
            onDrag: _onDrag,
            onDragEnd: _onDragEnd,
            onDragStart: _onDragStart,
            ...rest
          } = thumbProps as React.HTMLAttributes<HTMLSpanElement>;

          return (
            <motion.span
              {...rest}
              animate={{
                y: thumbY,
                width: thumbWidth,
                height: thumbHeight,
              }}
              className="absolute top-0 left-0 block rounded-full bg-white shadow-sm data-checked:bg-primary-foreground"
              initial={false}
              style={{
                ...(baseStyle as React.CSSProperties | undefined),
                x: motionX,
              }}
              transition={
                hasMounted.current
                  ? (thumbTransition ?? spring.moderate)
                  : { duration: 0 }
              }
            />
          );
        }}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
export type { SwitchProps };
