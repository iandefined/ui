"use client";

import * as React from "react";

import { Button } from "@/registry/base/button";
import { toast } from "@/registry/base/toast";

const messages = [
  {
    title: "Quick update",
    description: "Task completed.",
  },
  {
    title: "New comment on your post",
    description:
      "Jordan replied: This looks great. Can we schedule a call to discuss the details?",
  },
  {
    title: "Meeting reminder",
    description:
      "Your meeting with the design team starts in 15 minutes. Bring the latest prototype and notes from user testing.",
  },
];

export default function ToastVaryingHeightsDemo() {
  const [index, setIndex] = React.useState(0);

  return (
    <Button
      variant="outline"
      onClick={() => {
        const message = messages[index % messages.length];
        toast(message);
        setIndex((current) => current + 1);
      }}
    >
      Create toast
    </Button>
  );
}
