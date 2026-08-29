import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxPopup,
} from "@/registry/base/combobox";

const frameworks = ["Astro", "Next.js", "Nuxt", "Remix", "SvelteKit", "Vite"];

export default function ComboboxWithLabelDemo() {
  return (
    <Combobox items={frameworks}>
      <div className="grid w-full max-w-xs gap-2">
        <ComboboxLabel htmlFor="framework">Framework</ComboboxLabel>
        <ComboboxInput id="framework" placeholder="Select a framework..." />
      </div>
      <ComboboxPopup>
        <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
        <ComboboxList>
          {(framework: string) => (
            <ComboboxItem key={framework} value={framework}>
              {framework}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>
  );
}
