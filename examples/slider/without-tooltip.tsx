import {
  Slider,
  SliderContent,
  SliderControl,
  SliderLabel,
  SliderValue,
} from "@/registry/base/slider";

export default function SliderWithoutTooltipDemo() {
  return (
    <Slider className="w-full max-w-sm" defaultValue={60} hideTooltip>
      <SliderControl>
        <SliderContent>
          <SliderLabel>Volume</SliderLabel>
          <SliderValue className="ms-auto" />
        </SliderContent>
      </SliderControl>
    </Slider>
  );
}
