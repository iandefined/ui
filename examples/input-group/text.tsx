"use client";

import { useState } from "react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/registry/base/input-group";

export default function InputGroupTextDemo() {
  const [message, setMessage] = useState("");

  return (
    <div className="grid w-full max-w-sm gap-4">
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>$</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput aria-label="Amount" placeholder="0.00" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>USD</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupTextarea
          aria-label="Message"
          maxLength={120}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Enter your message"
          value={message}
        />
        <InputGroupAddon align="block-end">
          <InputGroupText className="text-xs">
            {120 - message.length} characters left
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
