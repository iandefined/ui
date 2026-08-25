"use client";

import { Link } from "@/shared/components/link";
import { Button } from "@/shared/components/ui/button";
import { usePathname } from "@/shared/hooks/use-navigation";
import { cn } from "@/shared/lib/utils";

export const MainNav = ({
  items,
  className,
  ...props
}: React.ComponentProps<"nav"> & {
  items: { href: string; label: string }[];
}) => {
  const pathname = usePathname();

  return (
    <nav className={cn("items-center gap-0.5", className)} {...props}>
      {items.map((item) => (
        <Button
          key={item.href}
          variant="ghost"
          render={
            <Link
              href={item.href}
              className={cn(pathname === item.href && "text-primary")}
            />
          }
          size="sm"
        >
          {item.label}
        </Button>
      ))}
    </nav>
  );
};
