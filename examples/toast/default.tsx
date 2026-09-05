"use client";

import { Button } from "@/registry/base/button";
import { toast } from "@/registry/base/toast";

export default function ToastDefaultDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={() =>
          toast({
            title: "Changes saved",
            description: "Your preferences are up to date.",
          })
        }
      >
        Show toast
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast({
            title: <span className="font-medium">JSX-friendly content</span>,
            description: (
              <span>
                Titles and descriptions can be composed from React nodes.
              </span>
            ),
          })
        }
      >
        JSX content
      </Button>
    </div>
  );
}
