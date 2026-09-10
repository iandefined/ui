import { Backlight } from "@/registry/base/backlight";

export default function BacklightPngDemo() {
  return (
    <div className="flex w-full items-center justify-center px-6 py-10">
      <Backlight className="w-full max-w-2xl">
        <div className="w-full">
          <div className="w-full overflow-hidden rounded-xl">
            <img
              alt="Cute React wordmark"
              className="h-auto w-full object-contain"
              height="400"
              src="/assets/cute-react-wordmark.png"
              width="782"
            />
          </div>
        </div>
      </Backlight>
    </div>
  );
}
