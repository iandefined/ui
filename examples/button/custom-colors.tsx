import { Button } from "@/registry/base/button";

const COLORS = [
  ["Blue", "#2563eb"],
  ["Green", "#059669"],
  ["Orange", "#ea580c"],
  ["Red", "#dc2626"],
  ["Purple", "#7c3aed"],
] as const;

export default function ButtonCustomColorsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {COLORS.map(([label, color]) => (
        <Button className="text-white" color={color} key={color}>
          {label}
        </Button>
      ))}
    </div>
  );
}
