import { Skeleton } from "@/registry/base/skeleton";

export default function SkeletonDefaultDemo() {
  return (
    <div className="flex w-full max-w-sm items-center gap-3">
      <Skeleton className="size-10" rounded="full" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}
