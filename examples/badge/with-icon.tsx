import { CheckIcon } from "lucide-react";

import { Badge } from "@/registry/base/badge";

export default function BadgeWithIconDemo() {
  return (
    <Badge variant="success">
      <CheckIcon aria-hidden="true" />
      Verified
    </Badge>
  );
}
