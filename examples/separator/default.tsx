import { Separator } from "@/registry/base/separator";

export default function SeparatorDefaultDemo() {
  return (
    <div className="max-w-72">
      <div className="space-y-1">
        <h4 className="text-sm font-medium">iandefined/ui</h4>
        <p className="text-sm text-muted-foreground">
          A utilitarian component registry for product-oriented engineers.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex items-center gap-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
        <Separator orientation="vertical" />
        <div>Releases</div>
      </div>
    </div>
  );
}
