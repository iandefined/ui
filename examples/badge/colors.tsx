import { Badge, type BadgeColor } from "@/registry/base/badge";

const colors = [
  "gray",
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
] as const satisfies readonly BadgeColor[];

export default function BadgeColorsDemo() {
  return (
    <div className="flex flex-col items-start gap-5">
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => (
          <Badge color={color} key={color}>
            {color}
          </Badge>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => (
          <Badge color={color} key={color} variant="dot">
            {color}
          </Badge>
        ))}
      </div>
    </div>
  );
}
