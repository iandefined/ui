"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useCallback } from "react";

import { IconSwap } from "@/registry/base/icon-swap";
import { Button, type ButtonProps } from "@/shared/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { useCopyToClipboard } from "@/shared/hooks/use-copy-to-clipboard";
import type { Event } from "@/shared/lib/events";
import { trackEvent } from "@/shared/lib/events";
import { cn } from "@/shared/lib/utils";

export interface CopyButtonProps extends Omit<ButtonProps, "color" | "value"> {
  value: string | (() => Promise<string> | string);
  src?: string;
  event?: Event["name"];
  showTooltip?: boolean;
}

export const CopyButton = ({
  value,
  className,
  variant = "ghost",
  event,
  children,
  showTooltip = true,
  ...props
}: CopyButtonProps) => {
  const getValue = useCallback(() => {
    if (typeof value === "function") {
      return value();
    }

    return value;
  }, [value]);

  const { copyToClipboard, isCopied } = useCopyToClipboard({
    timeout: 1000,
  });

  const handleCopy = useCallback(async () => {
    const text = await getValue();
    const hasCopied = await copyToClipboard(text);

    if (hasCopied && event) {
      trackEvent({
        name: event,
        properties: {
          code: text,
        },
      });
    }
  }, [copyToClipboard, event, getValue]);

  const copyButton = (
    <Button
      data-slot="copy-button"
      size={children ? "sm" : "icon"}
      variant={variant}
      className={cn(
        children
          ? ""
          : "bg-code absolute top-3 right-2 z-auto size-7 hover:opacity-100 focus-visible:opacity-100",
        className
      )}
      onClick={handleCopy}
      {...props}
    >
      <span className="sr-only">Copy</span>
      <IconSwap
        className="inline-flex shrink-0"
        state={isCopied ? "done" : "idle"}
      >
        {isCopied ? <CheckIcon strokeWidth={3} /> : <CopyIcon />}
      </IconSwap>
      {children}
    </Button>
  );

  if (!showTooltip) {
    return copyButton;
  }

  return (
    <Tooltip>
      <TooltipTrigger render={copyButton} />
      <TooltipContent>
        {isCopied ? "Copied" : "Copy to Clipboard"}
      </TooltipContent>
    </Tooltip>
  );
};
