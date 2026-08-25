import { AppLayout } from "@/app-layout";
import { CommandBox } from "@/shared/components/command-box";
import { HomeCtas } from "@/shared/components/home-ctas";
import { PageTransition } from "@/shared/components/page-transition";
import { ROUTES } from "@/shared/constants/routes";
import { SITE } from "@/shared/constants/site";
import { BreadcrumbJsonLd } from "@/shared/lib/seo/json-ld";

export const HomePage = () => (
  <AppLayout>
    <BreadcrumbJsonLd items={[{ name: "Home", path: ROUTES.HOME }]} />
    <PageTransition>
      <section className="container-wrapper relative">
        <div className="container flex flex-col items-center gap-4 py-16 text-center md:py-20 lg:py-24">
          <h1 className="max-w-7xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl from-foreground via-foreground to-foreground/65 bg-linear-to-b bg-clip-text text-transparent">
            {SITE.TITLE.SHORT}
          </h1>

          <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
            {SITE.DESCRIPTION.LONG}
          </p>

          <CommandBox className="mt-4 w-full max-w-xl" />

          <HomeCtas className="mt-4" />
        </div>
      </section>
    </PageTransition>
  </AppLayout>
);
