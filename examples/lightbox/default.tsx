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
