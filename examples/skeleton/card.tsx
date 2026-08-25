import { Skeleton } from "@/registry/base/skeleton";

export default function SkeletonCardDemo() {
  return (
    <div className="w-full max-w-sm space-y-3">
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-5 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  );
}
