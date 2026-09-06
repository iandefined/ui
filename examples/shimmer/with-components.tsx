import { Button } from "@/registry/base/button";
import { Shimmer } from "@/registry/base/shimmer";
import { Spinner } from "@/registry/base/spinner";

export default function ShimmerWithComponentsDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Button disabled variant="outline" size="sm">
        <Spinner size="sm" />
        <Shimmer>Thinking...</Shimmer>
      </Button>
    </div>
  );
}
