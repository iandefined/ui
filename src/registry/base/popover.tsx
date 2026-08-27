"use client";

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { createContext, useContext } from "react";

import { cn } from "@/lib/utils";

const PopoverCreateHandle = PopoverPrimitive.createHandle;

type PopoverBackdropStyle = "opaque" | "blur" | "transparent";

type PopoverContextValue = {
  backdrop: PopoverBackdropStyle;
  modal: boolean | "trap-focus";
};

const PopoverContext = createContext<PopoverContextValue>({
  backdrop: "transparent",
  modal: false,
});

type PopoverProps<Payload = unknown> = PopoverPrimitive.Root.Props<Payload> & {
  backdrop?: PopoverBackdropStyle;
};

function Popover<Payload = unknown>({
  backdrop = "transparent",
  modal = false,
  ...props
}: PopoverProps<Payload>) {
  return (
    <PopoverContext.Provider value={{ backdrop, modal }}>
      <PopoverPrimitive.Root data-slot="popover" modal={modal} {...props} />
    </PopoverContext.Provider>
  );
}

function PopoverTrigger({
  className,
  ...props
}: PopoverPrimitive.Trigger.Props) {
  return (
    <PopoverPrimitive.Trigger
      className={className}
      data-slot="popover-trigger"
      {...props}
    />
  );
}

type PopoverPopupProps = PopoverPrimitive.Popup.Props &
  Pick<
    PopoverPrimitive.Positioner.Props,
    "align" | "alignOffset" | "anchor" | "side" | "sideOffset"
  > & {
    portalProps?: PopoverPrimitive.Portal.Props;
    showArrow?: boolean;
  };

function PopoverPopup({
  children,
  className,
  side = "bottom",
  align = "center",
  sideOffset = 4,
  alignOffset = 0,
  anchor,
  portalProps,
  showArrow = false,
  ...props
}: PopoverPopupProps) {
  const { modal } = useContext(PopoverContext);

  return (
    <PopoverPrimitive.Portal {...portalProps}>
      <PopoverBackdrop />
      <PopoverPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className={cn(
          "h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom,transform] data-instant:transition-none",
          modal === true ? "z-[100]" : "z-50"
        )}
        data-slot="popover-positioner"
        side={side}
        sideOffset={sideOffset}
      >
        <PopoverPrimitive.Popup
          className={cn(
            "relative flex h-(--popup-height,auto) w-(--popup-width,auto) origin-(--transform-origin) rounded-lg border [border-color:var(--border)] bg-popover text-popover-foreground shadow-lg/5 outline-none transition-[width,height,scale,opacity] before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] data-starting-style:scale-98 data-starting-style:opacity-0 dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
            className
          )}
          data-slot="popover-popup"
          {...props}
        >
          {modal !== false ? (
            <PopoverPrimitive.Close
              aria-label="Close popover"
              className="sr-only"
              data-slot="popover-internal-close"
            />
          ) : null}
          {showArrow ? (
            <PopoverPrimitive.Arrow
              className="relative block h-1.5 w-3 overflow-clip data-[side=bottom]:top-[-6px] data-[side=inline-start]:right-[-9px] data-[side=inline-start]:rotate-90 data-[side=inline-end]:left-[-9px] data-[side=inline-end]:-rotate-90 data-[side=left]:right-[-9px] data-[side=left]:rotate-90 data-[side=right]:left-[-9px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-6px] data-[side=top]:rotate-180 before:absolute before:bottom-0 before:left-1/2 before:h-[calc(6px*sqrt(2))] before:w-[calc(6px*sqrt(2))] before:border before:[border-color:var(--border)] before:bg-popover before:content-[''] before:[transform:translate(-50%,50%)_rotate(45deg)]"
              data-slot="popover-arrow"
            />
          ) : null}
          <PopoverPrimitive.Viewport
            className="relative size-full max-h-(--available-height) overflow-clip px-(--viewport-inline-padding) py-4 [--viewport-inline-padding:--spacing(4)] data-instant:transition-none **:data-current:data-ending-style:opacity-0 **:data-current:data-starting-style:opacity-0 **:data-previous:data-ending-style:opacity-0 **:data-previous:data-starting-style:opacity-0 **:data-current:w-[calc(var(--popup-width)-2*var(--viewport-inline-padding)-2px)] **:data-previous:w-[calc(var(--popup-width)-2*var(--viewport-inline-padding)-2px)] **:data-current:opacity-100 **:data-previous:opacity-100 **:data-current:transition-opacity **:data-previous:transition-opacity"
            data-slot="popover-viewport"
          >
            {children}
          </PopoverPrimitive.Viewport>
        </PopoverPrimitive.Popup>
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}

function PopoverBackdrop({
  className,
  ...props
}: PopoverPrimitive.Backdrop.Props) {
  const { backdrop, modal } = useContext(PopoverContext);

  const isModal = modal === true;

  return (
    <PopoverPrimitive.Backdrop
      className={cn(
        backdrop === "opaque" &&
          "fixed inset-0 bg-black/40 transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0 dark:bg-black/60",
        backdrop === "blur" &&
          "fixed inset-0 backdrop-blur-sm transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0",
        backdrop === "transparent" &&
          (isModal ? "fixed inset-0 bg-transparent" : "hidden"),
        backdrop !== "transparent" && (isModal ? "z-[99]" : "z-40"),
        isModal && "z-[99]",
        className
      )}
      data-slot="popover-backdrop"
      {...props}
    />
  );
}

function PopoverClose({ ...props }: PopoverPrimitive.Close.Props) {
  return <PopoverPrimitive.Close data-slot="popover-close" {...props} />;
}

function PopoverTitle({ className, ...props }: PopoverPrimitive.Title.Props) {
  return (
    <PopoverPrimitive.Title
      className={cn("text-lg leading-none font-semibold", className)}
      data-slot="popover-title"
      {...props}
    />
  );
}

function PopoverDescription({
  className,
  ...props
}: PopoverPrimitive.Description.Props) {
  return (
    <PopoverPrimitive.Description
      className={cn("text-muted-foreground text-sm", className)}
      data-slot="popover-description"
      {...props}
    />
  );
}

const PopoverContent = PopoverPopup;

export {
  Popover,
  PopoverBackdrop,
  PopoverClose,
  PopoverContent,
  PopoverCreateHandle,
  PopoverDescription,
  PopoverPopup,
  PopoverPrimitive,
  PopoverTitle,
  PopoverTrigger,
};

export type { PopoverBackdropStyle, PopoverProps };
