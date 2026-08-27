import { Button } from "@/registry/base/button";
import {
  Popover,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/base/popover";
import { Textarea } from "@/registry/base/textarea";

export default function PopoverWithFormDemo() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        Send feedback
      </PopoverTrigger>
      <PopoverPopup className="w-80">
        <div className="mb-4">
          <PopoverTitle className="text-base">Send us feedback</PopoverTitle>
          <PopoverDescription className="mt-2">
            Let us know how we can improve.
          </PopoverDescription>
        </div>
        <form
          className="flex w-full flex-col gap-4"
          onSubmit={(event) => event.preventDefault()}
        >
          <Textarea
            aria-label="Send feedback"
            placeholder="How can we improve?"
          />
          <Button type="submit">Send feedback</Button>
        </form>
      </PopoverPopup>
    </Popover>
  );
}
