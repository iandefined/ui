"use client";

import {
  ExpandIcon,
  Loader2Icon,
  MonitorIcon,
  RotateCwIcon,
  SmartphoneIcon,
  TabletIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { PanelImperativeHandle } from "react-resizable-panels";

import { BlockCodeExplorer } from "@/shared/components/blocks/block-code-explorer";
import { BlockInstallButton } from "@/shared/components/blocks/block-install-button";
import { Button } from "@/shared/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/shared/components/ui/resizable";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { useIsMobile } from "@/shared/hooks/use-mobile";
import type { RegistryBlock } from "@/shared/lib/blocks";
import { cn } from "@/shared/lib/utils";

type ScreenSize = "mobile" | "tablet" | "desktop";

const screens: {
  name: ScreenSize;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  size: number;
}[] = [
  {
    name: "mobile",
    label: "Mobile",
    icon: SmartphoneIcon,
    size: 30,
  },
  {
    name: "tablet",
    label: "Tablet",
    icon: TabletIcon,
    size: 70,
  },
  {
    name: "desktop",
    label: "Desktop",
    icon: MonitorIcon,
    size: 100,
  },
];

export function BlockShowcase({
  block,
  showTitle = false,
}: {
  block: RegistryBlock;
  showTitle?: boolean;
}) {
  const [screenSize, setScreenSize] = useState<ScreenSize>("desktop");
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [reloadKey, setReloadKey] = useState(0);
  const [isIframeHeightDefined, setIsIframeHeightDefined] = useState(false);
  const [isResizingPreview, setIsResizingPreview] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const resizablePanelRef = useRef<PanelImperativeHandle>(null);
  const { resolvedTheme } = useTheme();
  const isMobile = useIsMobile();

  const previewUrl = useMemo(
    () => `/blocks/${block.name}/preview?reload=${reloadKey}`,
    [block.name, reloadKey]
  );

  const applyTheme = useCallback(() => {
    const doc = iframeRef.current?.contentDocument;

    if (!doc?.documentElement) {
      return;
    }

    doc.documentElement.classList.toggle("dark", resolvedTheme === "dark");
    doc.documentElement.classList.toggle("light", resolvedTheme !== "dark");
  }, [resolvedTheme]);

  useEffect(() => {
    applyTheme();
  }, [applyTheme]);

  const activeScreen = screens.find((screen) => screen.name === screenSize);

  useEffect(() => {
    resizablePanelRef.current?.resize(`${activeScreen?.size ?? 100}%`);
  }, [activeScreen]);

  useEffect(() => {
    setScreenSize("desktop");
    resizablePanelRef.current?.resize("100%");
  }, [block.name]);

  useEffect(() => {
    if (isMobile) {
      setActiveTab("preview");
    }
  }, [isMobile]);

  useEffect(() => {
    if (!isResizingPreview) {
      return;
    }

    const stopResizing = () => setIsResizingPreview(false);

    window.addEventListener("pointerup", stopResizing);
    window.addEventListener("mouseup", stopResizing);

    return () => {
      window.removeEventListener("pointerup", stopResizing);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [isResizingPreview]);

  const handleIframeLoad = () => {
    const iframe = iframeRef.current;

    if (iframe) {
      iframe.style.height = "700px";

      requestAnimationFrame(() => {
        const doc = iframe.contentDocument;
        const height = Math.max(
          doc?.body?.scrollHeight ?? 0,
          doc?.documentElement?.scrollHeight ?? 0,
          700
        );

        iframe.style.height = `${height}px`;
      });
    }

    setIsIframeHeightDefined(true);
    applyTheme();
  };

  const reloadPreview = () => {
    setIsIframeHeightDefined(false);
    setReloadKey((key) => key + 1);
  };

  const previewFrame = (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-auto rounded-xl border",
        !isIframeHeightDefined && "h-175"
      )}
    >
      <iframe
        key={previewUrl}
        ref={iframeRef}
        src={previewUrl}
        title={`${block.title} preview`}
        className={cn("w-full", {
          invisible: !isIframeHeightDefined,
          "pointer-events-none": isResizingPreview,
        })}
        height="100%"
        width="100%"
        onLoad={handleIframeLoad}
      />
      {!isIframeHeightDefined ? (
        <Loader2Icon className="absolute inset-0 m-auto size-8 animate-spin text-muted-foreground" />
      ) : null}
    </div>
  );

  return (
    <Tabs
      className="gap-0"
      value={activeTab}
      onValueChange={(value) => {
        if (!isMobile) {
          setActiveTab(value as "preview" | "code");
        }
      }}
    >
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        {showTitle ? (
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="truncate text-lg font-medium">{block.title}</h2>
            </div>
          </div>
        ) : (
          <div />
        )}
        <div className="flex flex-wrap items-center gap-2 md:justify-end">
          <BlockInstallButton name={block.name} />
          <div className="flex h-8 items-center gap-1 rounded-md border bg-background p-1 shadow-xs dark:bg-input/30 dark:border-input">
            <div className="hidden items-center gap-1 md:flex">
              {screens.map(({ name, label, icon: Icon }) => (
                <Tooltip key={name}>
                  <TooltipTrigger
                    render={
                      <Button
                        type="button"
                        className="size-6"
                        size="icon-sm"
                        variant={name === screenSize ? "secondary" : "ghost"}
                        onClick={() => setScreenSize(name)}
                      />
                    }
                  >
                    <Icon />
                    <span className="sr-only">{label}</span>
                  </TooltipTrigger>
                  <TooltipContent>{label}</TooltipContent>
                </Tooltip>
              ))}
            </div>
            <div className="hidden h-5 w-px bg-border md:block" />
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    render={(props) => (
                      <a
                        {...props}
                        href={`/blocks/${block.name}/preview`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {props.children}
                      </a>
                    )}
                    className="size-6"
                    size="icon-sm"
                    variant="ghost"
                  />
                }
              >
                <ExpandIcon />
                <span className="sr-only">Open in New Tab</span>
              </TooltipTrigger>
              <TooltipContent>Open in New Tab</TooltipContent>
            </Tooltip>
            <div className="h-5 w-px bg-border" />
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    type="button"
                    className="size-6"
                    size="icon-sm"
                    variant="ghost"
                    onClick={reloadPreview}
                  />
                }
              >
                <RotateCwIcon />
                <span className="sr-only">Reload Preview</span>
              </TooltipTrigger>
              <TooltipContent>Reload Preview</TooltipContent>
            </Tooltip>
          </div>
          <TabsList className="hidden h-8 bg-input/30 md:inline-flex">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
        </div>
      </div>

      <TabsContent value="preview">
        <div className="overflow-visible shadow-xs/2">
          {isMobile ? (
            previewFrame
          ) : (
            <ResizablePanelGroup
              className="overflow-visible!"
              direction="horizontal"
            >
              <ResizablePanel
                defaultSize="100%"
                minSize="30%"
                panelRef={resizablePanelRef}
              >
                {previewFrame}
              </ResizablePanel>
              <ResizableHandle
                className="z-20 bg-transparent after:hidden [&>div]:z-20"
                onMouseDown={() => setIsResizingPreview(true)}
                onPointerDown={() => setIsResizingPreview(true)}
                withHandle
              />
              <ResizablePanel className="pr-1.5" defaultSize="0%" />
            </ResizablePanelGroup>
          )}
        </div>
      </TabsContent>
      {!isMobile ? (
        <TabsContent value="code">
          <BlockCodeExplorer block={block} />
        </TabsContent>
      ) : null}
    </Tabs>
  );
}
