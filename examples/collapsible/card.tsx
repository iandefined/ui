"use client";

import type { SVGProps } from "react";

import { Badge } from "@/registry/base/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/base/collapsible";

export default function CollapsibleCardDemo() {
  return (
    <Collapsible
      defaultOpen
      className="w-full max-w-sm rounded-xl border border-border bg-muted dark:bg-card p-1.5"
    >
      <CollapsibleTrigger className="group flex w-full cursor-pointer items-center justify-between rounded-lg border-none bg-transparent p-2.5 outline-none hover:bg-transparent shadow-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-[#D97757] text-white">
            <ClaudeAI className="size-5" />
          </div>
          <div className="text-left">
            <span className="text-sm font-medium">Claude</span>
          </div>
        </div>
        <div className="flex size-7 items-center justify-center rounded-md border border-border/70 bg-card/60 dark:bg-muted/60 transition-colors">
          <ChevronDownIcon className="size-4 text-muted-foreground transition-transform duration-200 ease-out group-data-panel-open:rotate-180" />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="mx-px mt-1 rounded-lg bg-card p-4 shadow-[0_0_0_1px_rgb(0_0_0/0.06),0_1px_1px_-0.5px_rgb(0_0_0/0.06),0_3px_3px_-1.5px_rgb(0_0_0/0.05)] dark:bg-muted dark:shadow-[0_0_0_1px_rgb(0_0_0/0.12),0_1px_1px_-0.5px_rgb(0_0_0/0.18),0_3px_3px_-1.5px_rgb(0_0_0/0.16),inset_0_1px_0_0_rgb(255_255_255/0.02),inset_0_0_0_1px_rgb(255_255_255/0.02)]">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <div className="text-muted-foreground">
              <span className="text-sm font-medium">Website</span>
            </div>
            <a
              href="https://claude.ai"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 rounded-full border border-border/70 bg-accent/60 px-2 py-0.5 text-xs font-medium transition-colors hover:bg-accent"
            >
              <span>https://claude.ai</span>
            </a>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="text-muted-foreground">
              <span className="text-sm font-medium">Monthly Visits</span>
            </div>
            <span className="text-sm font-medium tabular-nums">205M</span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="text-muted-foreground">
              <span className="text-sm font-medium">Heat Score</span>
            </div>
            <Badge variant="success" className="gap-1">
              <span>89</span>
            </Badge>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="text-muted-foreground">
              <span className="text-sm font-medium">Location</span>
            </div>
            <span className="text-sm font-medium">California, USA</span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="text-muted-foreground">
              <span className="text-sm font-medium">Categories</span>
            </div>
            <div className="flex items-center gap-1">
              <Badge variant="info">AI</Badge>
              <Badge variant="success">SaaS</Badge>
              <Badge variant="warning">B2B</Badge>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="text-muted-foreground">
              <span className="text-sm font-medium">Employees</span>
            </div>
            <span className="text-sm font-medium tabular-nums">1001-5000</span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="text-muted-foreground">
              <span className="text-sm font-medium">Estimated ARR</span>
            </div>
            <Badge variant="success">$3-4B</Badge>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="text-muted-foreground">
              <span className="text-sm font-medium">Founders</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-1 rounded-full border border-border/70 bg-accent/60 px-1.5 py-0.5 dark:bg-card">
                <img
                  src="https://github.com/shadcn.png"
                  alt="Founder"
                  className="size-4 rounded-full"
                />
                <span className="text-xs font-medium">shadcn</span>
              </div>
              <div className="flex items-center gap-1 rounded-full border border-border/70 bg-accent/60 px-2 py-0.5 dark:bg-card">
                <span className="text-xs font-medium">
                  <span className="sm:hidden">+5</span>
                  <span className="hidden sm:inline">+5 more</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

const ClaudeAI = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} preserveAspectRatio="xMidYMid" viewBox="0 0 256 257">
    <path
      fill="currentColor"
      d="m50.228 170.321 50.357-28.257.843-2.463-.843-1.361h-2.462l-8.426-.518-28.775-.778-24.952-1.037-24.175-1.296-6.092-1.297L0 125.796l.583-3.759 5.12-3.434 7.324.648 16.202 1.101 24.304 1.685 17.629 1.037 26.118 2.722h4.148l.583-1.685-1.426-1.037-1.101-1.037-25.147-17.045-27.22-18.017-14.258-10.37-7.713-5.25-3.888-4.925-1.685-10.758 7-7.713 9.397.649 2.398.648 9.527 7.323 20.35 15.75L94.817 91.9l3.889 3.24 1.555-1.102.195-.777-1.75-2.917-14.453-26.118-15.425-26.572-6.87-11.018-1.814-6.61c-.648-2.723-1.102-4.991-1.102-7.778l7.972-10.823L71.42 0 82.05 1.426l4.472 3.888 6.61 15.101 10.694 23.786 16.591 32.34 4.861 9.592 2.592 8.879.973 2.722h1.685v-1.556l1.36-18.211 2.528-22.36 2.463-28.776.843-8.1 4.018-9.722 7.971-5.25 6.222 2.981 5.12 7.324-.713 4.73-3.046 19.768-5.962 30.98-3.889 20.739h2.268l2.593-2.593 10.499-13.934 17.628-22.036 7.778-8.749 9.073-9.657 5.833-4.601h11.018l8.1 12.055-3.628 12.443-11.342 14.388-9.398 12.184-13.48 18.147-8.426 14.518.778 1.166 2.01-.194 30.46-6.481 16.462-2.982 19.637-3.37 8.88 4.148.971 4.213-3.5 8.62-20.998 5.184-24.628 4.926-36.682 8.685-.454.324.519.648 16.526 1.555 7.065.389h17.304l32.21 2.398 8.426 5.574 5.055 6.805-.843 5.184-12.962 6.611-17.498-4.148-40.83-9.721-14-3.5h-1.944v1.167l11.666 11.406 21.387 19.314 26.767 24.887 1.36 6.157-3.434 4.86-3.63-.518-23.526-17.693-9.073-7.972-20.545-17.304h-1.36v1.814l4.73 6.935 25.017 37.59 1.296 11.536-1.814 3.76-6.481 2.268-7.13-1.297-14.647-20.544-15.1-23.138-12.185-20.739-1.49.843-7.194 77.448-3.37 3.953-7.778 2.981-6.48-4.925-3.436-7.972 3.435-15.749 4.148-20.544 3.37-16.333 3.046-20.285 1.815-6.74-.13-.454-1.49.194-15.295 20.999-23.267 31.433-18.406 19.702-4.407 1.75-7.648-3.954.713-7.064 4.277-6.286 25.47-32.405 15.36-20.092 9.917-11.6-.065-1.686h-.583L44.07 198.125l-12.055 1.555-5.185-4.86.648-7.972 2.463-2.593 20.35-13.999-.064.065Z"
    />
  </svg>
);

function ChevronDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6z"
      />
    </svg>
  );
}

// eslint-disable-next-line eslint/no-unused-vars -- retained icon asset
function PlanetIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="none" fillRule="evenodd">
        <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
        <path
          fill="currentColor"
          d="M12 3c2.225 0 4.263.808 5.833 2.146c.931-.22 1.785-.322 2.507-.26c.76.064 1.603.337 2.052 1.114c.407.704.352 1.49.076 2.204c-.272.702-.787 1.427-1.481 2.163l-.114.12a9 9 0 0 1-14.62 8.44l-.16.04c-.985.233-1.87.317-2.615.2c-.757-.118-1.465-.465-1.87-1.167c-.45-.777-.264-1.644.06-2.334c.308-.655.823-1.344 1.479-2.04A9 9 0 0 1 12 3M3.345 17.009c-.143-.709 1-1.75 1.406-2.167a1.53 1.53 0 0 0 .4-1.386a7 7 0 0 1 11.531-6.66a1.53 1.53 0 0 0 1.402.348c.563-.144 2.039-.613 2.581-.135c.336.704-.971 1.832-1.38 2.239l-.01.01c-1.236 1.23-3.281 2.746-6.275 4.474c-2.992 1.728-5.326 2.74-7.01 3.197l-.015.004c-.527.143-2.209.689-2.63.076m5.288 1.13c1.538-.614 3.33-1.499 5.367-2.675s3.698-2.284 4.998-3.31A7 7 0 0 1 8.633 18.14Z"
        />
      </g>
    </svg>
  );
}
