"use client";

import { SquarePenIcon } from "lucide-react";

import { GITHUB, LINK } from "@/shared/constants/links";
import { DOCS_DIR } from "@/shared/lib/docs";
import { trackEvent } from "@/shared/lib/events";
import { cn } from "@/shared/lib/utils";

export const DocsTocFooter = ({
  docId,
  className,
}: {
  docId: string;
  className?: string;
}) => (
  <div className={cn("flex flex-col gap-2", className)}>
    {docId && (
      <a
        href={`${LINK.GITHUB}/edit/${GITHUB.branch}/${DOCS_DIR}/${docId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-colors text-[0.8rem] hover:text-foreground text-muted-foreground [&_svg]:size-3 flex gap-1.5 items-center"
        onClick={() =>
          trackEvent({
            name: "click_edit_page",
            properties: { doc: docId },
          })
        }
      >
        <SquarePenIcon />
        Edit this page
      </a>
    )}
  </div>
);
