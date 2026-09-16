"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "cn";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  EllipsisIcon,
  XIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "lucide-react";
import { animate, useReducedMotion } from "motion/react";
import * as React from "react";
import { flushSync } from "react-dom";

import { Button, type ButtonProps } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea, ScrollAreaContent } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";

const LIGHTBOX_STYLES = String.raw`
  :where([data-slot="lightbox-viewport"]) {
    overscroll-behavior: contain;
  }

  :where([data-slot="lightbox-slides"]) {
    touch-action: none;
    -webkit-user-select: none;
    user-select: none;
  }

  :where([data-slot="lightbox-slide"]) {
    transform-origin: center;
    will-change: transform, opacity;
    backface-visibility: hidden;
    contain: layout paint;
  }

  :where([data-slot="lightbox-zoom"]) {
    transform-origin: center;
    will-change: transform;
    backface-visibility: hidden;
  }

  :where([data-slot="lightbox-zoom"][data-zoomable="true"]:not([data-zoomed="true"])) {
    cursor: zoom-in;
  }

  :where([data-slot="lightbox-zoom"][data-zoomed="true"]) {
    cursor: grab;
  }

  :where([data-slot="lightbox-zoom"][data-zoomed="true"][data-dragging="true"]) {
    cursor: grabbing;
  }

  :where([data-slot="lightbox-slide"][aria-hidden="true"]) {
    pointer-events: none;
  }

  :where([data-slot="lightbox-thumbnails"]) {
    overscroll-behavior-inline: contain;
    scrollbar-width: thin;
  }

  html.lightbox-morph-opening [data-slot="lightbox-content"] {
    scale: 1 !important;
    transition-property: opacity !important;
  }

  @media (prefers-reduced-motion: reduce) {
    :where([data-slot="lightbox-slide"]) {
      transition: none !important;
      animation: none !important;
    }

  }

  @media (forced-colors: active) {
    :where([data-slot="lightbox-toolbar"] button:focus-visible),
    :where([data-slot="lightbox-viewport"] button:focus-visible),
    :where([data-slot="lightbox-thumbnails"] button:focus-visible) {
      outline: 2px solid CanvasText;
      outline-offset: 2px;
    }
  }
`;
const EMPTY_CAPTIONS_TRACK = "data:text/vtt;charset=utf-8,WEBVTT%0A%0A";
const interactiveSelector =
  "a,button,input,select,textarea,summary,video,audio,iframe,[contenteditable=true],[role=button],[role=link],[data-lightbox-gesture-ignore]";

type LightboxOverlay = "blur" | "brightness";
type LightboxDirection = "ltr" | "rtl";
type LightboxChangeReason =
  | "trigger-press"
  | "previous-press"
  | "next-press"
  | "thumbnail-press"
  | "swipe"
  | "keyboard"
  | "programmatic"
  | "items-change";

type LightboxImageItem = {
  id?: string;
  type: "image";
  src: string;
  alt: string;
  width?: number;
  height?: number;
  srcSet?: string;
  sizes?: string;
  thumbnail?: React.ReactNode;
  thumbnailSrc?: string;
  caption?: React.ReactNode;
  className?: string;
  download?: boolean | { src?: string; filename?: string };
  zoomable?: boolean;
};

type LightboxVideoItem = {
  id?: string;
  type: "video";
  src: string;
  label: string;
  thumbnail?: React.ReactNode;
  poster?: string;
  width?: number;
  height?: number;
  sources?: React.SourceHTMLAttributes<HTMLSourceElement>[];
  tracks?: React.TrackHTMLAttributes<HTMLTrackElement>[];
  videoProps?: Omit<
    React.VideoHTMLAttributes<HTMLVideoElement>,
    "children" | "className" | "height" | "poster" | "src" | "width"
  >;
  caption?: React.ReactNode;
  className?: string;
  download?: boolean | { src?: string; filename?: string };
  zoomable?: boolean;
};

type LightboxItem = LightboxImageItem | LightboxVideoItem;

type LightboxImageChangeEventDetails = {
  reason: LightboxChangeReason;
  event?: Event;
  previousIndex: number;
};

type LightboxOpenEventDetails = {
  reason: DialogPrimitive.Root.ChangeEventReason;
  event?: Event;
  index: number;
  item?: LightboxItem;
};

type LightboxControlContext = {
  item?: LightboxItem;
  index: number;
  event: React.MouseEvent<HTMLElement>;
  actions: LightboxActions;
};

type LightboxControl = {
  id: string;
  icon: React.ReactNode;
  label: string;
  disabled?: boolean;
  onClick: (context: LightboxControlContext) => void;
};

type LightboxActions = {
  open: (index?: number) => void;
  close: () => void;
  goTo: (index: number) => void;
  next: () => void;
  previous: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
};

type LightboxProps = {
  children?: React.ReactNode;
  items?: LightboxItem[];
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: DialogPrimitive.Root.Props["onOpenChange"];
  onOpenChangeComplete?: DialogPrimitive.Root.Props["onOpenChangeComplete"];
  onOpen?: (details: LightboxOpenEventDetails) => void;
  onClose?: (details: LightboxOpenEventDetails) => void;
  index?: number;
  defaultIndex?: number;
  onChangeImage?: (
    index: number,
    item: LightboxItem,
    details: LightboxImageChangeEventDetails
  ) => void;
  overlay?: "blur" | "brightness";
  loop?: boolean;
  noCounter?: boolean;
  noCarousel?: boolean;
  noControls?: boolean;
  loading?: "lazy" | "eager";
  preload?: number;
  maxZoom?: number;
  controls?: LightboxControl[];
  dir?: "ltr" | "rtl";
  className?: string;
  actionsRef?: React.Ref<LightboxActions>;
} & Omit<
  DialogPrimitive.Root.Props,
  | "children"
  | "modal"
  | "onOpenChange"
  | "onOpenChangeComplete"
  | "open"
  | "defaultOpen"
  | "actionsRef"
>;

type LightboxBackdropStyle = DialogPrimitive.Backdrop.Props["style"];
type LightboxBackdropStyleObject = React.CSSProperties & {
  "--lightbox-backdrop-opacity": number;
};

function mergeLightboxBackdropStyle(
  baseStyle: LightboxBackdropStyleObject,
  style: LightboxBackdropStyle
): LightboxBackdropStyle {
  if (typeof style === "function") {
    return (state: DialogPrimitive.Backdrop.State) => {
      return {
        ...baseStyle,
        ...style(state),
      };
    };
  }

  return { ...baseStyle, ...style };
}

type LightboxContentStyle = DialogPrimitive.Popup.Props["style"];
type LightboxContentStyleObject = React.CSSProperties & {
  "--lightbox-header-inset": string;
};

function mergeLightboxContentStyle(
  baseStyle: LightboxContentStyleObject,
  style: LightboxContentStyle
): LightboxContentStyle {
  if (typeof style === "function") {
    return (state: DialogPrimitive.Popup.State) => {
      return {
        ...baseStyle,
        ...style(state),
      };
    };
  }

  return { ...baseStyle, ...style };
}

type TransformState = {
  scale: number;
  panX: number;
  panY: number;
  swipeX: number;
  dismissY: number;
  dragging: boolean;
};

const initialTransform: TransformState = {
  scale: 1,
  panX: 0,
  panY: 0,
  swipeX: 0,
  dismissY: 0,
  dragging: false,
};

type RegisteredSource = {
  element: HTMLElement;
  morph: boolean;
};

type LightboxContextValue = {
  activeIndex: number;
  activeItem?: LightboxItem;
  actions: LightboxActions;
  animateZoom: (
    target: Pick<TransformState, "scale" | "panX" | "panY">
  ) => void;
  changeIndex: (
    index: number,
    reason: LightboxChangeReason,
    event?: Event
  ) => void;
  closeWithDetails: (details: DialogPrimitive.Root.ChangeEventDetails) => void;
  controls: LightboxControl[];
  direction: LightboxDirection;
  getSource: (index: number) => RegisteredSource | undefined;
  items: LightboxItem[];
  loadedAssets: ReadonlySet<string>;
  loading: "lazy" | "eager";
  loop: boolean;
  markAssetLoaded: (key: string) => void;
  maxZoom: number;
  noCarousel: boolean;
  noControls: boolean;
  noCounter: boolean;
  open: boolean;
  overlay: LightboxOverlay;
  preload: number;
  registerMedia: (element: HTMLElement | null) => void;
  registerSource: (index: number, source: RegisteredSource | null) => void;
  requestOpen: (
    index: number,
    source?: RegisteredSource,
    event?: Event
  ) => void;
  setTransform: React.Dispatch<React.SetStateAction<TransformState>>;
  shouldReduceMotion: boolean;
  stopZoomAnimation: () => void;
  transform: TransformState;
};

const LightboxContext = React.createContext<LightboxContextValue | null>(null);

function useLightbox() {
  const context = React.useContext(LightboxContext);
  if (!context) {
    throw new Error("Lightbox parts must be rendered inside <Lightbox>.");
  }
  return context;
}

function getMediaLoadKey(item: LightboxItem) {
  return `media:${item.type}:${item.src}`;
}

