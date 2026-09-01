import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  type InputOTPSize,
} from "@/registry/base/input-otp";

const SIZES: InputOTPSize[] = ["sm", "default", "lg"];
const SLOT_KEYS = Array.from({ length: 4 }, (_, index) => `slot-${index}`);

export default function InputOTPSizesDemo() {
  return (
    <div className="grid gap-4">
      {SIZES.map((size) => (
        <InputOTP
          aria-label={`${size} verification code`}
          key={size}
          maxLength={4}
          size={size}
        >
          <InputOTPGroup>
            {SLOT_KEYS.map((key, index) => (
              <InputOTPSlot index={index} key={`${size}-${key}`} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      ))}
    </div>
  );
}
