import { Shimmer } from "@/registry/base/shimmer";

export default function ShimmerSpreadDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 text-center text-sm text-muted-foreground">
      <Shimmer spread={3}>Narrow spread (12px)</Shimmer>
      <Shimmer spread="calc(3ch + 40px)">Default spread (3ch + 40px)</Shimmer>
      <Shimmer spread="6rem">Wide spread (6rem)</Shimmer>
    </div>
  );
}
