"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/registry/base/button";
import { IconSwap } from "@/registry/base/icon-swap";

export default function IconSwapDefaultDemo() {
  const [copied, setCopied] = useState(false);
  const resetTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const handleCopy = () => {
    setCopied(true);

    if (resetTimerRef.current !== null) {
      window.clearTimeout(resetTimerRef.current);
    }

    resetTimerRef.current = window.setTimeout(() => {
      setCopied(false);
      resetTimerRef.current = null;
    }, 1500);
  };

  return (
    <Button
      aria-label={copied ? "Copied" : "Copy"}
      onClick={handleCopy}
      size="icon"
      variant="outline"
    >
      <IconSwap
        className="inline-flex shrink-0 [&>svg]:size-4"
        state={copied ? "copied" : "copy"}
      >
        {copied ? <CheckIcon strokeWidth={3} /> : <CopyIcon />}
      </IconSwap>
    </Button>
  );
}
