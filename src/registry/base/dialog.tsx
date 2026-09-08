"use client";

import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { cn } from "cn";
import { XIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollAreaContent } from "@/components/ui/scroll-area";

/** Whether the popup or the viewport owns vertical scrolling. */
type DialogScroll = "inside" | "outside";
type DialogOverlay = "blur" | "brightness" | "transparent";

type DialogFadeEdge = "top" | "bottom" | "left" | "right" | "x" | "y";
type DialogFadeEdges = boolean | DialogFadeEdge | DialogFadeEdge[];
type DialogOnOpenChange = NonNullable<BaseDialog.Root.Props["onOpenChange"]>;

interface DialogConfigContextValue {
  dismissible: boolean;
  modal: boolean | "trap-focus";
  overlay: DialogOverlay;
}

const DialogConfigContext = React.createContext<DialogConfigContextValue>({
  dismissible: true,
  modal: true,
  overlay: "blur",
});

const DialogScrollContext = React.createContext<DialogScroll>("inside");

interface DialogStackContextValue {
  offset: number | null;
  setActivePopup: (popup: HTMLElement) => void;
}

const DialogStackContext = React.createContext<DialogStackContextValue | null>(
  null
);

function useDialogStack() {
  const parentStack = React.useContext(DialogStackContext);
  const [offset, setOffset] = React.useState<number | null>(null);

  const setActivePopup = React.useCallback((popup: HTMLElement) => {
    const viewport = popup.closest<HTMLElement>(
      '[data-slot="dialog-viewport"]'
    );
    if (!viewport) return;

    // Outside-scroll dialogs are centered by the scroll-area content wrapper,
    // not by the fixed dialog viewport. Measuring the actual flex container
    // keeps the stack anchor correct for both scroll modes.
    const container =
      popup.closest<HTMLElement>('[data-slot="scroll-area-content"]') ??
      viewport;
    const containerStyles = window.getComputedStyle(container);
    const paddingTop = parseFloat(containerStyles.paddingTop) || 0;
    const paddingBottom = parseFloat(containerStyles.paddingBottom) || 0;
    const availableHeight =
      container.clientHeight - paddingTop - paddingBottom;
    const nextOffset = Math.max(
      0,
      (availableHeight - popup.offsetHeight) / 2
    );

    setOffset((currentOffset) =>
      currentOffset === nextOffset ? currentOffset : nextOffset
    );
  }, []);

  const ownStack = React.useMemo(
    () => ({ offset, setActivePopup }),
    [offset, setActivePopup]
  );

  return parentStack ?? ownStack;
}

interface DialogProps<Payload> extends BaseDialog.Root.Props<Payload> {
  dismissible?: boolean;
  overlay?: DialogOverlay;
}

function Dialog<Payload>({
  dismissible = true,
  modal = true,
  overlay = "blur",
  disablePointerDismissal,
  onOpenChange,
  ...props
}: DialogProps<Payload>) {
  const dialogStack = useDialogStack();

  const handleOpenChange = React.useCallback<DialogOnOpenChange>(
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
    () => ({ dismissible, modal, overlay }),
    [dismissible, modal, overlay]
  );

  return (
    <DialogConfigContext.Provider value={configValue}>
      <DialogStackContext.Provider value={dialogStack}>
        <BaseDialog.Root
          modal={modal}
          disablePointerDismissal={
            disablePointerDismissal ?? (!dismissible || modal !== true)
          }
          onOpenChange={handleOpenChange}
          {...props}
        />
      </DialogStackContext.Provider>
    </DialogConfigContext.Provider>
  );
}

const createDialogHandle = BaseDialog.createHandle;

function DialogPortal({ ...props }: BaseDialog.Portal.Props) {
  return <BaseDialog.Portal data-slot="dialog-portal" {...props} />;
}

