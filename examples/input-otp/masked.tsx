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

export default function InputOTPMaskedDemo() {
  return (
    <InputOTP
      aria-label="Masked access code"
      defaultValue="824190"
      mask
      maxLength={OTP_LENGTH}
    >
      <InputOTPGroup>
        {SLOT_KEYS.map((key, index) => (
          <InputOTPSlot index={index} key={key} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
}
