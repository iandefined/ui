import { Textarea } from "@/registry/base/textarea";

export default function TextareaSizesDemo() {
  return (
    <div className="grid w-full max-w-md gap-3">
      <Textarea className="w-full" placeholder="Small" size="sm" />
      <Textarea className="w-full" placeholder="Default" />
      <Textarea className="w-full" placeholder="Large" size="lg" />
    </div>
  );
}
