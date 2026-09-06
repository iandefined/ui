"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { cva } from "class-variance-authority";
import { XIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollAreaContent } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type SheetSide = "right" | "left" | "top" | "bottom";
type SheetVariant = "default" | "floating";
type SheetFooterVariant = "default" | "inset";
type SheetSurfaceLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type SheetShadowLevel = number;
type SheetFadeEdge = "top" | "bottom" | "left" | "right" | "x" | "y";
type SheetFadeEdges = boolean | SheetFadeEdge | SheetFadeEdge[];
type SheetOnOpenChange = NonNullable<
  DialogPrimitive.Root.Props["onOpenChange"]
>;

interface SheetConfigContextValue {
  modal: boolean | "trap-focus";
  side: SheetSide | null;
}

const SheetConfigContext = React.createContext<SheetConfigContextValue>({
  modal: true,
  side: null,
});

const sheetShadowClasses: Record<SheetSurfaceLevel, string> = {
  1: "shadow-xs",
  2: "shadow-sm",
  3: "shadow",
  4: "shadow-md",
  5: "shadow-lg",
  6: "shadow-xl",
  7: "shadow-2xl",
  8: "shadow-2xl",
};

const sheetGeneratedShadowClass = "shadow-[var(--sheet-generated-shadow)]";

const sheetShadowDirections: Record<SheetSide, [number, number]> = {
  bottom: [0, -1],
  left: [1, 0],
  right: [-1, 0],
  top: [0, 1],
};

// Logarithmic scaling keeps the generator finite for every positive level while
// the superlinear dimensions preserve a subtle low-elevation curve.
function createShadow(direction: [number, number], level: SheetShadowLevel) {
  const normalizedLevel = Number.isFinite(level) ? Math.max(1, level) : 1;
  const scale = Math.log2(normalizedLevel);
  const distance = Math.round(1.5 * scale ** 2.2);
  const blur = Math.max(2, Math.round(2 + 2 * scale ** 2.2));
  const spread = -Math.round(scale ** 1.3);
  const opacity = Math.min(0.1, 0.05 + 0.05 * scale);

  const formatShadow = (
    shadowDistance: number,
    shadowBlur: number,
    shadowSpread: number,
    shadowOpacity: number
  ) =>
    `${direction[0] * shadowDistance}px ${direction[1] * shadowDistance}px ${shadowBlur}px ${shadowSpread}px rgb(0 0 0 / ${shadowOpacity.toFixed(3)})`;

  const primaryShadow = formatShadow(distance, blur, spread, opacity);

  if (scale === 0) {
    return primaryShadow;
  }

  const ambientBlur = Math.max(2, Math.round(1 + 1.25 * scale ** 1.8));
  const ambientSpread = -Math.round(1.2 * scale ** 1.15);
  const ambientShadow = formatShadow(
    Math.round(distance / 2),
    ambientBlur,
    ambientSpread,
    opacity
  );

  return `${primaryShadow}, ${ambientShadow}`;
}

function createDirectionalShadow(side: SheetSide, level: SheetShadowLevel) {
  return createShadow(sheetShadowDirections[side], level);
}

function createFloatingShadow(level: SheetShadowLevel) {
  return createShadow([0, 0], level);
}

function isSheetSurfaceLevel(
  level: SheetShadowLevel
): level is SheetSurfaceLevel {
  return Number.isInteger(level) && level >= 1 && level <= 8;
}

function getSheetShadowClass(
  variant: SheetVariant,
  shadowLevel: SheetShadowLevel
) {
  if (variant === "floating" && isSheetSurfaceLevel(shadowLevel)) {
    return sheetShadowClasses[shadowLevel];
  }

  return sheetGeneratedShadowClass;
}

const sheetBorderClasses: Record<SheetSide, string> = {
  bottom: "border-t",
  left: "border-r",
  right: "border-l",
  top: "border-b",
};

const sheetNestedSurfaceClasses: Record<SheetSide, string> = {
  bottom:
    "data-nested-dialog-open:rounded-t-2xl data-nested-dialog-open:border-border/50",
  left: "data-nested-dialog-open:rounded-e-2xl data-nested-dialog-open:border-border/50",
  right:
    "data-nested-dialog-open:rounded-s-2xl data-nested-dialog-open:border-border/50",
  top: "data-nested-dialog-open:rounded-b-2xl data-nested-dialog-open:border-border/50",
};

