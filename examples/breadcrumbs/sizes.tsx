import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  type BreadcrumbSize,
} from "@/registry/base/breadcrumbs";

const SIZES: BreadcrumbSize[] = ["sm", "md", "lg"];

export default function BreadcrumbsSizesDemo() {
  return (
    <div className="flex flex-col items-start gap-5">
      {SIZES.map((size) => (
        <Breadcrumb key={size} size={size}>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#home">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{size.toUpperCase()}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      ))}
    </div>
  );
}
