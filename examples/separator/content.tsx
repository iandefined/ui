import { Button } from "@/registry/base/button";
import { Separator } from "@/registry/base/separator";

export default function SeparatorContentDemo() {
  return (
    <div className="grid w-full max-w-lg gap-8">
      <Separator.Root>
        <Separator.Content className="text-xs text-muted-foreground">
          or continue with
        </Separator.Content>
      </Separator.Root>

      <Separator.Root>
        <Separator.Content>
          <Button
            variant="ghost"
            size="xs"
            className="-mx-2 text-muted-foreground"
          >
            See more
          </Button>
        </Separator.Content>
      </Separator.Root>
    </div>
  );
}
