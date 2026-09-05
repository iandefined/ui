"use client";

import { Button } from "@/registry/base/button";
import { toast } from "@/registry/base/toast";

export default function ToastActionDemo() {
  const handleAction = () => {
    const id = toast({
      title: "Action performed",
      description: "You can undo this action.",
      action: {
        label: "Undo",
        render: <Button variant="outline" size="sm" />,
        onClick: () => {
          toast.dismiss(id);
          toast({ title: "Action undone" });
        },
      },
    });

    return id;
  };

  return <Button onClick={handleAction}>Perform action</Button>;
}
