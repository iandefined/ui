import type { ComponentProps } from "react";

import { Button } from "@/registry/base/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/registry/base/dropdown-menu";

const presets = [
  "scale",
  "fade",
  "slideOutside",
  "slideInside",
  "motion",
  "motionBlur",
] as const satisfies readonly NonNullable<
  ComponentProps<typeof DropdownMenuContent>["animationPreset"]
>[];

type AnimationPreset = (typeof presets)[number];

function AnimationMenu({
  animationPreset,
}: {
  animationPreset: AnimationPreset;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button className="w-full" size="sm" variant="outline" />}
      >
        {animationPreset}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        animationPreset={animationPreset}
        className="w-52"
        sideOffset={8}
      >
        <DropdownMenuItem>Add to Library</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Add to Playlist</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Get Up!</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Dancing Queen</DropdownMenuItem>
            <DropdownMenuItem>Shape of You</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Play Next</DropdownMenuItem>
        <DropdownMenuItem>Favorite</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function DropdownMenuAnimationDemo() {
  return (
    <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3">
      {presets.map((preset) => (
        <AnimationMenu key={preset} animationPreset={preset} />
      ))}
    </div>
  );
}