function getThumbnailLoadKey(item: LightboxItem) {
  const source =
    item.type === "image"
      ? (item.thumbnailSrc ?? item.src)
      : (item.poster ?? item.src);
  return `thumbnail:${item.type}:${source}`;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function normalizeIndex(index: number, length: number, loop: boolean) {
  if (length === 0) return 0;
  if (loop) return ((index % length) + length) % length;
  return clamp(index, 0, length - 1);
}

function getItemLabel(item: LightboxItem | undefined, index: number) {
  if (!item) return `Media ${index + 1}`;
  return item.type === "image" ? item.alt || `Image ${index + 1}` : item.label;
}

function isElementVisible(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  return (
    rect.width > 0 &&
    rect.height > 0 &&
    rect.bottom > 0 &&
    rect.right > 0 &&
    rect.top < window.innerHeight &&
    rect.left < window.innerWidth
  );
}

function getMorphTarget(element: HTMLElement | null) {
  if (!element) return null;
  if (element.matches("[data-lightbox-morph-target]")) return element;
  const explicitTarget = element.querySelector<HTMLElement>(
    "[data-lightbox-morph-target]"
  );
  if (explicitTarget) return explicitTarget;
  if (element.matches("img,video,canvas")) return element;
  return element.querySelector<HTMLElement>("img,video,canvas") ?? element;
}

function isStandaloneImage(image: HTMLImageElement, gallery: HTMLElement) {
  const interactiveAncestor = image.parentElement?.closest(interactiveSelector);
  return !interactiveAncestor || interactiveAncestor === gallery;
}

function imageToItem(image: HTMLImageElement): LightboxImageItem {
  const figure = image.closest("figure");
  const caption =
    image.dataset.lightboxCaption ??
    figure?.querySelector(":scope > figcaption")?.textContent?.trim() ??
    undefined;

  return {
    id: image.id || undefined,
    type: "image",
    src: image.currentSrc || image.src,
    alt: image.alt,
    width: image.naturalWidth || undefined,
    height: image.naturalHeight || undefined,
    srcSet: image.srcset || undefined,
    sizes: image.sizes || undefined,
    thumbnailSrc: image.currentSrc || image.src,
    caption,
  };
}

function hasCustomContent(children: React.ReactNode) {
  return React.Children.toArray(children).some(
    (child) =>
      React.isValidElement(child) &&
      (child.type as { __lightboxContent?: boolean }).__lightboxContent === true
  );
}

function getEventDetails(
  reason: DialogPrimitive.Root.ChangeEventReason,
  event?: Event,
  trigger?: Element | null
) {
  return { reason, event, trigger } as DialogPrimitive.Root.ChangeEventDetails;
}

function Lightbox({
  children,
  items: itemsProp,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  onOpenChangeComplete,
  onOpen,
  onClose,
  index: indexProp,
  defaultIndex = 0,
  onChangeImage,
  overlay = "blur",
  loop = true,
  noCounter = false,
  noCarousel = false,
  noControls = false,
  loading = "eager",
  preload = 1,
  maxZoom = 4,
  controls = [],
  dir,
  className,
  actionsRef,
  ...rootProps
}: LightboxProps) {
  const galleryRef = React.useRef<HTMLDivElement | null>(null);
  const mediaRef = React.useRef<HTMLElement | null>(null);
  const sourceMapRef = React.useRef(new Map<number, RegisteredSource>());
  const annotatedImagesRef = React.useRef(
    new Map<HTMLImageElement, Record<string, string | null>>()
  );
  const openingCleanupRef = React.useRef<(() => void) | null>(null);
  const zoomAnimationRef = React.useRef<ReturnType<typeof animate> | null>(
    null
  );
  const transformRef = React.useRef(initialTransform);
  const [autoItems, setAutoItems] = React.useState<LightboxItem[]>([]);
  const [loadedAssets, setLoadedAssets] = React.useState<ReadonlySet<string>>(
    () => new Set()
  );
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const [uncontrolledIndex, setUncontrolledIndex] =
    React.useState(defaultIndex);
  const [transform, setTransform] = React.useState(initialTransform);
  React.useLayoutEffect(() => {
    transformRef.current = transform;
  }, [transform]);
  const [inheritedDirection, setInheritedDirection] =
    React.useState<LightboxDirection>(() =>
      typeof document !== "undefined" && document.documentElement.dir === "rtl"
        ? "rtl"
        : "ltr"
    );
  const shouldReduceMotion = Boolean(useReducedMotion());
  const isOpenControlled = openProp !== undefined;
  const isIndexControlled = indexProp !== undefined;
  const open = openProp ?? uncontrolledOpen;
  const items = itemsProp ?? autoItems;
  const activeIndex = normalizeIndex(
    indexProp ?? uncontrolledIndex,
    items.length,
    loop
  );
  const activeItem = items[activeIndex];
  const direction = dir ?? inheritedDirection;

  const markAssetLoaded = React.useCallback((key: string) => {
    setLoadedAssets((current) => {
      if (current.has(key)) return current;
      const next = new Set(current);
      next.add(key);
      return next;
    });
  }, []);

  React.useLayoutEffect(() => {
    transformRef.current = transform;
  }, [transform]);

  const stopZoomAnimation = React.useCallback(() => {
    zoomAnimationRef.current?.stop();
    zoomAnimationRef.current = null;
  }, []);

  const animateZoom = React.useCallback(
    (target: Pick<TransformState, "scale" | "panX" | "panY">) => {
      stopZoomAnimation();
      const start = transformRef.current;
      const end = {
        scale: clamp(target.scale, 1, maxZoom),
        panX: target.panX,
        panY: target.panY,
      };
      const update = (progress: number) => {
        const current = transformRef.current;
        const next = {
          ...current,
          scale: start.scale + (end.scale - start.scale) * progress,
          panX: start.panX + (end.panX - start.panX) * progress,
          panY: start.panY + (end.panY - start.panY) * progress,
          swipeX: 0,
          dismissY: 0,
        };
        transformRef.current = next;
        setTransform(next);
      };

      if (shouldReduceMotion) {
        update(1);
        return;
      }

      zoomAnimationRef.current = animate(0, 1, {
        duration: 0.22,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: update,
        onComplete: () => {
          zoomAnimationRef.current = null;
        },
      });
    },
    [maxZoom, shouldReduceMotion, stopZoomAnimation]
  );

  React.useEffect(
    () => () => {
      openingCleanupRef.current?.();
      stopZoomAnimation();
    },
    [stopZoomAnimation]
  );
  const handleGalleryRef = React.useCallback(
    (element: HTMLDivElement | null) => {
      galleryRef.current = element;
      if (!dir && element) {
        setInheritedDirection(
          window.getComputedStyle(element).direction as LightboxDirection
        );
      }
    },
    [dir]
  );

  const restoreAnnotations = React.useCallback(() => {
    for (const [image, previous] of annotatedImagesRef.current) {
      for (const [name, value] of Object.entries(previous)) {
        if (value == null) image.removeAttribute(name);
        else image.setAttribute(name, value);
      }
    }
    annotatedImagesRef.current.clear();
  }, []);

  const scanImages = React.useCallback(() => {
    const gallery = galleryRef.current;
    if (!gallery || itemsProp) return { foundItems: [], sources: [] };

    restoreAnnotations();
    const images = Array.from(gallery.querySelectorAll("img")).filter((image) =>
      isStandaloneImage(image, gallery)
    );

    images.forEach((image, index) => {
      annotatedImagesRef.current.set(image, {
        role: image.getAttribute("role"),
        tabindex: image.getAttribute("tabindex"),
        "aria-haspopup": image.getAttribute("aria-haspopup"),
        "aria-label": image.getAttribute("aria-label"),
        "data-lightbox-source": image.getAttribute("data-lightbox-source"),
      });
      image.setAttribute("role", "button");
      image.setAttribute("tabindex", "0");
      image.setAttribute("aria-haspopup", "dialog");
      image.setAttribute(
        "aria-label",
        image.getAttribute("aria-label") ??
          `Open ${image.alt || `image ${index + 1}`} in lightbox`
      );
      image.setAttribute("data-lightbox-source", "");

      if (!image.hasAttribute("alt")) {
        console.debug(
          "Lightbox auto-discovered an <img> without an alt attribute."
        );
      }
    });

    return { foundItems: images.map(imageToItem), sources: images };
  }, [itemsProp, restoreAnnotations]);

  React.useEffect(() => {
    if (itemsProp) {
      restoreAnnotations();
      return;
    }

    const gallery = galleryRef.current;
    if (!gallery) return;

    const refresh = () => {
      if (open && autoItems.length > 0) return;
      const { foundItems, sources } = scanImages();
      sourceMapRef.current.clear();
      sources.forEach((element, index) => {
        sourceMapRef.current.set(index, { element, morph: true });
      });
      setAutoItems(foundItems);
    };

    refresh();
    const observer = new MutationObserver(refresh);
    observer.observe(gallery, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["src", "srcset", "sizes", "alt", "class"],
    });
    return () => {
      observer.disconnect();
      restoreAnnotations();
    };
  }, [autoItems.length, itemsProp, open, restoreAnnotations, scanImages]);

  const changeIndex = React.useCallback(
    (nextIndex: number, reason: LightboxChangeReason, event?: Event) => {
      if (noCarousel || items.length === 0) return;
      const normalized = normalizeIndex(nextIndex, items.length, loop);
      if (normalized === activeIndex) return;
      stopZoomAnimation();
      if (!isIndexControlled) setUncontrolledIndex(normalized);
      setTransform(initialTransform);
      onChangeImage?.(normalized, items[normalized], {
        reason,
        event,
        previousIndex: activeIndex,
      });
    },
    [
      activeIndex,
      isIndexControlled,
      items,
      loop,
      noCarousel,
      onChangeImage,
      stopZoomAnimation,
    ]
  );

  const commitOpenChange = React.useCallback(
    (
      nextOpen: boolean,
      details: DialogPrimitive.Root.ChangeEventDetails,
      lifecycleIndex = activeIndex,
      lifecycleItem = activeItem
    ) => {
      if (!isOpenControlled) setUncontrolledOpen(nextOpen);
      onOpenChange?.(nextOpen, details);
      const lifecycleDetails: LightboxOpenEventDetails = {
        reason: details.reason,
        event: "event" in details ? details.event : undefined,
        index: lifecycleIndex,
        item: lifecycleItem,
      };
      if (nextOpen) onOpen?.(lifecycleDetails);
      else onClose?.(lifecycleDetails);
    },
    [activeIndex, activeItem, isOpenControlled, onClose, onOpen, onOpenChange]
  );

  const runOpenChange = React.useCallback(
    (
      nextOpen: boolean,
      details: DialogPrimitive.Root.ChangeEventDetails,
      source?: RegisteredSource,
      lifecycleIndex = activeIndex,
      lifecycleItem = activeItem
    ) => {
      openingCleanupRef.current?.();
      openingCleanupRef.current = null;
      stopZoomAnimation();

      if (!nextOpen) {
        commitOpenChange(false, details, lifecycleIndex, lifecycleItem);
        return;
      }

      const from = source?.element;
      const canMorph = Boolean(
        source?.morph &&
        from?.isConnected &&
        isElementVisible(from) &&
        !shouldReduceMotion
      );
      const root = document.documentElement;
      if (canMorph) root.classList.add("lightbox-morph-opening");
      const fromRect = canMorph ? from?.getBoundingClientRect() : undefined;
      const fromRadius = canMorph
        ? getComputedStyle(from as HTMLElement).borderRadius
        : "";

      flushSync(() => {
        setTransform(initialTransform);
        commitOpenChange(true, details, lifecycleIndex, lifecycleItem);
      });

      if (!canMorph || !fromRect) return;
      const destination = getMorphTarget(mediaRef.current);
      if (!destination || !isElementVisible(destination)) {
        root.classList.remove("lightbox-morph-opening");
        return;
      }

      const toRect = destination.getBoundingClientRect();
      if (toRect.width <= 0 || toRect.height <= 0) {
        root.classList.remove("lightbox-morph-opening");
        return;
      }

      const scale = Math.max(
        fromRect.width / toRect.width,
        fromRect.height / toRect.height
      );
      const translateX =
        fromRect.left + fromRect.width / 2 - (toRect.left + toRect.width / 2);
      const translateY =
        fromRect.top + fromRect.height / 2 - (toRect.top + toRect.height / 2);
      const previous = {
        borderRadius: destination.style.borderRadius,
        opacity: destination.style.opacity,
        transform: destination.style.transform,
        transition: destination.style.transition,
        transformOrigin: destination.style.transformOrigin,
        willChange: destination.style.willChange,
      };
      let firstFrame = 0;
      let secondFrame = 0;
      let finishTimer = 0;
      let finished = false;

      const cleanup = () => {
        if (finished) return;
        finished = true;
        window.cancelAnimationFrame(firstFrame);
        window.cancelAnimationFrame(secondFrame);
        window.clearTimeout(finishTimer);
        destination.removeEventListener("transitionend", handleTransitionEnd);
        Object.assign(destination.style, previous);
        root.classList.remove("lightbox-morph-opening");
        if (openingCleanupRef.current === cleanup) {
          openingCleanupRef.current = null;
        }
      };
      const handleTransitionEnd = (event: TransitionEvent) => {
        if (
          event.target === destination &&
          event.propertyName === "transform"
        ) {
          cleanup();
        }
      };

      Object.assign(destination.style, {
        borderRadius: fromRadius,
        opacity: "0.2",
        transform:
          `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale}) ${previous.transform}`.trim(),
        transformOrigin: "center",
        transition: "none",
        willChange: "transform, opacity",
      });
      destination.addEventListener("transitionend", handleTransitionEnd);
      openingCleanupRef.current = cleanup;
      firstFrame = window.requestAnimationFrame(() => {
        secondFrame = window.requestAnimationFrame(() => {
          destination.style.transition =
            "transform 260ms cubic-bezier(0.22, 1, 0.36, 1), opacity 220ms ease-out, border-radius 260ms cubic-bezier(0.22, 1, 0.36, 1)";
          destination.style.transform = previous.transform;
          destination.style.opacity = previous.opacity;
          destination.style.borderRadius = previous.borderRadius;
          finishTimer = window.setTimeout(cleanup, 320);
        });
      });
    },
    [
      activeIndex,
      activeItem,
      commitOpenChange,
      shouldReduceMotion,
      stopZoomAnimation,
    ]
  );

  const closeWithDetails = React.useCallback(
    (details: DialogPrimitive.Root.ChangeEventDetails) => {
      runOpenChange(false, details, sourceMapRef.current.get(activeIndex));
    },
    [activeIndex, runOpenChange]
  );

  const requestOpen = React.useCallback(
    (nextIndex: number, source?: RegisteredSource, event?: Event) => {
      let nextItems = items;
      let nextSources: HTMLElement[] = [];
      if (!itemsProp) {
        const scan = scanImages();
        nextItems = scan.foundItems;
        nextSources = scan.sources;
        sourceMapRef.current.clear();
        nextSources.forEach((element, sourceIndex) => {
          sourceMapRef.current.set(sourceIndex, { element, morph: true });
        });
        flushSync(() => setAutoItems(nextItems));
      }
      if (nextItems.length === 0) return;
      const normalized = normalizeIndex(nextIndex, nextItems.length, loop);
      if (!isIndexControlled) flushSync(() => setUncontrolledIndex(normalized));
      if (normalized !== activeIndex) {
        onChangeImage?.(normalized, nextItems[normalized], {
          reason: "trigger-press",
          event,
          previousIndex: activeIndex,
        });
      }
      if (source) sourceMapRef.current.set(normalized, source);
      const details = getEventDetails(
        "trigger-press",
        event,
        source?.element ?? nextSources[normalized]
      );
      runOpenChange(
        true,
        details,
        source ?? sourceMapRef.current.get(normalized),
        normalized,
        nextItems[normalized]
      );
    },
    [
      activeIndex,
      isIndexControlled,
      items,
      itemsProp,
      loop,
      onChangeImage,
      runOpenChange,
      scanImages,
    ]
  );

  const handleOpenChange = React.useCallback<
    NonNullable<DialogPrimitive.Root.Props["onOpenChange"]>
  >(
    (nextOpen, details) => {
      if (nextOpen) {
        runOpenChange(true, details, sourceMapRef.current.get(activeIndex));
      } else {
        closeWithDetails(details);
      }
    },
    [activeIndex, closeWithDetails, runOpenChange]
  );

  const handleOpenChangeComplete = React.useCallback<
    NonNullable<DialogPrimitive.Root.Props["onOpenChangeComplete"]>
  >(
    (nextOpen) => {
      if (!nextOpen && transformRef.current.dismissY === 0) {
        stopZoomAnimation();
        setTransform(initialTransform);
      }
      onOpenChangeComplete?.(nextOpen);
    },
    [onOpenChangeComplete, stopZoomAnimation]
  );

  const registerSource = React.useCallback(
    (sourceIndex: number, source: RegisteredSource | null) => {
      if (source) sourceMapRef.current.set(sourceIndex, source);
      else sourceMapRef.current.delete(sourceIndex);
    },
    []
  );
  const registerMedia = React.useCallback((element: HTMLElement | null) => {
    mediaRef.current = element;
  }, []);

  const activeZoomable =
    activeItem?.type === "image"
      ? activeItem.zoomable !== false
      : Boolean(activeItem?.zoomable);
  const actions = React.useMemo<LightboxActions>(() => {
    return {
      open: (nextIndex = activeIndex) => requestOpen(nextIndex),
      close: () =>
        closeWithDetails(getEventDetails("imperative-action", undefined, null)),
      goTo: (nextIndex) => changeIndex(nextIndex, "programmatic"),
      next: () => changeIndex(activeIndex + 1, "next-press"),
      previous: () => changeIndex(activeIndex - 1, "previous-press"),
      zoomIn: () => {
        if (!activeZoomable) return;
        const current = transformRef.current;
        animateZoom({
          scale: Math.min(maxZoom, current.scale < 2 ? 2 : current.scale + 1),
          panX: current.panX,
          panY: current.panY,
        });
      },
      zoomOut: () => {
        const current = transformRef.current;
        const scale = Math.max(1, current.scale - 1);
        const panRatio =
          current.scale > 1
            ? Math.max(0, (scale - 1) / (current.scale - 1))
            : 0;
        animateZoom({
          scale,
          panX: current.panX * panRatio,
          panY: current.panY * panRatio,
        });
      },
      resetZoom: () => animateZoom({ scale: 1, panX: 0, panY: 0 }),
    };
  }, [
    activeIndex,
    activeZoomable,
    animateZoom,
    changeIndex,
    closeWithDetails,
    maxZoom,
    requestOpen,
  ]);

  React.useImperativeHandle(actionsRef, () => actions, [actions]);

  const context = React.useMemo<LightboxContextValue>(() => {
    return {
      activeIndex,
      activeItem,
      actions,
      animateZoom,
      changeIndex,
      closeWithDetails,
      controls,
      direction,
      getSource: (sourceIndex) => sourceMapRef.current.get(sourceIndex),
      items,
      loadedAssets,
      loading,
      loop,
      markAssetLoaded,
      maxZoom,
      noCarousel,
      noControls,
      noCounter,
      open,
      overlay,
      preload: noCarousel ? 0 : Math.max(0, Math.floor(preload)),
      registerMedia,
      registerSource,
      requestOpen,
      setTransform,
      shouldReduceMotion,
      stopZoomAnimation,
      transform,
    };
  }, [
    activeIndex,
    activeItem,
    actions,
    animateZoom,
    changeIndex,
    closeWithDetails,
    controls,
    direction,
    items,
    loadedAssets,
    loading,
    loop,
    markAssetLoaded,
    maxZoom,
    noCarousel,
    noControls,
    noCounter,
    open,
    overlay,
    preload,
    registerMedia,
    registerSource,
    requestOpen,
    shouldReduceMotion,
    stopZoomAnimation,
    transform,
  ]);

  const handleGalleryClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.defaultPrevented || itemsProp) return;
    const gallery = galleryRef.current;
    const target = event.target;
    if (!gallery || !(target instanceof Element)) return;
    const image = target.closest("img");
    if (
      !image ||
      !gallery.contains(image) ||
      !isStandaloneImage(image, gallery)
    ) {
      return;
    }
    const sources = Array.from(gallery.querySelectorAll("img")).filter((item) =>
      isStandaloneImage(item, gallery)
    );
    const sourceIndex = sources.indexOf(image);
    if (sourceIndex < 0) return;
    requestOpen(
      sourceIndex,
      { element: image, morph: true },
      event.nativeEvent
    );
  };

  const handleGalleryKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (itemsProp || (event.key !== "Enter" && event.key !== " ")) return;
    const gallery = galleryRef.current;
    const target = event.target;
    if (!gallery || !(target instanceof HTMLImageElement)) return;
    if (!isStandaloneImage(target, gallery)) return;
    event.preventDefault();
    const sources = Array.from(gallery.querySelectorAll("img")).filter((item) =>
      isStandaloneImage(item, gallery)
    );
    const sourceIndex = sources.indexOf(target);
    if (sourceIndex < 0) return;
    requestOpen(
      sourceIndex,
      { element: target, morph: true },
      event.nativeEvent
    );
  };

  const customContent = hasCustomContent(children);

  return (
    <LightboxContext.Provider value={context}>
      <style data-slot="lightbox-styles">{LIGHTBOX_STYLES}</style>
      <DialogPrimitive.Root
        modal
        open={open}
        onOpenChange={handleOpenChange}
        onOpenChangeComplete={handleOpenChangeComplete}
        {...rootProps}
      >
        {itemsProp ? (
          children
        ) : (
          <div
            ref={handleGalleryRef}
            className={className}
            data-slot="lightbox-gallery"
            onClick={handleGalleryClick}
            onKeyDown={handleGalleryKeyDown}
          >
            {children}
          </div>
        )}
        {!customContent && <LightboxContent />}
      </DialogPrimitive.Root>
    </LightboxContext.Provider>
  );
}

