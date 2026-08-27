import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

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

interface ShippingMethod {
  id: string;
  name: string;
  duration: string;
  price: string;
}

const shippingMethods: ShippingMethod[] = [
  {
    id: "standard",
    name: "Standard",
    duration: "Delivers in 4-6 business days",
    price: "$4.99",
  },
  {
    id: "express",
    name: "Express",
    duration: "Delivers in 2-3 business days",
    price: "$9.99",
  },
  {
    id: "overnight",
    name: "Overnight",
    duration: "Delivers next business day",
    price: "$19.99",
  },
];

function ShippingMethodContent({ method }: { method: ShippingMethod }) {
  return (
    <span className="flex flex-col items-start gap-0.5">
      <span className="text-sm leading-6">{method.name}</span>
      <span className="text-xs leading-4 text-muted-foreground">
        {method.duration} ({method.price})
      </span>
    </span>
  );
}

export default function SelectObjectValuesDemo() {
  return (
    <Select
      defaultValue={shippingMethods[0]}
      itemToStringValue={(item: unknown) => (item as ShippingMethod).id}
    >
      <SelectTrigger
        className="h-fit min-w-46"
        aria-label="Select a shipping method"
      >
        <SelectValue placeholder="Select a shipping method">
          {(method: ShippingMethod) => (
            <ShippingMethodContent method={method} />
          )}
        </SelectValue>
        <SelectIcon className="flex items-center self-center">
          <ChevronsUpDownIcon className="size-3.5" />
        </SelectIcon>
      </SelectTrigger>
      <SelectPopup alignItemWithTrigger>
        <SelectList>
          {shippingMethods.map((method) => (
            <SelectItem key={method.id} value={method} className="h-fit">
              <SelectItemText className="flex flex-col items-start gap-0.5">
                <span className="text-sm leading-6">{method.name}</span>
                <span className="text-xs leading-4 text-muted-foreground">
                  {method.duration} ({method.price})
                </span>
              </SelectItemText>
              <SelectItemIndicator>
                <CheckIcon className="size-3" />
              </SelectItemIndicator>
            </SelectItem>
          ))}
        </SelectList>
      </SelectPopup>
    </Select>
  );
}
