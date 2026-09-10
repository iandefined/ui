import { Backlight } from "@/registry/base/backlight";

const youtubeThumbnailUrl =
  "https://i.ytimg.com/vi/q-74HTjRbuY/maxresdefault.jpg";

export default function BacklightYoutubeDemo() {
  return (
    <div className="flex w-full items-center justify-center px-6 py-10">
      <div className="relative w-full max-w-2xl">
        <Backlight
          blur={20}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="w-full">
            <div className="aspect-video w-full overflow-hidden rounded-xl">
              <img
                alt=""
                className="size-full object-cover opacity-70"
                src={youtubeThumbnailUrl}
              />
            </div>
          </div>
        </Backlight>
        <iframe
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="relative z-10 aspect-video w-full rounded-xl"
          src="https://www.youtube.com/embed/q-74HTjRbuY"
          title="The Complete Svelte 5 Course"
        />
      </div>
    </div>
  );
}
