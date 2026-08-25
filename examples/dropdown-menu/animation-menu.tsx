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

type AnimationPreset = ComponentProps<
  typeof DropdownMenuContent
>["animationPreset"];

export function AnimationMenu({
  animationPreset,
}: {
  animationPreset: AnimationPreset;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button className="active:scale-100" size="sm" variant="ghost" />
        }
      >
        Song
      </DropdownMenuTrigger>
      <DropdownMenuContent
        animationPreset={animationPreset}
        className="w-44"
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
