import { LRUCache } from "lru-cache";
import type { BundledLanguage, Highlighter, ShikiTransformer } from "shiki";
import { createHighlighter } from "shiki";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

const highlightCache = new LRUCache<string, string>({
  max: 500,
  ttl: 1000 * 60 * 60,
});

const shikiEngine = createJavaScriptRegexEngine({ forgiving: true });
let highlighterPromise: Promise<Highlighter> | undefined;

const getHighlighter = () => {
  highlighterPromise ??= createHighlighter({
    engine: shikiEngine,
    langs: [],
    themes: ["github-dark", "github-light"],
  });

  return highlighterPromise;
};

const loadLanguage = async (highlighter: Highlighter, language: string) => {
  try {
    await highlighter.loadLanguage(language as BundledLanguage);
    return language;
  } catch {
    await highlighter.loadLanguage("tsx");
    return "tsx";
  }
};

export const transformers = [
  {
    code(node) {
      if (node.tagName === "code") {
        const raw = this.source;
        node.properties.__raw__ = raw;

        if (raw.startsWith("npm install")) {
          node.properties.__npm__ = raw;
          node.properties.__yarn__ = raw.replace("npm install", "yarn add");
          node.properties.__pnpm__ = raw.replace("npm install", "pnpm add");
          node.properties.__bun__ = raw.replace("npm install", "bun add");
        } else if (raw.startsWith("npx create-")) {
          node.properties.__npm__ = raw;
          node.properties.__yarn__ = raw.replace("npx create-", "yarn create ");
          node.properties.__pnpm__ = raw.replace("npx create-", "pnpm create ");
          node.properties.__bun__ = raw.replace("npx", "bunx --bun");
        } else if (raw.startsWith("npm create")) {
          node.properties.__npm__ = raw;
          node.properties.__yarn__ = raw.replace("npm create", "yarn create");
          node.properties.__pnpm__ = raw.replace("npm create", "pnpm create");
          node.properties.__bun__ = raw.replace("npm create", "bun create");
        } else if (raw.startsWith("npx")) {
          node.properties.__npm__ = raw;
          node.properties.__yarn__ = raw.replace("npx", "yarn dlx");
          node.properties.__pnpm__ = raw.replace("npx", "pnpm dlx");
          node.properties.__bun__ = raw.replace("npx", "bunx --bun");
        } else if (raw.startsWith("npm run")) {
          node.properties.__npm__ = raw;
          node.properties.__yarn__ = raw.replace("npm run", "yarn");
          node.properties.__pnpm__ = raw.replace("npm run", "pnpm");
          node.properties.__bun__ = raw.replace("npm run", "bun");
        }
      }
    },
  },
] as ShikiTransformer[];

const hashString = (input: string) => {
  let hash = 0x811c9dc5;

  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }

  return (hash >>> 0).toString(16);
};

export const highlightCode = async (code: string, language = "tsx") => {
  const cacheKey = hashString(`${language}:${code}`);

  const cached = highlightCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const highlighter = await getHighlighter();
  const lang = await loadLanguage(highlighter, language);

  const html = highlighter.codeToHtml(code, {
    lang,
    themes: {
      dark: "github-dark",
      light: "github-light",
    },
    transformers: [
      {
        code(node) {
          node.properties["data-line-numbers"] = "";
        },
        line(node) {
          node.properties["data-line"] = "";
        },
        pre(node) {
          node.properties.class =
            "no-scrollbar min-w-0 overflow-x-auto px-4 py-3.5 outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0 !bg-transparent";
        },
      },
    ],
  });

  highlightCache.set(cacheKey, html);

  return html;
};
