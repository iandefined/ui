import { Badge } from "@/registry/base/badge";

export default function BadgeSizesDemo() {
  return (
    <div className="flex items-center gap-3">
      <Badge color="violet" size="compact">
        Compact
      </Badge>
      <Badge color="violet">Default</Badge>
    </div>
  );
}
