import geistMonoCyrillic from "@fontsource-variable/geist-mono/files/geist-mono-cyrillic-wght-normal.woff2?url";
import geistMonoLatinExt from "@fontsource-variable/geist-mono/files/geist-mono-latin-ext-wght-normal.woff2?url";
import geistMonoLatin from "@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2?url";
import geistVariableCyrillic from "@fontsource-variable/geist/files/geist-cyrillic-wght-normal.woff2?url";
import geistVariableLatinExt from "@fontsource-variable/geist/files/geist-latin-ext-wght-normal.woff2?url";
import geistVariableLatin from "@fontsource-variable/geist/files/geist-latin-wght-normal.woff2?url";
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
import { META_THEME_COLORS } from "@/shared/constants/site";
import { fontVariables } from "@/shared/lib/fonts";
import { JsonLdScripts } from "@/shared/lib/seo/json-ld";
import { rootHead } from "@/shared/lib/seo/metadata";
import { cn } from "@/shared/lib/utils";

import "@/styles/globals.css";

const themeScript = `
  try {
    if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '${META_THEME_COLORS.dark}')
    }
  } catch (_) {}
`;

const fontPreloadLinks = [
  geistVariableLatin,
  geistVariableLatinExt,
  geistVariableCyrillic,
  geistMonoLatin,
  geistMonoLatinExt,
  geistMonoCyrillic,
].map((href) => ({
  as: "font",
  crossOrigin: "anonymous" as const,
  href,
  rel: "preload",
  type: "font/woff2",
}));

export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: DefaultErrorPage,
  head: () => ({
    ...rootHead,
    links: [...fontPreloadLinks, ...(rootHead.links ?? [])],
  }),
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
      <body
        className={cn(
          "text-foreground group/body overscroll-none font-sans antialiased [--footer-height:--spacing(14)] [--header-height:--spacing(14)] xl:[--footer-height:--spacing(24)]",
          fontVariables
        )}
      >
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
