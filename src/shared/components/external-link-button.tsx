"use client";

import type { ButtonProps } from "@/shared/components/ui/button";
import { Button } from "@/shared/components/ui/button";

interface ExternalLinkButtonProps extends ButtonProps {
  href: string;
}

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
    {...props}
  >
    {children}
  </Button>
);
