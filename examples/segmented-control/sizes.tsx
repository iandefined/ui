import {
  SegmentedControl,
  SegmentedControlItem,
} from "@/registry/base/segmented-control";

const sizes = ["sm", "default", "lg"] as const;

export default function SegmentedControlSizesDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col items-start gap-4">
      {sizes.map((size) => (
        <SegmentedControl
          aria-label={`${size} shirt size`}
          className="w-full"
          defaultValue="m"
          key={size}
          size={size}
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
      ))}
    </div>
  );
}
