"use client";

import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "cn";
import { ChevronRightIcon } from "lucide-react";
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
type DrawerOnOpenChangeComplete = NonNullable<
  DrawerPrimitive.Root.Props["onOpenChangeComplete"]
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
  keepMounted?: boolean;
}

const DrawerContext = React.createContext<DrawerContextValue>({
  dismissible: true,
  position: "bottom",
  overlay: "blur",
  isAtFullSnap: true,
});

interface DrawerPopupContextValue {
  position: DrawerPosition;
  variant: DrawerVariant;
}

const DrawerPopupContext = React.createContext<DrawerPopupContextValue | null>(
  null
);

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

const floatingDrawerMaxHeight = "calc(100dvh - 4rem)";

function getFloatingDrawerSnapOffset(
  snapPoint: DrawerSnapPoint | null | undefined
) {
  let snapHeight: string;

  if (typeof snapPoint === "number") {
    if (!Number.isFinite(snapPoint)) return "0px";
    snapHeight =
      snapPoint <= 1
        ? `${Math.min(Math.max(snapPoint, 0), 1) * 100}dvh`
        : `${Math.max(snapPoint, 0)}px`;
  } else if (typeof snapPoint === "string") {
    const value = Number.parseFloat(snapPoint);
    const unit = snapPoint.trim().endsWith("rem")
      ? "rem"
      : snapPoint.trim().endsWith("px")
        ? "px"
        : null;

    if (!Number.isFinite(value) || !unit) return "0px";
    snapHeight = `${Math.max(value, 0)}${unit}`;
  } else {
    return "0px";
  }

  return `clamp(0px, calc(${floatingDrawerMaxHeight} - ${snapHeight}), ${floatingDrawerMaxHeight})`;
}

