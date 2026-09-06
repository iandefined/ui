import { Shimmer } from "@/registry/base/shimmer";

export default function ShimmerColorsDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 text-center text-sm text-muted-foreground">
      <Shimmer color="#38bdf8" className="font-medium">
        Sky blue (#38bdf8)
      </Shimmer>
      <Shimmer color="purple-500" className="font-medium">
        Purple (purple-500)
      </Shimmer>
      <Shimmer color="#f59e0b" className="font-medium">
        Amber (#f59e0b)
      </Shimmer>
      <Shimmer color="emerald-500/80" className="font-medium text-emerald-300">
        Emerald (emerald-500/80) with matching text color (text-emerald-300)
      </Shimmer>
    </div>
  );
}
