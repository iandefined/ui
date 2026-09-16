# Lightbox

Browse images and rich media in an accessible, gesture-friendly gallery.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

Use `Lightbox` when an image or media collection should open above the page without losing the context of the original content. It discovers standalone images automatically, or accepts an explicit item list when the trigger and gallery content need to be separated.

## Preview

```tsx
import { Lightbox } from "@/registry/base/lightbox";

const photos = [
  {
    src: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=85",
    alt: "A winding road through a green mountain valley",
    caption: "Mountain road",
  },
  {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=85",
    alt: "A calm lake surrounded by pine trees",
    caption: "Quiet water",
  },
  {
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85",
    alt: "Snowy peaks beneath a blue sky",
    caption: "High country",
  },
  {
    src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1600&q=85",
    alt: "A cabin beside a lake at sunset",
    caption: "Lakeside cabin",
  },
] as const;

export default function LightboxDefaultDemo() {
  return (
    <Lightbox>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {photos.map((photo) => (
          <img
            key={photo.src}
            className="aspect-square w-full cursor-zoom-in rounded-lg object-cover"
            src={photo.src}
            alt={photo.alt}
            data-lightbox-caption={photo.caption}
          />
        ))}
      </div>
    </Lightbox>
  );
}
```

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/lightbox.json
```

## Usage

The simplest form wraps standalone images. The lightbox reads each image's `src`, responsive source attributes, dimensions, `alt`, and optional `data-lightbox-caption`.

```tsx
import { Lightbox } from "@/components/ui/lightbox";

<Lightbox>
  <img
    src="/images/forest.jpg"
    alt="A forest path"
    data-lightbox-caption="A walk through the forest"
  />
  <img src="/images/lake.jpg" alt="A lake at sunrise" />
</Lightbox>;
```

Use `items` when the gallery includes video or when the trigger and gallery content need to be separated. Supplying `items` disables automatic child scanning.

```tsx
import { Button } from "@/components/ui/button";
import {
  Lightbox,
  LightboxTrigger,
  type LightboxItem,
} from "@/components/ui/lightbox";

const items = [
  {
    type: "image",
    src: "/images/mountain.jpg",
    alt: "A mountain ridge",
    caption: "Morning above the clouds",
  },
] satisfies LightboxItem[];

<Lightbox items={items}>
  <LightboxTrigger index={0} render={<Button />}>
    Open lightbox
  </LightboxTrigger>
</Lightbox>;
```

## Composition

`Lightbox` renders the standard toolbar, navigation, captions, and thumbnail rail. Pass an explicit `LightboxContent` to own that interface with the composable parts.

```tsx
import {
  Lightbox,
  LightboxCaptions,
  LightboxClose,
  LightboxContent,
  LightboxCounter,
  LightboxDownload,
  LightboxMore,
  LightboxNext,
  LightboxPrevious,
  LightboxSlides,
  LightboxThumbnails,
  LightboxToolbar,
  LightboxTrigger,
  LightboxZoomButton,
} from "@/components/ui/lightbox";

<Lightbox items={items}>
  <LightboxTrigger index={0} />
  <LightboxContent>
    <LightboxCounter />
    <LightboxToolbar>
      <LightboxDownload />
      <LightboxZoomButton />
      <LightboxMore />
      <LightboxClose />
    </LightboxToolbar>
    <LightboxPrevious />
    <LightboxSlides />
    <LightboxNext />
    <LightboxCaptions />
    <LightboxThumbnails />
  </LightboxContent>
</Lightbox>;
```

Every part exposes a stable `data-slot` attribute and supports the standard props for its underlying element. `LightboxZoom` is available when a composed slide needs to opt into the lightbox transform layer.

## Examples

### Explicit Items and Custom Trigger

Use multiple `LightboxTrigger` instances to open the same collection at different indexes.

```tsx
import { Button } from "@/registry/base/button";
import {
  Lightbox,
  LightboxTrigger,
  type LightboxItem,
} from "@/registry/base/lightbox";

const items = [
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1800&q=85",
    alt: "A starry sky above a snowy mountain",
    caption: "Night over the ridge",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=1800&q=85",
    alt: "A forest path covered with autumn leaves",
    caption: "The long way home",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1800&q=85",
    alt: "Sunlight over a broad desert landscape",
    caption: "Open horizon",
  },
] satisfies LightboxItem[];

