import { Backlight } from "@/registry/base/backlight";

export default function BacklightVideoDemo() {
  return (
    <div className="flex w-full items-center justify-center px-6 py-10">
      <Backlight blur={20} className="w-full max-w-2xl">
        <div className="w-full">
          <div className="aspect-video w-full overflow-hidden rounded-xl">
            <video
              aria-label="Cyberpunk demo video"
              autoPlay
              className="size-full object-cover"
              controls
              loop
              muted
              playsInline
              preload="metadata"
              src="/assets/cyberpunk-demo.mp4"
            />
          </div>
        </div>
      </Backlight>
    </div>
  );
}
