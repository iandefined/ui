"use client";

import { cn } from "cn";
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

// Styles for invalid animation shake
const invalidShakeStyles = `
  @keyframes iandefined-invalid-shake-replay {
    0% {
      transform: translateX(0);
      animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
    }

    28.57% {
      transform: translateX(6px);
      animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
    }

    57.14% {
      transform: translateX(-6px);
      animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
    }

    78.57% {
      transform: translateX(4px);
      animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
    }

    100% {
      transform: translateX(0);
    }
  }

  [data-invalid-shake="owner"] {
    animation-duration: 280ms;
    animation-timing-function: linear;
  }

  [data-invalid-shake="owner"].is-shaking[aria-invalid="true"],
  [data-invalid-shake="owner"].is-shaking[data-invalid],
  [data-invalid-shake="owner"].is-shaking:has([aria-invalid="true"]),
  [data-invalid-shake="owner"].is-shaking:has([data-invalid]) {
    animation-name: iandefined-invalid-shake-replay;
    will-change: transform;
  }

  @media (prefers-reduced-motion: reduce) {
    [data-invalid-shake="owner"] {
      animation: none !important;
      transform: none !important;
    }
  }
`;

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
  /**
   * Visually obscures entered characters while preserving the real input value.
   */
  mask?: boolean;

  /**
   * Matches the heights of the corresponding Input sizes.
   */
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
  const invalid = isInvalid(props["aria-invalid"]);

  return (
    <>
      <style>{invalidShakeStyles}</style>

      <InputOTPContext.Provider
        value={{
          invalid,
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
    </>
  );
}

const inputOtpGroupVariants = tv({
  base: [
    "relative inline-flex w-fit items-center gap-1",
    "outline-0 outline-offset-0 outline-transparent outline-solid",
    "[transition:outline-width_100ms_ease-out,outline-offset_100ms_ease-out,outline-color_100ms_ease-out]",
  ],
  variants: {
    variant: {
      bordered: "rounded-lg",
      underlined: "rounded-sm",
    },
    invalid: {
      true: ["outline-2", "outline-offset-2", "outline-destructive/64"],
      false: "",
    },
  },
});

function InputOTPGroup({ className, ...props }: ComponentProps<"div">) {
  const { invalid, variant } = useContext(InputOTPContext);

  return (
    <div
      className={cn(
        inputOtpGroupVariants({
          invalid,
          variant,
        }),
        className
      )}
      data-invalid={invalid || undefined}
      data-invalid-shake="owner"
      data-slot="input-otp-group"
      {...props}
    />
  );
}

const inputOtpSlotVariants = tv({
  base: [
    "relative flex shrink-0 select-none items-center justify-center",
    "text-foreground outline-none",
  ],

  variants: {
    size: {
      sm: "size-8 text-sm",
      default: "size-9 text-sm",
      lg: "size-10 text-base",
    },

    variant: {
      bordered: [
        "rounded-lg",
        "border border-input/70",
        "not-dark:border-input",
        "bg-background",
        "shadow-xs",

        "outline-0",
        "outline-offset-0",
        "outline-transparent",
        "outline-solid",

        "[transition:border-color_150ms_ease-out,outline-width_100ms_ease-out,outline-offset_100ms_ease-out,outline-color_100ms_ease-out]",

        // Active/focus visualization stays on the individual slot.
        "data-[active=true]:z-10",
        "data-[active=true]:border-ring",
        "data-[active=true]:outline-2",
        "data-[active=true]:outline-offset-2",
        "data-[active=true]:outline-ring/50",

        "dark:bg-input/32",
      ],

      underlined: [
        "border-b border-input/70",
        "not-dark:border-input",
        "bg-transparent",
        "[transition:border-color_150ms_ease-out]",
        "data-[active=true]:border-ring",
      ],
    },
  },
});

type InputOTPSlotProps = Omit<ComponentProps<typeof motion.div>, "children"> & {
  index: number;
};

function InputOTPSlot({ className, index, ...props }: InputOTPSlotProps) {
  const otpContext = useContext(OTPInputContextPrimitive);
  const { mask, size, variant } = useContext(InputOTPContext);

  const { char, hasFakeCaret, isActive } = otpContext?.slots[index] ?? {};

  const visibleCharacter = mask && char ? "•" : char;

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        aria-hidden
        className={cn(
          inputOtpSlotVariants({
            size,
            variant,
          }),
          className
        )}
        data-active={isActive}
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
  initial: {
    opacity: 0,
    y: 6,
  },

  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.18,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },

  exit: {
    opacity: 0,
    y: 6,
    transition: {
      duration: 0.12,
      ease: [0.25, 0.1, 0.25, 1],
    },
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
        animate={{
          opacity: [1, 0, 0, 1, 1],
        }}
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
