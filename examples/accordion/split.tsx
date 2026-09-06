import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/base/accordion";

export default function AccordionSplitDemo() {
  return (
    <Accordion variant="split" className="w-full max-w-lg">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is included in the Pro tier?</AccordionTrigger>
        <AccordionContent>
          Unlimited team workspaces, priority CDN edge deployment, and dedicated
          support channels with SLA guarantees.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Can I cancel anytime?</AccordionTrigger>
        <AccordionContent>
          Yes, you can cancel your subscription at any point from your team
          settings with prorated refunds.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>How does custom branding work?</AccordionTrigger>
        <AccordionContent>
          Upload your logo, custom font pairings, and color palette tokens to
          seamlessly align the theme with your brand.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
