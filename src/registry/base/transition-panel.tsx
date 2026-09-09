"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "cn";
import * as React from "react";

type TransitionPanelInitialFocus =
  | boolean
  | React.RefObject<HTMLElement | null>;

type TransitionPanelProps = useRender.ComponentProps<"div"> & {
  /** The key of the view that should be visible. */
  activeKey: string;
  /** The animation used when the active view changes. */
  transition?: "slide" | "fade";
};

type TransitionPanelViewProps = useRender.ComponentProps<"div"> & {
  /** Matches the parent panel's activeKey. */
  viewKey: string;
  /** Focus behavior when this view becomes active after the initial render. */
  initialFocus?: TransitionPanelInitialFocus;
};

const SLIDE_DISTANCE = "18%";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex]:not([tabindex="-1"]), [contenteditable]:not([contenteditable="false"])';

type ViewEntry = {
  element: HTMLElement;
  initialFocus: TransitionPanelInitialFocus;
};

type TransitionPanelContextValue = {
  activeKey: string;
  transition: "slide" | "fade";
  enterFrom: string;
  exitTo: string;
  mounted: boolean;
  registerView: (
    key: string,
    element: HTMLElement,
    initialFocus: TransitionPanelInitialFocus
  ) => () => void;
};

const TransitionPanelContext =
  React.createContext<TransitionPanelContextValue | null>(null);

function supportsDiscreteDisplayExit() {
  if (typeof navigator === "undefined") return true;

  // Firefox currently applies display:none immediately on exit even when it
  // parses transition-behavior: allow-discrete.
  return !/firefox/i.test(navigator.userAgent);
}

function useCssExitSupported() {
  return React.useSyncExternalStore(
    () => () => {},
    supportsDiscreteDisplayExit,
    () => true
  );
}

type HeightAnimationState = {
  animation: Animation | null;
  target: number | null;
};

function useAnimatedHeight(
  onResize?: (height: number, outer: HTMLElement) => void
) {
  const outerRef = React.useRef<HTMLDivElement>(null);
  const observerRef = React.useRef<ResizeObserver | null>(null);
  const previousHeight = React.useRef(0);
  const onResizeRef = React.useRef(onResize);

  React.useEffect(() => {
    onResizeRef.current = onResize;
  }, [onResize]);

  const innerRef = React.useCallback((node: HTMLDivElement | null) => {
    observerRef.current?.disconnect();
    observerRef.current = null;

    if (!node) return;

    const observer = new ResizeObserver((entries) => {
      const outer = outerRef.current;
      if (!outer) return;

      const entry = entries[0];
      const boxSize = Array.isArray(entry.borderBoxSize)
        ? entry.borderBoxSize[0]
        : entry.borderBoxSize;
      const height = boxSize?.blockSize ?? entry.target.clientHeight;

      if (height <= 0) return;

      const difference = Math.abs(height - previousHeight.current);
      previousHeight.current = height;
      const fadeDuration = Math.min(Math.max(difference / 500, 0.15), 0.27);

      outer.style.height = `${height}px`;
      outer.style.setProperty("--fade-duration", `${fadeDuration}s`);
      onResizeRef.current?.(height, outer);
    });

    observer.observe(node);
    observerRef.current = observer;
  }, []);

  React.useEffect(() => {
    return () => observerRef.current?.disconnect();
  }, []);

  return { outerRef, innerRef };
}

function animateHeight(
  outer: HTMLElement,
  to: number,
  state: HeightAnimationState
) {
  const from = outer.offsetHeight;
  if (from === to) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const styles = getComputedStyle(outer);
  const duration =
    parseCssTime(styles.getPropertyValue("--tp-duration")) ?? 240;
  const easing =
    styles.getPropertyValue("--tp-ease").trim() ||
    "cubic-bezier(0.32, 0.72, 0, 1)";

  state.animation?.cancel();
  state.target = to;
  state.animation = outer.animate(
    { height: [`${from}px`, `${to}px`] },
    { duration, easing }
  );
}

function parseCssTime(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return null;

  const parsed = Number.parseFloat(trimmed);
  if (!Number.isFinite(parsed)) return null;
  if (trimmed.endsWith("ms")) return parsed;
  if (trimmed.endsWith("s")) return parsed * 1000;
  return parsed;
}