type LightboxTriggerProps = {
  index?: number;
  morph?: boolean;
} & DialogPrimitive.Trigger.Props;

function LightboxTrigger({
  index = 0,
  morph,
  onClick,
  ref,
  ...props
}: LightboxTriggerProps) {
  const { registerSource, requestOpen } = useLightbox();
  const sourceRef = React.useRef<HTMLElement | null>(null);

  const mergedRef = React.useCallback(
    (element: HTMLButtonElement | null) => {
      sourceRef.current = element;
      if (element) {
        const inferredMorph =
          morph ??
          element.matches("img,video,canvas,picture,[data-lightbox-morph]");
        registerSource(index, { element, morph: inferredMorph });
      } else {
        registerSource(index, null);
      }

      if (typeof ref === "function") return ref(element);
      if (ref) ref.current = element;
    },
    [index, morph, ref, registerSource]
  );

  return (
    <DialogPrimitive.Trigger
      ref={mergedRef}
      data-slot="lightbox-trigger"
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        const element = sourceRef.current;
        if (!element) return;
        const inferredMorph =
          morph ??
          element.matches("img,video,canvas,picture,[data-lightbox-morph]");
        registerSource(index, { element, morph: inferredMorph });
        event.preventBaseUIHandler();
        requestOpen(
          index,
          { element, morph: inferredMorph },
          event.nativeEvent
        );
      }}
      {...props}
    />
  );
}

