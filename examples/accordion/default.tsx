import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/base/accordion";

export default function AccordionDefaultDemo() {
  return (
    <Accordion className="w-full max-w-lg">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern with keyboard
          navigation and screen reader announcements.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Can I customize the styling?</AccordionTrigger>
        <AccordionContent>
          Yes. Unstyled Base UI logic combines with Tailwind classes for
          seamless theming and variant extensions.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. Height and opacity transitions animate automatically using CSS
          transition variables.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
