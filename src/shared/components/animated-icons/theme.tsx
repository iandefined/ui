"use client";

import { useId } from "react";

import { cn } from "@/shared/lib/utils";

type AnimatedThemeIconProps = React.ComponentProps<"svg"> & {
  state: "dark" | "light";
};

export const AnimatedThemeIcon = ({
  className,
  state,
  ...props
}: AnimatedThemeIconProps) =>
  state === "dark" ? (
    <SunnyToMoonIcon className={className} {...props} />
  ) : (
    <MoonToSunnyIcon className={className} {...props} />
  );

const SunnyToMoonIcon = ({
  className,
  ...props
}: React.ComponentProps<"svg">) => {
  const maskId = useId();

  return (
    <svg
      className={cn("size-5", className)}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.22 6.03L17.75 4.09L14.56 4L13.5 1L12.44 4L9.25 4.09L11.78 6.03L10.87 9.09L13.5 7.28L16.13 9.09L15.22 6.03Z"
        fill="currentColor"
        fillOpacity="0"
      >
        <animate
          attributeName="fill-opacity"
          begin="0.6s"
          dur="0.4s"
          fill="freeze"
          values="0;1"
        />
      </path>
      <path
        d="M19.61 12.25L21.25 11L19.19 10.95L18.5 9L17.81 10.95L15.75 11L17.39 12.25L16.8 14.23L18.5 13.06L20.2 14.23L19.61 12.25Z"
        fill="currentColor"
        fillOpacity="0"
      >
        <animate
          attributeName="fill-opacity"
          begin="1s"
          dur="0.4s"
          fill="freeze"
          values="0;1"
        />
      </path>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <g>
          <path
            d="M12 21v1M21 12h1M12 3v-1M3 12h-1"
            strokeDasharray="2"
            strokeDashoffset="4"
          >
            <animate
              attributeName="stroke-dashoffset"
              dur="0.2s"
              fill="freeze"
              values="4;2"
            />
          </path>
          <path
            d="M18.5 18.5l0.5 0.5M18.5 5.5l0.5 -0.5M5.5 5.5l-0.5 -0.5M5.5 18.5l-0.5 0.5"
            strokeDasharray="2"
            strokeDashoffset="4"
          >
            <animate
              attributeName="stroke-dashoffset"
              begin="0.2s"
              dur="0.2s"
              fill="freeze"
              values="4;2"
            />
          </path>
          <set attributeName="opacity" begin="0.5s" fill="freeze" to="0" />
        </g>
        <path
          d="M7 6 C7 12.08 11.92 17 18 17 C18.53 17 19.05 16.96 19.56 16.89 C17.95 19.36 15.17 21 12 21 C7.03 21 3 16.97 3 12 C3 8.83 4.64 6.05 7.11 4.44 C7.04 4.95 7 5.47 7 6 Z"
          opacity="0"
        >
          <set attributeName="opacity" begin="0.5s" fill="freeze" to="1" />
        </path>
      </g>
      <mask id={maskId}>
        <circle cx="12" cy="12" fill="#fff" r="12" />
        <circle cx="12" cy="12" r="4">
          <animate
            attributeName="r"
            begin="0.1s"
            dur="0.4s"
            fill="freeze"
            values="4;8"
          />
        </circle>
        <circle cx="22" cy="2" fill="#fff" r="3">
          <animate
            attributeName="cx"
            begin="0.1s"
            dur="0.4s"
            fill="freeze"
            values="22;18"
          />
          <animate
            attributeName="cy"
            begin="0.1s"
            dur="0.4s"
            fill="freeze"
            values="2;6"
          />
          <animate
            attributeName="r"
            begin="0.1s"
            dur="0.4s"
            fill="freeze"
            values="3;12"
          />
        </circle>
        <circle cx="22" cy="2" r="1">
          <animate
            attributeName="cx"
            begin="0.1s"
            dur="0.4s"
            fill="freeze"
            values="22;18"
          />
          <animate
            attributeName="cy"
            begin="0.1s"
            dur="0.4s"
            fill="freeze"
            values="2;6"
          />
          <animate
            attributeName="r"
            begin="0.1s"
            dur="0.4s"
            fill="freeze"
            values="1;10"
          />
        </circle>
      </mask>
      <circle
        cx="12"
        cy="12"
        fill="currentColor"
        mask={`url(#${maskId})`}
        r="6"
      >
        <animate
          attributeName="r"
          begin="0.1s"
          dur="0.4s"
          fill="freeze"
          values="6;10"
        />
        <set attributeName="opacity" begin="0.5s" fill="freeze" to="0" />
      </circle>
    </svg>
  );
};

