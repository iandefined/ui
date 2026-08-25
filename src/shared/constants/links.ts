export const GITHUB = {
  branch: "main",
  org: "tsu-moe",
  repo: "tanstartercn",
  user: "tsu-moe",
} as const;

const githubUrl = `https://github.com/${GITHUB.org}/${GITHUB.repo}`;

export const LINK = {
  DISCORD: "https://discord.gg",
  GITHUB: githubUrl,
  LICENSE: `${githubUrl}/blob/${GITHUB.branch}/LICENSE`,
  PORTFOLIO: "https://github.com/tsu-moe",
  SHADCN_MCP_DOCS: "https://ui.shadcn.com/docs/mcp",
  X: "https://x.com/tsu-moe",
  X_SHADCN_LABS: "https://x.com/shadcnlabs",
} as const;
