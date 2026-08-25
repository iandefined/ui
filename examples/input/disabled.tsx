import { Input } from "@/registry/base/input";

export default function InputDisabledDemo() {
  return (
    <Input
      aria-label="Disabled"
      className="w-full max-w-sm"
      disabled
      placeholder="Disabled"
    />
  );
}
