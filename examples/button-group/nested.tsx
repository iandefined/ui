import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

import { Button } from "@/registry/base/button";
import { ButtonGroup } from "@/registry/base/button-group";

export default function ButtonGroupNestedDemo() {
  return (
    <ButtonGroup>
      <ButtonGroup>
        <Button size="sm" variant="outline">
          1
        </Button>
        <Button size="sm" variant="outline">
          2
        </Button>
        <Button size="sm" variant="outline">
          3
        </Button>
        <Button size="sm" variant="outline">
          4
        </Button>
        <Button size="sm" variant="outline">
          5
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button aria-label="Previous" size="icon-sm" variant="outline">
          <ArrowLeftIcon />
        </Button>
        <Button aria-label="Next" size="icon-sm" variant="outline">
          <ArrowRightIcon />
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  );
}
