import { Badge } from "@/registry/base/badge";

export default function BadgeWithLinkDemo() {
  return (
    <Badge render={<a href="#with-link" />} variant="secondary">
      View updates
    </Badge>
  );
}
