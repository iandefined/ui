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

export default function BadgeDepthDemo() {
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex flex-col gap-2">
        <span className="text-xs text-muted-foreground">
          Flat
        </span>
        <div className="flex flex-wrap gap-2">
          {variants.map(([label, variant]) => (
            <Badge depth="flat" key={`flat-${variant}`} variant={variant}>
              {label}
            </Badge>
          ))}
          <Badge color="blue" depth="flat" variant="translucent">
            Translucent
          </Badge>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs text-muted-foreground">
          Surface
        </span>
        <div className="flex flex-wrap gap-2">
          {variants.map(([label, variant]) => (
            <Badge
              depth="surface"
              key={`surface-${variant}`}
              variant={variant}
            >
              {label}
            </Badge>
          ))}
          <Badge color="blue" depth="surface" variant="translucent">
            Translucent
          </Badge>
        </div>
      </div>
    </div>
  );
}
