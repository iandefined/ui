"use client";

import { ChevronDownIcon } from "lucide-react";
import { useCallback } from "react";

import { CopyButton } from "@/shared/components/copy-button";
import {
  ChatGptIcon,
  ClaudeIcon,
  CursorIcon,
  GeminiIcon,
  GrokIcon,
  MarkdownDocIcon,
  PerplexityIcon,
  SciraIcon,
  V0Icon,
} from "@/shared/components/icons";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Separator } from "@/shared/components/ui/separator";
import { SITE } from "@/shared/constants/site";

const getPromptUrl = (baseURL: string, url: string, param = "q") =>
  `${baseURL}?${param}=${encodeURIComponent(
    `I'm looking at this ${SITE.NAME} documentation: ${url}.
Help me understand how to use it. Be ready to explain concepts, give examples, or help debug based on it.
`
  )}`;

const MENU_ITEMS: [string, (url: string) => React.ReactElement][] = [
  [
    "markdown",
    (url) => (
      <a href={`${url}.md`} rel="noopener noreferrer" target="_blank">
        <MarkdownDocIcon />
        View as Markdown
      </a>
    ),
  ],
  [
    "v0",
    (url) => (
      <a
        href={getPromptUrl("https://v0.dev", url)}
        rel="noopener noreferrer"
        target="_blank"
      >
        <V0Icon />
        <span className="translate-x-[-2px]">Open in v0</span>
      </a>
    ),
  ],
  [
    "cursor",
    (url) => (
      <a
        href={getPromptUrl("https://cursor.com/link/prompt", url, "text")}
        rel="noopener noreferrer"
        target="_blank"
      >
        <CursorIcon />
        Open in Cursor
      </a>
    ),
  ],
  [
    "chatgpt",
    (url) => (
      <a
        href={getPromptUrl("https://chatgpt.com", url)}
        rel="noopener noreferrer"
        target="_blank"
      >
        <ChatGptIcon />
        Open in ChatGPT
      </a>
    ),
  ],
  [
    "claude",
    (url) => (
      <a
        href={getPromptUrl("https://claude.ai/new", url)}
        rel="noopener noreferrer"
        target="_blank"
      >
        <ClaudeIcon />
        Open in Claude
      </a>
    ),
  ],
  [
    "perplexity",
    (url) => (
      <a
        href={getPromptUrl("https://perplexity.ai", url)}
        rel="noopener noreferrer"
        target="_blank"
      >
        <PerplexityIcon />
        Open in Perplexity
      </a>
    ),
  ],
  [
    "gemini",
    (url) => (
      <a
        href={getPromptUrl("https://gemini.google.com/app", url)}
        rel="noopener noreferrer"
        target="_blank"
      >
        <GeminiIcon />
        Open in Gemini
      </a>
    ),
  ],
  [
    "grok",
    (url) => (
      <a
        href={getPromptUrl("https://grok.com", url)}
        rel="noopener noreferrer"
        target="_blank"
      >
        <GrokIcon />
        Open in Grok
      </a>
    ),
  ],
  [
    "scira",
    (url) => (
      <a
        className="m-0 p-0"
        href={getPromptUrl("https://scira.ai/", url)}
        rel="noopener noreferrer"
        target="_blank"
      >
        <SciraIcon />
        Open in Scira AI
      </a>
    ),
  ],
];

export const DocsCopyPage = ({
  markdownUrl,
  url,
}: {
  markdownUrl: string;
  url: string;
}) => {
  const copyValue = useCallback(async () => {
    const response = await fetch(markdownUrl);
    return response.text();
  }, [markdownUrl]);

  const menuTrigger = (
    <Button
      variant="secondary"
      size="sm"
      className="peer -ml-0.5 size-9 px-2 sm:size-8 md:size-7 md:text-[0.8rem]"
      aria-label="Open markdown actions"
    >
      <ChevronDownIcon />
    </Button>
  );

  return (
    <div className="group/buttons relative flex gap-0 rounded-lg bg-secondary *:data-[slot=button]:focus-visible:relative *:data-[slot=button]:focus-visible:z-10">
      <CopyButton
        value={copyValue}
        showTooltip={false}
        variant="secondary"
        className="h-9 sm:h-8 md:h-7 md:text-[0.8rem]"
      >
        Copy Markdown
      </CopyButton>
      <DropdownMenu>
        <DropdownMenuTrigger render={menuTrigger} />
        <DropdownMenuContent
          align="end"
          collisionPadding={8}
          className="animate-none! rounded-lg shadow-none"
        >
          {MENU_ITEMS.map(([key, render]) => (
            <DropdownMenuItem key={key} render={render(url)} />
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <Separator
        orientation="vertical"
        className="absolute top-1 right-9 z-0 h-7! bg-foreground/5! peer-focus-visible:opacity-0 sm:right-8 sm:h-6! md:right-7 md:h-5!"
      />
    </div>
  );
};