function TransitionPanel({
  activeKey,
  transition = "slide",
  render,
  className,
  style,
  children,
  ...props
}: TransitionPanelProps) {
  const heightState = React.useRef<HeightAnimationState>({
    animation: null,
    target: null,
  });

  const handleContentResize = React.useCallback(
    (height: number, outer: HTMLElement) => {
      const state = heightState.current;
      if (state.animation?.playState !== "running") return;
      if (state.target !== null && Math.abs(state.target - height) < 1) return;

      animateHeight(outer, Math.round(height), state);
    },
    []
  );

  const { outerRef, innerRef } = useAnimatedHeight(handleContentResize);
  const innerDivRef = React.useRef<HTMLDivElement | null>(null);
  const setInnerRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      innerDivRef.current = node;
      innerRef(node);
    },
    [innerRef]
  );

  const viewsRef = React.useRef<Map<string, ViewEntry>>(new Map());
  const [orderedKeys, setOrderedKeys] = React.useState<string[]>([]);

  const registerView = React.useCallback<
    TransitionPanelContextValue["registerView"]
  >((key, element, initialFocus) => {
    const inner = innerDivRef.current;

    if (inner) {
      const next = new Map<string, ViewEntry>();
      const wrappers = Array.from(
        inner.querySelectorAll<HTMLElement>("[data-viewkey]")
      );

      for (const wrapper of wrappers) {
        const wrapperKey = wrapper.dataset.viewkey;
        if (!wrapperKey) continue;

        if (wrapperKey === key) {
          next.set(wrapperKey, { element, initialFocus });
        } else {
          const existing = viewsRef.current.get(wrapperKey);
          if (existing) next.set(wrapperKey, existing);
        }
      }

      viewsRef.current = next;
    } else {
      viewsRef.current.set(key, { element, initialFocus });
    }

    setOrderedKeys(Array.from(viewsRef.current.keys()));

    return () => {
      viewsRef.current.delete(key);
      setOrderedKeys((current) => current.filter((item) => item !== key));
    };
  }, []);

  const [previousKey, setPreviousKey] = React.useState(activeKey);
  const [renderedKey, setRenderedKey] = React.useState(activeKey);

  if (activeKey !== renderedKey) {
    setPreviousKey(renderedKey);
    setRenderedKey(activeKey);
  }

  const hasSwappedRef = React.useRef(false);
  React.useLayoutEffect(() => {
    if (!hasSwappedRef.current) {
      hasSwappedRef.current = true;
      return;
    }

    const outer = outerRef.current;
    const inner = innerDivRef.current;
    if (!outer || !inner) return;

    animateHeight(outer, inner.offsetHeight, heightState.current);
  }, [outerRef, renderedKey]);

  const currentIndex = orderedKeys.indexOf(activeKey);
  const previousIndex = orderedKeys.indexOf(previousKey);
  const direction = currentIndex >= previousIndex ? 1 : -1;
  const hasActivated = activeKey !== previousKey;

  if (process.env.NODE_ENV !== "production") {
    if (orderedKeys.length > 0 && !orderedKeys.includes(activeKey)) {
      console.warn(
        `[TransitionPanel] activeKey="${activeKey}" doesn't match any ` +
          `registered TransitionPanelView viewKey. Registered: ${orderedKeys.join(", ")}.`
      );
    }
  }

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const hasMountedRef = React.useRef(false);
  React.useLayoutEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    const entry = viewsRef.current.get(activeKey);
    if (!entry || entry.initialFocus === false) return;

    const target =
      entry.initialFocus === true
        ? entry.element.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)
        : entry.initialFocus.current;

    target?.focus({ preventScroll: true });
  }, [activeKey]);

  const enterFrom = direction === 1 ? SLIDE_DISTANCE : `-${SLIDE_DISTANCE}`;
  const exitTo = direction === 1 ? `-${SLIDE_DISTANCE}` : SLIDE_DISTANCE;
  const activationDirection: "left" | "right" | "none" = !hasActivated
    ? "none"
    : direction === 1
      ? "right"
      : "left";

  const defaultProps = {
    "data-slot": "transition-panel",
    "data-transition": transition,
    "data-activation-direction": activationDirection,
    style: {
      "--tp-duration": "240ms",
      "--tp-fade-duration": "var(--fade-duration, var(--tp-duration))",
      "--tp-ease": "cubic-bezier(0.32, 0.72, 0, 1)",
      "--tp-fade-ease": "cubic-bezier(0.26, 0.08, 0.25, 1)",
      "--tp-clip-margin": "0px",
      ...style,
    } as React.CSSProperties,
    className: cn(
      "overflow-clip contain-layout [overflow-clip-margin:var(--tp-clip-margin)]",
      "motion-reduce:transition-none",
      className
    ),
    children: (
      <div ref={setInnerRef} className="grid grid-cols-[minmax(0,1fr)]">
        <TransitionPanelContext.Provider
          value={{
            activeKey,
            transition,
            enterFrom,
            exitTo,
            mounted,
            registerView,
          }}
        >
          {children}
        </TransitionPanelContext.Provider>
      </div>
    ),
  };

  return useRender({
    defaultTagName: "div",
    render,
    ref: outerRef,
    props: mergeProps<"div">(defaultProps, props),
  });
}

