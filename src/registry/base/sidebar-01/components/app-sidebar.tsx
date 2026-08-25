import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import { SearchForm } from "./search-form";
import { VersionSwitcher } from "./version-switcher";

const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Installation",
          url: "/docs/installation",
        },
        {
          title: "Project Structure",
          url: "/docs/extending",
        },
      ],
    },
    {
      title: "Build Your Application",
      url: "#",
      items: [
        {
          title: "Routing",
          url: "/docs",
        },
        {
          title: "Data Fetching",
          url: "/blocks/sidebar-01",
          isActive: true,
        },
        {
          title: "Rendering",
          url: "/blocks/sidebar-01/preview",
        },
        {
          title: "Caching",
          url: "/docs/llms",
        },
        {
          title: "Styling",
          url: "/docs/styling",
        },
        {
          title: "Optimizing",
          url: "/docs/components",
        },
        {
          title: "Configuring",
          url: "/docs/installation",
        },
        {
          title: "Testing",
          url: "/blocks?category=sidebar",
        },
        {
          title: "Authentication",
          url: "/blocks?category=sidebar",
        },
        {
          title: "Deploying",
          url: "/docs/extending",
        },
        {
          title: "Upgrading",
          url: "/docs/components/button",
        },
        {
          title: "Examples",
          url: "/blocks",
        },
      ],
    },
    {
      title: "API Reference",
      url: "#",
      items: [
        {
          title: "Components",
          url: "/docs/components",
        },
        {
          title: "File Conventions",
          url: "/docs/extending",
        },
        {
          title: "Functions",
          url: "/docs/llms",
        },
        {
          title: "next.config.js Options",
          url: "/docs/installation",
        },
        {
          title: "CLI",
          url: "/blocks",
        },
        {
          title: "Edge Runtime",
          url: "/docs/styling",
        },
      ],
    },
    {
      title: "Architecture",
      url: "#",
      items: [
        {
          title: "Accessibility",
          url: "/docs/components",
        },
        {
          title: "Fast Refresh",
          url: "/blocks/sidebar-01",
        },
        {
          title: "Next.js Compiler",
          url: "/docs/extending",
        },
        {
          title: "Supported Browsers",
          url: "/docs",
        },
        {
          title: "Turbopack",
          url: "/docs/installation",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        />
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      render={(props) => (
                        <a {...props} href={item.url} target="_top">
                          {props.children}
                        </a>
                      )}
                      isActive={item.isActive}
                    >
                      {item.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
