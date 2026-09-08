# Base UI Patterns

Use this guide when implementing or refactoring a registry component that wraps `@base-ui/react`.

For public prop shapes and slots, see [component-implementation.md](component-implementation.md). For visual, form, motion, and accessibility requirements, see [interface-and-interaction.md](interface-and-interaction.md).

## Start with the primitive

- Prefer the matching Base UI primitive for focus management, keyboard behavior, ARIA relationships, and controlled/uncontrolled state. Do not recreate those behaviors with ad-hoc event handlers.
- Preserve the primitive's documented props unless the registry intentionally changes behavior. Document changed defaults and registry-owned props in the component docs.
- Keep state ownership at the highest component that needs it. Do not mirror primitive state in React solely to restyle it when a state attribute or render callback is available.

## Composition

- Use a primitive's `render` prop to project its semantics onto an existing registry component or custom element. Keep native button semantics when rendering a button; set `nativeButton={false}` only for a real non-button target.
- Use `useRender` when building a primitive-like public component that must merge consumer elements, props, refs, and event handlers. Do not replace it with manual cloning that drops primitive behavior.
- Use Base UI `mergeProps` when independently supplied prop objects must compose; merging must preserve all event handlers, ARIA attributes, and refs in the documented order.
- Give projected/custom triggers an accessible name and use existing registry primitives for their visual treatment.
- Forward layout and flex classes to `ScrollArea.Root` rather than `Viewport`. Inside flex popups (`Combobox`, `Autocomplete`), ensure `ScrollArea.Root` receives `min-h-0 flex-1 overflow-hidden` and `Viewport` has `min-h-0 flex-1 size-full` so Gecko (Firefox) resolves a definite height and creates an active scroll container (see [interface-and-interaction.md](interface-and-interaction.md)).

## Hooks, refs, and state

- Call React and Base UI hooks unconditionally at component top level. Keep callback closures narrow and avoid hooks inside render callbacks or branches.
- Forward refs when the underlying primitive exposes a focusable or measurable element. Merge internal and consumer refs rather than choosing one.
- Prefer primitive state attributes, render props, and controlled props to DOM queries or imperative ref mutation. Use imperative handles only when the browser or primitive API requires them.
- Test keyboard, pointer, focus, disabled, invalid, and controlled/uncontrolled behavior whenever a composition boundary changes.

## Overlay animation ownership

- Do not use trigger `pointerdown`, `pointerenter`, or focus handlers to mount and lay out a portalled overlay subtree. That work runs before activation can open the primitive and can delay the first visible frame. When repeat-open performance warrants retention, enable `keepMounted` only after the first opening transition completes; never eagerly retain every overlay on the page.
- Keep the primitive's release state authoritative. A `null` snap point used as a dismissal sentinel must not replace the last visible snap geometry while the exit animation is running. Freeze the exit distance from the last non-null snap value so close, Escape, outside press, and swipe dismissal share one path.
- Apply high-frequency gesture variables on the element where Base UI defines them. Registered non-inheriting variables should not be re-exposed through a deep subtree. Disable transitions during direct manipulation and use a release-specific state attribute with a bounded duration for the handoff to CSS animation.
- Base UI waits for animations on the popup before completing close and unmount. Changing the popup's transition-property list or layout geometry after dismissal can create replacement animations and extend teardown. Keep exit geometry stable and give open/close motion, direct drag motion, snap resizing, and backdrop opacity one owner each.
- Coalesce observer-driven overlay positioning into one animation-frame update. Do not schedule the same initial measurement from both a ref callback and an effect, and do not observe a popup's generic `style` attribute when the positioning result itself writes inline styles; that creates self-triggered measurement churn.
