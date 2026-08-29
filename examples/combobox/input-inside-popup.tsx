import { Button } from "@/registry/base/button";
import {
  ChevronsUpDownIcon,
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxTrigger,
  ComboboxValue,
} from "@/registry/base/combobox";

const countries = [
  { code: "au", label: "Australia" },
  { code: "br", label: "Brazil" },
  { code: "ca", label: "Canada" },
  { code: "de", label: "Germany" },
  { code: "jp", label: "Japan" },
  { code: "mx", label: "Mexico" },
  { code: "gb", label: "United Kingdom" },
  { code: "us", label: "United States" },
];

type Country = (typeof countries)[number];

export default function ComboboxInputInsidePopupDemo() {
  return (
    <Combobox items={countries}>
      <ComboboxTrigger
        render={
          <Button
            className="w-full max-w-xs justify-between font-normal active:scale-100"
            variant="outline"
          />
        }
      >
        <ComboboxValue>
          {(country: Country | null) => country?.label ?? "Select a country..."}
        </ComboboxValue>
        <ChevronsUpDownIcon className="-me-1 ms-auto shrink-0 text-muted-foreground" />
      </ComboboxTrigger>
      <ComboboxPopup aria-label="Select a country" sideOffset={8}>
        <div className="border-b p-2">
          <ComboboxInput
            aria-label="Search countries"
            placeholder="Select a country..."
            showTrigger={false}
          />
        </div>
        <ComboboxEmpty>No countries found.</ComboboxEmpty>
        <ComboboxList>
          {(country: Country) => (
            <ComboboxItem key={country.code} value={country}>
              {country.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>
  );
}
