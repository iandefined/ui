import { MinusIcon, PlusIcon, ZoomInIcon, ZoomOutIcon } from "lucide-react";

import { Button } from "@/registry/base/button";
import { ButtonGroup } from "@/registry/base/button-group";

export default function ButtonGroupOrientationDemo() {
  return (
    <div className="flex gap-3">
      <ButtonGroup
        aria-label="Media controls"
        className="h-fit"
        orientation="vertical"
      >
        <Button aria-label="Increase" size="icon" variant="outline">
          <PlusIcon />
        </Button>
        <Button aria-label="Decrease" size="icon" variant="outline">
          <MinusIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup aria-label="Zoom controls" orientation="vertical">
        <Button aria-label="Zoom in" size="icon" variant="outline">
          <ZoomInIcon />
        </Button>
        <Button aria-label="Zoom out" size="icon" variant="outline">
          <ZoomOutIcon />
        </Button>
      </ButtonGroup>
    </div>
  );
}
