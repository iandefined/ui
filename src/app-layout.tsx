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
      <blockquote className="sr-only">{AGENT_DOCS_DIRECTIVE_TEXT}</blockquote>
      <WebMcpTools />
      <SiteHeader />
      <main className="flex flex-1 flex-col">{children}</main>
      {!isDocsPage && <SiteFooter />}
    </div>
  );
};
