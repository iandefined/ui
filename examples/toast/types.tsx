"use client";

import { Button } from "@/registry/base/button";
import { toast } from "@/registry/base/toast";

const types = [
  "default",
  "loading",
  "success",
  "error",
  "warning",
  "info",
] as const;

function showToast(type: (typeof types)[number]) {
  const message = {
    default: {
      title: "Neutral update",
      description: "Nothing needs your attention.",
    },
    loading: {
      title: "Uploading",
      description: "Your file is being uploaded.",
    },
    success: {
      title: "Upload complete",
      description: "Your file is ready to use.",
    },
    error: { title: "Upload failed", description: "Try again in a moment." },
    warning: {
      title: "Storage is nearly full",
      description: "Remove old files to make room.",
    },
    info: {
      title: "New version available",
      description: "Refresh when you are ready.",
    },
  }[type];

  if (type === "success") {
    toast.success(message);
  } else if (type === "error") {
    toast.error(message);
  } else if (type === "warning") {
    toast.warning(message);
  } else if (type === "info") {
    toast.info(message);
  } else {
    toast({ ...message, type });
  }
}

export default function ToastTypesDemo() {
  return (
    <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-3">
      {types.map((type) => (
        <Button
          key={type}
          className="w-full"
          size="sm"
          variant="outline"
          onClick={() => showToast(type)}
        >
          {type}
        </Button>
      ))}
    </div>
  );
}
