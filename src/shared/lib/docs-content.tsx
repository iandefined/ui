import browserCollections from "collections/browser";
import { Children, isValidElement } from "react";
import type { ReactElement, ReactNode } from "react";

import {
  preloadComponentSource,
  type ComponentSourceProps,
} from "@/shared/components/component-source";
import { mdxComponents } from "@/shared/mdx-components";

type MdxDoc = {
  default: (props: {
    components: typeof mdxComponents;
  }) => Promise<ReactNode> | ReactNode;
};

type ComponentPreviewProps = ComponentSourceProps & {
  hideCode?: boolean;
  type?: "block" | "component" | "example";
  children?: ReactNode;
};

type InlineCodeBlock = {
  code: string;
  language?: string;
};

const ComponentPreviewPreloader = (_props: ComponentPreviewProps) => null;
const ComponentSourcePreloader = (_props: ComponentSourceProps) => null;

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

const getSourceProps = ({
  code,
  language,
  maxLines,
  name,
  src,
  title,
}: ComponentSourceProps): ComponentSourceProps => ({
  code,
  language,
  maxLines,
  name,
  src,
  title,
});

export const preloadDocsComponentSources = async (doc: MdxDoc) => {
  const pending: Promise<unknown>[] = [];
  const components = {
    ...mdxComponents,
    ComponentPreview: ComponentPreviewPreloader,
    ComponentSource: ComponentSourcePreloader,
  } as unknown as typeof mdxComponents;

  const visit = (node: ReactNode) => {
    if (!isValidElement(node)) {
      return;
    }

    if (node.type === ComponentSourcePreloader) {
      pending.push(
        preloadComponentSource(
          getSourceProps(node.props as ComponentSourceProps)
        )
      );
    }

    if (node.type === ComponentPreviewPreloader) {
      const props = node.props as ComponentPreviewProps;

      if (!props.hideCode && props.type !== "block") {
        const inlineSource = getInlineCodeBlock(props.children);
        const sourceProps = getSourceProps({
          ...props,
          code: props.code ?? inlineSource?.code,
          language: props.language ?? inlineSource?.language,
        });

        pending.push(preloadComponentSource(sourceProps));
        pending.push(
          preloadComponentSource({
            ...sourceProps,
            maxLines: 3,
          })
        );
      }
    }

    Children.forEach(getElementProps(node).children, visit);
  };

  visit(await doc.default({ components }));
  await Promise.allSettled(pending);
};

export const docsContentLoader = browserCollections.docs.createClientLoader({
  id: "docs",
  component: (doc) => {
    const MdxContent = doc.default;

    return <MdxContent components={mdxComponents} />;
  },
});
