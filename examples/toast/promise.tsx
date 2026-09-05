"use client";

import { Button } from "@/registry/base/button";
import { toast } from "@/registry/base/toast";

function saveChanges(shouldFail: boolean): Promise<{ name: string }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("The server could not be reached."));
      } else {
        resolve({ name: "Project Alpha" });
      }
    }, 900);
  });
}

function startSave(shouldFail: boolean) {
  void toast.promise(saveChanges(shouldFail), {
    loading: {
      title: "Saving changes",
      description: "Please wait while the project is saved.",
    },
    success: (result) => ({
      title: "Changes saved",
      description: `${result.name} was saved successfully.`,
    }),
    error: (error) => ({
      title: "Save failed",
      description: error instanceof Error ? error.message : "Please try again.",
    }),
  });
}

export default function ToastPromiseDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={() => startSave(false)}>Resolve promise</Button>
      <Button variant="outline" onClick={() => startSave(true)}>
        Reject promise
      </Button>
    </div>
  );
}
