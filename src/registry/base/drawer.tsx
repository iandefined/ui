"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import { mergeProps } from "@base-ui/react/merge-props";
import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "cn";
import { CheckIcon, ChevronRightIcon } from "lucide-react";
import { animate, useReducedMotion } from "motion/react";
import * as React from "react";

import { ScrollArea, ScrollAreaContent } from "@/components/ui/scroll-area";

type DrawerPosition = "right" | "left" | "top" | "bottom";
type DrawerVariant = "default" | "floating";
type DrawerOverlay = "blur" | "brightness" | "transparent";
type DrawerSurfaceLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type DrawerShadowLevel = number;
type DrawerOnOpenChange = NonNullable<
  DrawerPrimitive.Root.Props["onOpenChange"]
>;

type DrawerSnapPoint = number | string;

interface DrawerContextValue {
  drawerId?: string;
  position: DrawerPosition;
  dismissible: boolean;
  overlay: DrawerOverlay;
  snapPoints?: DrawerSnapPoint[];
  currentSnapPoint?: DrawerSnapPoint | null;
  expandToNextSnapPoint?: () => void;
  collapseToPrevSnapPoint?: () => void;
  closeDrawer?: () => void;
  isAtFullSnap?: boolean;
  isTransitioningSnap?: boolean;
}

const DrawerContext = React.createContext<DrawerContextValue>({
  dismissible: true,
  position: "bottom",
  overlay: "blur",
  isAtFullSnap: true,
  isTransitioningSnap: false,
});

const directionMap: Record<
  DrawerPosition,
  DrawerPrimitive.Root.Props["swipeDirection"]
> = {
  bottom: "down",
  left: "left",
  right: "right",
  top: "up",
};

const drawerShadowClasses: Record<DrawerSurfaceLevel, string> = {
  1: "shadow-xs",
  2: "shadow-sm",
  3: "shadow",
  4: "shadow-md",
  5: "shadow-lg",
  6: "shadow-xl",
  7: "shadow-2xl",
  8: "shadow-2xl",
};

const drawerGeneratedShadowClass = "shadow-[var(--drawer-generated-shadow)]";

const drawerShadowDirections: Record<DrawerPosition, [number, number]> = {
  bottom: [0, -1],
  left: [1, 0],
  right: [-1, 0],
  top: [0, 1],
};

// Logarithmic scaling keeps the generator finite for every positive level while
// the superlinear dimensions preserve a subtle low-elevation curve.
function createShadow(direction: [number, number], level: DrawerShadowLevel) {
  const normalizedLevel = Number.isFinite(level) ? Math.max(1, level) : 1;
  const scale = Math.log2(normalizedLevel);
  const distance = Math.round(1.5 * scale ** 2.2);
  const blur = Math.max(4, Math.round(4 + 3 * scale ** 2));
  const opacity = Math.min(0.08, 0.03 + 0.02 * scale);

  const directionalShadow = `${direction[0] * distance}px ${direction[1] * distance}px ${blur}px 0px rgb(0 0 0 / ${opacity.toFixed(3)})`;
  const ambientBlur = Math.max(4, Math.round(2 + 4 * scale ** 1.8));
  const ambientShadow = `0px 0px ${ambientBlur}px 0px rgb(0 0 0 / ${(opacity * 0.75).toFixed(3)})`;

  return `${directionalShadow}, ${ambientShadow}`;
}

function createDirectionalShadow(
  position: DrawerPosition,
  level: DrawerShadowLevel
) {
  return createShadow(drawerShadowDirections[position], level);
}

function createFloatingShadow(level: DrawerShadowLevel) {
  return createShadow([0, 0], level);
}

function isDrawerSurfaceLevel(
  level: DrawerShadowLevel
): level is DrawerSurfaceLevel {
  return Number.isInteger(level) && level >= 1 && level <= 8;
}

function getDrawerShadowClass(
  variant: DrawerVariant,
  shadowLevel: DrawerShadowLevel
) {
  if (variant === "floating" && isDrawerSurfaceLevel(shadowLevel)) {
    return drawerShadowClasses[shadowLevel];
  }

  return drawerGeneratedShadowClass;
}

const drawerInnerBorderClasses: Record<DrawerPosition, string> = {
  bottom: "border-t",
  top: "border-b",
  left: "border-r",
  right: "border-l",
};

const drawerIndentTransition = {
  duration: 0.3,
  ease: "easeOut" as const,
};

function useDrawerIndentMotion(
  elementRef: React.RefObject<HTMLElement | null>,
  getAnimation: (active: boolean) => Record<string, number>
) {
  const shouldReduceMotion = useReducedMotion();

  React.useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    let controls: ReturnType<typeof animate> | undefined;

    const syncAnimation = () => {
      controls?.stop();
      controls = animate(
        element,
        getAnimation(element.hasAttribute("data-active")),
        {
          ...drawerIndentTransition,
          duration: shouldReduceMotion ? 0 : drawerIndentTransition.duration,
        }
      );
    };

    const observer = new MutationObserver(syncAnimation);
    observer.observe(element, {
      attributeFilter: ["data-active"],
      attributes: true,
    });
    syncAnimation();

    return () => {
      observer.disconnect();
      controls?.stop();
    };
  }, [elementRef, getAnimation, shouldReduceMotion]);
}

const getIndentAnimation = (active: boolean) => ({
  scale: active ? 0.96 : 1,
});

const getIndentBackgroundAnimation = (active: boolean) => ({
  opacity: active ? 1 : 0,
});

