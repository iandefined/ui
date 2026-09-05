import { Badge } from "@/registry/base/badge";

export default function BadgeWithLinkDemo() {
  return (
    <Badge
      render={<a aria-label="View updates" href="#with-link" />}
      variant="secondary"
    >
      View updates
    </Badge>
  );
}