const sheetContentVariants = cva(
  [
    "pointer-events-auto fixed z-50 flex max-h-full min-h-0 w-full max-w-full min-w-0 flex-col overflow-hidden bg-popover text-popover-foreground outline-hidden will-change-transform",
    "transition-[transform,box-shadow,height,background-color,border-color,border-radius,opacity] duration-300 ease-out motion-reduce:transition-none motion-reduce:transform-none",
    "[--inset:0px]",
    "[--peek:1.5rem] [--stack-step:0.05]",
    "[--stack-progress:0]",
    "[--scale-base:calc(max(0,1-(var(--nested-dialogs)*var(--stack-step))))]",
    "[--scale:clamp(0,calc(var(--scale-base)+(var(--stack-step)*var(--stack-progress))),1)]",
    "[--stack-peek-offset:max(0px,calc((var(--nested-dialogs)-var(--stack-progress))*var(--peek)))]",
    "[--stack-limit:3] [opacity:clamp(0,calc(var(--stack-limit)-var(--nested-dialogs)),1)]",
    "data-nested-dialog-open:pointer-events-none",
    "data-ending-style:shadow-transparent data-starting-style:shadow-transparent",
    "before:pointer-events-none before:absolute before:inset-0 before:z-10 before:hidden before:rounded-[inherit] before:bg-black/15 before:opacity-0 before:transition-[opacity,display] before:duration-300 before:transition-discrete",
    "data-nested-dialog-open:before:block data-nested-dialog-open:before:opacity-100",
    "starting:data-nested-dialog-open:before:opacity-0",
  ],
  {
    variants: {
      variant: {
        default: "",
        floating:
          "[--inset:1rem] max-h-[calc(100%-2rem)] w-[calc(100%-2rem)] max-w-[calc(100%-2rem)] rounded-2xl border border-border",
      },
      side: {
        top: "",
        right: "sm:max-w-md",
        bottom: "",
        left: "sm:max-w-md",
      },
    },
    compoundVariants: [
      {
        variant: "floating",
        side: "right",
        class:
          "inset-y-4 end-4 origin-left data-nested-dialog-open:transform-[translateX(calc(0px-var(--stack-peek-offset)))_scale(var(--scale))] data-ending-style:transform-[translateX(calc(100%+1rem))] data-starting-style:transform-[translateX(calc(100%+1rem))]",
      },
      {
        variant: "floating",
        side: "left",
        class:
          "inset-y-4 start-4 origin-right data-nested-dialog-open:transform-[translateX(calc(var(--stack-peek-offset)))_scale(var(--scale))] data-ending-style:transform-[translateX(calc(-100%-1rem))] data-starting-style:transform-[translateX(calc(-100%-1rem))]",
      },
      {
        variant: "floating",
        side: "top",
        class:
          "inset-x-4 top-4 origin-[50%_var(--inset)] data-nested-dialog-open:transform-[translateY(var(--stack-peek-offset))_scale(var(--scale))] data-ending-style:transform-[translateY(calc(-100%-1rem))] data-starting-style:transform-[translateY(calc(-100%-1rem))]",
      },
      {
        variant: "floating",
        side: "bottom",
        class:
          "inset-x-4 bottom-4 origin-[50%_calc(100%-var(--inset))] data-nested-dialog-open:transform-[translateY(calc(0px-var(--stack-peek-offset)))_scale(var(--scale))] data-ending-style:transform-[translateY(calc(100%+1rem))] data-starting-style:transform-[translateY(calc(100%+1rem))]",
      },
      {
        variant: "default",
        side: "right",
        class:
          "inset-y-0 end-0 origin-left data-nested-dialog-open:transform-[translateX(calc(0px-var(--stack-peek-offset)))_scale(var(--scale))] data-ending-style:transform-[translateX(100%)] data-starting-style:transform-[translateX(100%)]",
      },
      {
        variant: "default",
        side: "left",
        class:
          "inset-y-0 start-0 origin-right data-nested-dialog-open:transform-[translateX(var(--stack-peek-offset))_scale(var(--scale))] data-ending-style:transform-[translateX(-100%)] data-starting-style:transform-[translateX(-100%)]",
      },
      {
        variant: "default",
        side: "top",
        class:
          "inset-x-0 top-0 origin-[50%_var(--inset)] data-nested-dialog-open:transform-[translateY(var(--stack-peek-offset))_scale(var(--scale))] data-ending-style:transform-[translateY(-100%)] data-starting-style:transform-[translateY(-100%)]",
      },
      {
        variant: "default",
        side: "bottom",
        class:
          "inset-x-0 bottom-0 origin-[50%_calc(100%-var(--inset))] data-nested-dialog-open:transform-[translateY(calc(0px-var(--stack-peek-offset)))_scale(var(--scale))] data-ending-style:transform-[translateY(100%)] data-starting-style:transform-[translateY(100%)]",
      },
    ],
    defaultVariants: {
      variant: "default",
      side: "right",
    },
  }
);

