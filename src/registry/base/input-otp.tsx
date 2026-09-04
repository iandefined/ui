"use client";

import {
  OTPInput,
  OTPInputContext as OTPInputContextPrimitive,
  type OTPInputProps as OTPInputPrimitiveProps,
} from "input-otp";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  type TargetAndTransition,
} from "motion/react";
import {
  createContext,
  useContext,
  type AriaAttributes,
  type ComponentProps,
  type ReactNode,
} from "react";
import { tv } from "tailwind-variants";

import { cn } from "@/lib/utils";

type InputOTPSize = NonNullable<InputOTPProps["size"]>;
type InputOTPVariant = NonNullable<InputOTPProps["variant"]>;

interface InputOTPContextValue {
  invalid: boolean;
  mask: boolean;
  size: InputOTPSize;
  variant: InputOTPVariant;
}

const InputOTPContext = createContext<InputOTPContextValue>({
  invalid: false,
  mask: false,
  size: "default",
  variant: "bordered",
});

function isInvalid(value: AriaAttributes["aria-invalid"]) {
  return value !== undefined && value !== false && value !== "false";
}

type InputOTPChildrenProps = Extract<
  OTPInputPrimitiveProps,
  { children: ReactNode }
>;

type InputOTPProps = Omit<InputOTPChildrenProps, "size"> & {
  /** Visually obscures entered characters while preserving the real input value. */
  mask?: boolean;
  /** Matches the heights of the corresponding Input sizes. */
  size?: "sm" | "default" | "lg";
  variant?: "bordered" | "underlined";
};

function InputOTP({
  className,
  containerClassName,
  mask = false,
  size = "default",
  variant = "bordered",
  ...props
}: InputOTPProps) {
  return (
    <InputOTPContext.Provider
      value={{
        invalid: isInvalid(props["aria-invalid"]),
        mask,
        size,
        variant,
      }}
    >
      <OTPInput
        className={cn("disabled:cursor-not-allowed", className)}
        containerClassName={cn(
          "flex items-center gap-2 has-disabled:opacity-64",
          containerClassName
        )}
        data-slot="input-otp"
        spellCheck={false}
        {...props}
      />
    </InputOTPContext.Provider>
  );
}

function InputOTPGroup({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("flex items-center gap-1", className)}
      data-slot="input-otp-group"
      {...props}
    />
  );
}

const inputOtpSlotVariants = tv({
  base: "relative flex shrink-0 select-none items-center justify-center text-foreground outline-none",
  variants: {
    size: {
      sm: "size-8 text-sm",
      default: "size-9 text-sm",
      lg: "size-10 text-base",
    },
    variant: {
      bordered:
        "rounded-lg border border-input/70 not-dark:border-input bg-background shadow-xs outline-0 outline-offset-0 outline-transparent outline-solid [transition:border-color_150ms_ease-out,outline-width_100ms_ease-out,outline-offset_100ms_ease-out,outline-color_100ms_ease-out] data-[active=true]:z-10 data-[active=true]:border-ring data-[active=true]:outline-2 data-[active=true]:outline-offset-2 data-[active=true]:outline-ring/50 data-[invalid=true]:border-destructive data-[invalid=true]:outline-2 data-[invalid=true]:outline-offset-2 data-[invalid=true]:outline-destructive/50 data-[active=true]:data-[invalid=true]:border-destructive data-[active=true]:data-[invalid=true]:outline-destructive/50 dark:bg-input/32",
      underlined:
        "border-b border-input/70 not-dark:border-input bg-transparent [transition:border-color_150ms_ease-out] data-[active=true]:border-ring data-[invalid=true]:border-destructive/64",
    },
  },
});

type InputOTPSlotProps = Omit<ComponentProps<typeof motion.div>, "children"> & {
  index: number;
};

function InputOTPSlot({ className, index, ...props }: InputOTPSlotProps) {
  const otpContext = useContext(OTPInputContextPrimitive);
  const { invalid, mask, size, variant } = useContext(InputOTPContext);
  const { char, hasFakeCaret, isActive } = otpContext?.slots[index] ?? {};
  const visibleCharacter = mask && char ? "•" : char;

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        aria-hidden
        className={cn(inputOtpSlotVariants({ size, variant }), className)}
        data-active={isActive}
        data-invalid={invalid || undefined}
        data-slot="input-otp-slot"
        {...props}
      >
        <AnimatedCharacter value={visibleCharacter} />
        {hasFakeCaret && <FakeCaret />}
      </motion.div>
    </MotionConfig>
  );
}

function InputOTPSeparator({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      aria-hidden
      className={cn("h-0.5 w-2 rounded-full bg-border", className)}
      data-slot="input-otp-separator"
      {...props}
    />
  );
}

const characterMotion: Record<
  "animate" | "exit" | "initial",
  TargetAndTransition
> = {
  initial: { opacity: 0, y: 6 },
  animate: {
    opacity: 1,
    transition: { duration: 0.18, ease: [0.25, 0.1, 0.25, 1] },
    y: 0,
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.12, ease: [0.25, 0.1, 0.25, 1] },
    y: 6,
  },
};

function AnimatedCharacter({ value }: { value: ReactNode }) {
  return (
    <span className="relative flex size-full items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        {value && (
          <motion.span
            animate={characterMotion.animate}
            data-slot="input-otp-character"
            exit={characterMotion.exit}
            initial={characterMotion.initial}
            key={String(value)}
          >
            {value}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

function FakeCaret() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      <motion.span
        aria-hidden
        animate={{ opacity: [1, 0, 0, 1, 1] }}
        className="h-4.5 w-px bg-foreground"
        transition={{
          duration: 1,
          ease: "easeOut",
          repeat: Infinity,
          times: [0, 0.2, 0.5, 0.7, 1],
        }}
      />
    </span>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot };
export type { InputOTPProps, InputOTPSize, InputOTPVariant };
