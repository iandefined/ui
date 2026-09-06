import { Shimmer } from "@/registry/base/shimmer";

export default function ShimmerAngleDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 text-center text-sm text-muted-foreground">
      <Shimmer angle={0}>Horizontal sweep (0deg)</Shimmer>
      <Shimmer angle={20}>Default angle (20deg)</Shimmer>
      <Shimmer angle={45}>Steep angle (45deg)</Shimmer>
      <Shimmer angle={90}>Vertical sweep (90deg)</Shimmer>
    </div>
  );
}
