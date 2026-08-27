"use client";

import type { HTMLMotionProps } from "motion/react";
import { AnimatePresence, motion } from "motion/react";

type IconSwapProps = Omit<HTMLMotionProps<"span">, "children"> & {
  children?: React.ReactNode;
  state: React.Key;
};

function IconSwap({ children, state, ...props }: IconSwapProps) {
  return (
    <AnimatePresence initial={false} mode="popLayout">
      {children == null ? null : (
        <motion.span
          animate={{ filter: "blur(0px)", opacity: 1, scale: 1 }}
          data-slot="icon-swap"
          exit={{ filter: "blur(4px)", opacity: 0, scale: 0.25 }}
          initial={{ filter: "blur(4px)", opacity: 0, scale: 0.25 }}
          key={state}
          transition={{ bounce: 0, duration: 0.3, type: "spring" }}
          {...props}
        >
          {children}
        </motion.span>
      )}
    </AnimatePresence>
  );
}

export { IconSwap };
export type { IconSwapProps };
