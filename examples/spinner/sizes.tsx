import { Spinner } from "@/registry/base/spinner";

const sizes = [
  ["Small", "sm"],
  ["Medium", "md"],
  ["Large", "lg"],
  ["Extra Large", "xl"],
] as const;

export default function SpinnerSizesDemo() {
  return (
    <div className="flex flex-wrap items-end gap-6">
      {sizes.map(([label, size]) => (
        <div className="flex flex-col items-center gap-2" key={size}>
          <Spinner size={size} />
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>
  );
}
