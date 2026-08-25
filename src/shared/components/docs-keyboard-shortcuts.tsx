"use client";

import { startTransition } from "react";
import { useHotkeys } from "react-hotkeys-hook";

import { useRouter } from "@/shared/hooks/use-navigation";
import { trackEvent } from "@/shared/lib/events";

export const DocsKeyboardShortcuts = ({
  previous,
  next,
}: {
  previous: string | null;
  next: string | null;
}) => {
  const router = useRouter();

  const navigate = (
    href: string | null,
    direction: "previous" | "next",
    keys: string
  ) => {
    if (href) {
      trackEvent({
        name: "keyboard_shortcut_navigate",
        properties: { direction, keys, path: href },
      });
      startTransition(() => {
        router.push(href);
      });
    }
  };

  useHotkeys(
    "ArrowRight",
    () => {
      navigate(next, "next", "ArrowRight");
    },
    { preventDefault: true }
  );

  useHotkeys(
    "ArrowLeft",
    () => {
      navigate(previous, "previous", "ArrowLeft");
    },
    { preventDefault: true }
  );

  return null;
};
