import { SearchIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/base/input-group";
import { Kbd } from "@/registry/base/kbd";

export default function KbdInputGroupDemo() {
  return (
    <InputGroup className="w-full max-w-xs">
      <InputGroupInput aria-label="Search" placeholder="Search..." />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </InputGroupAddon>
    </InputGroup>
  );
}