function DialogTrigger<Payload>({
  ...props
}: BaseDialog.Trigger.Props<Payload>) {
  return <BaseDialog.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogCloseTrigger({ ...props }: BaseDialog.Close.Props) {
  return <BaseDialog.Close data-slot="dialog-close-trigger" {...props} />;
}

function DialogBackdrop({ className, ...props }: BaseDialog.Backdrop.Props) {
  const { overlay } = React.useContext(DialogConfigContext);

  return (
    <BaseDialog.Backdrop
      data-slot="dialog-backdrop"
      className={cn(
        "fixed inset-0 z-40 min-h-dvh transition-opacity duration-200",
        overlay === "blur" && "bg-black/40 backdrop-blur-sm",
        overlay === "brightness" && "bg-black/50",
        overlay === "transparent" && "bg-transparent",
        "data-starting-style:opacity-0 data-ending-style:opacity-0 motion-reduce:transition-none",
        className
      )}
      {...props}
    />
  );
}

function DialogViewport({
  className,
  scroll = "inside",
  children,
  ...props
}: BaseDialog.Viewport.Props & { scroll?: DialogScroll }) {
  const { modal } = React.useContext(DialogConfigContext);
  const dialogStack = React.useContext(DialogStackContext);
  const isStackPositioned = dialogStack?.offset != null;

  return (
    <BaseDialog.Viewport
      data-slot="dialog-viewport"
      className={cn(
        "fixed inset-0 z-50",
        scroll === "inside" &&
          "flex flex-col items-center justify-center overflow-hidden px-4 py-6",
        scroll === "inside" && isStackPositioned && "justify-start",
        className
      )}
      {...props}
    >
      <DialogScrollContext.Provider value={scroll}>
        {scroll === "outside" ? (
          <ScrollArea
            className={cn(
              "size-full",
              modal !== true &&
                "[&_[data-slot=scroll-area-scrollbar]]:pointer-events-auto"
            )}
            // Keep the scroll port fixed to the viewport; the content wrapper
            // below owns the growable centering box for tall dialogs.
            viewportClassName="h-full flex-none"
          >
            <ScrollAreaContent
              className={cn(
                "flex min-h-full items-center justify-center px-4 py-6",
                isStackPositioned && "justify-start"
              )}
            >
              {children}
            </ScrollAreaContent>
          </ScrollArea>
        ) : (
          children
        )}
      </DialogScrollContext.Provider>
    </BaseDialog.Viewport>
  );
}

function DialogContent({
  className,
  children,
  variant = "default",
  scroll = "inside",
  ref,
  initialFocus,
  ...props
}: BaseDialog.Popup.Props & {
  variant?: "default" | "inset";
  /** Whether the body or the area around the popup owns scrolling. */
  scroll?: DialogScroll;
}) {
  const { dismissible, modal } = React.useContext(DialogConfigContext);
  const dialogStack = React.useContext(DialogStackContext);
  const isModal = modal === true;
  const isOutsideScroll = scroll === "outside";
  const popupRef = React.useRef<HTMLDivElement | null>(null);

  React.useLayoutEffect(() => {
    const popup = popupRef.current;
    if (!popup || !dialogStack) return;

    const updateStackOffset = () => {
      const nestedDialogs = window
        .getComputedStyle(popup)
        .getPropertyValue("--nested-dialogs")
        .trim();

      if (nestedDialogs !== "0") return;
      dialogStack.setActivePopup(popup);
    };

    let frame = 0;
    const scheduleUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateStackOffset);
    };

    const mutationObserver = new MutationObserver(scheduleUpdate);
    mutationObserver.observe(popup, {
      attributes: true,
      attributeFilter: [
        "data-ending-style",
        "data-nested-dialog-open",
        "data-starting-style",
        "hidden",
      ],
    });

    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(popup);

    const viewport = popup.closest<HTMLElement>(
      '[data-slot="dialog-viewport"]'
    );
    const container =
      popup.closest<HTMLElement>('[data-slot="scroll-area-content"]') ??
      viewport;
    if (container) resizeObserver.observe(container);
    if (viewport && viewport !== container) resizeObserver.observe(viewport);

    window.addEventListener("resize", scheduleUpdate);
    window.visualViewport?.addEventListener("resize", scheduleUpdate);
    window.visualViewport?.addEventListener("scroll", scheduleUpdate);
    scheduleUpdate();

    return () => {
      cancelAnimationFrame(frame);
      mutationObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("resize", scheduleUpdate);
      window.visualViewport?.removeEventListener("resize", scheduleUpdate);
      window.visualViewport?.removeEventListener("scroll", scheduleUpdate);
    };
  }, [dialogStack]);

  const mergedRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      popupRef.current = node;

      if (typeof ref !== "function") {
        if (ref) ref.current = node;

        return () => {
          popupRef.current = null;
          if (ref) ref.current = null;
        };
      }

      const cleanup = ref(node);

      return () => {
        popupRef.current = null;
        if (typeof cleanup === "function") cleanup();
        else ref(null);
      };
    },
    [ref]
  );

  const popup = (
    <BaseDialog.Popup
      ref={mergedRef}
      initialFocus={initialFocus ?? (isOutsideScroll ? popupRef : undefined)}
      data-slot="dialog-content"
      data-variant={variant}
      data-scroll={scroll}
      className={cn(
        "relative z-50 flex w-full max-w-full min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-lg",
        "sm:max-w-lg",
        scroll === "inside" && "max-h-full min-h-0",
        isOutsideScroll && "outline-none",
        "[--dialog-stack-peek:1.25rem] [--dialog-stack-scale:calc(max(0,1-(var(--nested-dialogs)*0.1)))] [--dialog-stack-shrink:calc(1-var(--dialog-stack-scale))]",
        "origin-[50%_calc(50%+50%*min(var(--nested-dialogs,0),1))]",
        "[opacity:clamp(0,calc(3-var(--nested-dialogs)),1)]",
        "transform-[translateY(calc(0px-(var(--nested-dialogs)*var(--dialog-stack-peek))-(var(--dialog-stack-shrink)*100%)))_scale(var(--dialog-stack-scale))]",
        "transition-[transform,opacity] duration-200 ease-out",
        "data-starting-style:transform-[translateY(1.25rem)_scale(0.95)] data-starting-style:opacity-0",
        "data-ending-style:transform-[translateY(1.25rem)_scale(0.95)] data-ending-style:opacity-0",
        "motion-reduce:transform-none motion-reduce:transition-opacity",
        "before:pointer-events-none before:absolute before:inset-0 before:z-10 before:hidden before:rounded-[inherit] before:bg-black/5 before:opacity-0 before:transition-opacity before:duration-200",
        "data-nested-dialog-open:before:block data-nested-dialog-open:before:opacity-100",
        !isModal && "pointer-events-auto",
        className
      )}
      {...props}
    >
      {children}
      {dismissible && (
        <DialogCloseTrigger
          aria-label="Close"
          className="absolute end-2 top-2 text-muted-foreground"
          render={<Button size="icon-sm" variant="ghost" />}
        >
          <XIcon aria-hidden="true" />
        </DialogCloseTrigger>
      )}
    </BaseDialog.Popup>
  );

  return (
    <DialogPortal>
      {isModal && <DialogBackdrop />}
      <DialogViewport
        scroll={scroll}
        className={cn(!isModal && "pointer-events-none")}
      >
        {dialogStack?.offset == null
          ? popup
          : React.cloneElement(popup, {
              style: {
                ...popup.props.style,
                marginTop: dialogStack.offset,
              },
            })}
      </DialogViewport>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        "flex flex-col gap-2 px-6 pt-6 pb-3",
        "in-[[data-slot=dialog-content]:not(:has([data-slot=dialog-body])):has([data-slot=dialog-footer])]:pb-6",
        "in-[[data-slot=dialog-content]:not(:has([data-slot=dialog-body])):not(:has([data-slot=dialog-footer]))]:pb-6",
        className
      )}
      {...props}
    />
  );
}

