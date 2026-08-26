import { Kbd, KbdGroup } from "@/registry/base/kbd";

export default function KbdGroupDemo() {
  return (
    <p className="text-sm text-muted-foreground">
      Use{" "}
      <KbdGroup>
        <Kbd>Ctrl + B</Kbd>
        <Kbd>Ctrl + K</Kbd>
      </KbdGroup>{" "}
      to open the command palette.
    </p>
  );
}