export default function LightboxItemsDemo() {
  return (
    <Lightbox items={items}>
      <div className="flex flex-wrap items-center gap-3">
        <LightboxTrigger index={0} render={<Button />}>
          Open the collection
        </LightboxTrigger>
        <LightboxTrigger index={2} render={<Button variant="outline" />}>
          Start at the last image
        </LightboxTrigger>
      </div>
    </Lightbox>
  );
}
```

### Image and Video Media

Use a first-class video item alongside images. When both `thumbnail` and `poster` are omitted, the lightbox derives the thumbnail from the video automatically. Native video props are passed through with `videoProps`.

```tsx
import { Button } from "@/registry/base/button";
import {
  Lightbox,
  LightboxTrigger,
  type LightboxItem,
} from "@/registry/base/lightbox";

const items = [
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1800&q=85",
    alt: "Sunlight filtering through a dense forest",
    caption: "A quiet place",
  },
  {
    type: "video",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    label: "A flower moving in the breeze",
    caption: "A small study in motion",
    videoProps: {
      controls: true,
      playsInline: true,
      preload: "metadata",
    },
  },
] satisfies LightboxItem[];

export default function LightboxMediaDemo() {
  return (
    <Lightbox items={items}>
      <div className="flex flex-wrap items-center gap-3">
        <LightboxTrigger index={0} render={<Button variant="outline" />}>
          Open photo
        </LightboxTrigger>
        <LightboxTrigger index={1} render={<Button />}>
          Open video
        </LightboxTrigger>
      </div>
    </Lightbox>
  );
}
```

### Loading Strategy

Use `loading="lazy"` to defer inactive slide media and offscreen thumbnails, or `loading="eager"` to preload the configured adjacent slides and carousel media. Lazy slides use a loading spinner while thumbnail slots retain shimmer Skeleton placeholders.

```tsx
import { Button } from "@/registry/base/button";
import {
  Lightbox,
  LightboxTrigger,
  type LightboxItem,
} from "@/registry/base/lightbox";

const items = [
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=85",
    thumbnailSrc:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=160&q=70",
    alt: "A winding road through a mountain valley",
    caption: "Mountain road",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85",
    thumbnailSrc:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=160&q=70",
    alt: "Snow-covered mountain peaks beneath a clear sky",
    caption: "High country",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1600&q=85",
    thumbnailSrc:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=160&q=70",
    alt: "A cabin beside a reflective alpine lake",
    caption: "Lakeside cabin",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=85",
    thumbnailSrc:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=160&q=70",
    alt: "A river crossing a broad mountain landscape",
    caption: "Open valley",
  },
] satisfies LightboxItem[];

export default function LightboxLoadingDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Lightbox items={items} loading="lazy">
        <LightboxTrigger render={<Button variant="outline" />}>
          Lazy loading
        </LightboxTrigger>
      </Lightbox>

      <Lightbox items={items} loading="eager">
        <LightboxTrigger render={<Button variant="outline" />}>
          Eager loading
        </LightboxTrigger>
      </Lightbox>
    </div>
  );
}
```

### Isolated Images

Set `noCarousel` when each image should open independently instead of as a collection, and add `noCounter` when the collection count is not useful. The lightbox hides the carousel, previous and next controls, and mounts only the selected item. This is useful for image-heavy wikis and long-form documentation because unopened images are not mounted as lightbox slides. Use `noControls` separately when the toolbar should also be hidden.

```tsx
import { Lightbox } from "@/registry/base/lightbox";

const photos = [
  {
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=85",
    alt: "Sunlight entering a dense green forest",
  },
  {
    src: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85",
    alt: "A winding road through a broad mountain valley",
  },
  {
    src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=85",
    alt: "A cabin beside a reflective alpine lake",
  },
  {
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=85",
    alt: "A river crossing a wide mountain landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85",
    alt: "Snow-covered mountain peaks beneath a clear sky",
  },
  {
    src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=85",
    alt: "A sunlit desert stretching toward the horizon",
  },
] as const;

export default function LightboxIsolatedGalleryDemo() {
  return (
    <Lightbox noCarousel noCounter>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {photos.map((photo) => (
          <img
            key={photo.src}
            className="aspect-[4/3] w-full cursor-zoom-in rounded-lg object-cover"
            src={photo.src}
            alt={photo.alt}
          />
        ))}
      </div>
    </Lightbox>
  );
}
```

### Custom Controls and Events

Add actions to the More menu with `controls`, and use the lifecycle callbacks to synchronize application state.

```tsx
"use client";

