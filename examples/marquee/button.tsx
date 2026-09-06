import { Button } from "@/registry/base/button";
import { Marquee } from "@/registry/base/marquee";

export default function MarqueeButtonDemo() {
  return (
    <Button
      className="w-48 justify-start overflow-hidden px-2"
      variant="outline"
    >
      <Marquee
        className="min-w-0 flex-1 text-left text-sm"
        gap="2rem"
        onlyOnOverflow
        speed={24}
      >
        Read the complete release notes for this update
      </Marquee>
    </Button>
  );
}
