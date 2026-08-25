import { Children, isValidElement } from "react";
import type { ReactElement, ReactNode } from "react";

import { ComponentPreviewTabs } from "@/shared/components/component-preview-tabs";
import { ComponentSource } from "@/shared/components/component-source";
import { getRegistryComponent } from "@/shared/lib/registry";
import { cn } from "@/shared/lib/utils";

type ComponentPreviewProps = React.ComponentProps<"div"> & {
  name: string;
  align?: "center" | "start" | "end";
  description?: string;
  hideCode?: boolean;
  type?: "block" | "component" | "example";
  chromeLessOnMobile?: boolean;
  previewClassName?: string;
  caption?: string;
  src?: string;
  code?: string;
  language?: string;
  title?: string;
  children?: ReactNode;
};

type InlineCodeBlock = {
  code: string;
  language?: string;
};

const MissingComponent = ({ name }: { name: string }) => (
  <p className="mt-6 text-sm text-muted-foreground">
    Component{" "}
    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
      {name}
    </code>{" "}
    not found in registry.
  </p>
);

const getElementProps = (node: ReactElement) =>
  node.props as {
    __raw__?: string;
    children?: ReactNode;
    "data-language"?: string;
  };

const getInlineCodeBlock = (node: ReactNode): InlineCodeBlock | null => {
  if (!isValidElement(node)) {
    return null;
  }

  const props = getElementProps(node);

  if (typeof props.__raw__ === "string") {
    return {
      code: props.__raw__,
      language: props["data-language"],
    };
  }

  return (
    Children.toArray(props.children).map(getInlineCodeBlock).find(Boolean) ??
    null
  );
};

const splitPreviewChildren = (children: ReactNode) => {
  const nodes = Children.toArray(children);
  const inlineSource = nodes.map(getInlineCodeBlock).find(Boolean) ?? null;
  const previewChildren = nodes.filter((node) => !getInlineCodeBlock(node));
  const hasPreviewChildren = previewChildren.some((node) => {
    if (typeof node === "string") {
      return node.trim().length > 0;
    }

    return node !== null;
  });

  return {
    inlineSource,
    previewChildren: hasPreviewChildren ? previewChildren : null,
  };
};

export function ComponentPreview({
  name,
  type,
  className,
  previewClassName,
  align = "center",
  hideCode = false,
  chromeLessOnMobile = false,
  caption,
  src,
  code,
  language,
  title,
  children,
  description: _description,
  ...props
}: ComponentPreviewProps) {
  if (type === "block") {
    const content = (
      <div
        className={cn(
          "relative mt-6 aspect-4/2.5 w-full overflow-hidden rounded-xl border md:-mx-1",
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 bg-background">
          <iframe
            src={`/view/${name}`}
            title={`${name} preview`}
            className="size-full"
          />
        </div>
      </div>
    );

    if (caption) {
      return (
        <figure className="flex flex-col gap-4">
          {content}
          <figcaption className="text-center text-sm text-muted-foreground">
            {caption}
          </figcaption>
        </figure>
      );
    }

    return content;
  }

  const { inlineSource, previewChildren } = splitPreviewChildren(children);
  const previewCode = code ?? inlineSource?.code;
  const previewLanguage = language ?? inlineSource?.language;
  const RegistryComponent = previewChildren ? null : getRegistryComponent(name);

  if (!previewChildren && !RegistryComponent) {
    return <MissingComponent name={name} />;
  }

  const content = (
    <ComponentPreviewTabs
      className={className}
      previewClassName={previewClassName}
      align={align}
      hideCode={hideCode}
      chromeLessOnMobile={chromeLessOnMobile}
      component={
        previewChildren ?? (RegistryComponent ? <RegistryComponent /> : null)
      }
      source={
        <ComponentSource
          name={name}
          src={src}
          code={previewCode}
          language={previewLanguage}
          title={title}
          collapsible={false}
          connected
        />
      }
      sourcePreview={
        <ComponentSource
          name={name}
          src={src}
          code={previewCode}
          language={previewLanguage}
          title={title}
          collapsible={false}
          maxLines={3}
          connected
        />
      }
      {...props}
    />
  );

  if (caption) {
    return (
      <figure
        data-hide-code={hideCode}
        className="flex flex-col data-[hide-code=true]:gap-4"
      >
        {content}
        <figcaption className="-mt-8 text-center text-sm text-muted-foreground data-[hide-code=true]:mt-0">
          {caption}
        </figcaption>
      </figure>
    );
  }

  return content;
}
