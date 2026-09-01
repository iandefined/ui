"use client";

import { useId, useState } from "react";

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
  const inputId = useId();
  const errorId = useId();
  const [value, setValue] = useState("");
  const invalid = value.length === OTP_LENGTH && value !== "123456";

  return (
    <div className="grid gap-2">
      <label className="text-sm font-medium" htmlFor={inputId}>
        Verification code
      </label>
      <InputOTP
        aria-describedby={invalid ? errorId : undefined}
        aria-invalid={invalid || undefined}
        id={inputId}
        maxLength={OTP_LENGTH}
        onChange={setValue}
        value={value}
      >
        <InputOTPGroup>
          {SLOT_KEYS.map((key, index) => (
            <InputOTPSlot index={index} key={key} />
          ))}
        </InputOTPGroup>
      </InputOTP>
      <p
        className={
          invalid ? "text-sm text-destructive" : "text-sm text-muted-foreground"
        }
        id={errorId}
      >
        {invalid ? "The code is invalid." : "Enter 123456 to verify the code."}
      </p>
    </div>
  );
}