const createDrawerHandle: typeof DrawerPrimitive.createHandle =
  DrawerPrimitive.createHandle;

interface DrawerProps extends DrawerPrimitive.Root.Props {
  dismissible?: boolean;
  overlay?: DrawerOverlay;
  position?: DrawerPosition;
}

function findSnapIndex(
  points: DrawerSnapPoint[],
  current: DrawerSnapPoint | null | undefined
): number {
  if (!points || points.length === 0) return -1;
  if (current == null) return 0;
  const exactIndex = points.findIndex((p) => p === current);
  if (exactIndex !== -1) return exactIndex;
  if (typeof current === "number") {
    let closestIndex = 0;
    let minDiff = Infinity;
    points.forEach((p, i) => {
      if (typeof p === "number") {
        const diff = Math.abs(p - current);
        if (diff < minDiff) {
          minDiff = diff;
          closestIndex = i;
        }
      }
    });
    return closestIndex;
  }
  return 0;
}

function Drawer({
  dismissible = true,
  disablePointerDismissal = false,
  onOpenChange,
  swipeDirection,
  position = "bottom",
  overlay = "blur",
  snapPoints,
  snapPoint,
  defaultSnapPoint,
  onSnapPointChange,
  actionsRef,
  ...props
}: DrawerProps) {
  const drawerId = React.useId();
  const internalActionsRef = React.useRef<DrawerPrimitive.Root.Actions | null>(
    null
  );

  React.useImperativeHandle(
    actionsRef,
    () => ({
      close: () => internalActionsRef.current?.close(),
      unmount: () => internalActionsRef.current?.unmount(),
    }),
    []
  );

  const closeDrawer = React.useCallback(() => {
    if (dismissible) {
      internalActionsRef.current?.close();
    }
  }, [dismissible]);

  const [uncontrolledSnapPoint, setUncontrolledSnapPoint] =
    React.useState<DrawerSnapPoint | null>(
      () => snapPoint ?? defaultSnapPoint ?? snapPoints?.[0] ?? null
    );

  const isControlled = snapPoint !== undefined;
  const currentSnapPoint = isControlled ? snapPoint : uncontrolledSnapPoint;
  const [isTransitioningSnap, setIsTransitioningSnap] = React.useState(false);
  const transitionTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const startTransitionTimer = React.useCallback(() => {
    setIsTransitioningSnap(true);
    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
    }
    transitionTimerRef.current = setTimeout(() => {
      setIsTransitioningSnap(false);
      transitionTimerRef.current = null;
    }, 450);
  }, []);

  React.useEffect(() => {
    return () => {
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  const handleSnapPointChange = React.useCallback(
    (nextPoint: DrawerSnapPoint | null, details: any) => {
      if (!isControlled) {
        setUncontrolledSnapPoint(nextPoint);
      }
      startTransitionTimer();
      onSnapPointChange?.(nextPoint, details);
    },
    [isControlled, onSnapPointChange, startTransitionTimer]
  );

  const expandToNextSnapPoint = React.useCallback(() => {
    if (!snapPoints || snapPoints.length === 0) return;
    const currentIndex = findSnapIndex(snapPoints, currentSnapPoint);
    if (currentIndex < snapPoints.length - 1) {
      const nextPoint = snapPoints[currentIndex + 1];
      if (!isControlled) {
        setUncontrolledSnapPoint(nextPoint);
      }
      startTransitionTimer();
      onSnapPointChange?.(nextPoint, undefined as any);
    }
  }, [
    snapPoints,
    currentSnapPoint,
    isControlled,
    onSnapPointChange,
    startTransitionTimer,
  ]);

  const collapseToPrevSnapPoint = React.useCallback(() => {
    if (!snapPoints || snapPoints.length === 0) return;
    const currentIndex = findSnapIndex(snapPoints, currentSnapPoint);
    if (currentIndex > 0) {
      const prevPoint = snapPoints[currentIndex - 1];
      if (!isControlled) {
        setUncontrolledSnapPoint(prevPoint);
      }
      startTransitionTimer();
      onSnapPointChange?.(prevPoint, undefined as any);
    }
  }, [
    snapPoints,
    currentSnapPoint,
    isControlled,
    onSnapPointChange,
    startTransitionTimer,
  ]);

  const isAtFullSnap = Boolean(
    !snapPoints ||
    snapPoints.length === 0 ||
    findSnapIndex(snapPoints, currentSnapPoint) >= snapPoints.length - 1
  );

  const handleOpenChange = React.useCallback<DrawerOnOpenChange>(
    (nextOpen, eventDetails) => {
      if (!dismissible && !nextOpen && eventDetails.reason !== "close-press") {
        eventDetails.cancel();
        return;
      }

      if (nextOpen && !isControlled && defaultSnapPoint !== undefined) {
        setUncontrolledSnapPoint(defaultSnapPoint);
      }

      onOpenChange?.(nextOpen, eventDetails);
    },
    [dismissible, isControlled, defaultSnapPoint, onOpenChange]
  );

  const contextValue = React.useMemo<DrawerContextValue>(
    () => ({
      drawerId,
      dismissible,
      overlay,
      position,
      snapPoints,
      currentSnapPoint,
      expandToNextSnapPoint,
      collapseToPrevSnapPoint,
      closeDrawer,
      isAtFullSnap,
      isTransitioningSnap,
    }),
    [
      drawerId,
      dismissible,
      overlay,
      position,
      snapPoints,
      currentSnapPoint,
      expandToNextSnapPoint,
      collapseToPrevSnapPoint,
      closeDrawer,
      isAtFullSnap,
      isTransitioningSnap,
    ]
  );

  return (
    <DrawerContext.Provider value={contextValue}>
      <DrawerPrimitive.Root
        data-slot="drawer"
        actionsRef={internalActionsRef}
        disablePointerDismissal={disablePointerDismissal || !dismissible}
        onOpenChange={handleOpenChange}
        swipeDirection={swipeDirection ?? directionMap[position]}
        snapPoints={snapPoints}
        snapPoint={isControlled ? snapPoint : uncontrolledSnapPoint}
        defaultSnapPoint={defaultSnapPoint}
        onSnapPointChange={handleSnapPointChange}
        {...props}
      />
    </DrawerContext.Provider>
  );
}

function DrawerPortal(props: DrawerPrimitive.Portal.Props) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

function DrawerTrigger(
  props: DrawerPrimitive.Trigger.Props
): React.ReactElement {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

function DrawerCloseTrigger(
  props: DrawerPrimitive.Close.Props
): React.ReactElement {
  return <DrawerPrimitive.Close data-slot="drawer-close-trigger" {...props} />;
}

function DrawerContent(props: DrawerPrimitive.Content.Props) {
  return <DrawerPrimitive.Content data-slot="drawer-content" {...props} />;
}

function DrawerProvider(props: DrawerPrimitive.Provider.Props) {
  return <DrawerPrimitive.Provider {...props} />;
}

function DrawerIndent({ className, ...props }: DrawerPrimitive.Indent.Props) {
  const elementRef = React.useRef<HTMLDivElement>(null);
  useDrawerIndentMotion(elementRef, getIndentAnimation);

  return (
    <DrawerPrimitive.Indent
      data-slot="drawer-indent"
      className={cn(
        "data-active:overflow-hidden data-active:rounded-xl will-change-transform",
        className
      )}
      ref={elementRef}
      {...props}
    />
  );
}

function DrawerIndentBackground({
  className,
  ...props
}: DrawerPrimitive.IndentBackground.Props) {
  const elementRef = React.useRef<HTMLDivElement>(null);
  useDrawerIndentMotion(elementRef, getIndentBackgroundAnimation);

  return (
    <DrawerPrimitive.IndentBackground
      data-slot="drawer-indent-background"
      className={cn("fixed inset-0 bg-black/20", className)}
      ref={elementRef}
      {...props}
    />
  );
}

function DrawerSwipeArea({
  className,
  position: positionProp,
  ...props
}: DrawerPrimitive.SwipeArea.Props & {
  position?: DrawerPosition;
}) {
  const { position: contextPosition } = React.useContext(DrawerContext);
  const position = positionProp ?? contextPosition;

  return (
    <DrawerPrimitive.SwipeArea
      className={cn(
        "fixed z-50 touch-none",
        position === "bottom" && "inset-x-0 bottom-0 h-8",
        position === "top" && "inset-x-0 top-0 h-8",
        position === "left" && "inset-y-0 left-0 w-8",
        position === "right" && "inset-y-0 right-0 w-8",
        className
      )}
      data-slot="drawer-swipe-area"
      {...props}
    />
  );
}

let lastGlobalDrawerWheelTime = 0;

function useOutsideDrawerWheel(
  onWheel?: React.WheelEventHandler<HTMLDivElement>
) {
  const {
    drawerId,
    dismissible,
    snapPoints,
    currentSnapPoint,
    expandToNextSnapPoint,
    collapseToPrevSnapPoint,
    closeDrawer,
    isAtFullSnap,
    isTransitioningSnap,
  } = React.useContext(DrawerContext);

  return React.useCallback(
    (event: React.WheelEvent<HTMLDivElement>) => {
      onWheel?.(event);
      if (event.defaultPrevented) return;

      const target = event.target as HTMLElement | null;
      if (target?.closest?.("[data-slot=drawer-popup]")) {
        return;
      }

      event.stopPropagation();
      if (event.cancelable) {
        event.preventDefault();
      }

      const allPopups = Array.from(
        document.querySelectorAll<HTMLElement>("[data-slot=drawer-popup]")
      ).filter((p) => !p.hidden && !p.hasAttribute("hidden"));

      if (allPopups.length === 0) return;

      if (allPopups.some((p) => p.hasAttribute("data-ending-style"))) {
        return;
      }

      const myPopup = drawerId
        ? allPopups.find((p) => p.getAttribute("data-drawer-id") === drawerId)
        : null;

      if (drawerId && !myPopup) {
        return;
      }

      if (myPopup?.hasAttribute("data-nested-drawer-open")) {
        return;
      }

      const frontmostPopup = allPopups.at(-1);
      if (myPopup && frontmostPopup && myPopup !== frontmostPopup) {
        return;
      }

      const now = Date.now();
      if (now - lastGlobalDrawerWheelTime < 500 || isTransitioningSnap) return;

      if (event.deltaY > 15) {
        if (snapPoints && snapPoints.length > 0 && !isAtFullSnap) {
          lastGlobalDrawerWheelTime = now;
          expandToNextSnapPoint?.();
        }
      } else if (event.deltaY < -15) {
        lastGlobalDrawerWheelTime = now;
        if (snapPoints && snapPoints.length > 0) {
          const currentIndex = findSnapIndex(snapPoints, currentSnapPoint);
          if (currentIndex > 0) {
            collapseToPrevSnapPoint?.();
          } else if (dismissible) {
            closeDrawer?.();
          }
        } else if (dismissible) {
          closeDrawer?.();
        }
      }
    },
    [
      onWheel,
      drawerId,
      snapPoints,
      currentSnapPoint,
      isAtFullSnap,
      isTransitioningSnap,
      dismissible,
      expandToNextSnapPoint,
      collapseToPrevSnapPoint,
      closeDrawer,
    ]
  );
}

function DrawerBackdrop({
  className,
  onWheel,
  ...props
}: DrawerPrimitive.Backdrop.Props) {
  const { overlay, drawerId } = React.useContext(DrawerContext);
  const handleWheel = useOutsideDrawerWheel(onWheel);

  return (
    <DrawerPrimitive.Backdrop
      className={cn(
        "fixed inset-0 z-50 opacity-[calc(1-var(--drawer-swipe-progress,0))] transition-opacity duration-200 data-ending-style:opacity-0 data-ending-style:duration-[calc(var(--drawer-swipe-strength,1)*200ms)] data-starting-style:opacity-0 data-swiping:duration-0 motion-reduce:transition-none supports-[-webkit-touch-callout:none]:absolute",
        overlay === "blur" && "bg-black/40 backdrop-blur-sm",
        overlay === "brightness" && "bg-black/50",
        overlay === "transparent" && "bg-transparent",
        className
      )}
      data-slot="drawer-backdrop"
      data-drawer-id={drawerId}
      onWheel={handleWheel}
      {...props}
    />
  );
}

interface DrawerViewportProps extends DrawerPrimitive.Viewport.Props {
  position?: DrawerPosition;
  variant?: DrawerVariant;
}

function DrawerViewport({
  className,
  position,
  variant = "default",
  onWheel,
  ...props
}: DrawerViewportProps) {
  const { dismissible, drawerId } = React.useContext(DrawerContext);
  const handleWheel = useOutsideDrawerWheel(onWheel);

  return (
    <DrawerPrimitive.Viewport
      className={cn(
        "fixed inset-0 z-50 [--bleed:3rem] [--inset:0px]",
        "touch-none",
        position === "bottom" && "grid grid-cols-1 grid-rows-[1fr_auto] pt-12",
        position === "top" && "grid grid-cols-1 grid-rows-[auto_1fr] pb-12",
        position === "left" && "flex justify-start",
        position === "right" && "flex justify-end",
        variant === "floating" && "px-(--inset) [--inset:1rem]",
        variant === "floating" && position !== "bottom" && "pt-(--inset)",
        variant === "floating" && position !== "top" && "pb-(--inset)",
        className
      )}
      data-slot="drawer-viewport"
      data-drawer-id={drawerId}
      data-base-ui-swipe-ignore={!dismissible ? "" : undefined}
      onWheel={handleWheel}
      {...props}
    />
  );
}

interface DrawerPopupProps extends DrawerPrimitive.Popup.Props {
  position?: DrawerPosition;
  variant?: DrawerVariant;
  showBar?: boolean;
  level?: DrawerSurfaceLevel;
  shadowLevel?: DrawerShadowLevel;
}

function DrawerPopup({
  className,
  children,
  style,
  position: positionProp,
  variant = "default",
  showBar = false,
  level = 5,
  shadowLevel = 5,
  ...props
}: DrawerPopupProps) {
  const {
    dismissible,
    position: contextPosition,
    drawerId,
  } = React.useContext(DrawerContext);
  const position = positionProp ?? contextPosition;

  return (
    <DrawerPortal>
      <DrawerBackdrop />
      <DrawerViewport position={position} variant={variant}>
        <DrawerPrimitive.Popup
          className={cn(
            "pointer-events-auto relative flex max-h-full min-h-0 min-w-0 flex-col bg-popover text-popover-foreground will-change-transform",
            variant === "floating" && "w-full",
            variant === "floating"
              ? "rounded-2xl border border-border"
              : drawerInnerBorderClasses[position],
            getDrawerShadowClass(variant, shadowLevel),
            "transition-[transform,box-shadow,height,background-color,opacity] duration-300 ease-out motion-reduce:transition-none motion-reduce:transform-none",
            "data-swiping:transition-none",
            "focus-visible:outline-ring/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid forced-colors:focus-visible:outline-[Highlight]",
            "[--peek:1.5rem] [--stack-step:0.05]",
            "[--stack-progress:clamp(0,var(--drawer-swipe-progress,0),1)]",
            "[--scale-base:calc(max(0,1-(var(--nested-drawers)*var(--stack-step))))]",
            "[--scale:clamp(0,calc(var(--scale-base)+(var(--stack-step)*var(--stack-progress))),1)]",
            "[--shrink:calc(1-var(--scale))]",
            "[--stack-peek-offset:max(0px,calc((var(--nested-drawers)-var(--stack-progress))*var(--peek)))]",
            "[--stack-limit:3] [opacity:clamp(0,calc(var(--stack-limit)-var(--nested-drawers)),1)]",
            "[--drawer-snap-offset:var(--drawer-snap-point-offset,0px)]",
            "[--drawer-swipe-offset-y:var(--drawer-swipe-movement-y,0px)]",
            "before:pointer-events-none before:absolute before:bg-popover",
            "data-swiping:select-none",
            "data-nested-drawer-open:overflow-hidden",
            "data-nested-drawer-open:pointer-events-none",
            "data-ending-style:shadow-transparent data-starting-style:shadow-transparent",
            "data-swiping:data-ending-style:duration-[calc(var(--drawer-swipe-strength)*200ms)]",
            position === "bottom" &&
              cn(
                "mx-auto",
                "row-start-2",
                "w-full",
                "max-h-[calc(100dvh-3rem)]",
                variant === "floating" && "max-h-[calc(100dvh-2rem)]",
                "transform-[translateY(calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y,0px)))]",
                "data-starting-style:transform-[translateY(calc(100%+env(safe-area-inset-bottom,0px)+var(--inset)))]",
                "data-ending-style:transform-[translateY(calc(100%+env(safe-area-inset-bottom,0px)+var(--inset)))]",
                "before:inset-x-0 before:top-full before:h-(--bleed)",
                "has-data-[slot=drawer-bar]:pt-2",
                "h-(--drawer-height,auto)",
                "[--height:max(0px,calc(var(--drawer-frontmost-height,var(--drawer-height))))]",
                "data-nested-drawer-open:h-(--height)",
                "origin-[50%_calc(100%-var(--inset))]",
                "data-nested-drawer-open:transform-[translateY(calc(var(--drawer-swipe-movement-y,0px)-var(--stack-peek-offset)-(var(--shrink)*var(--height))))_scale(var(--scale))]"
              ),
            position === "top" &&
              cn(
                "mx-auto",
                "w-full",
                "max-h-[calc(100dvh-3rem)]",
                variant === "floating" && "max-h-[calc(100dvh-2rem)]",
                "transform-[translateY(var(--drawer-swipe-movement-y,0px))]",
                "data-starting-style:transform-[translateY(calc(-100%-var(--inset)))]",
                "data-ending-style:transform-[translateY(calc(-100%-var(--inset)))]",
                "before:inset-x-0 before:bottom-full before:h-(--bleed)",
                "has-data-[slot=drawer-bar]:pb-2",
                "h-(--drawer-height,auto)",
                "[--height:max(0px,calc(var(--drawer-frontmost-height,var(--drawer-height))))]",
                "data-nested-drawer-open:h-(--height)",
                "origin-[50%_var(--inset)]",
                "data-nested-drawer-open:transform-[translateY(calc(var(--drawer-swipe-movement-y,0px)+var(--stack-peek-offset)+(var(--shrink)*var(--height))))_scale(var(--scale))]"
              ),
            position === "left" &&
              cn(
                "max-w-md",
                variant === "default" && "w-3/4 sm:max-w-sm",
                variant === "floating" && "w-[75vw] max-w-sm",
                "transform-[translateX(var(--drawer-swipe-movement-x,0px))]",
                "data-starting-style:transform-[translateX(calc(-100%-var(--inset)))]",
                "data-ending-style:transform-[translateX(calc(-100%-var(--inset)))]",
                "before:inset-y-0 before:end-full before:w-(--bleed)",
                "origin-right",
                "data-nested-drawer-open:transform-[translateX(calc(var(--drawer-swipe-movement-x,0px)+var(--stack-peek-offset)))_scale(var(--scale))]"
              ),
            position === "right" &&
              cn(
                "max-w-md",
                variant === "default" && "w-3/4 sm:max-w-sm",
                variant === "floating" && "w-[75vw] max-w-sm",
                "transform-[translateX(var(--drawer-swipe-movement-x,0px))]",
                "data-starting-style:transform-[translateX(calc(100%+var(--inset)))]",
                "data-ending-style:transform-[translateX(calc(100%+var(--inset)))]",
                "before:inset-y-0 before:start-full before:w-(--bleed)",
                "origin-left",
                "data-nested-drawer-open:transform-[translateX(calc(var(--drawer-swipe-movement-x,0px)-var(--stack-peek-offset)))_scale(var(--scale))]"
              ),
            variant !== "floating"
              ? cn(
                  position === "bottom" && "rounded-t-2xl",
                  position === "top" && "rounded-b-2xl"
                )
              : cn(
                  position === "bottom" && "rounded-t-2xl",
                  position === "top" && "rounded-b-2xl",
                  position === "left" && "rounded-e-2xl",
                  position === "right" && "rounded-s-2xl",
                  "before:bg-transparent"
                ),
            className
          )}
          data-level={level}
          data-position={position}
          data-shadow-level={shadowLevel}
          data-slot="drawer-popup"
          data-drawer-id={drawerId}
          data-base-ui-swipe-ignore={!dismissible ? "" : undefined}
          style={
            {
              "--drawer-generated-shadow":
                variant === "floating"
                  ? createFloatingShadow(shadowLevel)
                  : createDirectionalShadow(position, shadowLevel),
              "--drawer-snap-offset": "var(--drawer-snap-point-offset, 0px)",
              "--drawer-swipe-offset-y": "var(--drawer-swipe-movement-y, 0px)",
              ...style,
            } as React.CSSProperties &
              Record<
                | "--drawer-generated-shadow"
                | "--drawer-snap-offset"
                | "--drawer-swipe-offset-y",
                string
              >
          }
          {...props}
        >
          {children}
          {showBar && dismissible && <DrawerBar position={position} />}
        </DrawerPrimitive.Popup>
      </DrawerViewport>
    </DrawerPortal>
  );
}

interface DrawerHeaderProps extends useRender.ComponentProps<"div"> {
  allowSelection?: boolean;
}

function DrawerHeader({
  className,
  allowSelection = false,
  render,
  ...props
}: DrawerHeaderProps) {
  const defaultProps = {
    className: cn(
      "w-full flex flex-col gap-2 p-6 in-[[data-slot=drawer-popup]:has([data-slot=drawer-panel])]:pb-3 max-sm:pb-4",
      !allowSelection && "cursor-default",
      className
    ),
    "data-slot": "drawer-header",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render: allowSelection ? <DrawerContent render={render} /> : render,
  });
}

interface DrawerFooterProps extends useRender.ComponentProps<"div"> {
  variant?: "default" | "inset";
  sticky?: boolean;
  allowSelection?: boolean;
}

function DrawerFooter({
  className,
  variant = "default",
  sticky = false,
  allowSelection = false,
  render,
  ...props
}: DrawerFooterProps) {
  const { position } = React.useContext(DrawerContext);

  const defaultProps = {
    className: cn(
      "w-full relative z-10 mt-auto flex flex-col-reverse gap-2 bg-popover px-6 pb-[env(safe-area-inset-bottom,0px)] sm:flex-row sm:justify-end",
      sticky &&
        "will-change-transform data-[position=bottom]:transform-[translateY(calc(-1px-var(--drawer-snap-offset,var(--drawer-snap-point-offset,0px))-var(--drawer-swipe-offset-y,var(--drawer-swipe-movement-y,0px))))] data-[position=bottom]:transition-transform data-[position=bottom]:duration-300 data-[position=bottom]:ease-out motion-reduce:transition-none motion-reduce:transform-none in-[[data-slot=drawer-popup][data-swiping]]:!transition-none in-[[data-slot=drawer-popup][data-swiping]]:!duration-0 in-[[data-swiping]]:!transition-none in-[[data-swiping]]:!duration-0",
      !allowSelection && "cursor-default",
      variant === "default" &&
        "in-[[data-slot=drawer-popup]:has([data-slot=drawer-panel])]:pt-3 rounded-b-xl pt-4 pb-[calc(env(safe-area-inset-bottom,0px)+1.5rem)]",
      variant === "inset" &&
        "border-t bg-muted pt-4 pb-[calc(env(safe-area-inset-bottom,0px)+1rem)]",
      className
    ),
    "data-position": position,
    "data-slot": "drawer-footer",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render: allowSelection ? <DrawerContent render={render} /> : render,
  });
}

function DrawerTitle({ className, ...props }: DrawerPrimitive.Title.Props) {
  return (
    <DrawerPrimitive.Title
      className={cn(
        "text-lg leading-none font-semibold tracking-tight",
        className
      )}
      data-slot="drawer-title"
      {...props}
    />
  );
}

function DrawerDescription({
  className,
  ...props
}: DrawerPrimitive.Description.Props) {
  return (
    <DrawerPrimitive.Description
      className={cn("text-muted-foreground text-sm", className)}
      data-slot="drawer-description"
      {...props}
    />
  );
}

interface DrawerPanelProps extends useRender.ComponentProps<"div"> {
  scrollFade?: boolean;
  scrollable?: boolean;
  allowSelection?: boolean;
}

function DrawerPanel({
  className,
  scrollFade = false,
  scrollable = true,
  allowSelection = true,
  render,
  ...props
}: DrawerPanelProps) {
  const { position, snapPoints } = React.useContext(DrawerContext);
  const isBottom = position === "bottom";
  const hasSnapPoints = Boolean(snapPoints?.length);

  const contentRef = React.useRef<HTMLDivElement | null>(null);
  const scrollAreaRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!scrollable || !isBottom || !hasSnapPoints) return;
    const contentElement = contentRef.current;
    const scrollAreaElement = scrollAreaRef.current;
    if (!contentElement || !scrollAreaElement) return;

    let animationFrame: number | null = null;

    const observer = new ResizeObserver(([entry]) => {
      const height = Math.round(
        entry.borderBoxSize[0]?.blockSize ?? entry.contentRect.height
      );

      if (height <= 0) return;

      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
      }

      animationFrame = requestAnimationFrame(() => {
        const maxHeight = `calc(${height}px - var(--drawer-snap-offset, var(--drawer-snap-point-offset, 0px)) - var(--drawer-swipe-offset-y, var(--drawer-swipe-movement-y, 0px)))`;
        if (scrollAreaElement.style.maxHeight !== maxHeight) {
          scrollAreaElement.style.maxHeight = maxHeight;
        }
        animationFrame = null;
      });
    });

    observer.observe(contentElement);
    return () => {
      observer.disconnect();
      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
      }
      scrollAreaElement.style.removeProperty("max-height");
    };
  }, [hasSnapPoints, isBottom, scrollable]);

  const defaultProps = {
    className: cn(
      "w-full p-6 in-[[data-slot=drawer-popup]:has([data-slot=drawer-header])]:pt-1 in-[[data-slot=drawer-popup]:has([data-slot=drawer-footer]:not(.border-t))]:pb-1",
      !allowSelection && "cursor-default",
      className
    ),
    "data-slot": "drawer-panel",
  };

  const content = useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render: allowSelection ? <DrawerContent render={render} /> : render,
  });

  if (scrollable) {
    return (
      <ScrollArea
        className={cn(
          "w-full min-h-0 flex-1 touch-auto",
          "in-[[data-slot=drawer-popup][data-position=bottom]]:mb-[calc(var(--drawer-snap-offset,var(--drawer-snap-point-offset,0px))+var(--drawer-swipe-offset-y,var(--drawer-swipe-movement-y,0px)))]"
        )}
        ref={scrollAreaRef}
        scrollShadow={scrollFade ? "vertical" : "none"}
      >
        <ScrollAreaContent className="w-full">
          <div ref={contentRef} className="w-full">
            {content}
          </div>
        </ScrollAreaContent>
      </ScrollArea>
    );
  }

  return content;
}

