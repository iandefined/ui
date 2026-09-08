"use client";

import {
  ArrowLeftIcon,
  BellIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  Globe2Icon,
  MonitorIcon,
  MoonIcon,
  NewspaperIcon,
  PaletteIcon,
  SunIcon,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/registry/base/button";
import { Checkbox } from "@/registry/base/checkbox";
import {
  Drawer,
  DrawerCloseTrigger,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerMenu,
  DrawerMenuGroup,
  DrawerMenuGroupLabel,
  DrawerMenuItem,
  DrawerMenuRow,
  DrawerMenuSeparator,
  DrawerPanel,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/base/drawer";
import { Label } from "@/registry/base/label";
import { Radio, RadioGroup } from "@/registry/base/radio-group";
import {
  Select,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectList,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/base/select";
import { Switch } from "@/registry/base/switch";
import {
  TransitionPanel,
  TransitionPanelView,
} from "@/registry/base/transition-panel";

const languages = [
  { label: "English", value: "en" },
  { label: "Deutsch", value: "de" },
  { label: "Español", value: "es" },
];

const themes = [
  { icon: MonitorIcon, label: "System", value: "system" },
  { icon: SunIcon, label: "Light", value: "light" },
  { icon: MoonIcon, label: "Dark", value: "dark" },
];

export default function DrawerMenuDemo() {
  const [view, setView] = useState("menu");
  const [notifications, setNotifications] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [language, setLanguage] = useState<string | null>("en");
  const [theme, setTheme] = useState("system");

  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline" />}>
        Open settings
      </DrawerTrigger>
      <DrawerPopup className="max-w-xl" showBar>
        <DrawerHeader>
          <DrawerTitle>Workspace settings</DrawerTitle>
          <DrawerDescription>
            Compose drawer rows with the same controls used throughout your
            application.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerPanel scrollFade>
          <TransitionPanel activeKey={view}>
            <TransitionPanelView viewKey="menu" initialFocus={false}>
              <DrawerMenu aria-label="Workspace settings">
                <DrawerMenuGroup>
                  <DrawerMenuGroupLabel>General</DrawerMenuGroupLabel>
                  <DrawerMenuItem onClick={() => setView("appearance")}>
                    <PaletteIcon aria-hidden="true" />
                    <span className="min-w-0 flex-1 text-start">
                      <span className="block font-medium">Appearance</span>
                      <span className="block truncate text-xs text-muted-foreground">
                        Theme and motion preferences
                      </span>
                    </span>
                    <span className="ms-auto text-xs text-muted-foreground">
                      {themes.find((option) => option.value === theme)?.label}
                    </span>
                    <ChevronRightIcon aria-hidden="true" />
                  </DrawerMenuItem>
                  <DrawerMenuRow>
                    <Globe2Icon
                      aria-hidden="true"
                      className="size-4 shrink-0 opacity-80"
                    />
                    <span className="min-w-0 flex-1 font-medium">Language</span>
                    <Select
                      items={languages}
                      value={language}
                      onValueChange={(nextValue) =>
                        setLanguage(nextValue as string | null)
                      }
                    >
                      <SelectTrigger
                        aria-label="Language"
                        className="ms-auto min-w-32"
                      >
                        <SelectValue />
                        <SelectIcon>
                          <ChevronDownIcon aria-hidden="true" />
                        </SelectIcon>
                      </SelectTrigger>
                      <SelectPopup>
                        <SelectList>
                          {languages.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              <SelectItemText>{option.label}</SelectItemText>
                              <SelectItemIndicator>
                                <CheckIcon
                                  aria-hidden="true"
                                  className="size-3"
                                />
                              </SelectItemIndicator>
                            </SelectItem>
                          ))}
                        </SelectList>
                      </SelectPopup>
                    </Select>
                  </DrawerMenuRow>
                </DrawerMenuGroup>

                <DrawerMenuSeparator />

                <DrawerMenuGroup>
                  <DrawerMenuGroupLabel>Notifications</DrawerMenuGroupLabel>
                  <DrawerMenuRow
                    className="cursor-pointer select-none hover:bg-muted"
                    render={<Label htmlFor="drawer-notifications" />}
                  >
                    <BellIcon
                      aria-hidden="true"
                      className="size-4 shrink-0 opacity-80"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium">
                        Desktop notifications
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        Alerts for mentions and assigned work
                      </span>
                    </span>
                    <Switch
                      id="drawer-notifications"
                      checked={notifications}
                      onCheckedChange={setNotifications}
                      size="sm"
                    />
                  </DrawerMenuRow>
                  <DrawerMenuRow
                    className="cursor-pointer select-none hover:bg-muted"
                    render={<Label htmlFor="drawer-weekly-digest" />}
                  >
                    <NewspaperIcon
                      aria-hidden="true"
                      className="size-4 shrink-0 opacity-80"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium">Weekly digest</span>
                      <span className="block text-xs text-muted-foreground">
                        A Monday summary of workspace activity
                      </span>
                    </span>
                    <Checkbox
                      id="drawer-weekly-digest"
                      checked={weeklyDigest}
                      onCheckedChange={setWeeklyDigest}
                    />
                  </DrawerMenuRow>
                </DrawerMenuGroup>
              </DrawerMenu>
            </TransitionPanelView>

            <TransitionPanelView viewKey="appearance">
              <DrawerMenu aria-label="Appearance settings">
                <DrawerMenuItem onClick={() => setView("menu")}>
                  <ArrowLeftIcon aria-hidden="true" />
                  Back to settings
                </DrawerMenuItem>
                <DrawerMenuSeparator />
                <DrawerMenuGroup>
                  <DrawerMenuGroupLabel>Color theme</DrawerMenuGroupLabel>
                  <RadioGroup
                    aria-label="Color theme"
                    className="gap-0"
                    value={theme}
                    onValueChange={(nextValue) => setTheme(nextValue as string)}
                  >
                    {themes.map((option) => {
                      const Icon = option.icon;

                      return (
                        <DrawerMenuRow
                          key={option.value}
                          className="cursor-pointer select-none hover:bg-muted"
                          render={<Label />}
                        >
                          <Icon
                            aria-hidden="true"
                            className="size-4 shrink-0 opacity-80"
                          />
                          <span className="flex-1 font-medium">
                            {option.label}
                          </span>
                          <Radio value={option.value} />
                        </DrawerMenuRow>
                      );
                    })}
                  </RadioGroup>
                </DrawerMenuGroup>
                <DrawerMenuSeparator />
                <DrawerMenuRow
                  className="cursor-pointer select-none hover:bg-muted"
                  render={<Label htmlFor="drawer-reduce-motion" />}
                >
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium">Reduce motion</span>
                    <span className="block text-xs text-muted-foreground">
                      Use simpler interface transitions
                    </span>
                  </span>
                  <Switch
                    id="drawer-reduce-motion"
                    checked={reduceMotion}
                    onCheckedChange={setReduceMotion}
                    size="sm"
                  />
                </DrawerMenuRow>
              </DrawerMenu>
            </TransitionPanelView>
          </TransitionPanel>
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
