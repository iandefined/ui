import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ButtonWithIconDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="outline" size="icon">
        <Plus />
      </Button>
      <Button variant="outline" size="icon" radius="full">
        <Plus />
      </Button>
    </div>
  );
}
