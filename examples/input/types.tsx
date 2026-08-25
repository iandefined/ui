import { Input } from "@/registry/base/input";

export default function InputTypesDemo() {
  return (
    <div className="flex w-80 flex-col gap-4">
      <label className="grid gap-1 text-sm text-muted-foreground">
        Email
        <Input placeholder="jane@example.com" type="email" />
      </label>
      <label className="grid gap-1 text-sm text-muted-foreground">
        Password
        <Input placeholder="••••••••" type="password" />
      </label>
    </div>
  );
}
