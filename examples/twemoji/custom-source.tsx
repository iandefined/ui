import { Twemoji } from "@/registry/base/twemoji";

export default function TwemojiCustomSourceDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 text-center text-sm">
      <p>
        <Twemoji
          source={(codePoint) =>
            `https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/${codePoint}.svg`
          }
        >
          Resolved from jsDelivr CDN 🚀 🎨 ✨
        </Twemoji>
      </p>
    </div>
  );
}
