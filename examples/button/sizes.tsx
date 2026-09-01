import { PlusIcon } from "lucide-react";

import { Button, type ButtonSize } from "@/registry/base/button";

const TEXT_SIZES: ButtonSize[] = ["xs", "sm", "default", "lg", "xl"];
const ICON_SIZES: ButtonSize[] = [
  "icon-xs",
  "icon-sm",
  "icon",
  "icon-lg",
  "icon-xl",
];

export default function ButtonSizesDemo() {
  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-end gap-2">
        {TEXT_SIZES.map((size) => (
          <Button key={size} size={size}>
            {size === "default" ? "Default" : size.toUpperCase()}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap items-end gap-2">
        {ICON_SIZES.map((size) => (
          <Button aria-label={`Add item, ${size}`} key={size} size={size}>
            <PlusIcon />
          </Button>
        ))}
      </div>
    </div>
  );
}
