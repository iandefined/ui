import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import type { ComponentProps } from "react";

import {
  Select,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectList,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/base/select";

const presets = [
  "scale",
  "fade",
  "slideOutside",
  "slideInside",
  "motion",
  "motionBlur",
] as const satisfies readonly NonNullable<
  ComponentProps<typeof SelectPopup>["animationPreset"]
>[];

const options = [
  { label: "Sans-serif", value: "sans" },
  { label: "Serif", value: "serif" },
  { label: "Monospace", value: "mono" },
];

type AnimationPreset = (typeof presets)[number];

function AnimationSelect({
  animationPreset,
}: {
  animationPreset: AnimationPreset;
}) {
  return (
    <Select items={options}>
      <SelectTrigger
        className="w-full"
        aria-label={`${animationPreset} animation`}
      >
        <SelectValue placeholder={animationPreset} />
        <SelectIcon>
          <ChevronsUpDownIcon className="size-3.5" />
        </SelectIcon>
      </SelectTrigger>
      <SelectPopup animationPreset={animationPreset}>
        <SelectList>
          {options.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              <SelectItemText>{label}</SelectItemText>
              <SelectItemIndicator>
                <CheckIcon className="size-3" />
              </SelectItemIndicator>
            </SelectItem>
          ))}
        </SelectList>
      </SelectPopup>
    </Select>
  );
}

export default function SelectAnimationDemo() {
  return (
    <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3">
      {presets.map((preset) => (
        <AnimationSelect key={preset} animationPreset={preset} />
      ))}
    </div>
  );
}