TransitionPanel.displayName = "TransitionPanel";

function TransitionPanelView({
  viewKey,
  initialFocus = true,
  render,
  className,
  style,
  children,
  ...props
}: TransitionPanelViewProps) {
  const context = React.useContext(TransitionPanelContext);
  if (!context) {
    throw new Error(
      "TransitionPanelView must be rendered inside a TransitionPanel."
    );
  }

  const { activeKey, transition, enterFrom, exitTo, mounted, registerView } =
    context;
  const isActive = viewKey === activeKey;
  const isFade = transition === "fade";
  const cssExit = useCssExitSupported();
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);

  React.useLayoutEffect(() => {
    const element = wrapperRef.current;
    if (!element) return;

    return registerView(viewKey, element, initialFocus);
  }, [initialFocus, registerView, viewKey]);

  const [hidden, setHidden] = React.useState(!isActive);
  if (isActive && hidden) {
    setHidden(false);
  }

  React.useEffect(() => {
    if (cssExit) return;

    if (isActive) {
      return;
    }

    if (hidden) return;
    const element = wrapperRef.current;
    if (!element || typeof element.getAnimations !== "function") {
      setHidden(true);
      return;
    }

    let cancelled = false;
    const waitForExit = () => {
      Promise.all(
        element.getAnimations().map((animation) => animation.finished)
      )
        .then(() => {
          if (!cancelled) setHidden(true);
        })
        .catch(() => {
          if (cancelled) return;
          if (element.getAnimations().length > 0) waitForExit();
          else setHidden(true);
        });
    };

    const frame = requestAnimationFrame(waitForExit);
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [cssExit, hidden, isActive]);

  const defaultProps = {
    "aria-hidden": !isActive,
    inert: !isActive,
    "data-slot": "transition-panel-view",
    "data-active": isActive ? "" : undefined,
    "data-viewkey": viewKey,
    style: {
      ...style,
      "--tp-enter": enterFrom,
      "--tp-exit": exitTo,
    } as React.CSSProperties,
    className: cn(
      "[grid-area:1/1]",
      isFade
        ? cssExit
          ? "transition-[opacity,scale,display]"
          : "transition-[opacity,scale]"
        : cssExit
          ? "transition-[opacity,translate,display]"
          : "transition-[opacity,translate]",
      isFade
        ? "duration-(--tp-fade-duration) ease-(--tp-fade-ease)"
        : "duration-(--tp-duration) ease-(--tp-ease)",
      cssExit && "transition-discrete",
      "motion-reduce:transition-none",
      mounted && "starting:opacity-0",
      mounted &&
        (isFade
          ? "starting:scale-[0.96]"
          : "starting:[translate:var(--tp-enter)_0]"),
      isActive
        ? isFade
          ? "scale-100 opacity-100"
          : "[translate:0_0] opacity-100"
        : cn(
            "pointer-events-none opacity-0 contain-[size]",
            isFade ? "scale-[0.96]" : "[translate:var(--tp-exit)_0]",
            (cssExit || hidden) && "hidden"
          ),
      className
    ),
    children,
  };

  return useRender({
    defaultTagName: "div",
    render,
    ref: wrapperRef,
    props: mergeProps<"div">(defaultProps, props),
  });
}

TransitionPanelView.displayName = "TransitionPanelView";

export { TransitionPanel, TransitionPanelView };
export type {
  TransitionPanelInitialFocus,
  TransitionPanelProps,
  TransitionPanelViewProps,
};
