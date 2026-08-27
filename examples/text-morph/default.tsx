"use client";

import { CheckIcon, DownloadIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/registry/base/button";
import { IconSwap } from "@/registry/base/icon-swap";
import { Spinner } from "@/registry/base/spinner";
import { TextMorph } from "@/registry/base/text-morph";

const labels = {
  idle: "Fetch",
  loading: "Fetching",
  success: "Data Fetched",
} as const;

type FetchState = keyof typeof labels;

export default function TextMorphDefaultDemo() {
  const [state, setState] = useState<FetchState>("idle");

  useEffect(() => {
    if (state === "loading") {
      const timer = window.setTimeout(() => setState("success"), 1200);
      return () => window.clearTimeout(timer);
    }

    if (state === "success") {
      const timer = window.setTimeout(() => setState("idle"), 1800);
      return () => window.clearTimeout(timer);
    }
  }, [state]);

  return (
    <Button
      disabled={state !== "idle"}
      onClick={() => setState("loading")}
      variant="outline"
      size="sm"
    >
      <IconSwap className="inline-flex shrink-0" state={state}>
        {state === "idle" ? (
          <DownloadIcon />
        ) : state === "loading" ? (
          <Spinner size="sm" />
        ) : (
          <CheckIcon strokeWidth={3} />
        )}
      </IconSwap>
      <TextMorph animation="snappy" aria-live="polite">
        {labels[state]}
      </TextMorph>
    </Button>
  );
}
