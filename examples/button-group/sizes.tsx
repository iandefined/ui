import { PlusIcon } from "lucide-react";

import { Button } from "@/registry/base/button";
import { ButtonGroup } from "@/registry/base/button-group";

export default function ButtonGroupSizesDemo() {
  return (
    <div className="flex flex-col items-start gap-8">
      <ButtonGroup>
        <Button size="sm" variant="outline">
          Small
        </Button>
        <Button size="sm" variant="outline">
          Button
        </Button>
        <Button size="sm" variant="outline">
          Group
        </Button>
        <Button aria-label="Add small item" size="icon-sm" variant="outline">
          <PlusIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Default</Button>
        <Button variant="outline">Button</Button>
        <Button variant="outline">Group</Button>
        <Button aria-label="Add item" size="icon" variant="outline">
          <PlusIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button size="lg" variant="outline">
          Large
        </Button>
        <Button size="lg" variant="outline">
          Button
        </Button>
        <Button size="lg" variant="outline">
          Group
        </Button>
        <Button aria-label="Add large item" size="icon-lg" variant="outline">
          <PlusIcon />
        </Button>
      </ButtonGroup>
    </div>
  );
}