interface SheetProps<Payload> extends DialogPrimitive.Root.Props<Payload> {
  dismissible?: boolean;
}

function Sheet<Payload>({
  dismissible = true,
  modal = true,
  disablePointerDismissal,
  onOpenChange,
  ...props
}: SheetProps<Payload>) {
  const parentConfig = React.useContext(SheetConfigContext);

  const handleOpenChange = React.useCallback<SheetOnOpenChange>(
    (nextOpen, eventDetails) => {
      if (!dismissible && !nextOpen && eventDetails.reason !== "close-press") {
        eventDetails.cancel();
        return;
      }

      onOpenChange?.(nextOpen, eventDetails);
    },
    [dismissible, onOpenChange]
  );

  const configValue = React.useMemo(
    () => ({ modal, side: parentConfig.side }),
    [modal, parentConfig.side]
  );

  return (
    <SheetConfigContext.Provider value={configValue}>
      <DialogPrimitive.Root
        data-slot="sheet"
        disablePointerDismissal={
          disablePointerDismissal ?? (!dismissible || modal !== true)
        }
        modal={modal}
        onOpenChange={handleOpenChange}
        {...props}
      />
    </SheetConfigContext.Provider>
  );
}

const createSheetHandle = DialogPrimitive.createHandle;

function SheetPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetTrigger<Payload>({
  ...props
}: DialogPrimitive.Trigger.Props<Payload>) {
  return <DialogPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetCloseTrigger({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="sheet-close-trigger" {...props} />;
}

function SheetBackdrop({
  className,
  ...props
}: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      className={cn(
        "fixed inset-0 z-40 min-h-dvh bg-black/50 backdrop-blur-[2px] transition-opacity duration-200",
        "data-starting-style:opacity-0 data-ending-style:opacity-0 motion-reduce:transition-none",
        className
      )}
      data-slot="sheet-backdrop"
      {...props}
    />
  );
}

type SheetViewportProps = DialogPrimitive.Viewport.Props;

function SheetViewport({
  className,
  ...props
}: DialogPrimitive.Viewport.Props) {
  return (
    <DialogPrimitive.Viewport
      className={cn(
        "fixed inset-0 z-50 overflow-hidden pointer-events-none",
        className
      )}
      data-slot="sheet-viewport"
      {...props}
    />
  );
}

interface SheetContentProps extends DialogPrimitive.Popup.Props {
  side?: SheetSide;
  variant?: SheetVariant;
  footerVariant?: SheetFooterVariant;
  showCloseButton?: boolean;
  level?: SheetSurfaceLevel;
  shadowLevel?: SheetShadowLevel;
}

function SheetContent({
  className,
  children,
  style,
  side: sideProp,
  variant = "default",
  footerVariant = "default",
  showCloseButton = true,
  level = 5,
  shadowLevel = 5,
  ...props
}: SheetContentProps) {
  const parentConfig = React.useContext(SheetConfigContext);
  const side = parentConfig.side ?? sideProp ?? "right";
  const { modal } = parentConfig;
  const isModal = modal === true;
  const isNested = parentConfig.side !== null;
  const contentConfig = React.useMemo(() => ({ modal, side }), [modal, side]);

  return (
    <SheetPortal>
      {isModal && (
        <SheetBackdrop
          className={isNested ? "bg-transparent" : undefined}
          forceRender={isNested}
        />
      )}
      <SheetViewport>
        <DialogPrimitive.Popup
          className={cn(
            sheetContentVariants({ side, variant }),
            getSheetShadowClass(variant, shadowLevel),
            variant === "default" && sheetBorderClasses[side],
            variant === "default" && "border-transparent",
            variant === "default" && sheetNestedSurfaceClasses[side],
            className
          )}
          data-footer-variant={footerVariant}
          data-level={level}
          data-shadow-level={shadowLevel}
          data-side={side}
          data-slot="sheet-content"
          data-variant={variant}
          style={
            {
              "--sheet-generated-shadow":
                variant === "floating"
                  ? createFloatingShadow(shadowLevel)
                  : createDirectionalShadow(side, shadowLevel),
              ...style,
            } as React.CSSProperties &
              Record<"--sheet-generated-shadow", string>
          }
          {...props}
        >
          <SheetConfigContext.Provider value={contentConfig}>
            {children}
          </SheetConfigContext.Provider>
          {showCloseButton && (
            <SheetCloseTrigger
              aria-label="Close"
              className="absolute end-2 top-2 text-muted-foreground"
              render={<Button size="icon-sm" variant="ghost" />}
            >
              <XIcon aria-hidden="true" />
            </SheetCloseTrigger>
          )}
        </DialogPrimitive.Popup>
      </SheetViewport>
    </SheetPortal>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 px-6 pt-6 pb-3",
        "in-[[data-slot=sheet-content]:not(:has([data-slot=sheet-body])):has([data-slot=sheet-footer])]:pb-6",
        "in-[[data-slot=sheet-content]:not(:has([data-slot=sheet-body])):not(:has([data-slot=sheet-footer]))]:pb-6",
        className
      )}
      data-slot="sheet-header"
      {...props}
    />
  );
}

