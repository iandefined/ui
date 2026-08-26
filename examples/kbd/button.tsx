import { Button } from "@/registry/base/button";
import { Kbd } from "@/registry/base/kbd";

export default function KbdButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button className="pr-2" size="sm" variant="outline">
        Accept <Kbd>⏎</Kbd>
      </Button>
      <Button className="pr-2" size="sm" variant="outline">
        Cancel <Kbd>Esc</Kbd>
      </Button>
    </div>
  );
}
