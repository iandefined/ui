"use client";

import { useState } from "react";

import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";

export type ComponentPreviewTabsProps = React.ComponentProps<"div"> & {
  previewClassName?: string;
  align?: "center" | "start" | "end";
  hideCode?: boolean;
  chromeLessOnMobile?: boolean;
  component: React.ReactNode;
  source: React.ReactNode;
  sourcePreview?: React.ReactNode;
};

export function ComponentPreviewTabs({
  className,
  previewClassName,
  align = "center",
  hideCode = false,
  chromeLessOnMobile = false,
  component,
  source,
  sourcePreview,
  ...props
}: ComponentPreviewTabsProps) {
  const [isMobileCodeVisible, setIsMobileCodeVisible] = useState(false);

  return (
    <div
      data-slot="component-preview"
      className={cn(
        "group relative mt-4 mb-12 flex flex-col overflow-hidden rounded-xl border",
        className
      )}
      {...props}
    >
      <PreviewWrapper
        align={align}
        chromeLessOnMobile={chromeLessOnMobile}
        previewClassName={previewClassName}
      >
        {component}
      </PreviewWrapper>

      {!hideCode && (
        <div
          data-slot="code"
          data-mobile-code-visible={isMobileCodeVisible}
          className="relative overflow-hidden **:data-[slot=copy-button]:right-4 **:data-[slot=copy-button]:hidden data-[mobile-code-visible=true]:**:data-[slot=copy-button]:flex md:**:data-[slot=copy-button]:flex [&_[data-rehype-pretty-code-figure]]:m-0! [&_[data-rehype-pretty-code-figure]]:rounded-t-none [&_[data-rehype-pretty-code-figure]]:border-t [&_pre]:max-h-72"
        >
          {sourcePreview ? (
            <>
              <div
                className={cn(
                  "relative max-h-36 overflow-hidden",
                  isMobileCodeVisible && "hidden"
                )}
              >
                {sourcePreview}
                <div className="absolute inset-x-0 bottom-0 flex h-24 items-center justify-center bg-linear-to-b from-transparent via-code/75 to-code">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-8 rounded-md bg-background"
                    onClick={() => {
                      setIsMobileCodeVisible(true);
                    }}
                  >
                    View Code
                  </Button>
                </div>
              </div>
              <div className={cn(!isMobileCodeVisible && "hidden")}>
                {source}
              </div>
            </>
          ) : (
            source
          )}
        </div>
      )}
    </div>
  );
}

function PreviewWrapper({
  align,
  chromeLessOnMobile,
  previewClassName,
  children,
}: {
  align: "center" | "start" | "end";
  chromeLessOnMobile: boolean;
  previewClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <div data-slot="preview" dir="ltr">
      <div
        data-align={align}
        data-chromeless={chromeLessOnMobile}
        className={cn(
          "preview relative flex h-72 w-full justify-center p-10 data-[align=center]:items-center data-[align=end]:items-end data-[align=start]:items-start data-[chromeless=true]:h-auto data-[chromeless=true]:p-0",
          previewClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
