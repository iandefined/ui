import { cn } from "@/shared/lib/utils";

export function Step({
  className,
  children,
  ...props
}: React.ComponentProps<"h3">) {
  return (
    <h3
      className={cn(
        "mt-8 scroll-m-32 font-heading text-lg font-medium tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export function Steps({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "steps [counter-reset:step] md:ml-4 md:border-l mt-2 md:pl-8 [&>h3]:step",
        className
      )}
      {...props}
    />
  );
}
