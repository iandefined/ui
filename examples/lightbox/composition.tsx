"use client";

import { useState } from "react";

import { Button } from "@/registry/base/button";
import {
  Lightbox,
  LightboxContent,
  LightboxDownload,
  LightboxMore,
  LightboxNext,
  LightboxPrevious,
  LightboxSlides,
  LightboxToolbar,
  LightboxTrigger,
  LightboxZoomButton,
  LightboxClose,
  useLightbox,
  type LightboxItem,
} from "@/registry/base/lightbox";

const items = [
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1800&q=85",
    alt: "A desert road leading toward distant mountains",
    caption: "Choose your own layout",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1800&q=85",
    alt: "A road curving through a mountain landscape",
    caption: "Keep the focus on the image",
  },
] satisfies LightboxItem[];

function EditorialReviewChrome() {
  const { activeIndex, activeItem } = useLightbox();
  const [approvedIndices, setApprovedIndices] = useState<number[]>([]);
  const isApproved = approvedIndices.includes(activeIndex);

  const toggleApproval = () => {
    setApprovedIndices((current) =>
      isApproved
        ? current.filter((index) => index !== activeIndex)
        : [...current, activeIndex]
    );
  };

  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-start justify-between gap-4 p-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:p-4">
        <div className="pointer-events-auto flex min-w-0 items-center gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">
              Editorial review
            </p>
            <p className="truncate text-xs text-white/60">
              Select a cover image
            </p>
          </div>
        </div>
        <LightboxToolbar>
          <LightboxDownload />
          <LightboxZoomButton />
          <LightboxMore />
          <LightboxClose />
        </LightboxToolbar>
      </div>

      <LightboxSlides />
      <LightboxPrevious />
      <LightboxNext />

      <div className="pb-8 pointer-events-none absolute inset-x-0 bottom-0 z-30 flex flex-col items-center gap-3 px-3 sm:px-4">
        <div className="pointer-events-auto flex w-full max-w-2xl items-center justify-center gap-3">
          <Button
            size="lg"
            type="button"
            className="text-white text-lg"
            color={isApproved ? "#dc2626" : "#7c3aed"}
            aria-pressed={isApproved}
            onClick={toggleApproval}
          >
            {isApproved ? "Deselect" : "Select"}
          </Button>
        </div>
        <span className="sr-only" aria-live="polite">
          {activeItem?.type === "image" ? activeItem.alt : "Current media"}{" "}
          {isApproved ? "selected" : "not selected"}
        </span>
      </div>
    </>
  );
}

export default function LightboxCompositionDemo() {
  return (
    <Lightbox items={items}>
      <LightboxTrigger index={0} render={<Button variant="outline" />}>
        Open composed lightbox
      </LightboxTrigger>

      <LightboxContent>
        <EditorialReviewChrome />
      </LightboxContent>
    </Lightbox>
  );
}
