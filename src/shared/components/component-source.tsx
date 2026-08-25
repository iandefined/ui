import { Suspense, use } from "react";

import { CodeCollapsibleWrapper } from "@/shared/components/code-collapsible-wrapper";
import { CopyButton } from "@/shared/components/copy-button";
import { getIconForLanguageExtension } from "@/shared/components/icons";
import { formatCode } from "@/shared/lib/format-code";
import { highlightCode } from "@/shared/lib/highlight-code";
import {
  getDemoItem,
  getRegistryItem,
  readOptionalFromRoot,
} from "@/shared/lib/registry";
import { cn } from "@/shared/lib/utils";

export type ComponentSourceProps = {
  name?: string;
  src?: string;
  code?: string;
  title?: string;
  collapsible?: boolean;
  className?: string;
  language?: string;
  maxLines?: number;
  connected?: boolean;
};

type ComponentSourceData = {
  code: string;
  copyCode: string;
  highlightedCode: string;
  language: string;
};

const sourceCache = new Map<string, Promise<ComponentSourceData | null>>();

const ComponentCode = ({
  code,
  copyCode,
  highlightedCode,
  language,
  title,
  connected,
}: {
  code: string;
  copyCode: string;
  highlightedCode: string;
  language: string;
  title: string | undefined;
  connected?: boolean;
}) => (
  <figure
    data-rehype-pretty-code-figure=""
    data-connected={connected ? "" : undefined}
    className={cn(
      "[&>pre]:max-h-96",
      connected && "mt-0! rounded-t-none! border-t!"
    )}
  >
    {title ? (
      <figcaption
        className="text-code-foreground flex items-center gap-2 [&_svg]:size-4 [&_svg]:opacity-70"
        data-language={language}
        data-rehype-pretty-code-title=""
      >
        {getIconForLanguageExtension(language)}
        {title}
      </figcaption>
    ) : null}
    <CopyButton event="copy_primitive_code" value={copyCode} />
    <div dangerouslySetInnerHTML={{ __html: highlightedCode }} />
  </figure>
);

const getCacheKey = ({
  className: _className,
  collapsible: _collapsible,
  connected: _connected,
  ...props
}: ComponentSourceProps) => JSON.stringify(props);

const loadComponentSource = async ({
  name,
  src,
  code: inlineCode,
  title,
  language,
  maxLines,
}: ComponentSourceProps): Promise<ComponentSourceData | null> => {
  let code: string | null = inlineCode ?? null;

  if (!code && src) {
    code = await readOptionalFromRoot(src);
  }

  if (!code && name) {
    const item = (await getDemoItem(name)) ?? (await getRegistryItem(name));
    code = item?.files?.[0]?.content ?? null;
  }

  if (!code) {
    return null;
  }

  code = await formatCode(code);
  code = code.replaceAll("/* eslint-disable react/no-children-prop */\n", "");

  const copyCode = code;

  if (maxLines) {
    code = code.split("\n").slice(0, maxLines).join("\n");
  }

  const lang = language ?? title?.split(".").pop() ?? "tsx";
  const highlightedCode = await highlightCode(code, lang);

  return { code, copyCode, highlightedCode, language: lang };
};

const getComponentSource = (props: ComponentSourceProps) => {
  const key = getCacheKey(props);
  const cached = sourceCache.get(key);

  if (cached) {
    return cached;
  }

  const promise = loadComponentSource(props).catch(() => null);
  sourceCache.set(key, promise);
  return promise;
};

export const preloadComponentSource = (props: ComponentSourceProps) =>
  getComponentSource(props);

const ComponentSourceContent = ({
  collapsible = true,
  className,
  connected = false,
  ...props
}: ComponentSourceProps) => {
  const data = use(getComponentSource(props));

  if (!data) {
    return null;
  }

  if (!collapsible) {
    return (
      <div className={cn("relative", className)}>
        <ComponentCode
          code={data.code}
          copyCode={data.copyCode}
          highlightedCode={data.highlightedCode}
          language={data.language}
          title={props.title}
          connected={connected}
        />
      </div>
    );
  }

  return (
    <CodeCollapsibleWrapper className={className}>
      <ComponentCode
        code={data.code}
        copyCode={data.copyCode}
        highlightedCode={data.highlightedCode}
        language={data.language}
        title={props.title}
        connected={connected}
      />
    </CodeCollapsibleWrapper>
  );
};

export const ComponentSource = (props: ComponentSourceProps) => (
  <Suspense fallback={null}>
    <ComponentSourceContent {...props} />
  </Suspense>
);
