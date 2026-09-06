import { NoiseTexture } from "@/registry/base/noise-texture";

export default function NoiseTextureFrequencyDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 p-6">
      <div className="relative flex size-28 flex-col items-center justify-center overflow-hidden rounded-xl text-white shadow">
        <img
          alt="iandefined GitHub avatar"
          className="absolute inset-0 size-full object-cover grayscale brightness-50"
          src="https://github.com/iandefined.png?size=512"
        />
        <NoiseTexture className="opacity-[0.15]" frequency={0.2} />
        <span className="relative z-10 text-xs font-medium text-white/90">
          0.2 Freq
        </span>
        <span className="relative z-10 text-[10px] font-medium text-white/90">
          Coarse
        </span>
      </div>

      <div className="relative flex size-28 flex-col items-center justify-center overflow-hidden rounded-xl text-white shadow">
        <img
          alt="iandefined GitHub avatar"
          className="absolute inset-0 size-full object-cover grayscale brightness-50"
          src="https://github.com/iandefined.png?size=512"
        />
        <NoiseTexture className="opacity-[0.15]" frequency={0.5} />
        <span className="relative z-10 text-xs font-medium text-white/90">
          0.5 Freq
        </span>
        <span className="relative z-10 text-[10px] font-medium text-white/90">
          Default fine
        </span>
      </div>

      <div className="relative flex size-28 flex-col items-center justify-center overflow-hidden rounded-xl text-white shadow">
        <img
          alt="iandefined GitHub avatar"
          className="absolute inset-0 size-full object-cover grayscale brightness-50"
          src="https://github.com/iandefined.png?size=512"
        />
        <NoiseTexture className="opacity-[0.15]" frequency={0.8} />
        <span className="relative z-10 text-xs font-medium text-white/90">
          0.8 Freq
        </span>
        <span className="relative z-10 text-[10px] font-medium text-white/90">
          Ultra fine
        </span>
      </div>
    </div>
  );
}
