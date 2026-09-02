import { ArrowUpRightIcon } from "lucide-react";

import { Button } from "@/registry/base/button";

export default function ButtonAsLinkDemo() {
  return (
    <Button
      className="text-white"
      color="#2563eb"
      nativeButton={false}
      render={<a aria-label="Explore Button" href="#button" />}
      rightSection={<ArrowUpRightIcon />}
    >
      Explore
    </Button>
  );
}
