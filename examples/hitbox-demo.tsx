import { useState } from "react";

import { Button } from "@/components/ui/button";

export default function HitboxDemo() {
  const [showHitbox, setShowHitbox] = useState(false);

  return (
    <div className="relative flex min-h-64 w-full flex-col items-center justify-center gap-5">
      <label className="absolute top-4 right-0 flex items-center gap-2 text-sm text-muted-foreground">
        <input
          checked={showHitbox}
          className="accent-primary size-4"
          onChange={(event) => setShowHitbox(event.currentTarget.checked)}
          type="checkbox"
        />
        Show hitbox
      </label>

      <Button
        className={`group/hitbox w-30 hitbox-6 ${showHitbox ? "hitbox-debug" : ""}`}
      >
        <span className="group-hover/hitbox:hidden">hitbox-6</span>
        <span className="not-group-hover/hitbox:hidden group-active:hidden">
          Hovered
        </span>
        <span className="not-group-active/hitbox:hidden">Pressed</span>
      </Button>
    </div>
  );
}
