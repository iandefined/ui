import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/registry/base/input-otp";

const SLOT_KEYS = Array.from({ length: 4 }, (_, index) => `slot-${index}`);

export default function InputOTPDisabledDemo() {
  return (
    <InputOTP aria-label="Disabled verification code" disabled maxLength={4}>
      <InputOTPGroup>
        {SLOT_KEYS.map((key, index) => (
          <InputOTPSlot index={index} key={key} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
}
