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
    <Lightbox navigation={false}>
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
