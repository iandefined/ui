import { CreditCardIcon, MailIcon, SearchIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/base/input-group";

export default function InputGroupIconsDemo() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <InputGroup>
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput aria-label="Search" placeholder="Search..." />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <MailIcon />
        </InputGroupAddon>
        <InputGroupInput placeholder="Enter your email" type="email" />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <CreditCardIcon />
        </InputGroupAddon>
        <InputGroupInput placeholder="Card number" />
      </InputGroup>
    </div>
  );
}