interface DrawerBarProps extends useRender.ComponentProps<"div"> {
  position?: DrawerPosition;
}

function DrawerBar({
  className,
  position: positionProp,
  render,
  ...props
}: DrawerBarProps) {
  const { position: contextPosition } = React.useContext(DrawerContext);
  const position = positionProp ?? contextPosition;
  const horizontal = position === "left" || position === "right";

  const defaultProps = {
    "aria-hidden": true as const,
    className: cn(
      "absolute flex touch-none items-center justify-center p-3",
      "cursor-grab active:cursor-grabbing",
      "after:absolute after:-inset-2 after:pointer-events-auto after:content-['']",
      horizontal
        ? "inset-y-0 before:hidden"
        : "inset-x-0 before:h-1 before:w-12 before:rounded-full before:bg-muted-foreground/25 before:transition-colors before:duration-150 hover:before:bg-muted-foreground/50",
      position === "top" && "bottom-0",
      position === "bottom" && "top-0",
      position === "left" && "right-0",
      position === "right" && "left-0",
      className
    ),
    "data-slot": "drawer-bar",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

function DrawerMenu({
  className,
  render,
  ...props
}: useRender.ComponentProps<"nav">) {
  const defaultProps = {
    className: cn("-m-2 flex flex-col", className),
    "data-slot": "drawer-menu",
  };

  return useRender({
    defaultTagName: "nav",
    props: mergeProps<"nav">(defaultProps, props),
    render,
  });
}

function DrawerMenuItem({
  className,
  variant = "default",
  render,
  disabled,
  ...props
}: useRender.ComponentProps<"button"> & {
  variant?: "default" | "destructive";
}) {
  const defaultProps = {
    className: cn(
      "flex min-h-11 w-full cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1 text-base text-foreground outline-none hover:bg-muted hover:text-accent-foreground focus-visible:outline-ring/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid disabled:pointer-events-none disabled:opacity-60 data-[variant=destructive]:text-destructive sm:min-h-9 sm:text-sm motion-reduce:transition-none [&>svg:not([class*='opacity-'])]:opacity-80 [&>svg:not([class*='size-'])]:size-4 [&>svg]:pointer-events-none [&>svg]:shrink-0",
      className
    ),
    "data-slot": "drawer-menu-item",
    "data-variant": variant,
    disabled,
    type: "button" as const,
  };

  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(defaultProps, props),
    render,
  });
}

