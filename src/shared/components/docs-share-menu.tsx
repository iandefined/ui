"use client";

import { EllipsisIcon, LinkIcon } from "lucide-react";
import { useCallback, useMemo, useRef } from "react";
import { toast } from "sonner";

import type { ShareIconHandle } from "@/shared/components/animated-icons/share";
import { ShareIcon } from "@/shared/components/animated-icons/share";
import { XIcon, LinkedInIcon } from "@/shared/components/icons";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { useCopyToClipboard } from "@/shared/hooks/use-copy-to-clipboard";

export const DocsShareMenu = ({
  title,
  url,
}: {
  title: string;
  url: string;
}) => {
  const shareIconRef = useRef<ShareIconHandle>(null);
  const { copyToClipboard } = useCopyToClipboard();

  const absoluteUrl = useMemo(() => {
    if (url.startsWith("http")) {
      return url;
    }
    if (typeof window !== "undefined") {
      return new URL(url, window.location.origin).toString();
    }
    return url;
  }, [url]);

  const handleMouseEnter = useCallback(() => {
    shareIconRef.current?.startAnimation();
  }, []);

  const handleMouseLeave = useCallback(() => {
    shareIconRef.current?.stopAnimation();
  }, []);

  const urlEncoded = encodeURIComponent(absoluteUrl);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            className="size-9 border-none active:scale-none sm:size-7"
            variant="secondary"
            size="icon"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        }
      >
        <ShareIcon ref={shareIconRef} />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-fit"
        alignOffset={-6}
        collisionPadding={8}
        finalFocus={false}
      >
        <DropdownMenuItem
          onClick={() => {
            copyToClipboard(absoluteUrl);
            toast.success("Link copied");
          }}
        >
          <LinkIcon />
          Copy link
        </DropdownMenuItem>

        <DropdownMenuItem
          render={(props) => (
            <a
              {...props}
              href={`https://x.com/intent/tweet?url=${urlEncoded}`}
              target="_blank"
              rel="noopener"
            >
              {props.children}
            </a>
          )}
        >
          <XIcon />
          Share on X
        </DropdownMenuItem>

        <DropdownMenuItem
          render={(props) => (
            <a
              {...props}
              href={`https://www.linkedin.com/sharing/share-offsite?url=${urlEncoded}`}
              target="_blank"
              rel="noopener"
            >
              {props.children}
            </a>
          )}
        >
          <LinkedInIcon />
          Share on LinkedIn
        </DropdownMenuItem>

        {typeof navigator !== "undefined" && "share" in navigator && (
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault();
              navigator.share({ title, url: absoluteUrl });
            }}
          >
            <EllipsisIcon />
            Other app
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
