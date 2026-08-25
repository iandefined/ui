import {
  ProgressProvider as RawProgressProvider,
  useProgress,
} from "@bprogress/react";
import { useRouter } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

/**
 * Delay in milliseconds before showing the progress bar.
 * Only shows if navigation takes longer than this threshold.
 */
const PROGRESS_DELAY_MS = 175;

function ProgressBarSubscriber() {
  const router = useRouter();
  const { start, stop } = useProgress();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isNavigatingRef = useRef(false);

  useEffect(() => {
    const clearAndStop = () => {
      isNavigatingRef.current = false;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      stop();
    };

    const unsubBeforeLoad = router.subscribe(
      "onBeforeLoad",
      ({ pathChanged }) => {
        if (!pathChanged) {
          return;
        }

        isNavigatingRef.current = true;

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          if (isNavigatingRef.current && router.state.isLoading) {
            start();
          }

          timeoutRef.current = null;
        }, PROGRESS_DELAY_MS);
      }
    );

    const unsubResolved = router.subscribe("onResolved", clearAndStop);

    return () => {
      unsubBeforeLoad();
      unsubResolved();

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      stop();
    };
  }, [router, start, stop]);

  return null;
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  return (
    <RawProgressProvider
      color="var(--color-primary)"
      options={{ showSpinner: false }}
    >
      <ProgressBarSubscriber />
      {children}
    </RawProgressProvider>
  );
}