function getScrollShadow(fadeEdges: SheetFadeEdges) {
  if (fadeEdges === false) return "none" as const;
  if (fadeEdges === true) return "both" as const;

  const edges = Array.isArray(fadeEdges) ? fadeEdges : [fadeEdges];
  const hasVertical = edges.some((edge) =>
    ["top", "bottom", "y"].includes(edge)
  );
  const hasHorizontal = edges.some((edge) =>
    ["left", "right", "x"].includes(edge)
  );

  if (hasVertical && hasHorizontal) return "both" as const;
  if (hasVertical) return "vertical" as const;
  if (hasHorizontal) return "horizontal" as const;
  return "none" as const;
}

interface SheetBodyProps extends React.ComponentProps<"div"> {
  nativeScroll?: boolean;
  fadeEdges?: SheetFadeEdges;
  scrollbarGutter?: boolean;
  persistScrollbar?: boolean;
  hideScrollbar?: boolean;
}

function SheetBody({
  className,
  nativeScroll = false,
  fadeEdges = true,
  scrollbarGutter = false,
  persistScrollbar = false,
  hideScrollbar = false,
  children,
  ...props
}: SheetBodyProps) {
  const content = (
    <div className={cn("px-6 py-1", className)} {...props}>
      {children}
    </div>
  );

  return (
    <div
      className={cn(
        "flex min-h-0 flex-1 flex-col overflow-hidden",
        "in-[[data-slot=sheet-content]:not(:has([data-slot=sheet-header]))]:pt-5",
        "in-[[data-slot=sheet-content]:not(:has([data-slot=sheet-footer]))]:pb-5",
        "in-data-[footer-variant=inset]:in-[[data-slot=sheet-content]:has([data-slot=sheet-footer])]:pb-5"
      )}
      data-slot="sheet-body"
    >
      {nativeScroll ? (
        <div
          className={cn(
            "min-h-0 flex-1 overflow-y-auto overscroll-contain",
            scrollbarGutter && "[scrollbar-gutter:stable]",
            hideScrollbar && "[scrollbar-width:none]"
          )}
          data-slot="sheet-body-scroll"
        >
          {content}
        </div>
      ) : (
        <ScrollArea
          className={cn(
            "flex-1",
            persistScrollbar &&
              "[&_[data-slot=scroll-area-scrollbar]]:opacity-100"
          )}
          fadeColor="var(--popover)"
          hideScrollbar={hideScrollbar}
          scrollShadow={getScrollShadow(fadeEdges)}
          viewportClassName={cn(scrollbarGutter && "[scrollbar-gutter:stable]")}
        >
          <ScrollAreaContent className="min-h-full">
            {content}
          </ScrollAreaContent>
        </ScrollArea>
      )}
    </div>
  );
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mt-auto flex flex-col-reverse gap-2 px-6 pt-4 pb-6 sm:flex-row sm:justify-end",
        "in-[[data-slot=sheet-content]:not(:has([data-slot=sheet-header])):not(:has([data-slot=sheet-body]))]:pt-6",
        "not-in-data-[footer-variant=inset]:in-[[data-slot=sheet-content]:has([data-slot=sheet-body])]:pt-3",
        "in-data-[footer-variant=inset]:border-border in-data-[footer-variant=inset]:bg-muted in-data-[footer-variant=inset]:border-t in-data-[footer-variant=inset]:pt-4 in-data-[footer-variant=inset]:pb-4",
        className
      )}
      data-slot="sheet-footer"
      {...props}
    />
  );
}

function SheetTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      className={cn(
        "text-foreground text-lg leading-none font-semibold tracking-tight text-balance",
        className
      )}
      data-slot="sheet-title"
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      className={cn("text-sm text-muted-foreground text-pretty", className)}
      data-slot="sheet-description"
      {...props}
    />
  );
}

export {
  Sheet,
  SheetBackdrop,
  SheetBody,
  SheetCloseTrigger,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
  SheetViewport,
  createSheetHandle,
};
export type {
  SheetBodyProps,
  SheetContentProps,
  SheetFadeEdge,
  SheetFadeEdges,
  SheetFooterVariant,
  SheetSide,
  SheetVariant,
  SheetViewportProps,
};
