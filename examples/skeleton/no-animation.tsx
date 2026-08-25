import { Skeleton } from "@/registry/base/skeleton";

export default function SkeletonNoAnimationDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Skeleton animate={false} className="h-4 w-3/4" />
      <Skeleton animate={false} className="h-4 w-full" />
      <Skeleton animate={false} className="h-4 w-5/6" />
    </div>
  );
}
