import { FancyButton } from "@/registry/base/fancy-button";

const COLORS = [
  ["Blue", "#3b82f6"],
  ["Green", "#10b981"],
  ["Orange", "#e36323"],
  ["Red", "#ef4444"],
  ["Purple", "#8b5cf6"],
] as const;

export default function FancyButtonCustomColorsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {COLORS.map(([label, color]) => (
        <FancyButton color={color} key={color}>
          {label}
        </FancyButton>
      ))}
    </div>
  );
}
