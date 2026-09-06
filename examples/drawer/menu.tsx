"use client";

import { useState } from "react";

import { Button } from "@/registry/base/button";
import {
  Drawer,
  DrawerCloseTrigger,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerMenu,
  DrawerMenuCheckboxItem,
  DrawerMenuGroup,
  DrawerMenuGroupLabel,
  DrawerMenuRadioGroup,
  DrawerMenuRadioItem,
  DrawerMenuSeparator,
  DrawerPanel,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/base/drawer";

export default function DrawerMenuDemo() {
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(false);
  const [quality, setQuality] = useState("high");

  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline" />}>
        Open settings
      </DrawerTrigger>
      <DrawerPopup className="max-w-xl" showBar>
        <DrawerHeader>
          <DrawerTitle>Settings</DrawerTitle>
          <DrawerDescription>
            Checkbox rows toggle immediately, while radio rows choose one
            option.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerPanel scrollable={false}>
          <DrawerMenu aria-label="Settings">
            <DrawerMenuGroup>
              <DrawerMenuGroupLabel>Connections</DrawerMenuGroupLabel>
              <DrawerMenuCheckboxItem
                checked={wifi}
                indicator="switch"
                onCheckedChange={setWifi}
              >
                Wi-Fi
              </DrawerMenuCheckboxItem>
              <DrawerMenuCheckboxItem
                checked={bluetooth}
                indicator="switch"
                onCheckedChange={setBluetooth}
              >
                Bluetooth
              </DrawerMenuCheckboxItem>
            </DrawerMenuGroup>
            <DrawerMenuSeparator />
            <DrawerMenuGroup>
              <DrawerMenuGroupLabel>Streaming quality</DrawerMenuGroupLabel>
              <DrawerMenuRadioGroup
                value={quality}
                onValueChange={(value) => setQuality(value as string)}
              >
                <DrawerMenuRadioItem value="low">Low</DrawerMenuRadioItem>
                <DrawerMenuRadioItem value="standard">
                  Standard
                </DrawerMenuRadioItem>
                <DrawerMenuRadioItem value="high">High</DrawerMenuRadioItem>
              </DrawerMenuRadioGroup>
            </DrawerMenuGroup>
          </DrawerMenu>
        </DrawerPanel>
        <DrawerFooter>
          <DrawerCloseTrigger render={<Button variant="outline" />}>
            Done
          </DrawerCloseTrigger>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  );
}
