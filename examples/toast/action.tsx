"use client";

import { Button } from "@/registry/base/button";
import { toast } from "@/registry/base/toast";

const actionToastId = "toast-action";

export default function ToastActionDemo() {
  const handleAction = () => {
    const id = toast({
      id: actionToastId,
      title: "Action performed",
      description: "You can undo this action.",
      action: {
        label: "Undo",
        render: <Button variant="outline" size="sm" />,
        onClick: () => {
          toast.update(actionToastId, {
            title: "Action undone",
            description: "Your change has been restored.",
            type: "success",
            action: null,
          });
        },
      },
    });

    return id;
  };

  return <Button onClick={handleAction}>Perform action</Button>;
}
