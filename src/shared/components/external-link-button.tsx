"use client";

import type { ButtonProps } from "@/shared/components/ui/button";
import { Button } from "@/shared/components/ui/button";

type ExternalLinkButtonProps = ButtonProps & {
  href: string;
};

export const ExternalLinkButton = ({
  href,
  children,
  ...props
}: ExternalLinkButtonProps) => (
  <Button
    render={(renderProps) => (
      <a {...renderProps} href={href} target="_blank" rel="noopener noreferrer">
        {renderProps.children}
      </a>
    )}
    nativeButton={false}
    {...props}
  >
    {children}
  </Button>
);