function Drawer({
  dismissible = true,
  disablePointerDismissal = false,
  onOpenChange,
  onOpenChangeComplete,
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
  const [keepMounted, setKeepMounted] = React.useState(false);
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

  const handleSnapPointChange = React.useCallback(
    (nextPoint: DrawerSnapPoint | null, details: any) => {
      if (!isControlled) {
        setUncontrolledSnapPoint(nextPoint);
      }
      onSnapPointChange?.(nextPoint, details);
    },
    [isControlled, onSnapPointChange]
  );

  const expandToNextSnapPoint = React.useCallback(() => {
    if (!snapPoints || snapPoints.length === 0) return;
    const currentIndex = findSnapIndex(snapPoints, currentSnapPoint);
    if (currentIndex < snapPoints.length - 1) {
      const nextPoint = snapPoints[currentIndex + 1];
      if (!isControlled) {
        setUncontrolledSnapPoint(nextPoint);
      }
      onSnapPointChange?.(nextPoint, undefined as any);
    }
  }, [snapPoints, currentSnapPoint, isControlled, onSnapPointChange]);

  const collapseToPrevSnapPoint = React.useCallback(() => {
    if (!snapPoints || snapPoints.length === 0) return;
    const currentIndex = findSnapIndex(snapPoints, currentSnapPoint);
    if (currentIndex > 0) {
      const prevPoint = snapPoints[currentIndex - 1];
      if (!isControlled) {
        setUncontrolledSnapPoint(prevPoint);
      }
      onSnapPointChange?.(prevPoint, undefined as any);
    }
  }, [snapPoints, currentSnapPoint, isControlled, onSnapPointChange]);

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

  const handleOpenChangeComplete =
    React.useCallback<DrawerOnOpenChangeComplete>(
      (nextOpen) => {
        if (nextOpen) {
          setKeepMounted(true);
        }
        onOpenChangeComplete?.(nextOpen);
      },
      [onOpenChangeComplete]
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
      keepMounted,
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
      keepMounted,
    ]
  );

  return (
    <DrawerContext.Provider value={contextValue}>
      <DrawerPrimitive.Root
        data-slot="drawer"
        actionsRef={internalActionsRef}
        disablePointerDismissal={disablePointerDismissal || !dismissible}
        onOpenChange={handleOpenChange}
        onOpenChangeComplete={handleOpenChangeComplete}
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
      if (now - lastGlobalDrawerWheelTime < 500) return;

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
  const { overlay, drawerId, snapPoints, keepMounted } =
    React.useContext(DrawerContext);
  const handleWheel = useOutsideDrawerWheel(onWheel);
  const hasSnapPoints = Boolean(snapPoints?.length);

  return (
    <DrawerPrimitive.Backdrop
      className={cn(
        "pointer-events-auto fixed inset-0 z-50 transition-opacity duration-200 data-ending-style:opacity-0 data-ending-style:duration-[calc(var(--drawer-swipe-strength,1)*200ms)] data-starting-style:opacity-0 data-swiping:duration-0 motion-reduce:transition-none supports-[-webkit-touch-callout:none]:absolute",
        hasSnapPoints
          ? "opacity-[max(0.25,calc(1-var(--drawer-swipe-progress,0)))]"
          : "opacity-[calc(1-var(--drawer-swipe-progress,0))]",
        overlay === "blur" && "bg-black/40 backdrop-blur-sm",
        overlay === "brightness" && "bg-black/50",
        overlay === "transparent" && "bg-transparent",
        keepMounted && "[&[hidden]]:invisible [&[hidden]]:block!",
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
  const { dismissible, drawerId, keepMounted } =
    React.useContext(DrawerContext);
  const handleWheel = useOutsideDrawerWheel(onWheel);

  return (
    <DrawerPrimitive.Viewport
      className={cn(
        "pointer-events-none fixed inset-0 z-50 [--bleed:3rem] [--inset:0px]",
        "touch-none",
        position === "bottom" && "grid grid-cols-1 grid-rows-[1fr_auto] pt-12",
        position === "top" && "grid grid-cols-1 grid-rows-[auto_1fr] pb-12",
        position === "left" && "flex justify-start",
        position === "right" && "flex justify-end",
        variant === "floating" && "px-(--inset) [--inset:1rem]",
        variant === "floating" && position !== "bottom" && "pt-(--inset)",
        variant === "floating" && position !== "top" && "pb-(--inset)",
        keepMounted && "[&[hidden]]:invisible",
        keepMounted &&
          (position === "bottom" || position === "top") &&
          "[&[hidden]]:grid!",
        keepMounted &&
          (position === "left" || position === "right") &&
          "[&[hidden]]:flex!",
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
    snapPoints,
    currentSnapPoint,
    keepMounted,
  } = React.useContext(DrawerContext);
  const position = positionProp ?? contextPosition;
  const usesFloatingSnapPoints =
    variant === "floating" &&
    position === "bottom" &&
    Boolean(snapPoints?.length);
  const popupContextValue = React.useMemo(
    () => ({ position, variant }),
    [position, variant]
  );
  const lastVisibleSnapPointRef = React.useRef<DrawerSnapPoint | null>(
    currentSnapPoint ?? snapPoints?.[0] ?? null
  );
  if (currentSnapPoint != null) {
    lastVisibleSnapPointRef.current = currentSnapPoint;
  }
  const floatingSnapOffset = usesFloatingSnapPoints
    ? getFloatingDrawerSnapOffset(lastVisibleSnapPointRef.current)
    : "0px";
  const popupChildren = (
    <>
      <DrawerPopupContext.Provider value={popupContextValue}>
        {children}
      </DrawerPopupContext.Provider>
      {showBar && dismissible && <DrawerBar position={position} />}
    </>
  );

  return (
    <DrawerPortal keepMounted={keepMounted}>
      <DrawerBackdrop />
      <DrawerViewport position={position} variant={variant}>
        <DrawerPrimitive.Popup
          className={cn(
            "group/drawer-popup pointer-events-auto relative flex max-h-full min-h-0 min-w-0 flex-col bg-popover text-popover-foreground will-change-transform",
            usesFloatingSnapPoints &&
              "pointer-events-none! focus-visible:outline-hidden!",
            variant === "floating" && "w-full",
            variant === "floating"
              ? usesFloatingSnapPoints
                ? "bg-transparent!"
                : "rounded-2xl border border-border"
              : drawerInnerBorderClasses[position],
            !usesFloatingSnapPoints &&
              getDrawerShadowClass(variant, shadowLevel),
            usesFloatingSnapPoints
              ? "transition-[transform,padding-top,opacity] duration-300 ease-out data-ending-style:transition-[transform,opacity] data-starting-style:transition-[transform,opacity]"
              : "transition-[transform,box-shadow,height,background-color,opacity] duration-300 ease-out",
            "motion-reduce:transition-none motion-reduce:transform-none",
            "data-swiping:transition-none",
            "focus-visible:outline-ring/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid forced-colors:focus-visible:outline-[Highlight]",
            "[--peek:1.5rem] [--stack-step:0.05]",
            "[--stack-progress:clamp(0,var(--drawer-swipe-progress,0),1)]",
            "[--scale-base:calc(max(0,1-(var(--nested-drawers)*var(--stack-step))))]",
            "[--scale:clamp(0,calc(var(--scale-base)+(var(--stack-step)*var(--stack-progress))),1)]",
            "[--shrink:calc(1-var(--scale))]",
            "[--stack-peek-offset:max(0px,calc((var(--nested-drawers)-var(--stack-progress))*var(--peek)))]",
            "[--stack-limit:3] [opacity:clamp(0,calc(var(--stack-limit)-var(--nested-drawers)),1)]",
            !usesFloatingSnapPoints &&
              "[--drawer-snap-offset:var(--drawer-snap-point-offset,0px)]",
            !usesFloatingSnapPoints &&
              "[--drawer-swipe-offset-y:var(--drawer-swipe-movement-y,0px)]",
            "before:pointer-events-none before:absolute before:bg-popover",
            "data-swiping:select-none",
            "data-nested-drawer-open:overflow-hidden",
            "data-nested-drawer-open:pointer-events-none",
            "data-ending-style:shadow-transparent data-starting-style:shadow-transparent",
            "data-swipe-dismiss:duration-[clamp(80ms,calc(var(--drawer-swipe-strength,1)*360ms),360ms)]",
            keepMounted && "[&[hidden]]:invisible [&[hidden]]:flex!",
            position === "bottom" &&
              cn(
                "mx-auto",
                "row-start-2",
                "w-full",
                "max-h-[calc(100dvh-3rem)]",
                variant === "floating" && "max-h-[calc(100dvh-2rem)]",
                usesFloatingSnapPoints
                  ? "transform-[translateY(var(--drawer-swipe-movement-y,0px))]"
                  : "transform-[translateY(calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y,0px)))]",
                usesFloatingSnapPoints
                  ? "data-ending-style:transform-[translateY(calc(100%-var(--drawer-floating-snap-offset,0px)+env(safe-area-inset-bottom,0px)+var(--inset)))] data-starting-style:transform-[translateY(calc(100%-var(--drawer-floating-snap-offset,0px)+env(safe-area-inset-bottom,0px)+var(--inset)))]"
                  : "data-ending-style:transform-[translateY(calc(100%+env(safe-area-inset-bottom,0px)+var(--inset)))] data-starting-style:transform-[translateY(calc(100%+env(safe-area-inset-bottom,0px)+var(--inset)))]",
                "before:inset-x-0 before:top-full before:h-(--bleed)",
                "has-data-[slot=drawer-bar]:pt-2",
                usesFloatingSnapPoints
                  ? "h-[calc(100dvh-4rem)] box-border"
                  : "h-(--drawer-height,auto)",
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
              "--drawer-floating-snap-offset": floatingSnapOffset,
              paddingTop: usesFloatingSnapPoints
                ? "var(--drawer-floating-snap-offset, 0px)"
                : undefined,
              ...(usesFloatingSnapPoints
                ? {}
                : {
                    "--drawer-snap-offset":
                      "var(--drawer-snap-point-offset, 0px)",
                    "--drawer-swipe-offset-y":
                      "var(--drawer-swipe-movement-y, 0px)",
                  }),
              ...style,
            } as React.CSSProperties &
              Record<
                | "--drawer-generated-shadow"
                | "--drawer-floating-snap-offset"
                | "--drawer-snap-offset"
                | "--drawer-swipe-offset-y",
                string
              >
          }
          {...props}
        >
          {usesFloatingSnapPoints ? (
            <div
              className={cn(
                "pointer-events-auto relative mt-auto flex h-full min-h-0 w-full shrink-0 flex-col overflow-hidden rounded-2xl border border-border bg-popover text-popover-foreground",
                getDrawerShadowClass("floating", shadowLevel),
                "group-focus-visible/drawer-popup:outline-ring/50 group-focus-visible/drawer-popup:outline-2 group-focus-visible/drawer-popup:outline-offset-2 group-focus-visible/drawer-popup:outline-solid"
              )}
              data-slot="drawer-floating-surface"
              style={{ contain: "layout paint size" }}
            >
              {popupChildren}
            </div>
          ) : (
            popupChildren
          )}
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
  const { position: rootPosition, snapPoints } =
    React.useContext(DrawerContext);
  const popupContext = React.useContext(DrawerPopupContext);
  const position = popupContext?.position ?? rootPosition;
  const isFloating = popupContext?.variant === "floating";
  const isFloatingBottom = isFloating && position === "bottom";
  const isViewportPinned = sticky && position === "bottom" && !isFloatingBottom;
  const followsSnapPoint =
    !sticky &&
    position === "bottom" &&
    !isFloatingBottom &&
    Boolean(snapPoints?.length);

  const defaultProps = {
    className: cn(
      "w-full relative z-10 mt-auto flex flex-col-reverse gap-2 bg-popover px-6 pb-[env(safe-area-inset-bottom,0px)] sm:flex-row sm:justify-end",
      (isViewportPinned || followsSnapPoint) &&
        "will-change-transform transition-transform duration-300 ease-out motion-reduce:transition-none motion-reduce:transform-none in-[[data-slot=drawer-popup][data-swiping]]:!transition-none in-[[data-slot=drawer-popup][data-swiping]]:!duration-0 in-[[data-swiping]]:!transition-none in-[[data-swiping]]:!duration-0",
      isViewportPinned &&
        "transform-[translateY(calc(-1px-var(--drawer-snap-offset,var(--drawer-snap-point-offset,0px))-var(--drawer-swipe-offset-y,var(--drawer-swipe-movement-y,0px))))]",
      followsSnapPoint &&
        "transform-[translateY(calc(0px-var(--drawer-snap-offset,var(--drawer-snap-point-offset,0px))))]",
      !allowSelection && "cursor-default",
      variant === "default" &&
        "in-[[data-slot=drawer-popup]:has([data-slot=drawer-panel])]:pt-3 rounded-b-xl pt-4 pb-[calc(env(safe-area-inset-bottom,0px)+1.5rem)]",
      variant === "inset" &&
        "border-t bg-muted pt-4 pb-[calc(env(safe-area-inset-bottom,0px)+1rem)]",
      isFloating && "rounded-b-2xl!",
      className
    ),
    "data-position": position,
    "data-sticky": sticky ? "" : undefined,
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
  const popupContext = React.useContext(DrawerPopupContext);
  const resolvedPosition = popupContext?.position ?? position;
  const isBottom = resolvedPosition === "bottom";
  const usesFloatingSnapHeight =
    popupContext?.variant === "floating" && isBottom;
  const hasSnapPoints = Boolean(snapPoints?.length);

  const contentRef = React.useRef<HTMLDivElement | null>(null);
  const scrollAreaRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!scrollable || !isBottom || !hasSnapPoints || usesFloatingSnapHeight)
      return;
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
  }, [hasSnapPoints, isBottom, scrollable, usesFloatingSnapHeight]);

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
          !usesFloatingSnapHeight &&
            "in-[[data-slot=drawer-popup][data-position=bottom]:has([data-slot=drawer-footer]:not([data-sticky]))]:mb-(--drawer-snap-offset)",
          !usesFloatingSnapHeight &&
            "in-[[data-slot=drawer-popup][data-position=bottom]:has([data-slot=drawer-footer][data-sticky])]:mb-[calc(var(--drawer-snap-offset,var(--drawer-snap-point-offset,0px))+var(--drawer-swipe-offset-y,var(--drawer-swipe-movement-y,0px)))]"
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
      "absolute z-20 flex touch-none items-center justify-center p-3",
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

function DrawerMenuRow({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">) {
  const defaultProps = {
    className: cn(
      "flex min-h-11 w-full items-center gap-3 rounded-md px-2 py-1 text-base text-foreground sm:min-h-9 sm:text-sm",
      className
    ),
    "data-slot": "drawer-menu-row",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
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
  DrawerMenuItem,
  DrawerMenuGroup,
  DrawerMenuGroupLabel,
  DrawerMenuRow,
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
  DrawerPanelProps,
  DrawerPopupProps,
  DrawerProps,
  DrawerViewportProps,
  DrawerPosition,
};