import { HeartIcon, InfoIcon, Share2Icon } from "lucide-react";
import * as React from "react";

import { Button } from "@/registry/base/button";
import {
  Lightbox,
  LightboxTrigger,
  type LightboxControl,
  type LightboxItem,
} from "@/registry/base/lightbox";

const items = [
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=85",
    alt: "A valley with a river between mountain ranges",
    caption: "Follow the river",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1800&q=85",
    alt: "A sunlit forest with a path through the trees",
    caption: "Into the trees",
  },
] satisfies LightboxItem[];

export default function LightboxControlsDemo() {
  const [lastEvent, setLastEvent] = React.useState("Ready");
  const [saved, setSaved] = React.useState(false);

  const controls = React.useMemo<LightboxControl[]>(
    () => [
      {
        id: "favorite",
        icon: <HeartIcon />,
        label: saved ? "Remove from favorites" : "Add to favorites",
        onClick: () => setSaved((value) => !value),
      },
      {
        id: "share",
        icon: <Share2Icon />,
        label: "Share image",
        onClick: () => setLastEvent("Share pressed"),
      },
      {
        id: "details",
        icon: <InfoIcon />,
        label: "Show image details",
        onClick: ({ index }) => setLastEvent(`Details for image ${index + 1}`),
      },
    ],
    [saved]
  );

  return (
    <div className="space-y-3">
      <Lightbox
        items={items}
        controls={controls}
        onOpen={() => setLastEvent("Opened")}
        onClose={() => setLastEvent("Closed")}
        onChangeImage={(index) => setLastEvent(`Image ${index + 1}`)}
      >
        <LightboxTrigger index={0} render={<Button />}>
          Open with controls
        </LightboxTrigger>
      </Lightbox>
      <p className="text-sm text-muted-foreground" aria-live="polite">
        {lastEvent}
        {saved ? " • Saved" : ""}
      </p>
    </div>
  );
}
```

### Custom Composition

Replace the default interface with `LightboxContent` and compose only the parts the experience needs.

```tsx
"use client";

import { useState } from "react";

import { Button } from "@/registry/base/button";
import {
  Lightbox,
  LightboxCaptions,
  LightboxContent,
  LightboxCounter,
  LightboxDownload,
  LightboxMore,
  LightboxNext,
  LightboxPrevious,
  LightboxSlides,
  LightboxThumbnails,
  LightboxToolbar,
  LightboxTrigger,
  LightboxZoomButton,
  LightboxClose,
  useLightbox,
  type LightboxItem,
} from "@/registry/base/lightbox";

const items = [
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1800&q=85",
    alt: "A desert road leading toward distant mountains",
    caption: "Choose your own layout",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1800&q=85",
    alt: "A road curving through a mountain landscape",
    caption: "Keep the focus on the image",
  },
] satisfies LightboxItem[];

function EditorialReviewChrome() {
  const { activeIndex, activeItem } = useLightbox();
  const [approvedIndices, setApprovedIndices] = useState<number[]>([]);
  const isApproved = approvedIndices.includes(activeIndex);

  const toggleApproval = () => {
    setApprovedIndices((current) =>
      isApproved
        ? current.filter((index) => index !== activeIndex)
        : [...current, activeIndex]
    );
  };

  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-start justify-between gap-4 p-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:p-4">
        <div className="pointer-events-auto flex min-w-0 items-center gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">
              Editorial review
            </p>
            <p className="truncate text-xs text-white/60">
              Select a cover image
            </p>
          </div>
        </div>
        <LightboxToolbar>
          <LightboxDownload />
          <LightboxZoomButton />
          <LightboxMore />
          <LightboxClose />
        </LightboxToolbar>
      </div>

      <LightboxSlides />
      <LightboxPrevious />
      <LightboxNext />

      <div className="pb-8 pointer-events-none absolute inset-x-0 bottom-0 z-30 flex flex-col items-center gap-3 px-3 sm:px-4">
        <div className="pointer-events-auto flex w-full max-w-2xl items-center justify-center gap-3">
          <Button
            size="lg"
            type="button"
            className="text-white text-lg"
            color={isApproved ? "#dc2626" : "#7c3aed"}
            aria-pressed={isApproved}
            onClick={toggleApproval}
          >
            {isApproved ? "Deselect" : "Select"}
          </Button>
        </div>
        <span className="sr-only" aria-live="polite">
          {activeItem?.type === "image" ? activeItem.alt : "Current media"}{" "}
          {isApproved ? "selected" : "not selected"}
        </span>
      </div>
    </>
  );
}

