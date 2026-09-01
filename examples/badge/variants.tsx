import { Badge, type BadgeVariant } from "@/registry/base/badge";

const variants = [
  ["Default", "default"],
  ["Secondary", "secondary"],
  ["Outline", "outline"],
  ["Destructive", "destructive"],
  ["Error", "error"],
  ["Info", "info"],
  ["Success", "success"],
  ["Warning", "warning"],
] as const satisfies ReadonlyArray<readonly [string, BadgeVariant]>;

export default function BadgeVariantsDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      {variants.map(([label, variant]) => (
        <Badge key={variant} variant={variant}>
          {label}
        </Badge>
      ))}
    </div>
  );
}
