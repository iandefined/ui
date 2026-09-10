import { Tabs, TabsList, TabsTrigger } from "@/registry/base/tabs";

const variants = [
  { label: "Segmented", value: "segmented" },
  { label: "Underline", value: "underline" },
  { label: "Card", value: "card" },
] as const;

const sizes = [
  { label: "Small", value: "sm" },
  { label: "Default", value: "default" },
  { label: "Large", value: "lg" },
] as const;

export default function TabsSizesDemo() {
  return (
    <div className="grid w-full gap-6 lg:grid-cols-2 2xl:grid-cols-3">
      {variants.map((variant) => (
        <div className="flex min-w-0 flex-col gap-3" key={variant.value}>
          <p className="text-sm font-medium">{variant.label}</p>
          <div className="flex flex-col gap-3">
            {sizes.map((size) => (
              <div
                className="flex min-w-0 flex-wrap items-center gap-3"
                key={size.value}
              >
                <span className="w-14 shrink-0 text-xs text-muted-foreground">
                  {size.label}
                </span>
                <Tabs
                  className="min-w-0"
                  defaultValue="account"
                  size={size.value}
                  variant={variant.value}
                >
                  <TabsList
                    className={
                      variant.value === "underline"
                        ? "border-b border-border"
                        : undefined
                    }
                  >
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
