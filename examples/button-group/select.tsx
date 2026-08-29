"use client";

import { ArrowRightIcon, CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { Button } from "@/registry/base/button";
import { ButtonGroup } from "@/registry/base/button-group";
import { Input } from "@/registry/base/input";
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

interface Currency {
  value: string;
  label: string;
}

const currencies: Currency[] = [
  {
    value: "$",
    label: "US Dollar",
  },
  {
    value: "EUR",
    label: "Euro",
  },
  {
    value: "GBP",
    label: "British Pound",
  },
];

export default function ButtonGroupSelectDemo() {
  return (
    <ButtonGroup>
      <ButtonGroup>
        <Select
          defaultValue={currencies[0]}
          itemToStringValue={(currency) => (currency as Currency)?.value}
        >
          <SelectTrigger aria-label="Select currency" className="min-w-0 w-fit">
            <SelectValue>{(currency: Currency) => currency.value}</SelectValue>
            <SelectIcon>
              <ChevronsUpDownIcon className="size-3.5" />
            </SelectIcon>
          </SelectTrigger>
          <SelectPopup alignItemWithTrigger className="min-w-48">
            <SelectList>
              {currencies.map((currency) => (
                <SelectItem key={currency.value} value={currency}>
                  <SelectItemText>
                    {currency.value}{" "}
                    <span className="text-muted-foreground">
                      {currency.label}
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
        <Input pattern="[0-9]*" placeholder="10.00" />
      </ButtonGroup>
      <ButtonGroup>
        <Button aria-label="Send" size="icon" variant="outline">
          <ArrowRightIcon />
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  );
}
