import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/base/accordion";

export default function AccordionNestedDemo() {
  return (
    <Accordion variant="nested" className="w-full max-w-lg">
      <AccordionItem value="item-1">
        <AccordionTrigger>Deployment Settings</AccordionTrigger>
        <AccordionContent>
          Configure static routing rules, worker bindings, and custom build
          hooks for automated releases.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Environment Variables</AccordionTrigger>
        <AccordionContent>
          Manage encrypted production secrets and shared runtime variables
          across preview environments.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Access Controls</AccordionTrigger>
        <AccordionContent>
          Define role-based permissions and grant scoped API tokens with
          granular expiration windows.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
