import { PlusIcon } from "lucide-react";

import {
  FancyButton,
  type FancyButtonSize,
} from "@/registry/base/fancy-button";

const TEXT_SIZES: FancyButtonSize[] = ["xs", "sm", "default", "lg"];
const ICON_SIZES: FancyButtonSize[] = ["icon-xs", "icon-sm", "icon", "icon-lg"];

export default function FancyButtonSizesDemo() {
  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-end gap-2">
        {TEXT_SIZES.map((size) => (
          <FancyButton key={size} size={size}>
            {size === "default" ? "Default" : size.toUpperCase()}
          </FancyButton>
        ))}
      </div>
      <div className="flex flex-wrap items-end gap-2">
        {ICON_SIZES.map((size) => (
          <FancyButton aria-label={`Add item, ${size}`} key={size} size={size}>
            <PlusIcon />
          </FancyButton>
        ))}
      </div>
    </div>
  );
}
