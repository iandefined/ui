import { ArrowUpRightIcon } from "lucide-react";

import { FancyButton } from "@/registry/base/fancy-button";

export default function FancyButtonAsLinkDemo() {
  return (
    <FancyButton
      color="#3b82f6"
      nativeButton={false}
      render={<a aria-label="Explore Fancy Button" href="#fancy-button" />}
      rightSection={<ArrowUpRightIcon />}
    >
      Explore
    </FancyButton>
  );
}