function LightboxBackdrop({
  className,
  style,
  ...props
}: DialogPrimitive.Backdrop.Props) {
  const { overlay, transform } = useLightbox();
  const opacity = clamp(
    1 -
      Math.abs(transform.dismissY) /
        Math.max(
          typeof window === "undefined" ? 1 : window.innerHeight || 1,
          1
        ),
    0,
    1
  );
  const backdropStyle = mergeLightboxBackdropStyle(
    { "--lightbox-backdrop-opacity": opacity },
    style
  );

  return (
    <DialogPrimitive.Backdrop
      data-slot="lightbox-backdrop"
      className={cn(
        "fixed inset-0 z-60 min-h-dvh opacity-[var(--lightbox-backdrop-opacity)] transition-[opacity,backdrop-filter] duration-200",
        overlay === "blur" && "bg-black/80 backdrop-blur-md",
        overlay === "brightness" && "bg-black/90",
        "data-starting-style:opacity-0 data-ending-style:opacity-0 data-ending-style:pointer-events-none motion-reduce:transition-opacity",
        className
      )}
      style={backdropStyle}
      {...props}
    />
  );
}

function LightboxViewport({
  className,
  ...props
}: DialogPrimitive.Viewport.Props) {
  return (
    <DialogPrimitive.Viewport
      data-slot="lightbox-viewport"
      className={cn(
        "fixed inset-0 z-70 flex min-h-dvh items-stretch overflow-hidden overscroll-contain data-ending-style:pointer-events-none",
        className
      )}
      {...props}
    />
  );
}

type LightboxContentProps = {} & DialogPrimitive.Popup.Props;

function LightboxContent({
  className,
  children,
  initialFocus,
  onKeyDown,
  style,
  ...props
}: LightboxContentProps) {
  const {
    activeIndex,
    activeItem,
    actions,
    changeIndex,
    direction,
    items,
    noCarousel,
    noControls,
    noCounter,
    setTransform,
    shouldReduceMotion,
    transform,
  } = useLightbox();
  const popupRef = React.useRef<HTMLDivElement | null>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(
      event as Parameters<
        NonNullable<DialogPrimitive.Popup.Props["onKeyDown"]>
      >[0]
    );
    if (event.defaultPrevented) return;
    const target = event.target as HTMLElement;
    if (target.matches("input,textarea,select,[contenteditable=true]")) return;

    const rtlMultiplier = direction === "rtl" ? -1 : 1;
    if (
      !noCarousel &&
      (event.key === "ArrowLeft" || event.key === "ArrowRight") &&
      event.shiftKey
    ) {
      event.preventDefault();
      const physical = event.key === "ArrowRight" ? 1 : -1;
      changeIndex(
        activeIndex + physical * rtlMultiplier,
        "keyboard",
        event.nativeEvent
      );
      return;
    }
    if (transform.scale > 1 && event.key.startsWith("Arrow")) {
      event.preventDefault();
      const amount = 40;
      const delta = {
        ArrowLeft: [amount, 0],
        ArrowRight: [-amount, 0],
        ArrowUp: [0, amount],
        ArrowDown: [0, -amount],
      }[event.key] as [number, number] | undefined;
      if (delta) {
        panBy(delta[0], delta[1]);
      }
      return;
    }
    if (
      !noCarousel &&
      transform.scale === 1 &&
      (event.key === "ArrowLeft" || event.key === "ArrowRight")
    ) {
      event.preventDefault();
      const physical = event.key === "ArrowRight" ? 1 : -1;
      changeIndex(
        activeIndex + physical * rtlMultiplier,
        "keyboard",
        event.nativeEvent
      );
      return;
    }
    if (event.key === "+" || event.key === "=") {
      event.preventDefault();
      actions.zoomIn();
    } else if (event.key === "-") {
      event.preventDefault();
      actions.zoomOut();
    } else if (event.key === "0") {
      event.preventDefault();
      actions.resetZoom();
    }
  };

  function panBy(deltaX: number, deltaY: number) {
    const media = popupRef.current?.querySelector<HTMLElement>(
      '[data-slot="lightbox-zoom"][data-active="true"]'
    );
    if (!media) return;
    const rect = media.getBoundingClientRect();
    const baseWidth = rect.width / transform.scale;
    const baseHeight = rect.height / transform.scale;
    const maxX = Math.max(
      0,
      (baseWidth * transform.scale - window.innerWidth) / 2
    );
    const maxY = Math.max(
      0,
      (baseHeight * transform.scale - window.innerHeight) / 2
    );
    setTransform((current) => {
      return {
        ...current,
        panX: clamp(current.panX + deltaX, -maxX, maxX),
        panY: clamp(current.panY + deltaY, -maxY, maxY),
      };
    });
  }

  return (
    <DialogPrimitive.Portal data-slot="lightbox-portal">
      <LightboxBackdrop />
      <LightboxViewport
        dir={direction}
        data-lightbox-motion={shouldReduceMotion ? "reduced" : "full"}
      >
        <DialogPrimitive.Popup
          ref={popupRef}
          data-slot="lightbox-content"
          aria-describedby={
            activeItem?.caption ? `lightbox-caption-${activeIndex}` : undefined
          }
          initialFocus={
            initialFocus ??
            (() =>
              popupRef.current?.querySelector<HTMLElement>(
                '[data-slot="lightbox-close"]'
              ) ?? popupRef.current)
          }
          className={cn(
            "relative flex size-full min-h-0 min-w-0 flex-col overflow-hidden bg-transparent text-white outline-none",
            "transition-[opacity,scale] duration-200 ease-out data-starting-style:scale-[0.98] data-starting-style:opacity-0 data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-ending-style:pointer-events-none",
            "motion-reduce:transition-opacity motion-reduce:transform-none",
            className
          )}
          style={mergeLightboxContentStyle(
            {
              "--lightbox-header-inset":
                "max(5rem, calc(env(safe-area-inset-top) + 4rem))",
            },
            style
          )}
          onKeyDown={handleKeyDown}
          {...props}
        >
          <DialogPrimitive.Title className="sr-only">
            Media viewer
          </DialogPrimitive.Title>
          {children ?? (
            <>
              {(!noCounter || !noControls) && (
                <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-start justify-between gap-4 p-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:p-4">
                  {!noCounter && <LightboxCounter />}
                  {!noControls && (
                    <LightboxToolbar className={cn(noCounter && "ms-auto")} />
                  )}
                </div>
              )}
              <LightboxSlides />
              {!noCarousel && items.length > 1 && (
                <>
                  <LightboxPrevious />
                  <LightboxNext />
                </>
              )}
              {(Boolean(activeItem?.caption) ||
                (!noCarousel && items.length > 1)) && (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex flex-col items-center gap-3 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-4">
                  <LightboxCaptions />
                  {!noCarousel && items.length > 1 && <LightboxThumbnails />}
                </div>
              )}
            </>
          )}
          <span
            className="sr-only"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {items.length > 0
              ? `${getItemLabel(activeItem, activeIndex)}, ${activeIndex + 1} of ${items.length}`
              : "No media"}
          </span>
        </DialogPrimitive.Popup>
      </LightboxViewport>
    </DialogPrimitive.Portal>
  );
}

(
  LightboxContent as typeof LightboxContent & { __lightboxContent: boolean }
).__lightboxContent = true;

type LightboxZoomProps = {
  active?: boolean;
} & useRender.ComponentProps<"div">;

function LightboxZoom({
  active = true,
  className,
  render,
  style,
  ref,
  ...props
}: LightboxZoomProps) {
  const { activeItem, registerMedia, transform } = useLightbox();
  const zoomable =
    activeItem?.type === "image"
      ? activeItem.zoomable !== false
      : Boolean(activeItem?.zoomable);
  const mediaRegistrationRef = React.useCallback(
    (element: HTMLDivElement | null) => {
      if (active) registerMedia(element);
    },
    [active, registerMedia]
  );
  const defaultProps = {
    className: cn(
      "flex max-h-full max-w-full origin-center items-center justify-center will-change-transform",
      className
    ),
    "data-active": active ? "true" : "false",
    "data-dragging": transform.dragging ? "true" : "false",
    "data-slot": "lightbox-zoom",
    "data-zoomable": zoomable ? "true" : "false",
    "data-zoomed": transform.scale > 1 ? "true" : "false",
    style: {
      transform: active
        ? `translate3d(${transform.panX}px, ${transform.panY}px, 0) scale(${transform.scale})`
        : undefined,
      ...style,
    },
  };

  return useRender({
    defaultTagName: "div",
    ref: ref ? [ref, mediaRegistrationRef] : mediaRegistrationRef,
    props: mergeProps<"div">(
      defaultProps as useRender.ElementProps<"div">,
      props
    ) as Record<string, unknown>,
    render,
  });
}

type LightboxSlideProps = {
  index: number;
  active?: boolean;
} & React.ComponentProps<"div">;

