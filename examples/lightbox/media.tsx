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
