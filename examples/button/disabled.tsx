import { Button } from "@/registry/base/button";

export default function ButtonDisabledDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button>Available</Button>
      <Button disabled>Unavailable</Button>
      <Button disabled variant="outline">
        Disabled outline
      </Button>
    </div>
  );
}
