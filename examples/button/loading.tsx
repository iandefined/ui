import { LoaderCircleIcon } from "lucide-react";

import { Button } from "@/registry/base/button";

export default function ButtonLoadingDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        disabled
        leftSection={<LoaderCircleIcon className="animate-spin" />}
      >
        Loading
      </Button>
      <Button
        className="text-white"
        color="#2563eb"
        disabled
        leftSection={<LoaderCircleIcon className="animate-spin" />}
      >
        Processing
      </Button>
    </div>
  );
}
