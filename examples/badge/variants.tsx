import { Badge } from "@/registry/base/badge";

const categories = [
  ["Fiction", "violet"],
  ["Science", "amber"],
  ["Philosophy", "green"],
  ["History", "blue"],
  ["Poetry", "rose"],
] as const;

export default function BadgeVariantsDemo() {
  return (
    <div className="flex flex-col items-start gap-5">
      <div className="flex flex-wrap gap-2">
        {categories.map(([label, color]) => (
          <Badge color={color} key={label}>
            {label}
          </Badge>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map(([label, color]) => (
          <Badge color={color} key={label} variant="dot">
            {label}
          </Badge>
        ))}
      </div>
    </div>
  );
}
