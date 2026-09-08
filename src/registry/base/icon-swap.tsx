"use client";

import type { HTMLMotionProps } from "motion/react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";

const ICON_SWAP_INITIAL = {
  filter: "blur(4px)",
  opacity: 0,
  scale: 0.25,
} as const;

const ICON_SWAP_ANIMATE = {
  filter: "blur(0px)",
  opacity: 1,
  scale: 1,
} as const;

const ICON_SWAP_EXIT = {
  filter: "blur(4px)",
  opacity: 0,
  scale: 0.25,
} as const;

const ICON_SWAP_TRANSITION = {
  bounce: 0,
  duration: 0.3,
  type: "spring",
} as const;

type IconSwapProps = Omit<HTMLMotionProps<"span">, "children"> & {
  children?: React.ReactNode;
  state: React.Key;
};

function IconSwap({ children, state, ...props }: IconSwapProps) {
  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence initial={false} mode="popLayout">
        {children == null ? null : (
          <motion.span
            animate={ICON_SWAP_ANIMATE}
            data-slot="icon-swap"
            exit={ICON_SWAP_EXIT}
            initial={ICON_SWAP_INITIAL}
            key={state}
            transition={ICON_SWAP_TRANSITION}
            {...props}
          >
            {children}
          </motion.span>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}

export { IconSwap };
export type { IconSwapProps };
