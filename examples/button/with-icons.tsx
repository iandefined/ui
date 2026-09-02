import { ArrowRightIcon, DownloadIcon, HeartIcon } from "lucide-react";

import { Button } from "@/registry/base/button";

export default function ButtonWithIconsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button leftSection={<DownloadIcon />}>Download</Button>
      <Button
        className="text-white"
        color="#dc2626"
        leftSection={<HeartIcon />}
      >
        Favorite
      </Button>
      <Button
        className="text-white"
        color="#7c3aed"
        rightSection={<ArrowRightIcon />}
      >
        Continue
      </Button>
    </div>
  );
}
