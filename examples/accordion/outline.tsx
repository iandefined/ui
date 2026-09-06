import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/base/accordion";

export default function AccordionOutlineDemo() {
  return (
    <Accordion variant="outline" className="w-full max-w-lg">
      <AccordionItem value="item-1">
        <AccordionTrigger>Account Preferences</AccordionTrigger>
        <AccordionContent>
          Manage your email addresses, notification rules, and localization
          settings.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Security & Authentication</AccordionTrigger>
        <AccordionContent>
          Configure two-factor authentication, security keys, and active session
          devices.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Billing & Plans</AccordionTrigger>
        <AccordionContent>
          View invoices, download payment receipts, and upgrade or downgrade
          subscription tiers.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
