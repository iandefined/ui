import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/registry/base/checkbox";

export default function HitboxDemo() {
  const [showHitbox, setShowHitbox] = useState(false);

  return (
    <div className="relative flex min-h-64 w-full flex-col items-center justify-center gap-5">
      <label
        className="absolute top-2 -right-2 flex items-center gap-2 cursor-pointer text-muted-foreground"
        htmlFor="show-hitbox"
      >
        <Checkbox
          checked={showHitbox}
          id="show-hitbox"
          onCheckedChange={setShowHitbox}
        />
        Show hitbox
      </label>

      <Button
        className={`group/hitbox w-30 hitbox-6 ${showHitbox ? "hitbox-debug" : ""}`}
      >
        <span className="group-hover/hitbox:hidden group-active:hidden">
          hitbox-6
        </span>
        <span className="not-group-hover/hitbox:hidden group-active:hidden">
          Hovered
        </span>
        <span className="not-group-active/hitbox:hidden">Pressed</span>
      </Button>
    </div>
  );
}