function getScrollShadow(fadeEdges: DialogFadeEdges) {
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

function DialogBody({
  className,
  nativeScroll = false,
  fadeEdges = true,
  scrollbarGutter = false,
  persistScrollbar = false,
  hideScrollbar = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  nativeScroll?: boolean;
  fadeEdges?: DialogFadeEdges;
  scrollbarGutter?: boolean;
  persistScrollbar?: boolean;
  hideScrollbar?: boolean;
}) {
  const scroll = React.useContext(DialogScrollContext);
  const content = (
    <div className={cn("px-6 py-1", className)} {...props}>
      {children}
    </div>
  );

  return (
    <div
      data-slot="dialog-body"
      className={cn(
        "min-h-0",
        scroll === "inside" && "flex min-h-0 flex-1 flex-col",
        "in-[[data-slot=dialog-content]:not(:has([data-slot=dialog-header]))]:pt-5",
        "in-[[data-slot=dialog-content]:not(:has([data-slot=dialog-footer]))]:pb-5",
        "in-data-[variant=inset]:in-[[data-slot=dialog-content]:has([data-slot=dialog-footer])]:pb-5"
      )}
    >
      {scroll === "outside" ? (
        content
      ) : nativeScroll ? (
        <div
          data-slot="dialog-body-scroll"
          className={cn(
            "min-h-0 flex-1 overflow-y-auto overscroll-contain",
            scrollbarGutter && "[scrollbar-gutter:stable]",
            hideScrollbar && "[scrollbar-width:none]"
          )}
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
          viewportClassName={cn(scrollbarGutter && "[scrollbar-gutter:stable]")}
          scrollShadow={getScrollShadow(fadeEdges)}
          hideScrollbar={hideScrollbar}
        >
          <ScrollAreaContent className="min-h-full">
            {content}
          </ScrollAreaContent>
        </ScrollArea>
      )}
    </div>
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 px-6 pt-4 pb-6 sm:flex-row sm:justify-end",
        "in-[[data-slot=dialog-content]:not(:has([data-slot=dialog-header])):not(:has([data-slot=dialog-body]))]:pt-6",
        "not-in-data-[variant=inset]:in-[[data-slot=dialog-content]:has([data-slot=dialog-body])]:pt-3",
        "in-data-[variant=inset]:rounded-b-xl in-data-[variant=inset]:border-t in-data-[variant=inset]:border-border in-data-[variant=inset]:bg-muted in-data-[variant=inset]:pt-4 in-data-[variant=inset]:pb-4",
        className
      )}
      {...props}
    />
  );
}

function DialogTitle({ className, ...props }: BaseDialog.Title.Props) {
  return (
    <BaseDialog.Title
      data-slot="dialog-title"
      className={cn(
        "text-lg leading-none font-semibold tracking-tight text-balance",
        className
      )}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: BaseDialog.Description.Props) {
  return (
    <BaseDialog.Description
      data-slot="dialog-description"
      className={cn("text-sm text-muted-foreground text-pretty", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DialogViewport,
  createDialogHandle,
};
export type { DialogFadeEdge, DialogFadeEdges, DialogScroll };
