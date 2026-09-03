import type { SVGProps } from "react";

import { Tabs, TabsList, TabsTrigger } from "@/registry/base/tabs";

export default function TabsSegmentedDemo() {
  return (
    <Tabs defaultValue="india" variant="segmented">
      <TabsList className="*:data-[slot=tabs-trigger]:h-10 *:data-[slot=tabs-trigger]:[&_svg]:size-5">
        <TabsTrigger value="india">
          <IndiaFlag />
          India
        </TabsTrigger>
        <TabsTrigger value="france">
          <FranceFlag />
          France
        </TabsTrigger>
        <TabsTrigger value="belgium">
          <BelgiumFlag />
          Belgium
        </TabsTrigger>
        <TabsTrigger value="switzerland">
          <SwitzerlandFlag />
          Switzerland
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

function IndiaFlag(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 36 36"
      {...props}
    >
      <path fill="#138808" d="M0 27a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4v-4H0v4z" />
      <path fill="#EEE" d="M0 13h36v10H0z" />
      <path fill="#F93" d="M36 13V9a4 4 0 0 0-4-4H4a4 4 0 0 0-4 4v4h36z" />
      <circle fill="navy" cx="18" cy="18" r="4" />
      <circle fill="#EEE" cx="18" cy="18" r="3" />
      <circle fill="navy" cx="18" cy="18" r="1" />
    </svg>
  );
}

function FranceFlag(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 36 36"
      {...props}
    >
      <path fill="#ED2939" d="M36 27a4 4 0 0 1-4 4h-8V5h8a4 4 0 0 1 4 4z" />
      <path fill="#002495" d="M4 5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h8V5z" />
      <path fill="#EEE" d="M12 5h12v26H12z" />
    </svg>
  );
}

function BelgiumFlag(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 36 36"
      {...props}
    >
      <path fill="#25333a" d="M4 5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h8V5z" />
      <path fill="#f9cb38" d="M12 5h12v26H12z" />
      <path fill="#ec1c24" d="M36 27a4 4 0 0 1-4 4h-8V5h8a4 4 0 0 1 4 4z" />
    </svg>
  );
}

function SwitzerlandFlag(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 36 36"
      {...props}
    >
      <path
        fill="#ec1c24"
        d="M4 5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4z"
      />
      <path fill="#fff" d="M15 11h6v14h-6z" />
      <path fill="#fff" d="M11 15h14v6H11z" />
    </svg>
  );
}
