import {
  Slider,
  SliderContent,
  SliderControl,
  SliderLabel,
  SliderValue,
} from "@/registry/base/slider";

export default function SliderDisabledDemo() {
  return (
    <Slider className="w-full max-w-sm" defaultValue={2} disabled max={4}>
      <SliderControl>
        <SliderContent>
          <SliderLabel>Roundness</SliderLabel>
          <SliderValue className="ms-auto" />
        </SliderContent>
      </SliderControl>
    </Slider>
  );
}
