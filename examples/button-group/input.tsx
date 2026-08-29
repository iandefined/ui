import { SearchIcon } from "lucide-react";

import { Button } from "@/registry/base/button";
import { ButtonGroup } from "@/registry/base/button-group";
import { Input } from "@/registry/base/input";

export default function ButtonGroupInputDemo() {
  return (
    <ButtonGroup>
      <Input placeholder="Search..." />
      <Button aria-label="Search" variant="outline">
        <SearchIcon />
      </Button>
    </ButtonGroup>
  );
}
