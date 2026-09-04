import { EllipsisVerticalIcon, Footprints } from "lucide-react";

import { Button } from "@/registry/base/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/base/card";

export default function CardVariantsDemo() {
  return (
    <div className="grid w-full max-w-[716px] grid-cols-1 gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Default Card</CardTitle>
          <CardDescription>Clean and simple design.</CardDescription>
          <CardAction>
            <Button
              aria-label="More default card options"
              size="icon-sm"
              variant="ghost"
              className="relative bottom-2 left-2"
            >
              <EllipsisVerticalIcon className="size-3" />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            This is the default card variant with minimal styling.
          </p>
        </CardContent>
        <CardFooter>
          <Button className="ml-auto" size="sm" variant="outline">
            View Details
          </Button>
        </CardFooter>
      </Card>

      <Card variant="inset">
        <CardHeader>
          <CardTitle>Inset Card</CardTitle>
          <CardDescription>Nested border effect.</CardDescription>
          <CardAction>
            <Button
              aria-label="More inset card options"
              size="icon-sm"
              variant="ghost"
              className="relative bottom-2 left-2"
            >
              <EllipsisVerticalIcon className="size-3" />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            This is the inset variant with an outer and inner border design.
          </p>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground">
          <Footprints className="size-3 mr-2" />
          And here is the footer
        </CardFooter>
      </Card>
    </div>
  );
}
