import { PlusIcon } from "lucide-react";

import { Button } from "@/registry/base/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/registry/base/button-group";

export default function ButtonGroupSplitDemo() {
  return (
    <ButtonGroup>
      <Button variant="secondary">Button</Button>
      <ButtonGroupSeparator orientation="vertical" />
      <Button aria-label="Add" size="icon" variant="secondary">
        <PlusIcon />
      </Button>
    </ButtonGroup>
  );
}
