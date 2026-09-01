import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/registry/base/input-otp";

const OTP_LENGTH = 6;

export default function InputOTPDefaultDemo() {
  return (
    <InputOTP aria-label="Verification code" maxLength={OTP_LENGTH}>
      <InputOTPGroup>
        {Array.from({ length: 3 }, (_, index) => (
          <InputOTPSlot index={index} key={index} />
        ))}
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        {Array.from({ length: 3 }, (_, index) => (
          <InputOTPSlot index={index + 3} key={index + 3} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
}
