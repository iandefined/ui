import { Link as RouterLink } from "@tanstack/react-router";
import { forwardRef } from "react";

export type LinkProps = Omit<React.ComponentPropsWithoutRef<"a">, "href"> & {
  href: string;
};

const isInternalHref = (href: string) => href.startsWith("/");
const isFileHref = (href: string) =>
  /\/[^/?#]+\.[^/?#]+(?:[?#].*)?$/.test(href);

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    if (isInternalHref(href) && !isFileHref(href)) {
      return (
        <RouterLink ref={ref} to={href} {...props}>
          {children}
        </RouterLink>
      );
    }

    return (
      <a ref={ref} href={href} {...props}>
        {children}
      </a>
    );
  }
);

Link.displayName = "Link";
