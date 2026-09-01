import { EllipsisVerticalIcon } from "lucide-react";

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

export default function CardWithFooterAndActionDemo() {
  return (
    <Card className="w-full max-w-[350px]">
      <CardHeader>
        <CardTitle>Team Meeting</CardTitle>
        <CardDescription>Scheduled for tomorrow at 2:00 PM</CardDescription>
        <CardAction>
          <Button
            aria-label="More meeting options"
            size="icon-sm"
            variant="ghost"
          >
            <EllipsisVerticalIcon />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          Discuss Q4 roadmap and project priorities with the team.
        </p>
      </CardContent>
      <CardFooter>
        <Button className="ml-auto" size="sm" variant="outline">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
