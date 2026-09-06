import { Shimmer } from "@/registry/base/shimmer";

export default function ShimmerDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 text-center">
      <Shimmer className="text-sm font-medium text-muted-foreground">
        Generating response with AI...
      </Shimmer>
    </div>
  );
}
