"use client";

import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import * as React from "react";

import { cn } from "@/shared/lib/utils";

const Drawer = ({ ...props }: DrawerPrimitive.Root.Props) => (
  <DrawerPrimitive.Root data-slot="drawer" {...props} />
);

const DrawerTrigger = ({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) => (
  <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
);

const DrawerPortal = ({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) => (
  <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
);

const DrawerClose = ({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Close>) => (
  <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
);

const DrawerOverlay = ({
  className,
  ...props
}: DrawerPrimitive.Backdrop.Props) => (
  <DrawerPrimitive.Backdrop
    data-slot="drawer-overlay"
    className={cn(
      "fixed inset-0 z-50 bg-black/50 data-closed:animate-out data-closed:fade-out-0 data-open:animate-in data-open:fade-in-0",
      className
    )}
    {...props}
  />
);

const DrawerContent = ({
  className,
  children,
  ...props
}: DrawerPrimitive.Popup.Props) => (
  <DrawerPortal data-slot="drawer-portal">
    <DrawerOverlay />
    <DrawerPrimitive.Viewport
      data-slot="drawer-viewport"
      className="pointer-events-none fixed inset-0 z-50 select-none"
    >
      <DrawerPrimitive.Popup
        data-slot="drawer-content"
        className={cn(
          "group/drawer-content pointer-events-auto fixed z-50 flex h-auto min-h-0 flex-col bg-background outline-hidden transition-[transform,height,opacity] duration-300 ease-in-out will-change-transform",
          "data-starting-style:transform-(--closed-transform) data-ending-style:transform-(--closed-transform)",
          "data-[swipe-direction=up]:inset-x-0 data-[swipe-direction=up]:top-0 data-[swipe-direction=up]:mb-24 data-[swipe-direction=up]:max-h-[80vh] data-[swipe-direction=up]:rounded-b-lg data-[swipe-direction=up]:border-b",
          "data-[swipe-direction=down]:inset-x-0 data-[swipe-direction=down]:bottom-0 data-[swipe-direction=down]:mt-24 data-[swipe-direction=down]:max-h-[80vh] data-[swipe-direction=down]:rounded-t-lg data-[swipe-direction=down]:border-t",
          "data-[swipe-direction=right]:inset-y-0 data-[swipe-direction=right]:right-0 data-[swipe-direction=right]:w-3/4 data-[swipe-direction=right]:border-l data-[swipe-direction=right]:sm:max-w-sm",
          "data-[swipe-direction=left]:inset-y-0 data-[swipe-direction=left]:left-0 data-[swipe-direction=left]:w-3/4 data-[swipe-direction=left]:border-r data-[swipe-direction=left]:sm:max-w-sm",
          "data-[swipe-direction=down]:[--closed-transform:translate3d(0,calc(100%+2px),0)] data-[swipe-direction=up]:[--closed-transform:translate3d(0,calc(-100%-2px),0)] data-[swipe-direction=right]:[--closed-transform:translate3d(calc(100%+2px),0,0)] data-[swipe-direction=left]:[--closed-transform:translate3d(calc(-100%-2px),0,0)]",
          className
        )}
        {...props}
      >
        <div className="mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full bg-muted group-data-[swipe-direction=down]/drawer-content:block" />
        <DrawerPrimitive.Content
          data-slot="drawer-body"
          className="flex min-h-0 flex-1 flex-col overflow-hidden overscroll-contain rounded-[inherit] select-text"
        >
          {children}
        </DrawerPrimitive.Content>
      </DrawerPrimitive.Popup>
    </DrawerPrimitive.Viewport>
  </DrawerPortal>
);

const DrawerHeader = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    data-slot="drawer-header"
    className={cn(
      "flex flex-col gap-0.5 p-4 group-data-[swipe-direction=down]/drawer-content:text-center group-data-[swipe-direction=up]/drawer-content:text-center md:gap-1.5 md:text-left",
      className
    )}
    {...props}
  />
);

const DrawerFooter = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    data-slot="drawer-footer"
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
);

const DrawerTitle = ({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) => (
  <DrawerPrimitive.Title
    data-slot="drawer-title"
    className={cn("font-semibold text-foreground", className)}
    {...props}
  />
);

const DrawerDescription = ({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) => (
  <DrawerPrimitive.Description
    data-slot="drawer-description"
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
);

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
