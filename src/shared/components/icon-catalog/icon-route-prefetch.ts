import { useRouter } from "@tanstack/react-router";
import { useCallback } from "react";

import { type IconCategory, type IconVariant } from "@/icons/catalog";

type IconSearch = {
  q: string;
  category: "all" | IconCategory;
  variant: "all" | "duotone" | "filled";
  icon?: string;
  iconVariant: IconVariant;
  size: 16 | 20 | 24 | 32 | 40 | 48 | 64 | 80;
  syntax: "svg" | "react";
};

export type IconSearchPatch = Partial<IconSearch>;

export function useIconRoutePrefetch(search: IconSearch) {
  const router = useRouter();

  return useCallback(
    (patch: IconSearchPatch) => {
      void router.preloadRoute({
        to: "/icons",
        search: { ...search, ...patch },
      });
    },
    [router, search]
  );
}
