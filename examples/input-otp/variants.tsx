import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/registry/base/input-otp";

const SLOT_KEYS = Array.from({ length: 4 }, (_, index) => `slot-${index}`);

export default function InputOTPVariantsDemo() {
  return (
    <div className="grid gap-4">
      <InputOTP aria-label="Bordered code" maxLength={4} variant="bordered">
        <InputOTPGroup>
          {SLOT_KEYS.map((key, index) => (
            <InputOTPSlot index={index} key={key} />
          ))}
        </InputOTPGroup>
      </InputOTP>
      <InputOTP aria-label="Underlined code" maxLength={4} variant="underlined">
        <InputOTPGroup>
          {SLOT_KEYS.map((key, index) => (
            <InputOTPSlot index={index} key={key} />
          ))}
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
}
