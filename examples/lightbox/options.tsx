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
    caption: "Adjacent slides preload lazily",
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
    <Lightbox items={items} dir="rtl" peek preload={2}>
      <LightboxTrigger index={0} render={<Button variant="outline" />}>
        Open RTL gallery
      </LightboxTrigger>
    </Lightbox>
  );
}
