"use client";

import { useId } from "react";

import { cn } from "@/shared/lib/utils";

export const AnimatedGitHubIcon = ({
  className,
  ...props
}: React.ComponentProps<"svg">) => {
  const maskId = useId();

  return (
    <svg
      className={cn("size-4", className)}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask id={maskId} width="24" height="24" x="0" y="0">
        <g fill="#fff">
          <ellipse cx="9.5" cy="9" rx="1.5" ry="1" />
          <ellipse cx="14.5" cy="9" rx="1.5" ry="1" />
        </g>
      </mask>
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path
          d="M12 4c1.67 0 2.61 0.4 3 0.5c0.53 -0.43 1.94 -1.5 3.5 -1.5c0.34 1 0.29 2.22 0 3c0.75 1 1 2 1 3.5c0 2.19 -0.48 3.58 -1.5 4.5c-1.02 0.92 -2.11 1.37 -3.5 1.5c0.65 0.54 0.5 1.87 0.5 2.5c0 0.73 0 3 0 3M12 4c-1.67 0 -2.61 0.4 -3 0.5c-0.53 -0.43 -1.94 -1.5 -3.5 -1.5c-0.34 1 -0.29 2.22 0 3c-0.75 1 -1 2 -1 3.5c0 2.19 0.48 3.58 1.5 4.5c1.02 0.92 2.11 1.37 3.5 1.5c-0.65 0.54 -0.5 1.87 -0.5 2.5c0 0.73 0 3 0 3"
          strokeDasharray="32"
          strokeDashoffset="32"
        >
          <animate
            attributeName="stroke-dashoffset"
            dur="0.7s"
            fill="freeze"
            values="32;0"
          />
        </path>
        <path
          d="M9 19c-1.406 0-2.844-.563-3.688-1.188C4.47 17.188 4.22 16.157 3 15.5"
          strokeDasharray="10"
          strokeDashoffset="10"
        >
          <animate
            attributeName="d"
            dur="3s"
            repeatCount="indefinite"
            values="M9 19c-1.406 0-2.844-.563-3.688-1.188C4.47 17.188 4.22 16.157 3 15.5;M9 19c-1.406 0-3-.5-4-.5-.532 0-1 0-2-.5;M9 19c-1.406 0-2.844-.563-3.688-1.188C4.47 17.188 4.22 16.157 3 15.5"
          />
          <animate
            attributeName="stroke-dashoffset"
            begin="0.8s"
            dur="0.2s"
            fill="freeze"
            values="10;0"
          />
        </path>
      </g>
      <rect
        fill="currentColor"
        height="4"
        mask={`url(#${maskId})`}
        width="8"
        x="8"
        y="11"
      >
        <animate
          attributeName="y"
          dur="10s"
          keyTimes="0;0.45;0.46;0.54;0.55;1"
          repeatCount="indefinite"
          values="11;11;7;7;11;11"
        />
      </rect>
    </svg>
  );
};
