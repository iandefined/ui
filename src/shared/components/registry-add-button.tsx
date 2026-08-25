"use client";

import { PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { CodeBlockCommand } from "@/shared/components/code-block-command";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/components/ui/drawer";
import { SITE, UTM_PARAMS } from "@/shared/constants/site";
import { useIsMobile } from "@/shared/hooks/use-mobile";
import { trackEvent } from "@/shared/lib/events";
import { addQueryParams } from "@/shared/lib/url";
import { cn } from "@/shared/lib/utils";

const title = "Add Registry";
const registryNamespace = `@${SITE.NAME}`;

const getRegistryTemplate = (registryName: string) => {
  if (registryName.startsWith("http")) {
    return `${registryNamespace}=${registryName}/r/{name}.json`;
  }

  return registryName;
};

const Description = ({ registryName }: { registryName: string }) => (
  <>
    Run this command to add{" "}
    <a
      className="text-foreground underline underline-offset-4"
      href={addQueryParams("https://ui.shadcn.com/docs/directory", {
        q: registryName,
        ...UTM_PARAMS,
      })}
      target="_blank"
      rel="noopener"
    >
      {registryName}
    </a>{" "}
    to your project.
  </>
);

export const RegistryAddButton = ({
  children,
  className,
  registry,
  size = "sm",
  variant = "ghost",
  onClick,
  ...props
}: {
  registry: { name: string } | string;
} & Omit<React.ComponentProps<typeof Button>, "children"> & {
    children?: React.ReactNode;
  }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const registryName = typeof registry === "string" ? registry : registry.name;
  const registryTemplate = getRegistryTemplate(registryName);

  const commands = useMemo(
    () => ({
      bun: `bunx --bun shadcn@latest registry add ${registryTemplate}`,
      npm: `npx shadcn@latest registry add ${registryTemplate}`,
      pnpm: `pnpm dlx shadcn@latest registry add ${registryTemplate}`,
      yarn: `yarn shadcn@latest registry add ${registryTemplate}`,
    }),
    [registryTemplate]
  );

  const handleTriggerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    trackEvent({
      name: "click_registry_add_button",
      properties: {
        registry: registryName,
      },
    });
    onClick?.(e);
  };

  const trigger = (
    <Button
      size={size}
      variant={variant}
      className={cn(className)}
      onClick={handleTriggerClick}
      {...props}
    >
      {children ?? (
        <>
          <PlusIcon />
          <span className="hidden sm:inline">Add</span>
        </>
      )}
    </Button>
  );

  return (
    <>
      {isMobile ? (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger render={trigger} />
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{title}</DrawerTitle>
              <DrawerDescription>
                <Description registryName={registryName} />
              </DrawerDescription>
            </DrawerHeader>
            <div className="px-4">
              <CodeBlockCommand
                __bun__={commands.bun}
                __npm__={commands.npm}
                __pnpm__={commands.pnpm}
                __yarn__={commands.yarn}
                copyEvent="copy_registry_command"
              />
            </div>
            <DrawerFooter>
              <DrawerClose render={<Button size="sm" />}>Done</DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger render={trigger} />
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription className="text-balance">
                <Description registryName={registryName} />
              </DialogDescription>
            </DialogHeader>
            <CodeBlockCommand
              __bun__={commands.bun}
              __npm__={commands.npm}
              __pnpm__={commands.pnpm}
              __yarn__={commands.yarn}
              copyEvent="copy_registry_command"
            />
            <DialogFooter>
              <DialogClose render={<Button size="sm" />}>Done</DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
