import { NoiseTexture } from "@/registry/base/noise-texture";

export default function NoiseTextureOpacityDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 p-6">
      <div className="relative flex size-28 flex-col items-center justify-center overflow-hidden rounded-xl text-white shadow">
        <img
          alt="iandefined GitHub avatar"
          className="absolute inset-0 size-full object-cover grayscale brightness-50"
          src="https://github.com/iandefined.png?size=512"
        />
        <NoiseTexture className="opacity-[0.05]" />
        <span className="relative z-10 text-xs font-medium text-white/90">
          5% Opacity
        </span>
        <span className="relative z-10 text-[10px] font-medium text-white/90">
          Barely there
        </span>
      </div>

      <div className="relative flex size-28 flex-col items-center justify-center overflow-hidden rounded-xl text-white shadow">
        <img
          alt="iandefined GitHub avatar"
          className="absolute inset-0 size-full object-cover grayscale brightness-50"
          src="https://github.com/iandefined.png?size=512"
        />
        <NoiseTexture className="opacity-[0.1]" />
        <span className="relative z-10 text-xs font-medium text-white/90">
          10% Opacity
        </span>
        <span className="relative z-10 text-[10px] font-medium text-white/90">
          Subtle analog
        </span>
      </div>

      <div className="relative flex size-28 flex-col items-center justify-center overflow-hidden rounded-xl text-white shadow">
        <img
          alt="iandefined GitHub avatar"
          className="absolute inset-0 size-full object-cover grayscale brightness-50"
          src="https://github.com/iandefined.png?size=512"
        />
        <NoiseTexture className="opacity-[0.25]" />
        <span className="relative z-10 text-xs font-medium text-white/90">
          25% Opacity
        </span>
        <span className="relative z-10 text-[10px] font-medium text-white/90">
          Tactile grain
        </span>
      </div>
    </div>
  );
}