const MoonToSunnyIcon = ({
  className,
  ...props
}: React.ComponentProps<"svg">) => {
  const maskId = useId();

  return (
    <svg
      className={cn("size-5", className)}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeDasharray="2"
        strokeDashoffset="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="M12 19v1M19 12h1M12 5v-1M5 12h-1">
          <animate
            attributeName="d"
            begin="1.2s"
            dur="0.2s"
            fill="freeze"
            values="M12 19v1M19 12h1M12 5v-1M5 12h-1;M12 21v1M21 12h1M12 3v-1M3 12h-1"
          />
          <animate
            attributeName="stroke-dashoffset"
            begin="1.2s"
            dur="0.2s"
            fill="freeze"
            values="2;0"
          />
        </path>
        <path d="M17 17l0.5 0.5M17 7l0.5 -0.5M7 7l-0.5 -0.5M7 17l-0.5 0.5">
          <animate
            attributeName="d"
            begin="1.4s"
            dur="0.2s"
            fill="freeze"
            values="M17 17l0.5 0.5M17 7l0.5 -0.5M7 7l-0.5 -0.5M7 17l-0.5 0.5;M18.5 18.5l0.5 0.5M18.5 5.5l0.5 -0.5M5.5 5.5l-0.5 -0.5M5.5 18.5l-0.5 0.5"
          />
          <animate
            attributeName="stroke-dashoffset"
            begin="1.4s"
            dur="0.2s"
            fill="freeze"
            values="2;0"
          />
        </path>
      </g>
      <g fill="currentColor">
        <path d="M15.22 6.03L17.75 4.09L14.56 4L13.5 1L12.44 4L9.25 4.09L11.78 6.03L10.87 9.09L13.5 7.28L16.13 9.09L15.22 6.03Z">
          <animate
            attributeName="fill-opacity"
            dur="0.4s"
            fill="freeze"
            values="1;0"
          />
        </path>
        <path d="M19.61 12.25L21.25 11L19.19 10.95L18.5 9L17.81 10.95L15.75 11L17.39 12.25L16.8 14.23L18.5 13.06L20.2 14.23L19.61 12.25Z">
          <animate
            attributeName="fill-opacity"
            begin="0.2s"
            dur="0.4s"
            fill="freeze"
            values="1;0"
          />
        </path>
      </g>
      <path
        d="M7 6 C7 12.08 11.92 17 18 17 C18.53 17 19.05 16.96 19.56 16.89 C17.95 19.36 15.17 21 12 21 C7.03 21 3 16.97 3 12 C3 8.83 4.64 6.05 7.11 4.44 C7.04 4.95 7 5.47 7 6 Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <set attributeName="opacity" begin="0.6s" fill="freeze" to="0" />
      </path>
      <mask id={maskId}>
        <circle cx="12" cy="12" fill="#fff" r="12" />
        <circle cx="12" cy="12" r="8">
          <animate
            attributeName="r"
            begin="0.6s"
            dur="0.4s"
            fill="freeze"
            values="8;4"
          />
        </circle>
        <circle cx="18" cy="6" fill="#fff" r="12">
          <animate
            attributeName="cx"
            begin="0.6s"
            dur="0.4s"
            fill="freeze"
            values="18;22"
          />
          <animate
            attributeName="cy"
            begin="0.6s"
            dur="0.4s"
            fill="freeze"
            values="6;2"
          />
          <animate
            attributeName="r"
            begin="0.6s"
            dur="0.4s"
            fill="freeze"
            values="12;3"
          />
        </circle>
        <circle cx="18" cy="6" r="10">
          <animate
            attributeName="cx"
            begin="0.6s"
            dur="0.4s"
            fill="freeze"
            values="18;22"
          />
          <animate
            attributeName="cy"
            begin="0.6s"
            dur="0.4s"
            fill="freeze"
            values="6;2"
          />
          <animate
            attributeName="r"
            begin="0.6s"
            dur="0.4s"
            fill="freeze"
            values="10;1"
          />
        </circle>
      </mask>
      <circle
        cx="12"
        cy="12"
        fill="currentColor"
        mask={`url(#${maskId})`}
        opacity="0"
        r="10"
      >
        <animate
          attributeName="r"
          begin="0.6s"
          dur="0.4s"
          fill="freeze"
          values="10;6"
        />
        <set attributeName="opacity" begin="0.6s" fill="freeze" to="1" />
      </circle>
    </svg>
  );
};
