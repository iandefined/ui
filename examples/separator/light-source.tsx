import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/base/card";
import { Separator } from "@/registry/base/separator";

const horizontalLightSources = ["above", "below"] as const;

export default function SeparatorLightSourceDemo() {
  return (
    <div className="grid w-full max-w-lg gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Horizontal separators</CardTitle>
          <CardDescription>
            The shadow falls away from the light source.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {horizontalLightSources.map((lightSource) => (
            <div className="space-y-2" key={lightSource}>
              <p className="text-xs text-muted-foreground capitalize">
                Light source: {lightSource}
              </p>
              <Separator lightSource={lightSource} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Vertical separators</CardTitle>
          <CardDescription>
            The same treatment follows the horizontal axis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-20 items-center justify-center gap-4 text-sm">
            <span>Left</span>
            <Separator
              orientation="vertical"
              lightSource="left"
              className="h-12!"
            />
            <span>Surface</span>
            <Separator
              orientation="vertical"
              lightSource="right"
              className="h-12!"
            />
            <span>Right</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
