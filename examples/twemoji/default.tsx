import { Twemoji } from "@/registry/base/twemoji";

export default function TwemojiDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 text-center">
      <p className="text-base text-foreground">
        <Twemoji>Hello from the Philippines 🇵🇭 👋</Twemoji>
      </p>
      <p className="text-sm text-muted-foreground">
        <Twemoji>Built with modern React ⚛️, fast Vite ⚡, and love ❤️</Twemoji>
      </p>
    </div>
  );
}
