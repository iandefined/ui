import { Marquee } from "@/registry/base/marquee";

export default function MarqueeTextDemo() {
  return (
    <div className="grid w-full max-w-2xl gap-3 sm:grid-cols-2">
      <div className="min-w-0 rounded-xl border border-border/70 bg-muted/20 p-4">
        <p className="mb-2 text-xs font-medium text-muted-foreground">
          Fits without motion
        </p>
        <Marquee className="text-sm font-medium" onlyOnOverflow>
          Fast, focused, and ready.
        </Marquee>
      </div>
      <div className="min-w-0 rounded-xl border border-border/70 bg-muted/20 p-4">
        <p className="mb-2 text-xs font-medium text-muted-foreground">
          Scrolls only when needed
        </p>
        <Marquee className="text-sm font-medium" onlyOnOverflow speed={32}>
          This line is longer than its container, so Marquee measures the
          natural width and starts scrolling automatically.
        </Marquee>
      </div>
    </div>
  );
}
