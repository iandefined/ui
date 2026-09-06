import { NoiseTexture } from "@/registry/base/noise-texture";

export default function NoiseTextureDemo() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative size-48 overflow-hidden rounded-2xl shadow-xl">
        <img
          alt="iandefined GitHub avatar"
          className="absolute inset-0 size-full object-cover grayscale brightness-50"
          src="https://github.com/iandefined.png?size=512"
        />
        <NoiseTexture className="opacity-[0.35]" frequency={0.8} />
      </div>
    </div>
  );
}
