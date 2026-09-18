import { ClientOnly } from "@tanstack/react-router";
import { cn } from "cn";
import { lazy, Suspense } from "react";
import { type ComponentType, type LazyExoticComponent } from "react";

const AvatarHashvatarDemo = lazy(() => import("@examples/avatar/hashvatar"));
const ComboboxMultipleSelectionDemo = lazy(
  () => import("@examples/combobox/multiple-selection")
);
const DatePickerMultipleDemo = lazy(
  () => import("@examples/date-picker/multiple")
);
const DrawerStickyFooterDemo = lazy(
  () => import("@examples/drawer/sticky-footer")
);
const InputOTPInvalidDemo = lazy(() => import("@examples/input-otp/invalid"));
const LightboxDefaultDemo = lazy(() => import("@examples/lightbox/default"));
const MarqueeTextDemo = lazy(() => import("@examples/marquee/text"));
const CheckboxDefaultDemo = lazy(() => import("@examples/checkbox/default"));
const DataTableDefaultDemo = lazy(() => import("@examples/data-table/default"));
const RadioGroupDefaultDemo = lazy(
  () => import("@examples/radio-group/default")
);
const ShimmerWithComponentsDemo = lazy(
  () => import("@examples/shimmer/with-components")
);
const SliderInvalidDemo = lazy(() => import("@examples/slider/invalid"));
const SwitchWithLabelDemo = lazy(() => import("@examples/switch/with-label"));
const TextMorphNumberAndSlotsDemo = lazy(
  () => import("@examples/text-morph/variants")
);
const UseFuzzyFilterDefaultDemo = lazy(
  () => import("@examples/use-fuzzy-filter/default")
);

type PreviewSize = "compact" | "default" | "large";

export type HomeComponentPreview = {
  name: string;
  component: LazyExoticComponent<ComponentType>;
  size?: PreviewSize;
  previewClassName?: string;
};

export const HOME_COMPONENT_PREVIEWS = [
  {
    name: "use-fuzzy-filter/default",
    component: UseFuzzyFilterDefaultDemo,
    size: "large",
  },
  {
    name: "lightbox/default",
    component: LightboxDefaultDemo,
    size: "default",
  },
  {
    name: "switch/with-label",
    component: SwitchWithLabelDemo,
    size: "compact",
  },
  {
    name: "marquee/text",
    component: MarqueeTextDemo,
    size: "default",
  },
  {
    name: "checkbox/default",
    component: CheckboxDefaultDemo,
    size: "compact",
  },
  {
    name: "data-table/default",
    component: DataTableDefaultDemo,
    size: "compact",
  },
  {
    name: "text-morph/number-and-slots",
    component: TextMorphNumberAndSlotsDemo,
    size: "compact",
  },
  {
    name: "slider/invalid",
    component: SliderInvalidDemo,
    size: "default",
  },
  {
    name: "radio-group/default",
    component: RadioGroupDefaultDemo,
    size: "default",
  },
  {
    name: "shimmer/with-components",
    component: ShimmerWithComponentsDemo,
    size: "compact",
  },
  {
    name: "input-otp/invalid",
    component: InputOTPInvalidDemo,
    size: "default",
  },
  {
    name: "date-picker/multiple-dates",
    component: DatePickerMultipleDemo,
    size: "default",
  },
  {
    name: "combobox/multiple-selection",
    component: ComboboxMultipleSelectionDemo,
    size: "default",
  },
  {
    name: "drawer/sticky-footer",
    component: DrawerStickyFooterDemo,
    size: "compact",
  },
  {
    name: "avatar/random-hash-avatar",
    component: AvatarHashvatarDemo,
    size: "large",
  },
] satisfies readonly HomeComponentPreview[];

const previewSizeClassNames: Record<PreviewSize, string> = {
  compact: "min-h-40",
  default: "min-h-64",
  large: "min-h-80",
};

export function HomeComponentGrid({
  previews = HOME_COMPONENT_PREVIEWS,
}: {
  previews?: readonly HomeComponentPreview[];
}) {
  return (
    <section
      className="container-wrapper pb-16 md:pb-20 lg:pb-24"
      aria-label="Component previews"
    >
      <div className="container">
        <div className="columns-1 gap-4 sm:columns-2 xl:columns-3">
          {previews.map(
            ({ name, component: Preview, size, previewClassName }) => (
              <article
                key={name}
                className="mb-4 inline-block w-full break-inside-avoid rounded-xl bg-card/50 not-dark:bg-card/33 shadow-[0_0_0_1px_rgb(0_0_0/0.06),0_1px_1px_-0.5px_rgb(0_0_0/0.06),0_3px_3px_-1.5px_rgb(0_0_0/0.05)] dark:shadow-[0_0_0_1px_rgb(0_0_0/0.12),0_1px_1px_-0.5px_rgb(0_0_0/0.18),0_3px_3px_-1.5px_rgb(0_0_0/0.16),inset_0_1px_0_0_rgb(255_255_255/0.02),inset_0_0_0_1px_rgb(255_255_255/0.02)]"
              >
                <div
                  className={cn(
                    "flex min-h-56 items-center justify-center overflow-hidden rounded-xl p-6 sm:p-8",
                    size && previewSizeClassNames[size],
                    previewClassName
                  )}
                >
                  <div className="flex w-full min-w-0 justify-center">
                    <ClientOnly fallback={null}>
                      <Suspense fallback={null}>
                        <Preview />
                      </Suspense>
                    </ClientOnly>
                  </div>
                </div>
              </article>
            )
          )}
        </div>
      </div>
    </section>
  );
}
