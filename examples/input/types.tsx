import { Input } from "@/registry/base/input";
import { Label } from "@/registry/base/label";

export default function InputTypesDemo() {
  return (
    <div className="flex w-80 flex-col gap-4">
      <div className="grid gap-1 text-muted-foreground">
        <Label htmlFor="email">Email</Label>
        <Input id="email" placeholder="jane@example.com" type="email" />
      </div>
      <div className="grid gap-1 text-muted-foreground">
        <Label htmlFor="password">Password</Label>
        <Input id="password" placeholder="••••••••" type="password" />
      </div>
    </div>
  );
}
