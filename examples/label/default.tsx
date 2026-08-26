import { Input } from "@/registry/base/input";
import { Label } from "@/registry/base/label";

export default function LabelDemo() {
  return (
    <div className="flex flex-col items-start gap-2">
      <Label htmlFor="email">Email</Label>
      <Input
        aria-label="Email"
        id="email"
        placeholder="you@example.com"
        type="email"
      />
    </div>
  );
}
