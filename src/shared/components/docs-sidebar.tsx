"use client";

import type { Root as PageTreeRoot } from "fumadocs-core/page-tree";

import { Link } from "@/shared/components/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui/sidebar";
import { usePathname } from "@/shared/hooks/use-navigation";
import { getDocsNavigationGroups } from "@/shared/lib/docs-navigation";

const MENU_BUTTON_CLS =
  "relative h-[30px] w-fit overflow-visible border border-transparent text-[0.8rem] font-medium after:absolute after:inset-x-0 after:-inset-y-1 after:z-0 after:rounded-md data-[active=true]:border-accent data-[active=true]:bg-accent 3xl:fixed:w-full 3xl:fixed:max-w-48";

const SidebarPageGroup = ({
  label,
  pages,
  pathname,
}: {
  label: React.ReactNode;
  pages: { url: string; name: React.ReactNode }[];
  pathname: string;
}) => {
  if (pages.length === 0) {
    return null;
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-muted-foreground font-medium">
        {label}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {pages.map((page) => (
            <SidebarMenuItem key={page.url}>
              <SidebarMenuButton
                render={<Link href={page.url} />}
                className={MENU_BUTTON_CLS}
                isActive={page.url === pathname}
              >
                <span className="absolute inset-0 flex w-(--sidebar-menu-width) bg-transparent" />
                {page.name}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export const DocsSidebar = ({
  tree,
  ...props
}: React.ComponentProps<typeof Sidebar> & { tree: PageTreeRoot }) => {
  const pathname = usePathname();

  return (
    <Sidebar
      className="text-sidebar-foreground sticky top-[calc(var(--header-height)+0.6rem)] z-30 hidden h-[calc(100svh-10rem)] flex-col overscroll-none bg-transparent [--sidebar-menu-width:--spacing(48)] lg:flex"
      collapsible="none"
      {...props}
    >
      <div className="h-9" />
      <SidebarContent className="mx-auto no-scrollbar w-(--sidebar-menu-width) overflow-x-hidden px-2">
        <div className="h-6" />
        {getDocsNavigationGroups(tree).map((group) => (
          <SidebarPageGroup
            key={group.id}
            label={group.label}
            pages={group.pages}
            pathname={pathname}
          />
        ))}
        <div className="from-background via-background/80 to-background/50 sticky -bottom-1 z-10 h-16 shrink-0 bg-linear-to-t blur-xs" />
      </SidebarContent>
    </Sidebar>
  );
};
