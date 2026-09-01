import { ArrowRightIcon, DownloadIcon, HeartIcon } from "lucide-react";

import { FancyButton } from "@/registry/base/fancy-button";

export default function FancyButtonWithIconsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <FancyButton leftSection={<DownloadIcon />}>Download</FancyButton>
      <FancyButton color="#ef4444" leftSection={<HeartIcon />}>
        Favorite
      </FancyButton>
      <FancyButton color="#8b5cf6" rightSection={<ArrowRightIcon />}>
        Continue
      </FancyButton>
    </div>
  );
}