export default function LightboxCompositionDemo() {
  return (
    <Lightbox items={items}>
      <LightboxTrigger index={0} render={<Button variant="outline" />}>
        Open composed lightbox
      </LightboxTrigger>

      <LightboxContent>
        <EditorialReviewChrome />
      </LightboxContent>
    </Lightbox>
  );
}
```

### Responsive Sources and RTL

Use `srcSet` and `sizes` for responsive loading, and pass `dir="rtl"` to mirror navigation and thumbnail order.

```tsx
import { Button } from "@/registry/base/button";
import {
  Lightbox,
  LightboxTrigger,
  type LightboxItem,
} from "@/registry/base/lightbox";

const items = [
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80",
    srcSet:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80 800w, https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=85 1600w",
    sizes: "(max-width: 640px) 100vw, 80vw",
    alt: "A mountain valley with a winding road",
    caption: "Responsive source selection",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    srcSet:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80 800w, https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85 1600w",
    sizes: "(max-width: 640px) 100vw, 80vw",
    alt: "Snowy mountain peaks above a green valley",
    caption: "Responsive sources preserve browser selection",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80",
    srcSet:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80 800w, https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1600&q=85 1600w",
    sizes: "(max-width: 640px) 100vw, 80vw",
    alt: "A cabin beside a reflective lake",
    caption: "The gallery is right-to-left",
  },
] satisfies LightboxItem[];

