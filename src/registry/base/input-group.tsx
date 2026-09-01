"use client";

import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";

import { Button, type ButtonProps } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type InputProps = React.ComponentProps<"input"> & {
  size?: "sm" | "default" | "lg" | number;
};

type TextareaProps = React.ComponentProps<"textarea"> & {
  size?: "sm" | "default" | "lg" | number;
};

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "group/input-group relative inline-flex min-w-0 items-center rounded-lg border border-input/70 bg-background text-base/5 shadow-xs outline-none [transition:box-shadow_150ms_ease-out] has-[>[data-align=inline-start]]:[&>input]:pl-2 has-[>[data-align=inline-end]]:[&>input]:pr-2 has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>textarea]:pt-3 has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-[1px] has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-destructive/20 dark:bg-input/32 dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40",
        className
      )}
      data-slot="input-group"
      role="group"
      {...props}
    />
  );
}

const inputGroupAddonVariants = tv({
  base: "flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium text-muted-foreground select-none not-has-[button]:**:[svg]:opacity-72 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4 group-data-[disabled=true]/input-group:opacity-50",
  variants: {
    align: {
      "inline-start":
        "order-first ps-[calc(--spacing(3)-1px)] has-[>[data-slot=badge]]:-ms-1.5 has-[>button]:-ms-1 has-[>kbd]:ms-[-0.35rem] [[data-size=sm]+&]:ps-[calc(--spacing(2.5)-1px)]",
      "inline-end":
        "order-last pe-[calc(--spacing(3)-1px)] has-[>[data-slot=badge]]:-me-1.5 has-[>button]:-me-1 has-[>kbd]:me-[-0.35rem] [[data-size=sm]+&]:pe-[calc(--spacing(2.5)-1px)]",
      "block-start":
        "order-first w-full justify-start px-[calc(--spacing(3)-1px)] pt-[calc(--spacing(3)-1px)] [.border-b]:pb-[calc(--spacing(3)-1px)] [[data-size=sm]+&]:px-[calc(--spacing(2.5)-1px)]",
      "block-end":
        "order-last w-full justify-start px-[calc(--spacing(3)-1px)] pb-[calc(--spacing(3)-1px)] [.border-t]:pt-[calc(--spacing(3)-1px)] [[data-size=sm]+&]:px-[calc(--spacing(2.5)-1px)]",
    },
  },
  defaultVariants: { align: "inline-start" },
});

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      className={cn(inputGroupAddonVariants({ align }), className)}
      data-align={align}
      data-slot="input-group-addon"
      onMouseDown={(event) => {
        if ((event.target as HTMLElement).closest("button, a")) return;

        event.preventDefault();
        const parent = event.currentTarget.parentElement;
        const control = parent?.querySelector<
          HTMLInputElement | HTMLTextAreaElement
        >("input, textarea");

        if (control && !parent?.querySelector("input:focus, textarea:focus")) {
          control.focus();
        }
      }}
      {...props}
    />
  );
}

const inputGroupButtonVariants = tv({
  base: "flex items-center gap-2 text-sm shadow-none",
  variants: {
    size: {
      xs: "h-6 gap-1 rounded-[calc(var(--radius)-5px)] px-2 [&>svg:not([class*='size-'])]:size-3.5 has-[>svg]:px-2",
      sm: "h-8 gap-1.5 rounded-md px-2.5 has-[>svg]:px-2.5",
      "icon-xs": "size-6 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0",
      "icon-sm": "size-8 p-0 has-[>svg]:p-0",
    },
  },
  defaultVariants: { size: "xs" },
});

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<ButtonProps, "color" | "size"> &
  VariantProps<typeof inputGroupButtonVariants> & {
    type?: "submit" | "reset" | "button";
  }) {
  return (
    <Button
      className={cn(inputGroupButtonVariants({ size }), className)}
      data-size={size}
      type={type}
      variant={variant}
      {...props}
    />
  );
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "flex items-center gap-2 text-sm text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      data-slot="input-group-text"
      {...props}
    />
  );
}

function InputGroupInput({ className, ...props }: InputProps) {
  return (
    <Input
      className={cn(
        "flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:border-0 focus-visible:ring-0 dark:bg-transparent",
        className
      )}
      data-slot="input-group-control"
      {...props}
    />
  );
}

function InputGroupTextarea({ className, ...props }: TextareaProps) {
  return (
    <Textarea
      className={cn(
        "flex-1 resize-none rounded-none border-0 bg-transparent py-3 shadow-none focus-visible:ring-0 dark:bg-transparent",
        className
      )}
      data-slot="input-group-control"
      {...props}
    />
  );
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
};
