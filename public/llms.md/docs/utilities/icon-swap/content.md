# Icon Swap

Animate between keyed icons with a consistent scale, blur, and fade transition.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

## Installation

```bash
npx shadcn@latest add https://ui.iandefined.com/r/icon-swap.json
```

The CLI also installs the registry `Button` used by the default example.

```bash
npx shadcn@latest add https://ui.iandefined.com/r/button.json
```

```bash
npm install motion
```

## Usage

```tsx
import { IconSwap } from "@/components/ui/icon-swap";
```

```tsx
<IconSwap className="inline-flex shrink-0" state={isCopied ? "copied" : "copy"}>
  {isCopied ? <CheckIcon /> : <CopyIcon />}
</IconSwap>
```

Change the `state` value whenever the semantic icon state changes. `IconSwap` keeps initial rendering still, uses pop layout so an exiting icon does not push nearby content, and owns the shared scale, blur, fade, and spring transition. Styling and Motion props passed to `IconSwap` are applied to its animated span.

When an interaction changes both an icon and text, derive both from the same state. Use `IconSwap` for the icon and [Text Morph](/docs/utilities/text-morph) for the label.

## Reset After Inactivity

For temporary confirmation states such as Copy → Copied, restart the reset timer on every successful click. Clear the previous timer before scheduling the next one so repeated clicks keep the confirmation icon visible until the full delay has elapsed after the last click. Also clear the timer when the component unmounts. The preview above demonstrates this behavior.
