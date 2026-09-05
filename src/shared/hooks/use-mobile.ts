import { useCallback, useSyncExternalStore } from "react";

export const useIsMobile = (mobileBreakpoint = 768) => {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(`(max-width: ${mobileBreakpoint - 1}px)`);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [mobileBreakpoint]
  );

  const getSnapshot = () => window.innerWidth < mobileBreakpoint;
  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};
