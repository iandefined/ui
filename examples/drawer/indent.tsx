import { Button } from "@/registry/base/button";
import {
  Drawer,
  DrawerCloseTrigger,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerIndent,
  DrawerIndentBackground,
  DrawerPopup,
  DrawerProvider,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/base/drawer";

export default function DrawerIndentDemo() {
  return (
    <div className="relative overflow-hidden rounded-xl">
      <DrawerProvider>
        <DrawerIndentBackground className="absolute" />
        <DrawerIndent className="relative flex min-h-72 flex-col items-center justify-center gap-4 rounded-xl border border-border bg-card p-8 text-center">
          <p className="max-w-sm text-sm text-muted-foreground">
            The page content scales and rounds while the drawer is open.
          </p>
          <Drawer>
            <DrawerTrigger render={<Button variant="outline" />}>
              Open with indent effect
            </DrawerTrigger>
            <DrawerPopup showBar>
              <DrawerHeader>
                <DrawerTitle>Indent effect</DrawerTitle>
                <DrawerDescription>
                  DrawerIndent coordinates the background treatment with the
                  provider.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <DrawerCloseTrigger render={<Button variant="outline" />}>
                  Close
                </DrawerCloseTrigger>
              </DrawerFooter>
            </DrawerPopup>
          </Drawer>
        </DrawerIndent>
      </DrawerProvider>
    </div>
  );
}
