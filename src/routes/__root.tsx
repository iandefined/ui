import {
  createRootRoute,
  HeadContent,
  Outlet,
  ScriptOnce,
  Scripts,
} from "@tanstack/react-router";

import { DefaultErrorPage } from "@/shared/components/pages/default-error-page";
import { ProgressProvider } from "@/shared/components/progress-provider";
import { ThemeProvider } from "@/shared/components/theme-provider";
import { Toaster } from "@/shared/components/ui/sonner";
import { ENV_APP_ISOMORPHIC } from "@/shared/constants/env";
import { META_THEME_COLORS } from "@/shared/constants/site";
import { JsonLdScripts } from "@/shared/lib/seo/json-ld";
import { rootHead } from "@/shared/lib/seo/metadata";

import "@/styles/app.css";

const themeScript = `
  try {
    const isDark = localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isDark ? '${META_THEME_COLORS.dark}' : '${META_THEME_COLORS.light}');
  } catch (_) {}
`;

export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: DefaultErrorPage,
  head: () => {
    const isUmamiAvailable =
      ENV_APP_ISOMORPHIC.VITE_UMAMI_SCRIPT_URL &&
      ENV_APP_ISOMORPHIC.VITE_UMAMI_WEBSITE_ID;

    return {
      ...rootHead,
      links: rootHead.links,
      scripts: isUmamiAvailable
        ? [
            {
              defer: true,
              "data-website-id": ENV_APP_ISOMORPHIC.VITE_UMAMI_WEBSITE_ID,
              src: ENV_APP_ISOMORPHIC.VITE_UMAMI_SCRIPT_URL,
            },
          ]
        : [],
    };
  },
  shellComponent: RootDocument,
});

function RootComponent() {
  return <Outlet />;
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        <JsonLdScripts />
        <ScriptOnce>{themeScript}</ScriptOnce>
      </head>
      <body className="text-foreground group/body overscroll-none font-sans antialiased [--footer-height:--spacing(14)] [--header-height:--spacing(14)] xl:[--footer-height:--spacing(24)]">
        <ThemeProvider>
          <ProgressProvider>
            {children}
            <Toaster position="top-center" />
          </ProgressProvider>
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}
