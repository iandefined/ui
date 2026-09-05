import { useState, type ComponentProps } from "react";

import { Button } from "@/registry/base/button";
import {
  Popover,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/base/popover";

const presets = [
  "scale",
  "fade",
  "slideOutside",
  "slideInside",
  "motion",
  "motionBlur",
] as const satisfies readonly NonNullable<
  ComponentProps<typeof PopoverPopup>["animationPreset"]
>[];

const animationPopover = Popover.createHandle<(typeof presets)[number]>();

export default function PopoverAnimationDemo() {
  const [animationPreset, setAnimationPreset] = useState<
    (typeof presets)[number]
  >(presets[0]);

  return (
    <Popover handle={animationPopover}>
      <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3">
        {presets.map((preset) => (
          <PopoverTrigger
            key={preset}
            handle={animationPopover}
            onClick={() => setAnimationPreset(preset)}
            payload={preset}
            render={<Button className="w-full" size="sm" variant="outline" />}
          >
            {preset}
          </PopoverTrigger>
        ))}
      </div>

      <PopoverPopup animationPreset={animationPreset} className="w-72">
        <PopoverTitle>{animationPreset} popover</PopoverTitle>
        <PopoverDescription className="mt-2">
          This popover uses the {animationPreset} animation preset.
        </PopoverDescription>
      </PopoverPopup>
    </Popover>
  );
}
