"use client";

import { GithubIcon } from "@/shared/components/icons";
import { buttonVariants } from "@/shared/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { LINK } from "@/shared/constants/links";
import { UTM_PARAMS } from "@/shared/constants/site";
import { addQueryParams } from "@/shared/lib/url";
import { cn } from "@/shared/lib/utils";

export const GitHubStars = ({
  stargazersCount,
}: {
  stargazersCount: number;
}) => (
  <Tooltip>
    <TooltipTrigger
      render={(props) => (
        <a
          {...props}
          className={cn(
            "ms-2",
            buttonVariants({ size: "sm", variant: "ghost" })
          )}
          href={addQueryParams(LINK.GITHUB, UTM_PARAMS)}
          rel="noopener"
          target="_blank"
        >
          {props.children}
        </a>
      )}
    >
      <GithubIcon className="-translate-y-px" />
      <span className="text-muted-foreground text-xs tabular-nums">
        {new Intl.NumberFormat("en-US", {
          compactDisplay: "short",
          notation: "compact",
        })
          .format(stargazersCount)
          .toLowerCase()}
      </span>
    </TooltipTrigger>
    <TooltipContent>
      {new Intl.NumberFormat("en-US").format(stargazersCount)} stars
    </TooltipContent>
  </Tooltip>
);
