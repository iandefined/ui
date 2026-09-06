import { Twemoji } from "@/registry/base/twemoji";

export default function TwemojiSizesDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
      <p className="text-xs text-muted-foreground">
        <Twemoji>Extra small inline emoji 🚀 ✨</Twemoji>
      </p>
      <p className="text-sm">
        <Twemoji>Small body inline emoji 🚀 ✨</Twemoji>
      </p>
      <p className="text-base font-medium">
        <Twemoji>Base typography inline emoji 🚀 ✨</Twemoji>
      </p>
      <p className="text-xl font-semibold">
        <Twemoji>Large heading inline emoji 🚀 ✨</Twemoji>
      </p>
    </div>
  );
}
