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
