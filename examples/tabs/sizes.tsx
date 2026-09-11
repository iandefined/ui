import { Tabs, TabsList, TabsTrigger } from "@/registry/base/tabs";

const variants = ["segmented", "underline", "card"] as const;

const sizes = ["sm", "default", "lg"] as const;

export default function TabsSizesDemo() {
  return (
    <div className="grid w-full gap-4 lg:grid-cols-2 2xl:grid-cols-3">
      {variants.map((variant) => (
        <div className="flex min-w-0 flex-col gap-3" key={variant}>
          {sizes.map((size) => (
            <div
              className="flex min-w-0 flex-wrap items-center gap-3"
              key={size}
            >
              <Tabs
                className="min-w-0"
                defaultValue="home"
                size={size}
                variant={variant}
              >
                <TabsList
                  className={
                    variant === "underline"
                      ? "border-b border-border"
                      : undefined
                  }
                >
                  <TabsTrigger value="home">Home</TabsTrigger>
                  <TabsTrigger value="docs">Docs</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
