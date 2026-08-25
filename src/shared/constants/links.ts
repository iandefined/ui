export const GITHUB = {
  branch: "main",
  org: "iandefined",
  repo: "ui",
  user: "iandefined",
} as const;

const githubUrl = `https://github.com/${GITHUB.user}/${GITHUB.repo}`;

export const LINK = {
  DISCORD: "https://discord.gg",
  GITHUB: githubUrl,
  LICENSE: `${githubUrl}/blob/${GITHUB.branch}/LICENSE`,
  PORTFOLIO: "https://github.com/iandefined",
  SHADCN_MCP_DOCS: "https://ui.shadcn.com/docs/mcp",
  X: "https://x.com/iandefined",
} as const;
