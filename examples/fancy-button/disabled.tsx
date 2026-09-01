import { FancyButton } from "@/registry/base/fancy-button";

export default function FancyButtonDisabledDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <FancyButton>Available</FancyButton>
      <FancyButton disabled>Unavailable</FancyButton>
    </div>
  );
}
