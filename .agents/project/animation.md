# Text, Icon, and Container Animation

Use this when changing text whose content animates or a container whose bounds animate because its content changes.

- Use the registry `TextMorph` component for animated text. Do not introduce one-off `AnimatePresence`, keyed Motion text, or local text-flip components for this job.
- `TextMorph` is the project boundary around Calligraph. Callers own value changes, intervals, and application state; `TextMorph` owns character reconciliation and visual transitions.
- When an installable registry item or one of its documented reusable examples imports `TextMorph`, declare `https://ui.iandefined.com/r/text-morph.json` in that item's `registryDependencies`. The shadcn CLI should install the abstraction and its package dependencies transitively.
- Mention `TextMorph` in the item's manual-install steps, but do not duplicate its source or direct Calligraph dependency. Keep `text-morph` as the single source of truth.
- Keep `autoSize` enabled when changing text should affect its container width. Disable it only inside an intentionally fixed-width layout.
- For any custom width or height animation, follow the measured-bounds pattern: observe an inner natural-size element with `ResizeObserver` and animate a separate outer element to the measured pixel bounds.
- Never measure and animate the same element; that creates a resize feedback loop.
- Guard the initial zero measurement by using the natural `auto` size until a positive measurement exists.
- Respect reduced-motion preferences and avoid animated bounds when the size change does not add useful feedback.
- For popup wipe animations implemented with `clip-path: inset(...)`, preserve a small negative inset around every resting and non-collapsing edge so rounded borders and shadows are not clipped. Increase the clip radius by the same bleed amount, and compensate the collapsing edge to `calc(100% + bleed)` so the popup still closes fully. Apply the rule consistently to both wipe and wipe-plus-scale presets across Select, Dropdown Menu, Popover, Tooltip, and similar overlay primitives.

## Coordinated Icon and Text Transitions

- Use the registry `IconSwap` component every time one icon animates into another. Do not introduce one-off `AnimatePresence`, keyed Motion wrappers, or local icon-transition variants.
- `IconSwap` is the project boundary around the standard scale, blur, and fade transition. It owns pop layout, suppressed initial animation, and the spring; callers own state and icon choice.
- Give `IconSwap` a stable semantic `state` such as `idle`, `loading`, or `success`, and change it whenever the icon state changes.
- Add `inline-flex shrink-0` to `IconSwap` so layout remains stable and the exiting icon can pop out without pushing nearby content.
- When an interaction changes both icon and text, derive both from the same state. Use `TextMorph` for the label and `IconSwap` for the icon.
- Keep icons optically equal in size. Use the registry `Spinner` for loading and a Lucide status icon such as `CheckIcon` for completion.
- Let the state transition update icon and text together. Do not use separate timers or effects for their visual changes.
- For temporary confirmation states that reset after a delay, debounce the reset from the latest successful interaction: clear the previous timeout, schedule a new one, and return to the idle icon only after the full quiet period. Clean up the timer on unmount so repeated clicks never let an older timeout snap the icon back early.
- Keep the control's accessible name current. Animated decorative icons should not replace the text label, and changing status text should use an appropriate live region when users need confirmation.
- When an installable registry item or one of its documented reusable examples imports `IconSwap`, declare `https://ui.iandefined.com/r/icon-swap.json` in that item's `registryDependencies`. Mention `IconSwap` in manual-install steps, but keep `icon-swap` as the single source of Motion transition behavior.
- Treat `src/shared/components/copy-button.tsx` as the canonical app-level consumer of this convention.

References: [Calligraph](https://calligraph.raphaelsalaja.com/) and [Animating Container Bounds](https://www.userinterface.wiki/animating-container-bounds).
