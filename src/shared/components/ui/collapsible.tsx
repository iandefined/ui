"use client";

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";

const Collapsible = ({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) => (
  <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
);

const CollapsibleTrigger = ({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Trigger>) => (
  <CollapsiblePrimitive.Trigger data-slot="collapsible-trigger" {...props} />
);

const CollapsibleContent = ({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Panel>) => (
  <CollapsiblePrimitive.Panel data-slot="collapsible-content" {...props} />
);

export { Collapsible, CollapsibleContent, CollapsibleTrigger };
