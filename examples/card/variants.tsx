import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/base/card";

export default function CardVariantsDemo() {
  return (
    <div className="grid w-full max-w-[716px] grid-cols-1 gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Default Card</CardTitle>
          <CardDescription>Clean and simple design.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            This is the default card variant with minimal styling.
          </p>
        </CardContent>
      </Card>

      <Card variant="inset">
        <CardHeader>
          <CardTitle>Inset Card</CardTitle>
          <CardDescription>Nested border effect.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            This is the inset variant with an outer and inner border design.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
