"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

import { IconSwap } from "@/registry/base/icon-swap";
import { TextMorph } from "@/registry/base/text-morph";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { useCopyToClipboard } from "@/shared/hooks/use-copy-to-clipboard";
import { cn } from "@/shared/lib/utils";

export interface ColorCardProps {
  color: string;
  darkColor?: string;
  title: string;
  className?: string;
}

function formatTitle(title: string): React.ReactNode {
  if (title !== "Foreground" && title.endsWith(" Foreground")) {
    const prefix = title.slice(0, -" Foreground".length);
    return (
      <>
        <span>{prefix}</span>
        <br />
        <span>Foreground</span>
      </>
    );
  }
  return title;
}

export function ColorCard({
  color,
  darkColor,
  title,
  className,
}: ColorCardProps) {
  const { resolvedTheme } = useTheme();
  const [open, setOpen] = React.useState(false);
  const { copyToClipboard, isCopied } = useCopyToClipboard({ timeout: 1500 });

  const activeDark = darkColor ?? color;

  const handleCopy = React.useCallback(async () => {
    const isDark = resolvedTheme === "dark";
    const currentColor = isDark ? activeDark : color;
    setOpen(true);
    await copyToClipboard(currentColor);
  }, [activeDark, color, copyToClipboard, resolvedTheme]);

  const currentColor = resolvedTheme === "dark" ? activeDark : color;

  return (
    <Tooltip
      closeDelay={0}
      open={open}
      onOpenChange={(nextOpen, eventDetails) => {
        if (eventDetails.reason === "trigger-press") {
          return;
        }
        setOpen(nextOpen);
      }}
    >
      <TooltipTrigger
        render={
          <button
            type="button"
            onClick={handleCopy}
            className={cn(
              "group relative flex flex-col gap-2 text-center focus-visible:outline-2 focus-visible:outline-ring/50 focus-visible:outline-offset-2 rounded-xl cursor-pointer select-none",
              className
            )}
            aria-label={`Copy ${title} color: ${currentColor}`}
          >
            <div
              className="relative aspect-square w-full rounded-xl border border-border/70 shadow-xs flex items-center justify-center overflow-hidden bg-[var(--swatch-color)] dark:bg-[var(--swatch-dark-color)]"
              style={
                {
                  "--swatch-color": color,
                  "--swatch-dark-color": activeDark,
                } as React.CSSProperties
              }
            />
            <div className="flex h-10 w-full items-start justify-center px-0.5 text-center">
              <span className="text-xs font-medium text-muted-foreground leading-snug break-words">
                {formatTitle(title)}
              </span>
            </div>
          </button>
        }
      />
      <TooltipContent hideArrow sideOffset={10}>
        <div className="flex items-center gap-1.5 font-sans">
          <IconSwap
            className="inline-flex shrink-0"
            state={isCopied ? "done" : "idle"}
          >
            {isCopied ? (
              <CheckIcon className="size-3.5" strokeWidth={3} />
            ) : (
              <CopyIcon className="size-3.5" />
            )}
          </IconSwap>
          <TextMorph>{isCopied ? "Copied" : "Copy color"}</TextMorph>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