function DrawerMenuSeparator({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">) {
  const defaultProps = {
    className: cn("mx-2 my-2 h-px bg-border", className),
    "data-slot": "drawer-menu-separator",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

function DrawerMenuGroup({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">) {
  const defaultProps = {
    className: cn("flex flex-col", className),
    "data-slot": "drawer-menu-group",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

function DrawerMenuGroupLabel({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">) {
  const defaultProps = {
    className: cn(
      "px-2 py-1.5 font-medium text-muted-foreground text-xs",
      className
    ),
    "data-slot": "drawer-menu-group-label",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

function DrawerMenuTrigger({
  className,
  children,
  ...props
}: DrawerPrimitive.Trigger.Props) {
  return (
    <DrawerTrigger
      className={cn(
        "flex min-h-11 mr-auto cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1 text-base text-foreground outline-none hover:bg-muted hover:text-accent-foreground focus-visible:outline-ring/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid sm:min-h-9 sm:text-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      data-slot="drawer-menu-trigger"
      {...props}
    >
      {children}
      <ChevronRightIcon
        aria-hidden="true"
        className="ms-auto -me-0.5 opacity-70"
      />
    </DrawerTrigger>
  );
}

type DrawerSwitchColor = "primary" | "neutral";
type DrawerSwitchShape = "circle" | "pill" | "squircle";
type DrawerSwitchSize = "xs" | "sm" | "default" | "lg";
type DrawerSwitchMotion = "default" | "stretch";

const drawerSwitchSizeClasses: Record<
  DrawerSwitchSize,
  { track: string; thumb: string; checked: string }
> = {
  xs: {
    track: "h-4 w-7 p-0.5",
    thumb: "size-3",
    checked: "in-data-checked:translate-x-3",
  },
  sm: {
    track: "h-5 w-9 p-0.5",
    thumb: "size-4",
    checked: "in-data-checked:translate-x-4",
  },
  default: {
    track: "h-6 w-11 p-0.5",
    thumb: "size-5",
    checked: "in-data-checked:translate-x-5",
  },
  lg: {
    track: "h-7 w-[3.25rem] p-0.5",
    thumb: "size-6",
    checked: "in-data-checked:translate-x-6",
  },
};

function DrawerSwitchIndicator({
  color,
  motion,
  shape,
  size,
}: {
  color: DrawerSwitchColor;
  motion: DrawerSwitchMotion;
  shape: DrawerSwitchShape;
  size: DrawerSwitchSize;
}) {
  const metrics = drawerSwitchSizeClasses[size];

  return (
    <CheckboxPrimitive.Indicator
      aria-hidden
      className="group/drawer-switch col-start-2 flex shrink-0 items-center justify-center"
      data-motion={motion}
      keepMounted
    >
      <span
        data-motion={motion}
        className={cn(
          "relative inline-flex shrink-0 items-center bg-input transition-colors duration-100 data-[motion=stretch]:[&>span]:transition-[transform,width]",
          "in-data-checked:bg-primary",
          color === "neutral" && "in-data-checked:bg-foreground/70",
          shape === "circle" && "rounded-full",
          shape === "pill" && "rounded-md",
          shape === "squircle" && "rounded-[35%]",
          metrics.track,
          "motion-reduce:transition-none"
        )}
      >
        <span
          className={cn(
            "block shrink-0 bg-background shadow-sm transition-transform duration-150 motion-reduce:transition-none",
            shape === "circle" && "rounded-full",
            shape === "pill" && "rounded-md",
            shape === "squircle" && "rounded-[35%]",
            metrics.thumb,
            metrics.checked
          )}
        />
      </span>
    </CheckboxPrimitive.Indicator>
  );
}

interface DrawerMenuCheckboxItemProps extends CheckboxPrimitive.Root.Props {
  indicator?: "check" | "switch";
  switchColor?: DrawerSwitchColor;
  switchShape?: DrawerSwitchShape;
  switchSize?: DrawerSwitchSize;
  switchMotion?: DrawerSwitchMotion;
}

function DrawerMenuCheckboxItem({
  className,
  children,
  indicator = "check",
  switchColor = "primary",
  switchShape = "circle",
  switchSize = "sm",
  switchMotion = "default",
  ...props
}: DrawerMenuCheckboxItemProps) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        "group/drawer-checkbox grid min-h-11 w-full cursor-pointer select-none items-center rounded-md px-2 py-1 text-base text-foreground outline-none hover:bg-muted hover:text-accent-foreground focus-visible:outline-ring/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid data-disabled:pointer-events-none data-disabled:opacity-60 sm:min-h-9 sm:text-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        indicator === "switch"
          ? "grid-cols-[1fr_auto] gap-4 pe-1.5"
          : "grid-cols-[1fr_1rem] gap-2 pe-2",
        className
      )}
      data-slot="drawer-menu-checkbox-item"
      {...props}
    >
      <span className="col-start-1 flex min-w-0 items-center gap-2">
        {children}
      </span>
      {indicator === "switch" ? (
        <DrawerSwitchIndicator
          color={switchColor}
          motion={switchMotion}
          shape={switchShape}
          size={switchSize}
        />
      ) : (
        <CheckboxPrimitive.Indicator
          aria-hidden
          className="col-start-2 flex items-center justify-center text-primary"
          keepMounted
        >
          <CheckIcon
            className="scale-75 opacity-0 transition-[opacity,transform] duration-150 in-data-checked:scale-100 in-data-checked:opacity-100 motion-reduce:transition-none"
            strokeWidth={2.5}
          />
        </CheckboxPrimitive.Indicator>
      )}
    </CheckboxPrimitive.Root>
  );
}

function DrawerMenuRadioGroup({
  className,
  ...props
}: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      className={cn("flex flex-col", className)}
      data-slot="drawer-menu-radio-group"
      {...props}
    />
  );
}

interface DrawerMenuRadioItemProps extends RadioPrimitive.Root.Props {
  value: string;
}

function DrawerMenuRadioItem({
  className,
  children,
  ...props
}: DrawerMenuRadioItemProps) {
  return (
    <RadioPrimitive.Root
      className={cn(
        "grid min-h-11 w-full cursor-pointer select-none grid-cols-[1fr_1rem] items-center gap-2 rounded-md px-2 py-1 text-base text-foreground outline-none hover:bg-muted hover:text-accent-foreground focus-visible:outline-ring/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid data-disabled:pointer-events-none data-disabled:opacity-60 sm:min-h-9 sm:text-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      data-slot="drawer-menu-radio-item"
      {...props}
      value={props.value}
    >
      <span className="col-start-1 flex min-w-0 items-center gap-2">
        {children}
      </span>
      <RadioPrimitive.Indicator
        aria-hidden
        className="col-start-2 flex items-center justify-center text-primary"
        keepMounted
      >
        <CheckIcon
          className="scale-75 opacity-0 transition-[opacity,transform] duration-150 in-data-checked:scale-100 in-data-checked:opacity-100 motion-reduce:transition-none"
          strokeWidth={2.5}
        />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  );
}

export {
  Drawer,
  DrawerBackdrop,
  DrawerBar,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerIndent,
  DrawerIndentBackground,
  DrawerMenu,
  DrawerMenuCheckboxItem,
  DrawerMenuItem,
  DrawerMenuGroup,
  DrawerMenuGroupLabel,
  DrawerMenuRadioGroup,
  DrawerMenuRadioItem,
  DrawerMenuSeparator,
  DrawerMenuTrigger,
  DrawerPanel,
  DrawerPopup,
  DrawerPortal,
  DrawerProvider,
  DrawerSwipeArea,
  DrawerTitle,
  DrawerTrigger,
  DrawerViewport,
  createDrawerHandle,
  DrawerPrimitive,
};

export type {
  DrawerFooterProps,
  DrawerHeaderProps,
  DrawerMenuCheckboxItemProps,
  DrawerMenuRadioItemProps,
  DrawerPanelProps,
  DrawerPopupProps,
  DrawerProps,
  DrawerViewportProps,
  DrawerPosition,
};
