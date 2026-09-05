"use client";

import * as React from "react";

import { Button } from "@/registry/base/button";
import { toast } from "@/registry/base/toast";

export default function ToastAnchoredDemo() {
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  return (
    <div className="flex justify-center py-12">
      <Button
        ref={buttonRef}
        variant="outline"
        onClick={() => {
          toast.anchored({
            title: "Copied",
            description: "The link was copied to your clipboard.",
            anchor: buttonRef.current,
            side: "top",
            sideOffset: 8,
            arrow: true,
            duration: 2000,
          });
        }}
      >
        Copy link
      </Button>
    </div>
  );
}
