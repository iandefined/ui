import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";

import type { IconCatalogItem, IconVariant } from "@/icons/catalog";
import { CATEGORY_LABELS, getIconSvg } from "@/icons/catalog";
import { Badge, type BadgeColor } from "@/registry/base/badge";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/registry/base/dialog";
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
import { CopyButton } from "@/shared/components/copy-button";
import { highlightCode } from "@/shared/lib/highlight-code";

import { IconPreview } from "./icon-preview";

const CATEGORY_COLORS: BadgeColor[] = [
  "blue",
  "indigo",
  "violet",
  "purple",
  "teal",
  "emerald",
  "cyan",
  "amber",
  "orange",
  "rose",
  "pink",
];

function getCategoryBadgeColor(category: string): BadgeColor {
  let hash = 0;
  for (let i = 0; i < category.length; i++) {
    hash = (hash << 5) - hash + category.charCodeAt(i);
    hash |= 0;
  }
  return CATEGORY_COLORS[Math.abs(hash) % CATEGORY_COLORS.length];
}

const VARIANTS: { label: string; value: IconVariant }[] = [
  { label: "Stroke", value: "outline" },
  { label: "Duotone", value: "duotone" },
];

const SIZES = [
  { label: "16px", value: "16" },
  { label: "20px", value: "20" },
  { label: "24px", value: "24" },
  { label: "32px", value: "32" },
  { label: "40px", value: "40" },
  { label: "48px", value: "48" },
  { label: "64px", value: "64" },
  { label: "80px", value: "80" },
];

export interface IconDetailDialogProps {
  item: IconCatalogItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function IconDetailDialog({
  item,
  open,
  onOpenChange,
}: IconDetailDialogProps) {
  const [variant, setVariant] = useState<IconVariant>("duotone");
  const [size, setSize] = useState("24");
  const [codeHtml, setCodeHtml] = useState<string>("");

  useEffect(() => {
    if (item) {
      setVariant(item.variant);
      setSize("24");
    }
  }, [item]);

  const numericSize = parseInt(size, 10) || 24;
  const svg = item ? getIconSvg(item.name, variant, numericSize) : "";

  useEffect(() => {
    if (!svg) {
      setCodeHtml("");
      return;
    }

    let isMounted = true;
    void highlightCode(svg, "html", { lineNumbers: true }).then((html) => {
      if (isMounted) {
        setCodeHtml(html);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [svg]);

  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full sm:max-w-xl">
        <DialogHeader className="gap-2">
          <div className="flex items-center gap-2">
            <DialogTitle className="text-xl font-semibold lowercase">
              {item.name}
            </DialogTitle>
            <Badge
              variant="translucent"
              color={getCategoryBadgeColor(item.category)}
              size="compact"
            >
              {CATEGORY_LABELS[item.category]}
            </Badge>
          </div>
          <DialogDescription className="sr-only">
            Icon details, variant selection, dimensions, live preview, and code
            for {item.name}.
          </DialogDescription>
        </DialogHeader>

        <DialogBody
          nativeScroll
          className="flex min-w-0 w-full max-w-full flex-col gap-4 py-2 overflow-x-hidden"
        >
          {/* Section 1: Aliases */}
          {item.tags.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-muted-foreground">
                Aliases
              </span>
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    size="compact"
                    className="lowercase"
                  >
                    {tag.toLowerCase()}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Section 2: Controls (Variant & Size) */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-muted-foreground">
                Variant
              </span>
              <Select
                items={VARIANTS}
                value={variant}
                onValueChange={(val) => {
                  if (val) setVariant(val as IconVariant);
                }}
              >
                <SelectTrigger aria-label="Select icon variant">
                  <SelectValue placeholder="Stroke" />
                  <SelectIcon>
                    <ChevronsUpDownIcon className="size-3.5" />
                  </SelectIcon>
                </SelectTrigger>
                <SelectPopup>
                  <SelectList>
                    {VARIANTS.map(({ label, value: val }) => (
                      <SelectItem key={val} value={val}>
                        <SelectItemText>{label}</SelectItemText>
                        <SelectItemIndicator>
                          <CheckIcon className="size-3.5" />
                        </SelectItemIndicator>
                      </SelectItem>
                    ))}
                  </SelectList>
                </SelectPopup>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-muted-foreground">
                Size
              </span>
              <Select
                items={SIZES}
                value={size}
                onValueChange={(val) => {
                  if (val) setSize(String(val));
                }}
              >
                <SelectTrigger className="w-24" aria-label="Select icon size">
                  <SelectValue placeholder="24px" />
                  <SelectIcon>
                    <ChevronsUpDownIcon className="size-3.5" />
                  </SelectIcon>
                </SelectTrigger>
                <SelectPopup>
                  <SelectList>
                    {SIZES.map(({ label, value: val }) => (
                      <SelectItem key={val} value={val}>
                        <SelectItemText>{label}</SelectItemText>
                        <SelectItemIndicator>
                          <CheckIcon className="size-3.5" />
                        </SelectItemIndicator>
                      </SelectItem>
                    ))}
                  </SelectList>
                </SelectPopup>
              </Select>
            </div>
          </div>

          {/* Section 3: Preview Area */}
          <div className="flex h-36 w-full min-w-0 max-w-full items-center justify-center overflow-hidden rounded-xl border border-border/70 bg-muted/20">
            <div
              style={{
                width: `${Math.min(Math.max(numericSize, 16), 112)}px`,
                height: `${Math.min(Math.max(numericSize, 16), 112)}px`,
              }}
              className="flex items-center justify-center transition-all duration-150"
            >
              <IconPreview svg={svg} className="size-full text-foreground" />
            </div>
          </div>

          {/* Section 4: Code Section */}
          <div className="flex min-w-0 w-full max-w-full flex-col gap-1.5 overflow-hidden">
            <span className="text-xs font-medium text-muted-foreground">
              Code
            </span>
            <figure
              data-rehype-pretty-code-figure=""
              className="relative m-0! w-full min-w-0 max-w-full overflow-hidden rounded-xl border! border-border! bg-code"
            >
              <CopyButton
                value={svg}
                className="absolute top-2.5 right-2.5 z-10 size-7"
              />
              {codeHtml ? (
                <div
                  className="max-h-48 w-full min-w-0 max-w-full overflow-x-auto text-sm [&>pre]:max-h-48 [&>pre]:w-full [&>pre]:min-w-0 [&>pre]:overflow-x-auto"
                  dangerouslySetInnerHTML={{ __html: codeHtml }}
                />
              ) : (
                <pre className="max-h-48 w-full min-w-0 overflow-x-auto p-3.5 font-mono text-xs text-muted-foreground">
                  <code>{svg}</code>
                </pre>
              )}
            </figure>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
