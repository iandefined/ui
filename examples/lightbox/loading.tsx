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
