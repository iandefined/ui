"use client";

import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import { ChevronDownIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

export type AccordionVariant =
  | "default"
  | "split"
  | "outline"
  | "inset"
  | "nested"
  | "isolated-bordered"
  | "isolated-filled"
  | "isolated-filled-bordered";

export type AccordionProps = BaseAccordion.Root.Props & {
  variant?: AccordionVariant;
};

function Accordion({
  className,
  multiple = false,
  variant = "default",
  ...props
}: AccordionProps) {
  const isInset = variant === "inset" || variant === "nested";

  return (
    <BaseAccordion.Root
      data-slot="accordion"
      data-variant={variant}
      multiple={multiple}
      className={cn(
        "group/accordion flex w-full flex-col",
        variant === "split" && "space-y-2",
        variant === "outline" &&
          "bg-card overflow-hidden rounded-xl border border-border",
        isInset && "rounded-xl border border-border bg-muted dark:bg-card p-1",
        className
      )}
      {...props}
    />
  );
}

export type AccordionItemProps = BaseAccordion.Item.Props;

function AccordionItem({ className, ...props }: AccordionItemProps) {
  return (
    <BaseAccordion.Item
      data-slot="accordion-item"
      className={cn(
        "transition-[margin,border-radius,border] duration-200 ease-out",
        // Default variant
        "group-data-[variant=default]/accordion:border-b group-data-[variant=default]/accordion:border-border group-data-[variant=default]/accordion:last:border-b-0",
        // Split variant
        "group-data-[variant=split]/accordion:bg-card group-data-[variant=split]/accordion:border-border group-data-[variant=split]/accordion:overflow-hidden group-data-[variant=split]/accordion:rounded-lg group-data-[variant=split]/accordion:border",
        // Outline variant
        "group-data-[variant=outline]/accordion:border-border group-data-[variant=outline]/accordion:border-b group-data-[variant=outline]/accordion:last:border-b-0",
        // Inset / Nested variant
        "group-data-[variant=inset]/accordion:mt-0.5 group-data-[variant=inset]/accordion:first:mt-0",
        "group-data-[variant=nested]/accordion:mt-0.5 group-data-[variant=nested]/accordion:first:mt-0",
        // Isolated bordered variant
        "group-data-[variant=isolated-bordered]/accordion:bg-card group-data-[variant=isolated-bordered]/accordion:border-border group-data-[variant=isolated-bordered]/accordion:overflow-hidden group-data-[variant=isolated-bordered]/accordion:border",
        "group-data-[variant=isolated-bordered]/accordion:relative group-data-[variant=isolated-bordered]/accordion:not-first:not-data-open:not-[[data-open]+&]:-mt-px",
        "group-data-[variant=isolated-bordered]/accordion:data-open:mt-2 group-data-[variant=isolated-bordered]/accordion:data-open:mb-2 group-data-[variant=isolated-bordered]/accordion:data-open:rounded-lg",
        "group-data-[variant=isolated-bordered]/accordion:first:rounded-t-lg group-data-[variant=isolated-bordered]/accordion:data-open:first:mt-0",
        "group-data-[variant=isolated-bordered]/accordion:last:rounded-b-lg group-data-[variant=isolated-bordered]/accordion:data-open:last:mb-0",
        "group-data-[variant=isolated-bordered]/accordion:[[data-open]+&]:rounded-t-lg",
        "group-data-[variant=isolated-bordered]/accordion:[&:has(+_[data-open])]:rounded-b-lg",
        // Isolated filled variant
        "group-data-[variant=isolated-filled]/accordion:bg-muted dark:group-data-[variant=isolated-filled]/accordion:bg-card group-data-[variant=isolated-filled]/accordion:overflow-hidden",
        "group-data-[variant=isolated-filled]/accordion:data-open:my-2 group-data-[variant=isolated-filled]/accordion:data-open:rounded-lg",
        "group-data-[variant=isolated-filled]/accordion:first:rounded-t-lg group-data-[variant=isolated-filled]/accordion:data-open:first:mt-0",
        "group-data-[variant=isolated-filled]/accordion:last:rounded-b-lg group-data-[variant=isolated-filled]/accordion:data-open:last:mb-0",
        "group-data-[variant=isolated-filled]/accordion:[[data-open]+&]:rounded-t-lg",
        "group-data-[variant=isolated-filled]/accordion:[&:has(+_[data-open])]:rounded-b-lg",
        // Isolated filled bordered variant
        "group-data-[variant=isolated-filled-bordered]/accordion:bg-muted dark:group-data-[variant=isolated-filled-bordered]/accordion:bg-card group-data-[variant=isolated-filled-bordered]/accordion:overflow-hidden",
        "group-data-[variant=isolated-filled-bordered]/accordion:not-last:border-border group-data-[variant=isolated-filled-bordered]/accordion:not-last:border-b",
        "group-data-[variant=isolated-filled-bordered]/accordion:[&:has(+_[data-open])]:border-transparent",
        "group-data-[variant=isolated-filled-bordered]/accordion:data-open:border-transparent",
        "group-data-[variant=isolated-filled-bordered]/accordion:data-open:my-2 group-data-[variant=isolated-filled-bordered]/accordion:data-open:rounded-lg",
        "group-data-[variant=isolated-filled-bordered]/accordion:first:rounded-t-lg group-data-[variant=isolated-filled-bordered]/accordion:data-open:first:mt-0",
        "group-data-[variant=isolated-filled-bordered]/accordion:last:rounded-b-lg group-data-[variant=isolated-filled-bordered]/accordion:data-open:last:mb-0",
        "group-data-[variant=isolated-filled-bordered]/accordion:[[data-open]+&]:rounded-t-lg",
        "group-data-[variant=isolated-filled-bordered]/accordion:[&:has(+_[data-open])]:rounded-b-lg",
        className
      )}
      {...props}
    />
  );
}

export type AccordionHeaderProps = BaseAccordion.Header.Props;

function AccordionHeader({ className, ...props }: AccordionHeaderProps) {
  return (
    <BaseAccordion.Header
      data-slot="accordion-header"
      className={cn("not-prose", className)}
      {...props}
    />
  );
}

export interface AccordionTriggerProps extends BaseAccordion.Trigger.Props {
  showIndicator?: boolean;
  indicatorType?: "chevron" | "plus";
  indicatorPosition?: "start" | "end";
  icon?: React.ReactNode;
  subtitle?: React.ReactNode;
}

function AccordionTrigger({
  children,
  className,
  showIndicator = true,
  indicatorType = "plus",
  indicatorPosition = "end",
  icon,
  subtitle,
  ...props
}: AccordionTriggerProps) {
  const hasStartIndicator = showIndicator && indicatorPosition === "start";
  const hasEndIndicator = showIndicator && indicatorPosition === "end";

  const renderIndicator = () => {
    if (!showIndicator) return null;

    if (indicatorType === "chevron") {
      return (
        <span className="text-muted-foreground shrink-0" aria-hidden="true">
          <ChevronDownIcon
            data-slot="accordion-indicator"
            className="size-4 shrink-0 transition-transform duration-200 ease-out"
          />
        </span>
      );
    }

    return (
      <span className="text-muted-foreground shrink-0" aria-hidden="true">
        <PlusIcon
          data-slot="accordion-indicator"
          className="size-4 shrink-0 transition-transform duration-200 ease-out"
        />
      </span>
    );
  };

  return (
    <AccordionHeader>
      <BaseAccordion.Trigger
        data-slot="accordion-trigger"
        data-has-icon={hasStartIndicator ? "true" : undefined}
        className={cn(
          "group/trigger flex w-full cursor-pointer items-center justify-between gap-3 p-3.5 text-left text-sm font-medium outline-none disabled:pointer-events-none disabled:opacity-60",
          // Default variant
          "group-data-[variant=default]/accordion:px-0",
          // Split variant
          "group-data-[variant=split]/accordion:rounded-t-lg",
          // Inset / Nested variant
          "group-data-[variant=inset]/accordion:hover:bg-card/60 dark:group-data-[variant=inset]/accordion:hover:bg-muted/60 group-data-[variant=inset]/accordion:rounded-lg group-data-[variant=inset]/accordion:px-3.5 group-data-[variant=inset]/accordion:py-2.5",
          "group-data-[variant=nested]/accordion:hover:bg-card/60 dark:group-data-[variant=nested]/accordion:hover:bg-muted/60 group-data-[variant=nested]/accordion:rounded-lg group-data-[variant=nested]/accordion:px-3.5 group-data-[variant=nested]/accordion:py-2.5",
          // Indicator animations
          indicatorType === "chevron" &&
            "[&[data-panel-open]_[data-slot=accordion-indicator]]:rotate-180",
          indicatorType === "plus" &&
            "[&[data-panel-open]_[data-slot=accordion-indicator]]:rotate-90",
          className
        )}
        {...props}
      >
        {hasStartIndicator && renderIndicator()}

        {icon && !hasStartIndicator && (
          <span className="text-muted-foreground shrink-0" aria-hidden="true">
            {icon}
          </span>
        )}

        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span>{children}</span>
          {subtitle && (
            <span className="text-muted-foreground text-xs font-normal no-underline">
              {subtitle}
            </span>
          )}
        </div>

        {hasEndIndicator && renderIndicator()}
      </BaseAccordion.Trigger>
    </AccordionHeader>
  );
}

export type AccordionContentProps = BaseAccordion.Panel.Props;

function AccordionContent({
  children,
  className,
  ...props
}: AccordionContentProps) {
  return (
    <BaseAccordion.Panel
      data-slot="accordion-content"
      className={cn(
        "h-(--accordion-panel-height) overflow-hidden text-sm transition-[height,opacity] duration-250 ease-out data-ending-style:h-0 data-ending-style:opacity-0 data-starting-style:h-0 data-starting-style:opacity-0"
      )}
      {...props}
    >
      <div
        className={cn(
          "text-muted-foreground p-3.5 pt-0",
          "group-data-[variant=default]/accordion:px-0 group-data-[variant=default]/accordion:pt-0",
          "group-data-[variant=split]/accordion:pt-0",
          "group-data-[variant=outline]/accordion:pt-0",
          // Inset / Nested variant
          "group-data-[variant=inset]/accordion:mt-1 group-data-[variant=inset]/accordion:mb-0.5 group-data-[variant=inset]/accordion:rounded-lg group-data-[variant=inset]/accordion:bg-card dark:group-data-[variant=inset]/accordion:bg-muted group-data-[variant=inset]/accordion:p-4 group-data-[variant=inset]/accordion:shadow-[0_0_0_1px_rgb(0_0_0/0.06),0_1px_1px_-0.5px_rgb(0_0_0/0.06),0_3px_3px_-1.5px_rgb(0_0_0/0.05)] dark:group-data-[variant=inset]/accordion:shadow-[0_0_0_1px_rgb(0_0_0/0.12),0_1px_1px_-0.5px_rgb(0_0_0/0.18),0_3px_3px_-1.5px_rgb(0_0_0/0.16),inset_0_1px_0_0_rgb(255_255_255/0.02),inset_0_0_0_1px_rgb(255_255_255/0.02)] group-data-[variant=inset]/accordion:[[data-slot=accordion-item]:last-child_&]:mb-0",
          "group-data-[variant=nested]/accordion:mt-1 group-data-[variant=nested]/accordion:mb-0.5 group-data-[variant=nested]/accordion:rounded-lg group-data-[variant=nested]/accordion:bg-card dark:group-data-[variant=nested]/accordion:bg-muted group-data-[variant=nested]/accordion:p-4 group-data-[variant=nested]/accordion:shadow-[0_0_0_1px_rgb(0_0_0/0.06),0_1px_1px_-0.5px_rgb(0_0_0/0.06),0_3px_3px_-1.5px_rgb(0_0_0/0.05)] dark:group-data-[variant=nested]/accordion:shadow-[0_0_0_1px_rgb(0_0_0/0.12),0_1px_1px_-0.5px_rgb(0_0_0/0.18),0_3px_3px_-1.5px_rgb(0_0_0/0.16),inset_0_1px_0_0_rgb(255_255_255/0.02),inset_0_0_0_1px_rgb(255_255_255/0.02)] group-data-[variant=nested]/accordion:[[data-slot=accordion-item]:last-child_&]:mb-0",
          // Isolated variants
          "group-data-[variant=isolated-bordered]/accordion:pt-0",
          "group-data-[variant=isolated-filled]/accordion:pt-0",
          "group-data-[variant=isolated-filled-bordered]/accordion:pt-0",
          // Icon alignment
          "[[data-slot=accordion-item]:has([data-has-icon])_&]:pl-[calc(1rem+0.75rem)]",
          className
        )}
      >
        {children}
      </div>
    </BaseAccordion.Panel>
  );
}

function PlusIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.75 12C2.75 11.3096 3.30964 10.75 4 10.75H20C20.6904 10.75 21.25 11.3096 21.25 12C21.25 12.6904 20.6904 13.25 20 13.25H4C3.30964 13.25 2.75 12.6904 2.75 12Z"
        fill="currentColor"
        className="transition-opacity duration-200 in-data-panel-open:opacity-0"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2.75C12.6904 2.75 13.25 3.30964 13.25 4V20C13.25 20.6904 12.6904 21.25 12 21.25C11.3096 21.25 10.75 20.6904 10.75 20V4C10.75 3.30964 11.3096 2.75 12 2.75Z"
        fill="currentColor"
      />
    </svg>
  );
}

export {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
};
