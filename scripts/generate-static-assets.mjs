import { createHash } from "node:crypto";
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

process.env.NODE_ENV ||= "production";

const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));

const ROUTES = {
  AGENT_SKILLS_INDEX: "/.well-known/agent-skills/index.json",
  AGENT_SKILLS_SITE_SKILL: "/.well-known/agent-skills/site-skill.md",
  API_CATALOG: "/.well-known/api-catalog",
  API_STATUS: "/api/status",
  DOCS: "/docs",
  DOCS_COMPONENTS: "/docs/components",
  DOCS_INSTALLATION: "/docs/installation",
  HOME: "/",
  LLMS: "/llms.txt",
  LLMS_FULL: "/llms-full.txt",
  LLMS_MD: "/llms.md",
  MANIFEST: "/manifest.webmanifest",
  OPENAPI: "/openapi.json",
  REGISTRY: "/r/registry.json",
  ROBOTS: "/robots.txt",
  RSS: "/rss.xml",
  SITEMAP: "/sitemap.xml",
};

const readSiteConfig = async () => {
  const siteConstants = await readFile(
    path.join(root, "src", "shared", "constants", "site.ts"),
    "utf8"
  );

  const readString = (pattern, label) => {
    const match = siteConstants.match(pattern);
    if (!match) {
      throw new Error(
        `Could not find ${label} in src/shared/constants/site.ts`
      );
    }

    return match[1];
  };

  return {
    descriptionLong: readString(
      /DESCRIPTION:\s*{[\s\S]*?LONG:\s*["']([^"']+)["']/,
      "SITE.DESCRIPTION.LONG"
    ),
    fallbackOrigin: readString(
      /export\s+const\s+FALLBACK_SITE_ORIGIN\s*=\s*["']([^"']+)["']/,
      "FALLBACK_SITE_ORIGIN"
    ),
    name: readString(/\n\s{2}NAME:\s*["']([^"']+)["']/, "SITE.NAME"),
    themeLight: readString(
      /META_THEME_COLORS\s*=\s*{[\s\S]*?light:\s*["']([^"']+)["']/,
      "META_THEME_COLORS.light"
    ),
    titleLong: readString(
      /TITLE:\s*{[\s\S]*?LONG:\s*["']([^"']+)["']/,
      "SITE.TITLE.LONG"
    ),
  };
};

const siteConfig = await readSiteConfig();
const siteOrigin = process.env.SITE_URL ?? siteConfig.fallbackOrigin;

const LINK = {
  SHADCN_MCP_DOCS: "https://ui.shadcn.com/docs/mcp",
};

const SITE = {
  DESCRIPTION: {
    LONG: siteConfig.descriptionLong,
  },
  NAME: siteConfig.name,
  TITLE: siteConfig.titleLong,
  URL: siteOrigin,
};

const META_THEME_COLORS = {
  light: siteConfig.themeLight,
};

const AGENT_DOCS_DIRECTIVE_MARKDOWN = `> For the complete documentation index, see [llms.txt](${ROUTES.LLMS}). Markdown variants are available at explicit \`.md\` URLs. An agent skill is available at [${ROUTES.AGENT_SKILLS_SITE_SKILL}](${ROUTES.AGENT_SKILLS_SITE_SKILL}).`;

const SITE_AGENT_SKILL_MD = `# ${SITE.NAME}

## Summary

Help users discover, inspect, and install components from this public shadcn registry starter and its documentation site.

## Registry

- Registry JSON: \`${ROUTES.REGISTRY}\`
- Docs: ${ROUTES.DOCS}

## MCP

This site is a shadcn-compatible registry. For MCP workflows, use the maintained shadcn MCP server documentation: ${LINK.SHADCN_MCP_DOCS}

## Install

\`\`\`bash
npx shadcn@latest add ${SITE.URL}/r/your-component.json
\`\`\`

Prefer following the on-site installation guide: ${ROUTES.DOCS_INSTALLATION}
`;

const siteAgentSkillDigest = () => {
  const hex = createHash("sha256")
    .update(SITE_AGENT_SKILL_MD, "utf-8")
    .digest("hex");

  return `sha256:${hex}`;
};

const buildOpenApiDocument = (origin) => {
  const base = origin.replace(/\/$/, "");
  const homeContentRoute = `${ROUTES.LLMS_MD}/content.md`;

  return {
    externalDocs: {
      description:
        "Use the maintained shadcn MCP server for registry browsing, search, and installation workflows.",
      url: LINK.SHADCN_MCP_DOCS,
    },
    info: {
      description: `Read-only HTTP surfaces for the ${SITE.NAME} documentation site and shadcn component registry.`,
      title: `${SITE.NAME} public HTTP API`,
      version: "0.1.0",
    },
    openapi: "3.0.3",
    paths: {
      [ROUTES.AGENT_SKILLS_INDEX]: {
        get: {
          responses: {
            200: { description: "Agent skills index" },
          },
          summary: "Agent skills discovery index",
        },
      },
      [ROUTES.AGENT_SKILLS_SITE_SKILL]: {
        get: {
          responses: {
            200: { description: "Agent skill markdown" },
          },
          summary: "Site agent skill markdown",
        },
      },
      [ROUTES.API_CATALOG]: {
        get: {
          responses: {
            200: { description: "API catalog linkset" },
          },
          summary: "Machine-readable API catalog",
        },
        head: {
          responses: {
            200: { description: "API catalog headers" },
          },
          summary: "API catalog headers",
        },
      },
      [ROUTES.API_STATUS]: {
        get: {
          responses: {
            200: {
              content: {
                "application/json": {
                  schema: {
                    properties: { status: { example: "ok", type: "string" } },
                    type: "object",
                  },
                },
              },
              description: "OK",
            },
          },
          summary: "Service health",
        },
      },
      [ROUTES.LLMS_FULL]: {
        get: {
          responses: {
            200: { description: "Plain text bundle" },
          },
          summary: "Full LLM-oriented documentation export",
        },
      },
      [ROUTES.LLMS]: {
        get: {
          responses: {
            200: { description: "Plain text index" },
          },
          summary: "LLM-oriented documentation index",
        },
      },
      [ROUTES.OPENAPI]: {
        get: {
          responses: {
            200: {
              content: {
                "application/json": {
                  schema: { type: "object" },
                },
              },
              description: "OpenAPI JSON",
            },
          },
          summary: "This OpenAPI document",
        },
      },
      [ROUTES.REGISTRY]: {
        get: {
          responses: {
            200: {
              content: {
                "application/json": {
                  schema: { type: "object" },
                },
              },
              description: "Registry manifest",
            },
          },
          summary: "shadcn/ui component registry index",
        },
      },
      [ROUTES.DOCS]: {
        get: {
          responses: {
            200: { description: "HTML documentation" },
          },
          summary: "Documentation (HTML)",
        },
      },
      [homeContentRoute]: {
        get: {
          responses: {
            200: { description: "Homepage markdown export" },
          },
          summary: "Homepage markdown export",
        },
        head: {
          responses: {
            200: { description: "Homepage markdown headers" },
          },
          summary: "Homepage markdown headers",
        },
      },
    },
    servers: [{ url: base }],
  };
};

const publicDir = path.join(root, "public");
const docsDir = path.join(root, "content", "docs");
const generatedDir = path.join(root, "src", "shared", "generated");
const siteUrl = SITE.URL.replace(/\/$/, "");

const writePublic = async (route, body) => {
  const relative = route.replace(/^\/+/, "");
  const file = path.join(publicDir, relative);

  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, body);
};

const writeGenerated = async (fileName, body) => {
  const file = path.join(generatedDir, fileName);

  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, body);
};

const parseFrontmatter = (content) => {
  if (!content.startsWith("---\n")) {
    return { data: {}, body: content.trim() };
  }

  const end = content.indexOf("\n---", 4);
  if (end === -1) {
    return { data: {}, body: content.trim() };
  }

  const frontmatter = content.slice(4, end).trim();
  const body = content.slice(end + 4).trim();
  const data = {};

  for (const line of frontmatter.split(/\r?\n/)) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (match) {
      data[match[1]] = match[2].replace(/^["']|["']$/g, "");
    }
  }

  return { data, body };
};

const normalizeSlug = (relativePath) => {
  const parts = relativePath.split(path.sep);
  const file = parts.pop()?.replace(/\.mdx$/, "");
  const normalized = [...parts, file].filter(
    (segment) => segment && segment !== "(root)" && segment !== "index"
  );

  return normalized;
};

const stripMdxChrome = (body) => {
  const lines = [];
  let fenceMarker = null;
  let inComponentTag = false;

  for (const line of body.split(/\r?\n/)) {
    const trimmed = line.trim();
    const fence = trimmed.match(/^(`{3,}|~{3,})/)?.[1];

    if (fence) {
      if (!fenceMarker) {
        fenceMarker = fence;
      } else if (
        fence[0] === fenceMarker[0] &&
        fence.length >= fenceMarker.length
      ) {
        fenceMarker = null;
      }
      lines.push(line);
      continue;
    }

    if (!fenceMarker) {
      if (inComponentTag) {
        inComponentTag = !trimmed.includes(">");
        continue;
      }

      if (/^import\s+/.test(trimmed)) {
        continue;
      }

      if (/^<[A-Z][^>]*$/.test(trimmed) && !trimmed.includes(">")) {
        inComponentTag = true;
        continue;
      }

      if (/^<\/?[A-Z][^>]*(?:>|\/>)\s*$/.test(trimmed)) {
        continue;
      }

      if (/^<[A-Z][^>]*>.*<\/[A-Z][^>]*>$/.test(trimmed)) {
        continue;
      }

      lines.push(line.trimStart());
      continue;
    }

    lines.push(line);
  }

  const normalized = lines
    .join("\n")
    .replace(/(```[^\n]*\n)\n(```)/g, "$1$2")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const separatedLines = [];
  let currentFenceMarker = null;
  const normalizedLines = normalized.split("\n");

  for (let index = 0; index < normalizedLines.length; index += 1) {
    const line = normalizedLines[index];
    const fence = line.trim().match(/^(`{3,}|~{3,})/)?.[1];
    let closedFence = false;

    if (fence) {
      if (!currentFenceMarker) {
        currentFenceMarker = fence;
      } else if (
        fence[0] === currentFenceMarker[0] &&
        fence.length >= currentFenceMarker.length
      ) {
        currentFenceMarker = null;
        closedFence = true;
      }
    }

    separatedLines.push(line);

    if (closedFence && normalizedLines[index + 1]?.trim().startsWith("```")) {
      separatedLines.push("");
    }
  }

  return separatedLines.join("\n").replace(/^```\s*\n(?=```)/gm, "```\n\n");
};

const readDocs = async (dir = docsDir) => {
  const pages = [];
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      pages.push(...(await readDocs(fullPath)));
      continue;
    }

    if (!entry.isFile() || !entry.name.endsWith(".mdx")) {
      continue;
    }

    const content = await readFile(fullPath, "utf8");
    const relativePath = path.relative(docsDir, fullPath);
    const slugs = normalizeSlug(relativePath);
    const { data, body } = parseFrontmatter(content);
    const markdown = stripMdxChrome(body);

    pages.push({
      body: markdown,
      date: data.date ? new Date(data.date) : null,
      description: data.description ?? "",
      slugs,
      title: data.title ?? slugs.at(-1) ?? "Docs",
      url: `${ROUTES.DOCS}${slugs.length ? `/${slugs.join("/")}` : ""}`,
    });
  }

  return pages.toSorted((a, b) => a.url.localeCompare(b.url));
};

