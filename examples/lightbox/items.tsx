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
