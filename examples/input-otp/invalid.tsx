"use client";

import { revalidateLogic, useForm } from "@tanstack/react-form";
import { useId } from "react";

import { Button } from "@/registry/base/button";
import {
  Field,
  FieldError,
  FieldErrorSlot,
  FieldLabel,
} from "@/registry/base/field";
import { Form } from "@/registry/base/form";
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
  const form = useForm({
    defaultValues: { code: "" },
    onSubmit: () => undefined,
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "change",
    }),
  });

  return (
    <Form className="grid w-full max-w-sm gap-3" form={form}>
      <form.Field
        name="code"
        validators={{
          onDynamic: ({ value }) =>
            value.length === OTP_LENGTH && /^\d+$/.test(value)
              ? undefined
              : `Enter the ${OTP_LENGTH}-digit verification code.`,
        }}
      >
        {(field) => {
          const error = field.state.meta.errors[0];
          const invalid = typeof error === "string";

          return (
            <Field invalid={invalid} name={field.name}>
              <FieldLabel htmlFor={inputId}>Verification code</FieldLabel>
              <InputOTP
                aria-describedby={invalid ? errorId : undefined}
                aria-invalid={invalid || undefined}
                id={inputId}
                inputMode="numeric"
                maxLength={OTP_LENGTH}
                name={field.name}
                pattern="[0-9]*"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(value) => field.handleChange(value)}
              >
                <InputOTPGroup>
                  {SLOT_KEYS.map((key, index) => (
                    <InputOTPSlot index={index} key={key} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
              <FieldErrorSlot>
                <FieldError id={errorId} match={invalid}>
                  {error}
                </FieldError>
              </FieldErrorSlot>
            </Field>
          );
        }}
      </form.Field>
      <Button type="submit">Verify code</Button>
    </Form>
  );
}
