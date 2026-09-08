"use client";

import { useState } from "react";

import { Button } from "@/registry/base/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/registry/base/input-otp";

const OTP_LENGTH = 6;
const SLOT_KEYS = Array.from(
  { length: OTP_LENGTH },
  (_, index) => `slot-${index}`
);

export default function InputOTPInvalidDemo() {
  const [invalid, setInvalid] = useState(false);

  return (
    <div className="flex flex-col items-center gap-3">
      <InputOTP
        aria-invalid={invalid || undefined}
        maxLength={OTP_LENGTH}
        aria-label="Verification code"
      >
        <InputOTPGroup>
          {SLOT_KEYS.map((key, index) => (
            <InputOTPSlot index={index} key={key} />
          ))}
        </InputOTPGroup>
      </InputOTP>
      <Button
        onClick={() => setInvalid((current) => !current)}
        variant={invalid ? "default" : "destructive"}
      >
        {invalid ? "Reset" : "Trigger Error"}
      </Button>
    </div>
  );
}
