"use client";

import {
  useRouter as useTanStackRouter,
  useRouterState,
} from "@tanstack/react-router";
import { useCallback } from "react";

export const usePathname = () =>
  useRouterState({ select: (state) => state.location.pathname });

export const useRouter = () => {
  const router = useTanStackRouter();

  const push = useCallback(
    (href: string) => {
      if (/^[a-z][a-z\d+\-.]*:/i.test(href)) {
        window.location.assign(href);
        return;
      }

      void router.navigate({ to: href });
    },
    [router]
  );

  const replace = useCallback(
    (href: string) => {
      if (/^[a-z][a-z\d+\-.]*:/i.test(href)) {
        window.location.replace(href);
        return;
      }

      void router.navigate({ replace: true, to: href });
    },
    [router]
  );

  return { push, replace };
};
