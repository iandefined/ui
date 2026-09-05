"use client";

import { Button } from "@/registry/base/button";
import { toast } from "@/registry/base/toast";

const statusId = "toast-deduplication-status";

export default function ToastDeduplicationDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={() =>
          toast({
            id: statusId,
            title: "Draft saved",
            description: "Click again while it is visible to update in place.",
          })
        }
      >
        Save draft
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.update(statusId, {
            title: "Sync complete",
            description:
              "The existing toast was updated instead of duplicated.",
            type: "success",
          })
        }
      >
        Update toast
      </Button>
    </div>
  );
}
