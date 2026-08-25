import { Input } from "@/registry/base/input";

export default function InputSizesDemo() {
  return (
    <div className="grid w-full max-w-sm gap-3">
      <Input aria-label="Small input" placeholder="Small" size="sm" />
      <Input aria-label="Default input" placeholder="Default" />
      <Input aria-label="Large input" placeholder="Large" size="lg" />
    </div>
  );
}