const markdownForPage = (page) => {
  const sections = [
    page.description,
    AGENT_DOCS_DIRECTIVE_MARKDOWN,
    page.body,
  ].filter(Boolean);

  return `# ${page.title}\n\n${sections.join("\n\n")}\n`;
};

const documentationIndex = (pages) =>
  [
    "## Documentation",
    "",
    ...pages.map((page) => {
      const mdRoute = `${page.url}.md`;
      const description = page.description ? ` - ${page.description}` : "";

      return `- [${page.title}](${siteUrl}${mdRoute})${description}`;
    }),
  ].join("\n");

const docsIndex = (pages) => `# ${SITE.NAME}

> ${SITE.DESCRIPTION.LONG} Use this index to discover the available documentation pages, markdown mirrors, and registry resources before browsing.

${documentationIndex(pages)}

## Machine-readable Resources

- [Full documentation](${siteUrl}${ROUTES.LLMS_FULL})
- [Homepage markdown](${siteUrl}${ROUTES.LLMS_MD}/content.md)
- [OpenAPI description](${siteUrl}${ROUTES.OPENAPI})
- [API catalog](${siteUrl}${ROUTES.API_CATALOG})
- [Agent skill](${siteUrl}${ROUTES.AGENT_SKILLS_SITE_SKILL})
- [shadcn MCP server documentation](${LINK.SHADCN_MCP_DOCS})
`;

