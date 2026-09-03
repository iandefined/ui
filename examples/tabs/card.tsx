import { CreditCardIcon, LandmarkIcon, WalletIcon } from "lucide-react";

import { Tabs, TabsList, TabsTrigger } from "@/registry/base/tabs";

export default function TabsCardDemo() {
  return (
    <Tabs defaultValue="credit-card" variant="card">
      <TabsList className="*:data-[slot=tabs-trigger]:[&_svg]:size-5 *:data-[slot=tabs-trigger]:flex-col *:data-[slot=tabs-trigger]:items-start *:data-[slot=tabs-trigger]:py-2 *:data-[slot=tabs-trigger]:gap-1 gap-3">
        <TabsTrigger value="credit-card">
          <CreditCardIcon />
          Credit Card
        </TabsTrigger>
        <TabsTrigger value="bank">
          <LandmarkIcon />
          Bank Debit
        </TabsTrigger>
        <TabsTrigger value="wallet">
          <WalletIcon />
          Digital Wallet
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
