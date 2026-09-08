import { Button } from "@/registry/base/button";
import {
  Drawer,
  DrawerCloseTrigger,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPanel,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/base/drawer";

const sections = [
  "Overview",
  "Activity",
  "Members",
  "Integrations",
  "Notifications",
  "Permissions",
];

export default function DrawerSnapPointsDemo() {
  return (
    <Drawer
      defaultSnapPoint={0.35}
      snapPoints={[0.35, 0.7, 1]}
      snapToSequentialPoints
    >
      <DrawerTrigger render={<Button variant="outline" />}>
        Open with snap points
      </DrawerTrigger>
      <DrawerPopup showBar>
        <DrawerHeader>
          <DrawerTitle>Project settings</DrawerTitle>
          <DrawerDescription>
            Drag the drawer between three resting positions.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerPanel scrollFade>
          <div className="space-y-2">
            {sections.map((section) => (
              <div
                key={section}
                className="rounded-lg border border-border bg-muted/40 p-3"
              >
                <h3 className="font-medium">{section}</h3>
                <p className="text-sm text-muted-foreground">
                  Configure the {section.toLowerCase()} for this project.
                </p>
              </div>
            ))}
          </div>
        </DrawerPanel>
        <DrawerFooter sticky>
          <DrawerCloseTrigger render={<Button variant="outline" />}>
            Done
          </DrawerCloseTrigger>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  );
}
