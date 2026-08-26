import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";

import { cn } from "@/lib/utils";

interface ScrollAreaProps extends ScrollAreaPrimitive.Root.Props {
  hideScrollbar?: boolean;
  orientation?: "horizontal" | "vertical" | "both";
  scrollShadow?: "vertical" | "horizontal" | "both" | "none";
}

function ScrollArea({
  className,
  hideScrollbar = false,
  orientation = "vertical",
  scrollShadow = "none",
  children,
  ...props
}: ScrollAreaProps) {
  return (
    <ScrollAreaPrimitive.Root className="relative isolate min-h-0" {...props}>
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className={cn(
          "size-full overscroll-contain rounded-[inherit] outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
          className
        )}
      >
        <div
          data-slot="scroll-area-vertical-shadow"
          className={cn(
            scrollShadow === "vertical" || scrollShadow === "both"
              ? "block"
              : "hidden",
            [
              "pointer-events-none absolute inset-0 z-10",
              "before:absolute before:top-0 before:block before:w-full before:rounded-md before:rounded-b-none before:content-[''] after:absolute after:bottom-0 after:block after:w-full after:rounded-md after:rounded-t-none after:content-['']",
              "before:pointer-events-none after:pointer-events-none",
              "before:transition-[height] after:transition-[height] before:duration-100 after:duration-100 before:ease-out after:ease-out",
              "before:[--scroll-area-overflow-y-start:inherit]",
              "after:[--scroll-area-overflow-y-end:inherit]",
              "[--scroll-area-fade:var(--background)] before:h-[min(var(--scroll-area-fade-size,40px),var(--scroll-area-overflow-y-start))] before:bg-[linear-gradient(to_bottom,var(--scroll-area-fade),transparent)] after:h-[min(var(--scroll-area-fade-size,40px),var(--scroll-area-overflow-y-end,40px))] after:bg-[linear-gradient(to_top,var(--scroll-area-fade),transparent)]",
            ]
          )}
          style={
            {
              "--scroll-area-overflow-y-start": "inherit",
              "--scroll-area-overflow-y-end": "inherit",
            } as React.CSSProperties
          }
        />
        <div
          data-slot="scroll-area-horizontal-shadow"
          className={cn(
            scrollShadow === "horizontal" || scrollShadow === "both"
              ? "block"
              : "hidden",
            [
              "pointer-events-none absolute inset-0 z-10",
              "before:absolute before:top-0 before:block before:h-full before:rounded-md before:rounded-r-none before:content-[''] after:absolute after:top-0 after:block after:h-full after:rounded-md after:rounded-l-none after:content-['']",
              "before:pointer-events-none after:pointer-events-none",
              "before:transition-[width] after:transition-[width] before:duration-100 after:duration-100 before:ease-out after:ease-out",
              "before:[--scroll-area-overflow-x-start:inherit]",
              "after:[--scroll-area-overflow-x-end:inherit]",
              "[--scroll-area-fade:var(--background)] before:left-0 before:w-[min(var(--scroll-area-fade-size,40px),var(--scroll-area-overflow-x-start))] before:bg-[linear-gradient(to_right,var(--scroll-area-fade),transparent)] after:right-0 after:w-[min(var(--scroll-area-fade-size,40px),var(--scroll-area-overflow-x-end,40px))] after:bg-[linear-gradient(to_left,var(--scroll-area-fade),transparent)]",
            ]
          )}
          style={
            {
              "--scroll-area-overflow-x-start": "inherit",
              "--scroll-area-overflow-x-end": "inherit",
            } as React.CSSProperties
          }
        />
        {children}
      </ScrollAreaPrimitive.Viewport>
      {!hideScrollbar &&
        (orientation === "both" ? (
          <>
            <ScrollBar orientation="vertical" />
            <ScrollBar orientation="horizontal" />
          </>
        ) : (
          <ScrollBar orientation={orientation} />
        ))}
      <ScrollAreaPrimitive.Corner data-slot="scroll-area-corner" />
    </ScrollAreaPrimitive.Root>
  );
}

function ScrollAreaContent({
  className,
  children,
  ...props
}: ScrollAreaPrimitive.Viewport.Props) {
  return (
    <ScrollAreaPrimitive.Content
      data-slot="scroll-area-content"
      className={cn("size-full", className)}
      {...props}
    >
      {children}
    </ScrollAreaPrimitive.Content>
  );
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: ScrollAreaPrimitive.Scrollbar.Props) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      className={cn(
        "relative z-20 m-1.5 flex rounded-full bg-muted opacity-0 transition-opacity delay-200 data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:flex-col data-[orientation=vertical]:w-1.5 data-hovering:opacity-100 data-scrolling:opacity-100 data-hovering:delay-0 data-scrolling:delay-0 data-hovering:duration-100 data-scrolling:duration-100",
        className
      )}
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb
        className="relative flex-1 rounded-full bg-muted-foreground/40"
        data-slot="scroll-area-thumb"
      />
    </ScrollAreaPrimitive.Scrollbar>
  );
}

export { ScrollArea, ScrollAreaContent, ScrollBar };
