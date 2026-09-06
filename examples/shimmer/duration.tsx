import { Shimmer } from "@/registry/base/shimmer";

export default function ShimmerDurationDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 text-center text-sm text-muted-foreground">
      <Shimmer duration={1000}>Fast sweep (1000ms)</Shimmer>
      <Shimmer duration="2s">Default sweep (2s)</Shimmer>
      <Shimmer duration={3500}>Gentle sweep (3500ms)</Shimmer>
    </div>
  );
}