function LightboxSlide({
  index,
  active = false,
  className,
  style,
  ...props
}: LightboxSlideProps) {
  const {
    activeItem,
    items,
    loadedAssets,
    loading,
    markAssetLoaded,
    noCarousel,
    noControls,
    noCounter,
  } = useLightbox();
  const item = items[index];
  if (!item) return null;
  const loadKey = getMediaLoadKey(item);
  const mediaLoaded = loadedAssets.has(loadKey);
  const shouldMountMedia = loading === "eager" || active || mediaLoaded;
  const hasTopChrome = !noCounter || !noControls;
  const hasBottomChrome = Boolean(activeItem?.caption);
  const captionTrack =
    item.type === "video"
      ? item.tracks?.find((track) => track.kind === "captions")
      : undefined;

  const media =
    item.type === "image" ? (
      <img
        src={item.src}
        srcSet={item.srcSet}
        sizes={item.sizes}
        alt={item.alt}
        width={item.width}
        height={item.height}
        draggable={false}
        decoding="async"
        loading={active ? "eager" : "lazy"}
        onLoad={() => markAssetLoaded(loadKey)}
        className={cn(
          "block h-auto w-auto max-w-[calc(100vw-2rem)] select-none rounded-lg object-contain",
          "max-h-[calc(100dvh-11rem)] sm:max-h-[calc(100dvh-12rem)]",
          "transition-opacity duration-200",
          !mediaLoaded && "opacity-0",
          item.className
        )}
      />
    ) : (
      <video
        {...item.videoProps}
        src={item.src}
        poster={item.poster}
        width={item.width}
        height={item.height}
        aria-label={item.label}
        controls={item.videoProps?.controls ?? true}
        muted={item.videoProps?.muted ?? false}
        onCanPlay={(event) => {
          item.videoProps?.onCanPlay?.(event);
          markAssetLoaded(loadKey);
        }}
        onLoadedData={(event) => {
          item.videoProps?.onLoadedData?.(event);
          markAssetLoaded(loadKey);
        }}
        onLoadedMetadata={(event) => {
          item.videoProps?.onLoadedMetadata?.(event);
          markAssetLoaded(loadKey);
        }}
        playsInline={item.videoProps?.playsInline ?? true}
        preload={item.videoProps?.preload ?? (active ? "auto" : "metadata")}
        className={cn(
          "block h-auto w-auto max-h-full max-w-[calc(100vw-2rem)] rounded-lg bg-black object-contain",
          "transition-opacity duration-200",
          !mediaLoaded && "opacity-0",
          item.className
        )}
      >
        {item.sources?.map((source) => (
          <source key={`${source.src}-${source.type}`} {...source} />
        ))}
        <track
          {...captionTrack}
          kind="captions"
          label={captionTrack?.label ?? "Captions"}
          src={captionTrack?.src ?? EMPTY_CAPTIONS_TRACK}
          srcLang={captionTrack?.srcLang ?? "en"}
        />
        {item.tracks
          ?.filter((track) => track !== captionTrack)
          .map((track) => (
            <track
              key={`${track.src}-${track.kind}-${track.srcLang}`}
              {...track}
            />
          ))}
      </video>
    );

  const content = (
    <div className="relative flex min-h-10 min-w-10 max-h-full max-w-full items-center justify-center">
      {!mediaLoaded && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Spinner size="xl" className="text-white" />
        </span>
      )}
      {shouldMountMedia && (
        <div className="flex max-h-full max-w-full items-center justify-center">
          {media}
        </div>
      )}
    </div>
  );

  return (
    <div
      data-slot="lightbox-slide"
      data-active={active ? "true" : "false"}
      data-type={item.type}
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${items.length}: ${getItemLabel(item, index)}`}
      aria-hidden={active ? undefined : true}
      inert={active ? undefined : true}
      className={cn(
        "pointer-events-none absolute inset-0 flex items-center justify-center px-4",
        noCarousel
          ? hasTopChrome || hasBottomChrome
            ? "pt-[var(--lightbox-header-inset,5rem)] pb-20"
            : "py-4"
          : "pt-[var(--lightbox-header-inset,5rem)] pb-36",
        active && "pointer-events-auto",
        className
      )}
      style={style}
      {...props}
    >
      <LightboxZoom active={active}>{content}</LightboxZoom>
    </div>
  );
}

function relativeSlideOffset(
  index: number,
  activeIndex: number,
  length: number,
  loop: boolean,
  preferredOffset = 0
) {
  let offset = index - activeIndex;
  if (!loop || length < 2) return offset;
  if (offset > length / 2) offset -= length;
  if (offset < -length / 2) offset += length;
  if (length === 2 && Math.abs(offset) === 1 && preferredOffset !== 0) {
    return preferredOffset;
  }
  return offset;
}

function isIndexMounted(
  index: number,
  activeIndex: number,
  length: number,
  preload: number,
  loop: boolean
) {
  return (
    Math.abs(relativeSlideOffset(index, activeIndex, length, loop)) <= preload
  );
}

type GestureSession = {
  mode: "pending" | "pan" | "swipe" | "dismiss" | "pinch";
  startX: number;
  startY: number;
  startPanX: number;
  startPanY: number;
  startSwipeX: number;
  startDismissY: number;
  startScale: number;
  pinchDistance: number;
  pinchCenterX: number;
  pinchCenterY: number;
  lastX: number;
  lastY: number;
  lastTime: number;
  velocityX: number;
  velocityY: number;
};

function LightboxSlides({
  className,
  onClick,
  onKeyDown,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
  onWheel,
  onDoubleClick,
  ...props
}: React.ComponentProps<"div">) {
  const {
    activeIndex,
    activeItem,
    animateZoom,
    changeIndex,
    closeWithDetails,
    direction,
    items,
    loading,
    loop,
    maxZoom,
    noCarousel,
    preload,
    setTransform,
    shouldReduceMotion,
    stopZoomAnimation,
    transform,
  } = useLightbox();
  const viewportRef = React.useRef<HTMLDivElement | null>(null);
  const pointersRef = React.useRef(new Map<number, { x: number; y: number }>());
  const sessionRef = React.useRef<GestureSession | null>(null);
  const animationRef = React.useRef<ReturnType<typeof animate> | null>(null);
  const wheelRef = React.useRef({ x: 0, y: 0, timer: 0 });
  const lastTapRef = React.useRef({ time: 0, x: 0, y: 0 });
  const suppressClickRef = React.useRef(false);
  const suppressClickTimerRef = React.useRef(0);
  const transformRef = React.useRef(transform);
  React.useLayoutEffect(() => {
    transformRef.current = transform;
  }, [transform]);
  const zoomable =
    activeItem?.type === "image"
      ? activeItem.zoomable !== false
      : Boolean(activeItem?.zoomable);
  const clickZoomable = activeItem?.type === "image" && zoomable;

  React.useEffect(() => {
    const animation = animationRef;
    const wheel = wheelRef;
    const pointers = pointersRef;
    const session = sessionRef;
    return () => {
      animation.current?.stop();
      window.clearTimeout(wheel.current.timer);
      window.clearTimeout(suppressClickTimerRef.current);
      wheel.current = { x: 0, y: 0, timer: 0 };
      pointers.current.clear();
      session.current = null;
    };
  }, []);

  React.useEffect(() => {
    if (loading === "lazy") return;
    for (let distance = 1; distance <= preload; distance += 1) {
      for (const candidate of [
        activeIndex - distance,
        activeIndex + distance,
      ]) {
        const normalized = normalizeIndex(candidate, items.length, loop);
        const item = items[normalized];
        if (item?.type !== "image") continue;
        const image = new Image();
        image.srcset = item.srcSet ?? "";
        image.sizes = item.sizes ?? "";
        image.src = item.src;
        void image.decode?.().catch(() => undefined);
      }
    }
  }, [activeIndex, items, loading, loop, preload]);

  const getPanBounds = React.useCallback((scale: number) => {
    const media = viewportRef.current?.querySelector<HTMLElement>(
      '[data-slot="lightbox-zoom"][data-active="true"]'
    );
    const viewport = viewportRef.current;
    if (!media || !viewport) return { x: 0, y: 0 };
    const rect = media.getBoundingClientRect();
    const currentScale = transformRef.current.scale || 1;
    const width = rect.width / currentScale;
    const height = rect.height / currentScale;
    return {
      x: Math.max(0, (width * scale - viewport.clientWidth) / 2),
      y: Math.max(0, (height * scale - viewport.clientHeight) / 2),
    };
  }, []);

  const stopAnimation = React.useCallback(() => {
    animationRef.current?.stop();
    animationRef.current = null;
  }, []);

  const animateTransformValue = React.useCallback(
    (
      key: "panX" | "panY" | "swipeX" | "dismissY" | "scale",
      to: number,
      onComplete?: () => void
    ) => {
      stopAnimation();
      if (shouldReduceMotion) {
        setTransform((current) => {
          return { ...current, [key]: to };
        });
        onComplete?.();
        return;
      }
      const from = transformRef.current[key];
      animationRef.current = animate(from, to, {
        duration: 0.24,
        ease: "easeOut",
        onUpdate: (value) =>
          setTransform((current) => {
            return { ...current, [key]: value };
          }),
        onComplete: () => {
          animationRef.current = null;
          onComplete?.();
        },
      });
    },
    [setTransform, shouldReduceMotion, stopAnimation]
  );

  const getZoomTarget = React.useCallback(
    (nextScale: number, clientX: number, clientY: number) => {
      const viewport = viewportRef.current;
      if (!viewport) return null;
      const current = transformRef.current;
      const scale = clamp(nextScale, 1, maxZoom);
      if (scale === 1) {
        return { ...current, scale: 1, panX: 0, panY: 0 };
      }
      const rect = viewport.getBoundingClientRect();
      const pointX = clientX - (rect.left + rect.width / 2);
      const pointY = clientY - (rect.top + rect.height / 2);
      const ratio = scale / current.scale;
      const bounds = getPanBounds(scale);
      return {
        ...current,
        scale,
        panX: clamp(
          pointX - (pointX - current.panX) * ratio,
          -bounds.x,
          bounds.x
        ),
        panY: clamp(
          pointY - (pointY - current.panY) * ratio,
          -bounds.y,
          bounds.y
        ),
        swipeX: 0,
        dismissY: 0,
      };
    },
    [getPanBounds, maxZoom]
  );

  const zoomAt = React.useCallback(
    (nextScale: number, clientX: number, clientY: number) => {
      const target = getZoomTarget(nextScale, clientX, clientY);
      if (target) {
        transformRef.current = target;
        setTransform(target);
      }
    },
    [getZoomTarget, setTransform]
  );

  const animateZoomAt = React.useCallback(
    (nextScale: number, clientX: number, clientY: number) => {
      const target = getZoomTarget(nextScale, clientX, clientY);
      if (target) animateZoom(target);
    },
    [animateZoom, getZoomTarget]
  );

  const toggleZoomAt = React.useCallback(
    (clientX: number, clientY: number) => {
      if (
        activeItem?.zoomable === false ||
        (activeItem?.type === "video" && !activeItem.zoomable)
      ) {
        return;
      }
      const nextScale =
        transformRef.current.scale > 1 ? 1 : Math.min(2, maxZoom);
      animateZoomAt(nextScale, clientX, clientY);
    },
    [activeItem, animateZoomAt, maxZoom]
  );

  const animateNavigation = React.useCallback(
    (logicalDelta: number, reason: LightboxChangeReason, event?: Event) => {
      if (items.length < 2) return;
      const nextIndex = normalizeIndex(
        activeIndex + logicalDelta,
        items.length,
        loop
      );
      if (nextIndex === activeIndex) {
        animateTransformValue("swipeX", 0);
        return;
      }
      const viewportWidth =
        viewportRef.current?.clientWidth ?? window.innerWidth;
      const rtl = direction === "rtl" ? -1 : 1;
      const target = -logicalDelta * rtl * viewportWidth;
      animateTransformValue("swipeX", target, () => {
        changeIndex(nextIndex, reason, event);
        setTransform(initialTransform);
      });
    },
    [
      activeIndex,
      animateTransformValue,
      changeIndex,
      direction,
      items.length,
      loop,
      setTransform,
    ]
  );

  const releaseGesture = React.useCallback(
    (event?: Event) => {
      const session = sessionRef.current;
      if (!session) return;
      const viewport = viewportRef.current;
      const width = viewport?.clientWidth ?? window.innerWidth;
      const height = viewport?.clientHeight ?? window.innerHeight;
      const current = transformRef.current;
      setTransform((value) => {
        return { ...value, dragging: false };
      });

      if (session.mode === "swipe") {
        if (noCarousel) {
          animateTransformValue("swipeX", 0);
          sessionRef.current = null;
          return;
        }
        if (
          Math.abs(current.swipeX) >= width * 0.25 ||
          Math.abs(session.velocityX) >= 0.5
        ) {
          const rtl = direction === "rtl" ? -1 : 1;
          const logicalDelta = current.swipeX < 0 ? rtl : -rtl;
          animateNavigation(logicalDelta, "swipe", event);
        } else {
          animateTransformValue("swipeX", 0);
        }
      } else if (session.mode === "dismiss") {
        if (
          Math.abs(current.dismissY) >= height * 0.2 ||
          Math.abs(session.velocityY) >= 0.5
        ) {
          const target =
            Math.sign(current.dismissY || session.velocityY) * height;
          animateTransformValue("dismissY", target);
          closeWithDetails(getEventDetails("imperative-action", event, null));
        } else {
          animateTransformValue("dismissY", 0);
        }
      } else if (session.mode === "pan" || session.mode === "pinch") {
        const scale = clamp(current.scale, 1, maxZoom);
        const bounds = getPanBounds(scale);
        setTransform((value) => {
          return {
            ...value,
            scale,
            panX: clamp(value.panX, -bounds.x, bounds.x),
            panY: clamp(value.panY, -bounds.y, bounds.y),
            dragging: false,
          };
        });
      } else {
        animateTransformValue("swipeX", 0);
        animateTransformValue("dismissY", 0);
      }
      sessionRef.current = null;
    },
    [
      animateNavigation,
      animateTransformValue,
      closeWithDetails,
      direction,
      getPanBounds,
      maxZoom,
      noCarousel,
      setTransform,
    ]
  );

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    onPointerDown?.(event);
    if (event.defaultPrevented) return;
    const target = event.target as HTMLElement;
    const interactiveTarget = target.closest(interactiveSelector);
    if (interactiveTarget && interactiveTarget !== event.currentTarget) return;
    stopAnimation();
    stopZoomAnimation();
    event.currentTarget.setPointerCapture(event.pointerId);
    pointersRef.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    });
    const points = Array.from(pointersRef.current.values());
    const first = points[0] ?? { x: event.clientX, y: event.clientY };
    const second = points[1] ?? first;
    const isPinch = points.length > 1;
    const pinchDistance = isPinch
      ? Math.hypot(second.x - first.x, second.y - first.y)
      : 0;
    const pinchCenterX = isPinch ? (first.x + second.x) / 2 : event.clientX;
    const pinchCenterY = isPinch ? (first.y + second.y) / 2 : event.clientY;
    const current = transformRef.current;
    const now = performance.now();
    sessionRef.current = {
      mode: isPinch ? "pinch" : "pending",
      startX: event.clientX,
      startY: event.clientY,
      startPanX: current.panX,
      startPanY: current.panY,
      startSwipeX: current.swipeX,
      startDismissY: current.dismissY,
      startScale: current.scale,
      pinchDistance,
      pinchCenterX,
      pinchCenterY,
      lastX: event.clientX,
      lastY: event.clientY,
      lastTime: now,
      velocityX: 0,
      velocityY: 0,
    };
    setTransform((value) => {
      return { ...value, dragging: true };
    });
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    onPointerMove?.(event);
    if (event.defaultPrevented || !pointersRef.current.has(event.pointerId)) {
      return;
    }
    pointersRef.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    });
    const session = sessionRef.current;
    if (!session) return;
    const points = Array.from(pointersRef.current.values());
    if (points.length >= 2 && zoomable) {
      const [first, second] = points;
      const distance = Math.hypot(second.x - first.x, second.y - first.y);
      const centerX = (first.x + second.x) / 2;
      const centerY = (first.y + second.y) / 2;
      if (!session.pinchDistance) {
        session.pinchDistance = distance;
        session.pinchCenterX = centerX;
        session.pinchCenterY = centerY;
        session.startScale = transformRef.current.scale;
      }
      session.mode = "pinch";
      const rawScale =
        session.startScale * (distance / Math.max(session.pinchDistance, 1));
      const elasticScale =
        rawScale < 1
          ? 1 - (1 - rawScale) * 0.25
          : rawScale > maxZoom
            ? maxZoom + (rawScale - maxZoom) * 0.25
            : rawScale;
      zoomAt(elasticScale, centerX, centerY);
      return;
    }

    const dx = event.clientX - session.startX;
    const dy = event.clientY - session.startY;
    const now = performance.now();
    const elapsed = Math.max(1, now - session.lastTime);
    session.velocityX = (event.clientX - session.lastX) / elapsed;
    session.velocityY = (event.clientY - session.lastY) / elapsed;
    session.lastX = event.clientX;
    session.lastY = event.clientY;
    session.lastTime = now;

    if (transformRef.current.scale > 1) session.mode = "pan";
    else if (session.mode === "pending" && Math.hypot(dx, dy) > 8) {
      session.mode =
        Math.abs(dx) > Math.abs(dy)
          ? noCarousel
            ? "pending"
            : "swipe"
          : "dismiss";
    }

    if (session.mode === "pan") {
      const bounds = getPanBounds(transformRef.current.scale);
      const rawX = session.startPanX + dx;
      const rawY = session.startPanY + dy;
      const resist = (value: number, maximum: number) =>
        Math.abs(value) <= maximum
          ? value
          : Math.sign(value) * (maximum + (Math.abs(value) - maximum) * 0.35);
      setTransform((value) => {
        return {
          ...value,
          panX: resist(rawX, bounds.x),
          panY: resist(rawY, bounds.y),
        };
      });
    } else if (session.mode === "swipe") {
      setTransform((value) => {
        return { ...value, swipeX: session.startSwipeX + dx };
      });
    } else if (session.mode === "dismiss") {
      setTransform((value) => {
        return {
          ...value,
          dismissY: session.startDismissY + dy,
        };
      });
    }
  };

  const handlePointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.type === "pointercancel") onPointerCancel?.(event);
    else onPointerUp?.(event);
    const session = sessionRef.current;
    pointersRef.current.delete(event.pointerId);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (!session) {
      suppressClickRef.current = false;
      return;
    }
    if (pointersRef.current.size > 0) {
      if (session?.mode === "pinch") {
        const [remaining] = pointersRef.current.values();
        if (remaining) {
          const current = transformRef.current;
          const now = performance.now();
          sessionRef.current = {
            ...session,
            mode: "pan",
            startX: remaining.x,
            startY: remaining.y,
            startPanX: current.panX,
            startPanY: current.panY,
            startSwipeX: current.swipeX,
            startDismissY: current.dismissY,
            startScale: current.scale,
            pinchDistance: 0,
            pinchCenterX: remaining.x,
            pinchCenterY: remaining.y,
            lastX: remaining.x,
            lastY: remaining.y,
            lastTime: now,
            velocityX: 0,
            velocityY: 0,
          };
        }
      }
      return;
    }

    let shouldToggleTouchZoom = false;
    if (
      event.type !== "pointercancel" &&
      event.pointerType === "touch" &&
      session?.mode === "pending"
    ) {
      const now = performance.now();
      const last = lastTapRef.current;
      if (
        now - last.time < 300 &&
        Math.hypot(event.clientX - last.x, event.clientY - last.y) < 30
      ) {
        shouldToggleTouchZoom = true;
        lastTapRef.current.time = 0;
      } else {
        lastTapRef.current = { time: now, x: event.clientX, y: event.clientY };
      }
    }
    const shouldToggleZoomOnDesktop =
      event.type !== "pointercancel" &&
      event.pointerType !== "touch" &&
      event.button === 0 &&
      session?.mode === "pending" &&
      clickZoomable;
    suppressClickRef.current =
      event.type === "pointercancel" ||
      event.pointerType === "touch" ||
      session?.mode !== "pending" ||
      shouldToggleZoomOnDesktop;
    window.clearTimeout(suppressClickTimerRef.current);
    if (suppressClickRef.current) {
      suppressClickTimerRef.current = window.setTimeout(() => {
        suppressClickRef.current = false;
      }, 0);
    }
    releaseGesture(event.nativeEvent);
    if (shouldToggleTouchZoom) toggleZoomAt(event.clientX, event.clientY);
    else if (shouldToggleZoomOnDesktop) {
      toggleZoomAt(event.clientX, event.clientY);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }
    const target = event.target as HTMLElement;
    const activeZoom = target.closest(
      '[data-slot="lightbox-zoom"][data-active="true"]'
    );
    const interactiveTarget = target.closest(interactiveSelector);
    if (
      !activeZoom ||
      (interactiveTarget && interactiveTarget !== event.currentTarget) ||
      !clickZoomable
    ) {
      return;
    }
    toggleZoomAt(event.clientX, event.clientY);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (
      event.defaultPrevented ||
      event.target !== event.currentTarget ||
      !clickZoomable ||
      (event.key !== "Enter" && event.key !== " ")
    ) {
      return;
    }
    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    toggleZoomAt(rect.left + rect.width / 2, rect.top + rect.height / 2);
  };

  const releaseWheel = React.useCallback(
    (event?: Event) => {
      const current = wheelRef.current;
      const width = viewportRef.current?.clientWidth ?? window.innerWidth;
      const height = viewportRef.current?.clientHeight ?? window.innerHeight;
      if (
        !noCarousel &&
        (Math.abs(current.x) > 100 ||
          Math.abs(transformRef.current.swipeX) > width * 0.25)
      ) {
        const rtl = direction === "rtl" ? -1 : 1;
        animateNavigation(current.x > 0 ? rtl : -rtl, "swipe", event);
      } else if (
        Math.abs(current.y) > 100 ||
        Math.abs(transformRef.current.dismissY) > height * 0.2
      ) {
        const target =
          Math.sign(current.y || transformRef.current.dismissY) * height;
        animateTransformValue("dismissY", target);
        closeWithDetails(getEventDetails("imperative-action", event, null));
      } else {
        animateTransformValue("swipeX", 0);
        animateTransformValue("dismissY", 0);
      }
      wheelRef.current.x = 0;
      wheelRef.current.y = 0;
    },
    [
      animateNavigation,
      animateTransformValue,
      closeWithDetails,
      direction,
      noCarousel,
    ]
  );

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    onWheel?.(event);
    if (event.defaultPrevented) return;
    const target = event.target as HTMLElement;
    const interactiveTarget = target.closest(interactiveSelector);
    if (interactiveTarget && interactiveTarget !== event.currentTarget) return;
    const likelyMouseWheel =
      event.deltaMode !== WheelEvent.DOM_DELTA_PIXEL ||
      (Math.abs(event.deltaY) >= 50 && Math.abs(event.deltaX) < 8);
    if (event.altKey || likelyMouseWheel) {
      if (!zoomable) return;
      event.preventDefault();
      const sensitivity = event.altKey ? 0.0008 : 0.0016;
      const scale =
        transformRef.current.scale * Math.exp(-event.deltaY * sensitivity);
      animateZoomAt(scale, event.clientX, event.clientY);
      return;
    }
    event.preventDefault();
    if (transformRef.current.scale > 1) {
      const bounds = getPanBounds(transformRef.current.scale);
      setTransform((value) => {
        return {
          ...value,
          panX: clamp(value.panX - event.deltaX, -bounds.x, bounds.x),
          panY: clamp(value.panY - event.deltaY, -bounds.y, bounds.y),
        };
      });
      return;
    }
    wheelRef.current.x += event.deltaX;
    wheelRef.current.y += event.deltaY;
    if (
      !noCarousel &&
      Math.abs(wheelRef.current.x) > Math.abs(wheelRef.current.y)
    ) {
      setTransform((value) => {
        return { ...value, swipeX: -wheelRef.current.x };
      });
    } else {
      setTransform((value) => {
        return { ...value, dismissY: wheelRef.current.y };
      });
    }
    window.clearTimeout(wheelRef.current.timer);
    const nativeEvent = event.nativeEvent;
    wheelRef.current.timer = window.setTimeout(
      () => releaseWheel(nativeEvent),
      120
    );
  };

  return (
    <div
      ref={viewportRef}
      data-slot="lightbox-slides"
      data-dragging={transform.dragging ? "true" : "false"}
      data-zoomed={transform.scale > 1 ? "true" : "false"}
      role={clickZoomable ? "button" : undefined}
      aria-label={
        clickZoomable
          ? transform.scale > 1
            ? "Zoom out current image"
            : "Zoom in current image"
          : undefined
      }
      tabIndex={clickZoomable ? 0 : undefined}
      className={cn(
        "relative min-h-0 flex-1 overflow-hidden touch-none select-none",
        className
      )}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onWheel={handleWheel}
      onDoubleClick={(event) => {
        onDoubleClick?.(event);
      }}
      {...props}
    >
      {items.map((item, itemIndex) => {
        if (
          !isIndexMounted(itemIndex, activeIndex, items.length, preload, loop)
        ) {
          return null;
        }
        const physicalDirection =
          transform.swipeX === 0 ? 0 : -Math.sign(transform.swipeX);
        const preferredOffset =
          physicalDirection * (direction === "rtl" ? -1 : 1);
        const offset = relativeSlideOffset(
          itemIndex,
          activeIndex,
          items.length,
          loop,
          preferredOffset
        );
        return (
          <LightboxSlide
            key={item.id ?? itemIndex}
            index={itemIndex}
            active={itemIndex === activeIndex}
            style={{
              transform: `translate3d(calc(${offset * 100 * (direction === "rtl" ? -1 : 1)}% + ${transform.swipeX}px), ${transform.dismissY}px, 0)`,
            }}
          />
        );
      })}
    </div>
  );
}

function LightboxToolbar({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="lightbox-toolbar"
      className={cn("pointer-events-auto flex items-center gap-1", className)}
      role="toolbar"
      aria-label="Lightbox controls"
      {...props}
    >
      {children ?? (
        <>
          <LightboxDownload />
          <LightboxZoomButton />
          <LightboxMore />
          <LightboxClose />
        </>
      )}
    </div>
  );
}

function LightboxCounter({ className, ...props }: React.ComponentProps<"div">) {
  const { activeIndex, items } = useLightbox();
  return (
    <div
      data-slot="lightbox-counter"
      className={cn(
        "pointer-events-auto rounded-lg px-3 py-2 text-sm font-medium tabular-nums",
        className
      )}
      {...props}
    >
      <span aria-hidden="true">
        {items.length > 0 ? activeIndex + 1 : 0} / {items.length}
      </span>
      <span className="sr-only">
        Item {items.length > 0 ? activeIndex + 1 : 0} of {items.length}
      </span>
    </div>
  );
}

function LightboxCaptions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { activeIndex, activeItem } = useLightbox();
  if (!activeItem?.caption) return null;
  return (
    <div
      id={`lightbox-caption-${activeIndex}`}
      data-slot="lightbox-captions"
      className={cn(
        "pointer-events-auto max-w-2xl px-3 py-2 text-center text-sm [text-shadow:0_1px_3px_rgb(0_0_0/0.8)]",
        className
      )}
      {...props}
    >
      {activeItem.caption}
    </div>
  );
}

type LightboxActionButtonProps = Omit<
  ButtonProps,
  "color" | "size" | "variant"
>;

type LightboxThumbnailProps = {
  index: number;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & Omit<LightboxActionButtonProps, "onClick">;

function LightboxVideoThumbnail({
  crossOrigin,
  onLoad,
  src,
}: {
  crossOrigin?: React.VideoHTMLAttributes<HTMLVideoElement>["crossOrigin"];
  onLoad?: () => void;
  src: string;
}) {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const showFrame = () => {
      const duration = Number.isFinite(video.duration) ? video.duration : 0;
      video.currentTime = Math.min(0.1, Math.max(0, duration / 2));
    };
    video.addEventListener("loadedmetadata", showFrame);
    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) showFrame();
    return () => video.removeEventListener("loadedmetadata", showFrame);
  }, [src]);

  return (
    <video
      ref={videoRef}
      aria-hidden="true"
      crossOrigin={crossOrigin}
      muted
      onLoadedData={onLoad}
      playsInline
      preload="metadata"
      src={src}
      tabIndex={-1}
      className="size-full object-cover"
    />
  );
}

function LightboxThumbnail({
  index,
  className,
  onClick,
  ...props
}: LightboxThumbnailProps) {
  const {
    activeIndex,
    changeIndex,
    items,
    loadedAssets,
    loading,
    markAssetLoaded,
  } = useLightbox();
  const item = items[index];
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);
  const active = index === activeIndex;
  const [intersected, setIntersected] = React.useState(false);
  const thumbnailLoadKey = item ? getThumbnailLoadKey(item) : "";
  const thumbnailCached = item ? loadedAssets.has(thumbnailLoadKey) : false;

  React.useEffect(() => {
    if (loading === "eager" || active || intersected || thumbnailCached) return;
    const button = buttonRef.current;
    if (!button) return;
    if (typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setIntersected(true));
      return () => cancelAnimationFrame(frame);
    }

    const root = button.closest<HTMLElement>(
      '[data-slot="scroll-area-viewport"]'
    );
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setIntersected(true);
        observer.disconnect();
      },
      { root, threshold: 0.01 }
    );
    observer.observe(button);
    return () => observer.disconnect();
  }, [active, intersected, loading, thumbnailCached]);

  React.useEffect(() => {
    if (active) {
      buttonRef.current?.scrollIntoView({ block: "nearest", inline: "center" });
    }
  }, [active]);

  if (!item) return null;
  const shouldLoad =
    loading === "eager" || active || intersected || thumbnailCached;
  const thumbnailSource =
    item.type === "image" ? (item.thumbnailSrc ?? item.src) : item.poster;
  const thumbnail = shouldLoad
    ? (item.thumbnail ??
      (item.type === "image" ? (
        <img
          src={thumbnailSource}
          alt=""
          draggable={false}
          loading="lazy"
          className="size-full object-cover transition-opacity duration-200"
          onLoad={() => markAssetLoaded(thumbnailLoadKey)}
        />
      ) : item.poster ? (
        <img
          src={item.poster}
          alt=""
          draggable={false}
          loading="lazy"
          className="size-full object-cover transition-opacity duration-200"
          onLoad={() => markAssetLoaded(thumbnailLoadKey)}
        />
      ) : (
        <LightboxVideoThumbnail
          crossOrigin={item.videoProps?.crossOrigin}
          onLoad={() => markAssetLoaded(thumbnailLoadKey)}
          src={item.src}
        />
      )))
    : null;
  const mediaLoaded =
    item.thumbnail !== undefined ? shouldLoad : thumbnailCached;

  return (
    <Button
      ref={buttonRef}
      data-slot="lightbox-thumbnail"
      data-index={index}
      data-active={active ? "true" : "false"}
      variant="ghost"
      size="icon-lg"
      aria-current={active ? "true" : undefined}
      aria-label={`Show ${getItemLabel(item, index)}`}
      tabIndex={active ? 0 : -1}
      className={cn(
        "size-12 shrink-0 overflow-hidden rounded-lg text-muted-foreground text-xs font-medium p-0 opacity-65 hover:opacity-100 focus-visible:opacity-100 bg-muted data-[active=true]:opacity-100 sm:size-14",
        className
      )}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          changeIndex(index, "thumbnail-press", event.nativeEvent);
        }
      }}
      {...props}
    >
      <span
        aria-hidden="true"
        data-slot="lightbox-thumbnail-content"
        className="pointer-events-none relative flex size-full items-center justify-center overflow-hidden rounded-[inherit]"
      >
        <Skeleton
          aria-hidden="true"
          rounded="lg"
          className={cn(
            "absolute inset-0 size-full transition-opacity duration-200",
            mediaLoaded && "opacity-0"
          )}
        />
        {thumbnail && (
          <span
            className={cn(
              "relative size-full overflow-hidden rounded-[inherit] [&>*]:size-full [&>img]:object-cover [&>video]:object-cover",
              !mediaLoaded && "opacity-0"
            )}
          >
            {thumbnail}
          </span>
        )}
      </span>
    </Button>
  );
}

function LightboxThumbnails({
  className,
  children,
  onKeyDown,
  ...props
}: React.ComponentProps<"div">) {
  const { activeIndex, changeIndex, direction, items, loop } = useLightbox();
  return (
    <ScrollArea
      data-slot="lightbox-thumbnails"
      className={cn(
        "pointer-events-auto max-w-[min(100%,42rem)] rounded-lg p-1.5",
        className
      )}
      orientation="horizontal"
      hideScrollbar
      scrollShadow="horizontal"
      fadeColor="rgb(0 0 0 / 0.25)"
      {...props}
    >
      <ScrollAreaContent
        className="flex w-max items-center gap-1.5"
        role="toolbar"
        aria-label="Choose media"
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.defaultPrevented) return;
          if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
          event.preventDefault();
          const rtl = direction === "rtl" ? -1 : 1;
          const physical = event.key === "ArrowRight" ? 1 : -1;
          const next = normalizeIndex(
            activeIndex + physical * rtl,
            items.length,
            loop
          );
          const thumbnails = event.currentTarget;
          changeIndex(next, "keyboard", event.nativeEvent);
          requestAnimationFrame(() => {
            thumbnails
              .querySelector<HTMLElement>(
                `[data-slot="lightbox-thumbnail"][data-index="${next}"]`
              )
              ?.focus();
          });
        }}
      >
        {children ??
          items.map((item, index) => (
            <LightboxThumbnail key={item.id ?? index} index={index} />
          ))}
      </ScrollAreaContent>
    </ScrollArea>
  );
}

function LightboxPrevious({
  className,
  disabled: disabledProp,
  onClick,
  style,
  ...props
}: LightboxActionButtonProps) {
  const { activeIndex, changeIndex, direction, items, loop } = useLightbox();
  const disabled =
    disabledProp === true || items.length < 2 || (!loop && activeIndex === 0);
  if (disabled) return null;
  return (
    <Button
      data-slot="lightbox-previous"
      variant="ghost"
      size="icon-xl"
      aria-label="Previous item"
      className={cn(
        "absolute start-2 z-20 -translate-y-1/2 rounded-lg bg-transparent text-white hover:bg-white/15 hover:text-white focus-visible:bg-white/15 sm:start-4",
        className
      )}
      style={{
        top: "calc(50% + (var(--lightbox-header-inset, 5rem) - 9rem) / 2)",
        ...style,
      }}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          changeIndex(activeIndex - 1, "previous-press", event.nativeEvent);
        }
      }}
      {...props}
    >
      {direction === "rtl" ? (
        <ChevronRightIcon aria-hidden="true" />
      ) : (
        <ChevronLeftIcon aria-hidden="true" />
      )}
    </Button>
  );
}

function LightboxNext({
  className,
  disabled: disabledProp,
  onClick,
  style,
  ...props
}: LightboxActionButtonProps) {
  const { activeIndex, changeIndex, direction, items, loop } = useLightbox();
  const disabled =
    disabledProp === true ||
    items.length < 2 ||
    (!loop && activeIndex === items.length - 1);
  if (disabled) return null;
  return (
    <Button
      data-slot="lightbox-next"
      variant="ghost"
      size="icon-xl"
      aria-label="Next item"
      className={cn(
        "absolute end-2 z-20 -translate-y-1/2 rounded-lg bg-transparent text-white hover:bg-white/15 hover:text-white focus-visible:bg-white/15 sm:end-4",
        className
      )}
      style={{
        top: "calc(50% + (var(--lightbox-header-inset, 5rem) - 9rem) / 2)",
        ...style,
      }}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          changeIndex(activeIndex + 1, "next-press", event.nativeEvent);
        }
      }}
      {...props}
    >
      {direction === "rtl" ? (
        <ChevronLeftIcon aria-hidden="true" />
      ) : (
        <ChevronRightIcon aria-hidden="true" />
      )}
    </Button>
  );
}

function LightboxZoomButton({
  className,
  disabled,
  onClick,
  ...props
}: LightboxActionButtonProps) {
  const { activeItem, actions, transform } = useLightbox();
  const zoomable =
    activeItem?.type === "image"
      ? activeItem.zoomable !== false
      : Boolean(activeItem?.zoomable);
  if (!zoomable || disabled) return null;
  const zoomed = transform.scale > 1;
  return (
    <Button
      data-slot="lightbox-zoom-button"
      variant="ghost"
      size="icon-lg"
      aria-label={zoomed ? "Zoom out" : "Zoom in"}
      className={cn("text-white hover:bg-white/15 hover:text-white", className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          if (zoomed) actions.resetZoom();
          else actions.zoomIn();
        }
      }}
      {...props}
    >
      {zoomed ? (
        <ZoomOutIcon aria-hidden="true" />
      ) : (
        <ZoomInIcon aria-hidden="true" />
      )}
    </Button>
  );
}

function getDownload(item: LightboxItem | undefined) {
  if (!item) return undefined;
  if (item.download === false) return undefined;
  if (typeof item.download === "object") {
    return {
      src: item.download.src ?? item.src,
      filename: item.download.filename,
    };
  }
  return { src: item.src, filename: undefined };
}

function getDownloadFilename(response: Response, configured?: string) {
  if (configured) return configured;

  const disposition = response.headers.get("content-disposition");
  const encodedFilename = disposition?.match(/filename\*=UTF-8''([^;]+)/i)?.[1];
  const plainFilename = disposition?.match(/filename="?([^";]+)"?/i)?.[1];
  const candidate = encodedFilename ?? plainFilename;
  if (candidate) {
    try {
      return decodeURIComponent(candidate).replace(/[\\/:*?"<>|]/g, "-");
    } catch {
      return candidate.replace(/[\\/:*?"<>|]/g, "-");
    }
  }

  try {
    const pathname = new URL(response.url).pathname;
    const segment = pathname.split("/").filter(Boolean).at(-1);
    return segment ? decodeURIComponent(segment) : "download";
  } catch {
    return "download";
  }
}

async function downloadFile(
  source: string,
  filename: string | undefined,
  signal: AbortSignal
) {
  const response = await fetch(source, { signal });
  if (!response.ok) {
    throw new Error(`Download failed with status ${response.status}`);
  }

  const blobUrl = URL.createObjectURL(await response.blob());
  const anchor = document.createElement("a");
  anchor.href = blobUrl;
  anchor.download = getDownloadFilename(response, filename);
  anchor.hidden = true;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
}

function LightboxDownload({
  className,
  disabled,
  onClick,
  ...props
}: Omit<LightboxActionButtonProps, "render">) {
  const { activeItem } = useLightbox();
  const download = getDownload(activeItem);
  const abortControllerRef = React.useRef<AbortController | null>(null);
  const resetTimerRef = React.useRef(0);
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  React.useEffect(
    () => () => {
      const controller = abortControllerRef.current;
      abortControllerRef.current = null;
      controller?.abort();
      window.clearTimeout(resetTimerRef.current);
    },
    [download?.src]
  );

  if (!download || disabled) return null;

  const statusMessage = {
    idle: "",
    loading: "Preparing download",
    success: "Download started",
    error: "Download failed",
  }[status];

  return (
    <>
      <Button
        data-slot="lightbox-download"
        type="button"
        variant="ghost"
        size="icon-lg"
        aria-label={
          status === "loading"
            ? "Preparing current item download"
            : "Download current item"
        }
        aria-busy={status === "loading" || undefined}
        className={cn(
          "text-white hover:bg-white/15 hover:text-white",
          className
        )}
        onClick={(event) => {
          onClick?.(event);
          if (event.defaultPrevented || status === "loading") return;

          abortControllerRef.current?.abort();
          window.clearTimeout(resetTimerRef.current);
          const controller = new AbortController();
          abortControllerRef.current = controller;
          setStatus("loading");
          void downloadFile(download.src, download.filename, controller.signal)
            .then(() => setStatus("success"))
            .catch((error: unknown) => {
              if (
                error instanceof DOMException &&
                error.name === "AbortError"
              ) {
                return;
              }
              setStatus("error");
            })
            .finally(() => {
              if (abortControllerRef.current === controller) {
                abortControllerRef.current = null;
                resetTimerRef.current = window.setTimeout(
                  () => setStatus("idle"),
                  2000
                );
              }
            });
        }}
        {...props}
      >
        <DownloadIcon aria-hidden="true" />
      </Button>
      <span className="sr-only" role="status" aria-live="polite">
        {statusMessage}
      </span>
    </>
  );
}

function LightboxMore({ className, ...props }: LightboxActionButtonProps) {
  const { activeIndex, activeItem, actions, controls } = useLightbox();
  const availableControls = controls.filter((control) => !control.disabled);
  if (availableControls.length === 0 || props.disabled) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            data-slot="lightbox-more"
            variant="ghost"
            size="icon-lg"
            aria-label="More actions"
            className={cn(
              "text-white hover:bg-white/15 hover:text-white",
              className
            )}
            {...props}
          />
        }
      >
        <EllipsisIcon aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-48"
        positionerClassName="z-80"
      >
        {availableControls.map((control) => (
          <DropdownMenuItem
            key={control.id}
            onClick={(event) =>
              control.onClick({
                item: activeItem,
                index: activeIndex,
                event,
                actions,
              })
            }
          >
            {control.icon}
            <span>{control.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function LightboxClose({
  className,
  children,
  ...props
}: DialogPrimitive.Close.Props) {
  return (
    <DialogPrimitive.Close
      data-slot="lightbox-close"
      aria-label="Close lightbox"
      render={
        <Button
          variant="ghost"
          size="icon-lg"
          className={cn(
            "text-white hover:bg-white/15 hover:text-white",
            className
          )}
        />
      }
      {...props}
    >
      {children ?? <XIcon aria-hidden="true" />}
    </DialogPrimitive.Close>
  );
}

export {
  Lightbox,
  LightboxBackdrop,
  LightboxCaptions,
  LightboxClose,
  LightboxContent,
  LightboxCounter,
  LightboxDownload,
  LightboxMore,
  LightboxNext,
  LightboxPrevious,
  LightboxSlide,
  LightboxSlides,
  LightboxThumbnail,
  LightboxThumbnails,
  LightboxToolbar,
  LightboxTrigger,
  LightboxViewport,
  LightboxZoom,
  LightboxZoomButton,
  useLightbox,
};

export type {
  LightboxActions,
  LightboxChangeReason,
  LightboxControl,
  LightboxControlContext,
  LightboxImageChangeEventDetails,
  LightboxImageItem,
  LightboxItem,
  LightboxOpenEventDetails,
  LightboxProps,
  LightboxTriggerProps,
  LightboxVideoItem,
};
