import { Button } from "@/registry/base/button";
import {
  Dialog,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/base/dialog";

const footerVariants = [
  { scroll: "inside", variant: "default" },
  { scroll: "inside", variant: "inset" },
  { scroll: "outside", variant: "default" },
  { scroll: "outside", variant: "inset" },
] as const;

const cards = Array.from({ length: 12 }, (_, index) => ({
  description: `Scrollable dialog content item ${index + 1}.`,
  title: `Card ${index + 1}`,
}));

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function DialogFooterBehaviorDemo() {
  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
      {footerVariants.map(({ scroll, variant }) => {
        const scrollLabel = capitalize(scroll);
        const variantLabel = capitalize(variant);

        return (
          <Dialog key={`${scroll}-${variant}`}>
            <DialogTrigger
              render={
                <Button
                  className="h-auto min-h-8 w-full whitespace-normal"
                  size="sm"
                  variant="outline"
                />
              }
            >
              {scrollLabel}, {variantLabel}
            </DialogTrigger>
            <DialogContent
              className="sm:max-w-lg"
              scroll={scroll}
              variant={variant}
            >
              <DialogHeader>
                <DialogTitle>{scrollLabel}-scroll dialog</DialogTitle>
                <DialogDescription>
                  {scroll === "inside"
                    ? "The body scrolls while the footer remains visible."
                    : "The footer travels with the complete dialog card."}
                </DialogDescription>
              </DialogHeader>
              <DialogBody fadeEdges={scroll === "inside" ? "y" : false}>
                <div className="grid gap-3">
                  {cards.map((card) => (
                    <div
                      key={card.title}
                      className="rounded-lg border bg-muted/40 p-4"
                    >
                      <div className="text-sm font-medium">{card.title}</div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {card.description}
                      </p>
                    </div>
                  ))}
                </div>
              </DialogBody>
              <DialogFooter>
                <DialogCloseTrigger
                  render={<Button size="sm" variant="outline" />}
                >
                  Close
                </DialogCloseTrigger>
                <Button size="sm">{variantLabel} action</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        );
      })}
    </div>
  );
}
