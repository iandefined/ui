# Overlay Effects

Configure backdrop treatments and work around browser compositing artifacts.

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown variants are available at explicit `.md` URLs. An agent skill is available at [/.well-known/agent-skills/site-skill.md](/.well-known/agent-skills/site-skill.md).

`Dialog`, `Drawer`, and `Sheet` share the same overlay modes. Use the default blur for depth, brightness for a plain dimmer, or transparent when modal interaction should remain without a visible backdrop.

| Value           | Treatment                                            |
| --------------- | ---------------------------------------------------- |
| `"blur"`        | Darkens and blurs content behind the overlay.        |
| `"brightness"`  | Darkens content without applying a backdrop filter.  |
| `"transparent"` | Preserves modal interaction without visible dimming. |

## Chromium Backdrop Blur Seams

Chromium-based browsers can render horizontal or vertical colorless seams when a fixed `backdrop-filter: blur(...)` samples a nested scroll container at a high device-pixel ratio. This is a browser compositor tile artifact, not a CSS box shadow. Changing the popup shadow, shadow color, or shadow blur does not remove it.

The artifact is most likely when the page scrolls inside a nested container and its ancestors use transforms, filters, clipping, or compositor promotion. Keep the default backdrop blur for ordinary document-scrolling layouts. Apply the workaround below only to affected application shells.

### Nested Scroller Workaround

The backdrop exposes `data-overlay="blur"`, and each component uses a specific `data-slot`: `dialog-backdrop`, `drawer-backdrop`, or `sheet-backdrop`. Disable the backdrop filter while a blur overlay is mounted, then blur the application layers directly. Mount the overlay portal outside `.app-scroll-container` so the popup remains sharp.

```css title="app.css"
@property --app-overlay-blur {
  syntax: "<length>";
  inherits: true;
  initial-value: 0px;
}

.app-scroll-container {
  --app-overlay-blur: 0px;
  --app-overlay-duration: 200ms;
  --app-overlay-easing: ease-out;

  transition: --app-overlay-blur var(--app-overlay-duration)
    var(--app-overlay-easing);
}

:is(
    [data-slot="dialog-backdrop"],
    [data-slot="drawer-backdrop"],
    [data-slot="sheet-backdrop"]
  )[data-overlay="blur"]:not([hidden]) {
  -webkit-backdrop-filter: none;
  backdrop-filter: none;
  transition-timing-function: ease-out;
}

:is(
    [data-slot="drawer-backdrop"],
    [data-slot="sheet-backdrop"]
  )[data-overlay="blur"]:not([hidden]) {
  transition-duration: 300ms;
}

:root:has(
    :is(
        [data-slot="drawer-backdrop"],
        [data-slot="sheet-backdrop"]
      )[data-overlay="blur"]:not([hidden])
  )
  .app-scroll-container {
  --app-overlay-duration: 300ms;
}

:root:has(
    :is(
        [data-slot="dialog-backdrop"],
        [data-slot="drawer-backdrop"],
        [data-slot="sheet-backdrop"]
      )[data-overlay="blur"]:not([hidden], [data-ending-style])
  )
  .app-scroll-container {
  --app-overlay-blur: 8px;
}

:root:has(
    :is(
        [data-slot="dialog-backdrop"],
        [data-slot="drawer-backdrop"],
        [data-slot="sheet-backdrop"]
      )[data-overlay="blur"]:not([hidden])
  )
  .app-scroll-container
  > * {
  filter: blur(var(--app-overlay-blur));
}

@media (prefers-reduced-motion: reduce) {
  .app-scroll-container {
    transition-duration: 0ms;
  }
}
```

Keep the fallback blur duration and easing synchronized with the overlay surface. `Dialog` uses a 200ms surface transition. `Drawer` and `Sheet` use a 300ms `ease-out` surface transition, so the example gives their backdrop and fallback blur that same timing. If you change `backdrop-blur-sm`, update the `8px` target to the matching blur radius.

The selector excludes `[data-ending-style]` from the active target but keeps `filter` mounted until `[hidden]` appears. This lets the registered custom property interpolate to `0px` during the exit animation instead of snapping off. Keep `inherits: true`; the direct application layers must inherit the animated value from the scroll container.

Interactive swipe progress is scoped to the drawer portal and cannot cross into a sibling application container through CSS inheritance. If the fallback blur must track a drag continuously, mirror the drawer progress onto a shared ancestor. The CSS above synchronizes ordinary open and close transitions.
