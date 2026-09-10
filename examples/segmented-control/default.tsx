import {
  SegmentedControl,
  SegmentedControlItem,
} from "@/registry/base/segmented-control";

export default function SegmentedControlDefaultDemo() {
  return (
    <SegmentedControl
      aria-label="Shirt size"
      className="w-full max-w-sm"
      defaultValue="m"
      name="shirtSize"
    >
      <SegmentedControlItem className="flex-1" value="s">
        S
      </SegmentedControlItem>
      <SegmentedControlItem className="flex-1" value="m">
        M
      </SegmentedControlItem>
      <SegmentedControlItem className="flex-1" value="l">
        L
      </SegmentedControlItem>
    </SegmentedControl>
  );
}