const homepageMarkdown = () => `# ${SITE.NAME}

${SITE.DESCRIPTION.LONG}

${AGENT_DOCS_DIRECTIVE_MARKDOWN}

## Quick links

- [Get started](${siteUrl}${ROUTES.DOCS_INSTALLATION}.md)
- [Browse components](${siteUrl}${ROUTES.DOCS_COMPONENTS}.md)
- [Documentation](${siteUrl}${ROUTES.DOCS}.md)
- [LLM index (llms.txt)](${siteUrl}${ROUTES.LLMS})
- [API catalog](${siteUrl}${ROUTES.API_CATALOG})
- [OpenAPI description](${siteUrl}${ROUTES.OPENAPI})
- [Agent skills index](${siteUrl}${ROUTES.AGENT_SKILLS_INDEX})
`;

const escapeXml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const cdata = (value) => value.replaceAll("]]>", "]]]]><![CDATA[>");

const rssXml = (pages) => {
  const items = pages
    .filter((page) => page.slugs[0] === "changelog" && page.slugs.length > 1)
    .toSorted((a, b) => (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0))
    .map((page) => {
      const date = page.date?.toUTCString() ?? new Date().toUTCString();
      const link = `${siteUrl}${page.url}`;

      return `    <item>
      <title><![CDATA[${cdata(page.title)}]]></title>
      <link>${escapeXml(link)}</link>
      <guid>${escapeXml(link)}</guid>
      <description><![CDATA[${cdata(page.description)}]]></description>
      <pubDate>${date}</pubDate>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE.NAME)} Changelog</title>
    <link>${escapeXml(siteUrl)}</link>
    <description>${escapeXml(SITE.DESCRIPTION.LONG)}</description>
    <language>en-us</language>
    <atom:link href="${escapeXml(
      `${siteUrl}${ROUTES.RSS}`
    )}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;
};

const sitemapXml = (pages) => {
  const now = new Date().toISOString();
  const urls = [
    { priority: "1.0", url: siteUrl },
    ...pages.map((page) => ({
      priority: page.url === ROUTES.DOCS ? "0.9" : "0.8",
      url: `${siteUrl}${page.url}`,
    })),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (item) => `  <url>
    <loc>${escapeXml(item.url)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${item.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;
};

const robotsTxt = () =>
  [
    "User-agent: *",
    "Allow: /",
    "Content-Signal: ai-train=yes, search=yes, ai-input=yes",
    "",
    `Sitemap: ${siteUrl}${ROUTES.SITEMAP}`,
    "",
  ].join("\n");

const manifest = () => ({
  background_color: META_THEME_COLORS.light,
  description: SITE.DESCRIPTION.LONG,
  display: "standalone",
  icons: [
    {
      sizes: "192x192",
      src: "/web-app-manifest-192x192.png",
      type: "image/png",
    },
    {
      sizes: "512x512",
      src: "/web-app-manifest-512x512.png",
      type: "image/png",
    },
  ],
  name: SITE.NAME,
  short_name: SITE.NAME,
  start_url: ROUTES.HOME,
  theme_color: META_THEME_COLORS.light,
});

const apiCatalog = () => ({
  linkset: [
    {
      anchor: siteUrl,
      describedby: [
        {
          href: `${siteUrl}${ROUTES.AGENT_SKILLS_INDEX}`,
          type: "application/json",
        },
      ],
      "service-desc": [
        {
          href: `${siteUrl}${ROUTES.OPENAPI}`,
          type: "application/openapi+json",
        },
      ],
      "service-doc": [
        { href: `${siteUrl}${ROUTES.DOCS}`, type: "text/html" },
        {
          href: LINK.SHADCN_MCP_DOCS,
          title: "shadcn MCP server",
          type: "text/html",
        },
      ],
    },
  ],
});

const agentSkillsIndex = () => ({
  skills: [
    {
      description:
        "Discover, inspect, and install components from this public shadcn registry starter.",
      digest: siteAgentSkillDigest(),
      href: `${siteUrl}${ROUTES.AGENT_SKILLS_SITE_SKILL}`,
      mediaType: "text/markdown",
      name: SITE.NAME,
    },
  ],
});

const redirects = () =>
  [
    `${ROUTES.DOCS}.mdx ${ROUTES.DOCS}.md 301`,
    `${ROUTES.DOCS}/*.mdx ${ROUTES.DOCS}/:splat.md 301`,
    "",
  ].join("\n");

const docsMarkdownHeaders = (pages) =>
  [...new Set(pages.map((page) => `${page.url}.md`))]
    .filter((route) => route !== `${ROUTES.DOCS}.md`)
    .flatMap((route) => [
      route,
      "  Content-Type: text/markdown; charset=utf-8",
      "",
    ]);

const headers = (pages) =>
  [
    "/llms.txt",
    "  Content-Type: text/plain; charset=utf-8",
    "",
    "/llms-full.txt",
    "  Content-Type: text/plain; charset=utf-8",
    "",
    "/llms.md/*",
    "  Content-Type: text/markdown; charset=utf-8",
    "",
    "/docs.md",
    "  Content-Type: text/markdown; charset=utf-8",
    "",
    ...docsMarkdownHeaders(pages),
    "/rss.xml",
    "  Content-Type: application/rss+xml; charset=utf-8",
    "",
    "/sitemap.xml",
    "  Content-Type: application/xml; charset=utf-8",
    "",
    "/robots.txt",
    "  Content-Type: text/plain; charset=utf-8",
    "  Cache-Control: public, max-age=3600",
    "",
    "/manifest.webmanifest",
    "  Content-Type: application/manifest+json; charset=utf-8",
    "",
    "/openapi.json",
    "  Content-Type: application/openapi+json; charset=utf-8",
    "  Cache-Control: public, max-age=3600",
    "",
    "/api/status",
    "  Content-Type: application/json; charset=utf-8",
    "  Cache-Control: public, max-age=60",
    "",
    "/.well-known/api-catalog",
    "  Content-Type: application/linkset+json; charset=utf-8",
    "",
    "/.well-known/agent-skills/index.json",
    "  Content-Type: application/json; charset=utf-8",
    "",
    "/.well-known/agent-skills/site-skill.md",
    "  Content-Type: text/markdown; charset=utf-8",
    "",
    "/*",
    `  Link: <${ROUTES.API_CATALOG}>; rel="api-catalog", <${ROUTES.OPENAPI}>; rel="service-desc", <${ROUTES.DOCS}>; rel="service-doc", <${LINK.SHADCN_MCP_DOCS}>; rel="service-doc"; title="shadcn MCP server", <${ROUTES.AGENT_SKILLS_INDEX}>; rel="describedby"`,
    "",
  ].join("\n");

await rm(path.join(publicDir, "llms.md"), { force: true, recursive: true });
await rm(path.join(publicDir, "docs"), { force: true, recursive: true });
await rm(path.join(publicDir, ".well-known"), { force: true, recursive: true });

const pages = await readDocs();
const llmsIndex = docsIndex(pages);

await writePublic(ROUTES.LLMS, llmsIndex);
await writeGenerated("llms.txt", llmsIndex);
await writePublic(
  ROUTES.LLMS_FULL,
  pages.map((page) => markdownForPage(page).trim()).join("\n\n")
);
await writePublic(`${ROUTES.LLMS_MD}/content.md`, homepageMarkdown());

for (const page of pages) {
  const body = markdownForPage(page);
  const markdownRoute = `${ROUTES.LLMS_MD}${ROUTES.DOCS}${
    page.slugs.length ? `/${page.slugs.join("/")}` : ""
  }/content.md`;

  await writePublic(markdownRoute, body);
  await writePublic(`${page.url}.md`, body);
}

await writePublic(ROUTES.RSS, rssXml(pages));
await writePublic(ROUTES.SITEMAP, sitemapXml(pages));
await writePublic(ROUTES.ROBOTS, robotsTxt());
await writePublic(ROUTES.MANIFEST, `${JSON.stringify(manifest(), null, 2)}\n`);
await writePublic(
  ROUTES.OPENAPI,
  `${JSON.stringify(buildOpenApiDocument(siteUrl), null, 2)}\n`
);
await writePublic(ROUTES.API_STATUS, `${JSON.stringify({ status: "ok" })}\n`);
await writePublic(
  ROUTES.API_CATALOG,
  `${JSON.stringify(apiCatalog(), null, 2)}\n`
);
await writePublic(ROUTES.AGENT_SKILLS_SITE_SKILL, `${SITE_AGENT_SKILL_MD}\n`);
await writePublic(
  ROUTES.AGENT_SKILLS_INDEX,
  `${JSON.stringify(agentSkillsIndex(), null, 2)}\n`
);
await writePublic("/_redirects", redirects());
await writePublic("/_headers", headers(pages));

process.stdout.write(
  `Generated ${pages.length} docs pages and static endpoint assets.\n`
);
