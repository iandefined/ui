import { LoaderCircleIcon } from "lucide-react";

import { FancyButton } from "@/registry/base/fancy-button";

export default function FancyButtonLoadingDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <FancyButton
        disabled
        leftSection={<LoaderCircleIcon className="animate-spin" />}
      >
        Loading
      </FancyButton>
      <FancyButton
        color="#3b82f6"
        disabled
        leftSection={<LoaderCircleIcon className="animate-spin" />}
      >
        Processing
      </FancyButton>
    </div>
  );
}
