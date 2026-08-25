"use client";

import { useCallback, useRef } from "react";

import type { ArrowLeftIconHandle } from "@/shared/components/animated-icons/arrow-left";
import { ArrowLeftIcon } from "@/shared/components/animated-icons/arrow-left";
import type { ArrowRightIconHandle } from "@/shared/components/animated-icons/arrow-right";
import { ArrowRightIcon } from "@/shared/components/animated-icons/arrow-right";
import { Link } from "@/shared/components/link";
import { Button } from "@/shared/components/ui/button";
import { Kbd } from "@/shared/components/ui/kbd";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { cn } from "@/shared/lib/utils";

export const DocsNavLink = ({
  href,
  children,
  className,
  tooltip,
  navDirection,
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button> & {
  href: string;
  children: React.ReactNode;
  className?: string;
  tooltip?: { title: string; icon: React.ReactNode };
  navDirection?: "back" | "forward";
}) => {
  const iconRef = useRef<ArrowLeftIconHandle | ArrowRightIconHandle>(null);

  const handleMouseEnter = useCallback(() => {
    iconRef.current?.startAnimation();
  }, []);

  const handleMouseLeave = useCallback(() => {
    iconRef.current?.stopAnimation();
  }, []);

  const link = (
    <Button
      render={<Link href={href} />}
      variant="secondary"
      size={size}
      className={cn("shadow-none", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {navDirection === "back" && <ArrowLeftIcon ref={iconRef} />}
      {children}
      {navDirection === "forward" && <ArrowRightIcon ref={iconRef} />}
    </Button>
  );

  if (tooltip) {
    return (
      <Tooltip>
        <TooltipTrigger render={link} />
        <TooltipContent className="pr-2 pl-3">
          <div className="flex items-center gap-3">
            {tooltip.title}
            {tooltip.icon && <Kbd>{tooltip.icon}</Kbd>}
          </div>
        </TooltipContent>
      </Tooltip>
    );
  }

  return link;
};
