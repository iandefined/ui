import { Button } from "@/registry/base/button";

const COLORS = [
  ["Blue", "#3b82f6"],
  ["Green", "#10b981"],
  ["Orange", "#e36323"],
  ["Red", "#ef4444"],
  ["Purple", "#8b5cf6"],
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
