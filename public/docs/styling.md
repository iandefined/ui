# Styling

Style registry components with Tailwind CSS v4 and shadcn tokens.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

## Overview

Registry components are styled with Tailwind CSS v4 utility classes and shadcn-compatible CSS variables. The installed source expects your app to provide the standard theme tokens such as `background`, `foreground`, `primary`, `border`, `input`, `ring`, and `radius`.

The registry uses one `base` source namespace. It keeps component source portable by using semantic utilities like `bg-primary`, `text-primary-foreground`, `border-input`, and radius tokens instead of hard-coded one-off colors.

## Prerequisites

Before adding components, make sure your project has Tailwind CSS v4 and shadcn/ui initialized:

```bash
npx shadcn@latest init
```

See [Installation](/docs/installation) for the registry install commands.

## Theme tokens

Tailwind v4 reads this project's shadcn tokens through `@theme inline`. If your app was initialized with shadcn/ui, you already have the same basic structure.

```css title="globals.css"
@theme inline {
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
}
```

## Color convention

Each surface token has a matching foreground token. The base token is the fill color. The `-foreground` token is the text and icon color that should sit on that fill.

```tsx
<div className="bg-primary text-primary-foreground" />
```

Use token pairs together when you create new component states:

- `bg-background text-foreground`
- `bg-card text-card-foreground`
- `bg-popover text-popover-foreground`
- `bg-primary text-primary-foreground`
- `bg-secondary text-secondary-foreground`
- `bg-muted text-muted-foreground`
- `bg-accent text-accent-foreground`

## Customizing colors

Override CSS variables on `:root` and `.dark`. Always update the foreground token when you change a fill token.

```css title="globals.css"
:root {
  --primary: oklch(0.62 0.18 250);
  --primary-foreground: oklch(0.99 0 0);
  --ring: oklch(0.62 0.18 250);
}

.dark {
  --primary: oklch(0.72 0.16 250);
  --primary-foreground: oklch(0.16 0.02 250);
  --ring: oklch(0.72 0.16 250);
}
```

## Adding tokens

New variables need two pieces: a CSS variable and a Tailwind `--color-*` mapping inside `@theme inline`.

```css title="globals.css"
@theme inline {
  --color-brand: var(--brand);
  --color-brand-foreground: var(--brand-foreground);
}

:root {
  --brand: oklch(0.62 0.18 250);
  --brand-foreground: oklch(0.99 0 0);
}

.dark {
  --brand: oklch(0.72 0.16 250);
  --brand-foreground: oklch(0.16 0.02 250);
}
```

Then use the token like any other Tailwind color:

```tsx
<div className="bg-brand text-brand-foreground" />
```

## Radius scale

The base `--radius` token controls the component radius scale.

```css title="globals.css"
@theme inline {
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

:root {
  --radius: 0.625rem;
}
```

Button uses this scale for size-specific corners, so changing `--radius` updates the shape of installed components without editing component source.

## Registry component notes

Installed components are meant to live in your app. After installation, you can edit the copied source directly.

Keep these rules in mind when changing styles:

- Prefer semantic tokens over literal colors.
- Keep hover, focus, disabled, and dark-mode states readable.
- Use `ring` and `ring-offset` tokens for focus states.
