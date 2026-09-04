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

## Hooks, refs, and state

- Call React and Base UI hooks unconditionally at component top level. Keep callback closures narrow and avoid hooks inside render callbacks or branches.
- Forward refs when the underlying primitive exposes a focusable or measurable element. Merge internal and consumer refs rather than choosing one.
- Prefer primitive state attributes, render props, and controlled props to DOM queries or imperative ref mutation. Use imperative handles only when the browser or primitive API requires them.
- Test keyboard, pointer, focus, disabled, invalid, and controlled/uncontrolled behavior whenever a composition boundary changes.

