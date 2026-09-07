import { SiteFooter } from "@/shared/components/site-footer";
import { SiteHeader } from "@/shared/components/site-header";
import { WebMcpTools } from "@/shared/components/web-mcp-tools";
import { ROUTES } from "@/shared/constants/routes";
import { usePathname } from "@/shared/hooks/use-navigation";
import { AGENT_DOCS_DIRECTIVE_TEXT } from "@/shared/lib/agent-discovery/directive";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isDocsPage =
    pathname === ROUTES.DOCS || pathname.startsWith(`${ROUTES.DOCS}/`);

  return (
    <div className="bg-background relative flex min-h-svh flex-col">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground focus:shadow-lg focus:outline-hidden focus:ring-2 focus:ring-ring"
      >
        Skip to content
      </a>
      <blockquote className="sr-only">{AGENT_DOCS_DIRECTIVE_TEXT}</blockquote>
      <WebMcpTools />
      <SiteHeader />
      <main
        id="content"
        tabIndex={-1}
        className="flex flex-1 flex-col outline-hidden"
      >
        {children}
      </main>
      {!isDocsPage && <SiteFooter />}
    </div>
  );
};