export default function LightboxOptionsDemo() {
  return (
    <Lightbox items={items} dir="rtl" preload={2}>
      <LightboxTrigger index={0} render={<Button variant="outline" />}>
        Open RTL gallery
      </LightboxTrigger>
    </Lightbox>
  );
}
```

## Features

- On desktop, click the zoom button once to toggle between fit and 2× zoom. Scroll-wheel zoom is continuous, smoothly interpolated, and centered on the pointer; Ctrl plus scroll also zooms at the cursor.
- On touch devices, double-tap toggles zoom and pinch zooms directly around the gesture center. Zoom transitions are animated and interruptible.
- Pan zoomed slides with a finger, mouse, trackpad, or arrow keys.
- Swipe horizontally to change slides and drag down on touch to dismiss. Gestures are interruptible and respect the current zoom level.
- Pull up or down at fit scale to dismiss. The backdrop fades progressively with the pull distance.
- Opening uses Glare-style measured shared-element motion when a source is available. Closing uses the ordinary dialog transition, and reduced motion falls back to opacity.
- Only the active slide and the configured preload window are rendered. Use `loading="lazy"` to show a spinner for unloaded slides and defer thumbnail media until its shimmer-backed slot enters the carousel viewport. Loaded media is cached for the lifetime of the lightbox, and responsive images preserve `srcSet` and `sizes`.
- `prefers-reduced-motion` switches to opacity-only transitions.
- Controls that are unavailable for the active item, such as Download for a video without a download target, are omitted from the toolbar rather than shown disabled.
- Download fetches the active asset and saves it without opening a new tab. Cross-origin assets must permit CORS; failures are announced without navigating away.

## Accessibility

The lightbox is a modal dialog with a focus trap, focus restoration, Escape dismissal, and full keyboard navigation. It provides a stable accessible name, a numbered slide group, caption descriptions, a polite image-change announcement, and roving focus for thumbnails.

At fit scale, Left and Right move between slides. When zoomed, the arrow keys pan the image; hold Shift with an arrow to change slides. On desktop, use the zoom button once to toggle between fit and 2×; `+` or `=` zooms in, `-` zooms out, and `0` resets zoom. On touch devices, double-tap toggles between fit and 2×, while pinch zoom remains continuous. Navigation and these key bindings mirror when `dir="rtl"` is set.

Give every explicit image item a meaningful `alt`. Label video items with `label`, and provide a keyboard-accessible `LightboxTrigger` when the source is not a standalone image.

## API Reference

### `Lightbox` props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `items` | `LightboxItem[]` | `-` | Explicit gallery items. When supplied, descendant images are not scanned. |
| `open` | `boolean` | `-` | Controls whether the lightbox is open. |
| `defaultOpen` | `boolean` | `false` | Sets the initial open state for an uncontrolled lightbox. |
| `index` | `number` | `-` | Controls the active item index. |
| `defaultIndex` | `number` | `0` | Sets the initial item index for an uncontrolled lightbox. |
| `onOpenChange` | `(open: boolean, details: BaseUIChangeEventDetails) => void` | `-` | Runs when the open state changes. The details object includes the Base UI event reason and supports cancellation. |
| `onOpen` | `(details: LightboxOpenEventDetails) => void` | `-` | Runs when an open request is accepted. |
| `onClose` | `(details: LightboxOpenEventDetails) => void` | `-` | Runs when a close request is accepted. |
| `onOpenChangeComplete` | `(open: boolean) => void` | `-` | Runs after the open or close transition completes. |
| `onChangeImage` | `(index: number, item: LightboxItem, details: LightboxImageChangeEventDetails) => void` | `-` | Runs after the active item changes. |
| `overlay` | `"blur" \| "brightness"` | `blur` | Selects the backdrop treatment. `blur` combines a dark surface with backdrop blur. `brightness` uses a plain dark dimmer. |
| `noCounter` | `boolean` | `false` | Hides the current item counter without changing gallery navigation. |
| `noCarousel` | `boolean` | `false` | Disables slide navigation, hides the thumbnail rail and previous and next controls, and mounts only the selected item. |
| `noControls` | `boolean` | `false` | Hides the top-end toolbar, including download, zoom, More, and Close. |
| `loading` | `"lazy" \| "eager"` | `eager` | When set to `lazy`, prevents inactive slide media from loading and only mounts thumbnail media after its carousel slot becomes visible. The active item always loads. Images rendered as auto-discovered children may already have been requested by the page before the lightbox opens. |
| `loop` | `boolean` | `true` | Wraps navigation from the last item to the first item and back. |
| `preload` | `number` | `1` | Number of adjacent slide shells to render on each side. Their media is preloaded when `loading="eager"` is used. |
| `maxZoom` | `number` | `4` | Maximum zoom multiplier for lightbox-managed media transforms. |
| `controls` | `LightboxControl[]` | `-` | Adds labeled actions to the More menu. Each control supplies an `id`, an `icon`, a `label`, and an `onClick` callback. Controls marked unavailable for the active item are omitted. |
| `dir` | `"ltr" \| "rtl"` | `-` | Controls slide order, arrow meaning, thumbnail order, and transition direction. It inherits the document direction when omitted. |

### `LightboxItem`

```tsx
type LightboxImageItem = {
  id?: string;
  type: "image";
  src: string;
  alt: string;
  width?: number;
  height?: number;
  srcSet?: string;
  sizes?: string;
  thumbnailSrc?: string;
  thumbnail?: React.ReactNode;
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
```

Use `thumbnail` to render any React node in the thumbnail slot; plain strings
work too. Image items can use `thumbnailSrc` as a URL shorthand. A video item
can omit both `thumbnail` and `poster` to derive a thumbnail automatically.

### Composable parts

`LightboxTrigger`, `LightboxContent`, `LightboxBackdrop`, `LightboxViewport`, `LightboxSlides`, `LightboxSlide`, `LightboxZoom`, `LightboxToolbar`, `LightboxCounter`, `LightboxCaptions`, `LightboxThumbnails`, `LightboxThumbnail`, `LightboxPrevious`, `LightboxNext`, `LightboxZoomButton`, `LightboxDownload`, `LightboxMore`, and `LightboxClose` are exported primitives. Use `useLightbox` inside a descendant to access the current item, index, open state, zoom state, navigation actions, and close action.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `LightboxTrigger.index` | `number` | `0` | Selects the item that opens when this trigger is pressed. |
| `LightboxTrigger.morph` | `boolean` | `-` | Enables or disables measured shared-element opening motion for this trigger. It is inferred for image-like elements when omitted. |
| `LightboxSlide.index` | `number` | `-` | Selects the item rendered by the slide. |
| `LightboxSlide.active` | `boolean` | `false` | Marks the slide as the active item. |
| `LightboxZoom.active` | `boolean` | `true` | Registers this zoom surface as the active gesture target. |
| `LightboxThumbnail.index` | `number` | `-` | Selects the item represented by the thumbnail. |
