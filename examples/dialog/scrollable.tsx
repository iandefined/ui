import { Button } from "@/registry/base/button";
import {
  Dialog,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/base/dialog";

const sections = [
  {
    title: "Acceptance of Terms",
    body: "By accessing or using our service, you agree to be bound by these terms. If you do not agree to all the terms, you may not access the service.",
  },
  {
    title: "User Accounts",
    body: "You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. Notify us immediately of any unauthorized use.",
  },
  {
    title: "Intellectual Property",
    body: "The service and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, and other intellectual property laws.",
  },
  {
    title: "User Content",
    body: "You retain ownership of content you submit. By posting content, you grant us a license to use, modify, and display it in connection with the service.",
  },
  {
    title: "Prohibited Activities",
    body: "You may not use the service for any illegal purpose, to harass others, to distribute malware, or to interfere with the proper functioning of the service.",
  },
  {
    title: "Termination",
    body: "We may terminate or suspend your account immediately, without prior notice, for conduct that we believe violates these terms or is harmful to other users.",
  },
  {
    title: "Limitation of Liability",
    body: "In no event shall we be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.",
  },
  {
    title: "Changes to Terms",
    body: "We reserve the right to modify these terms at any time. We will notify users of significant changes via email or through the service.",
  },
  {
    title: "Governing Law",
    body: "These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which we operate, without regard to its conflict of law provisions.",
  },
  {
    title: "Contact Information",
    body: "If you have any questions about these terms, please contact us at support@example.com. We will respond to your inquiry within a reasonable timeframe.",
  },
];

export default function DialogScrollableDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        Open scrollable dialog
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Workspace settings</DialogTitle>
          <DialogDescription>
            The header and footer stay in place while DialogBody scrolls.
          </DialogDescription>
        </DialogHeader>
        <DialogBody fadeEdges="y" className="space-y-4">
          {sections.map((section, index) => (
            <section key={section.title} className="space-y-1">
              <h3 className="font-medium">
                {index + 1}. {section.title}
              </h3>
              <p className="text-sm text-muted-foreground">{section.body}</p>
            </section>
          ))}
        </DialogBody>
        <DialogFooter>
          <DialogCloseTrigger
            render={<Button variant="outline">Close</Button>}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
