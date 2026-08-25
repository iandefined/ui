"use client";

import { Tabs } from "@/shared/components/ui/tabs";
import { useConfig } from "@/shared/hooks/use-config";
import type { InstallationType } from "@/shared/hooks/use-config";
import { cn } from "@/shared/lib/utils";

export const CodeTabs = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Tabs>) => {
  const [config, setConfig] = useConfig();

  return (
    <Tabs
      value={config.installationType}
      onValueChange={(value: string) =>
        setConfig({ installationType: value as InstallationType })
      }
      className={cn(
        "relative mt-6 w-full *:data-[slot=tabs-list]:gap-6",
        className
      )}
      {...props}
    >
      {children}
    </Tabs>
  );
};
