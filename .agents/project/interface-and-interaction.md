# Interface, Interaction, and Design Standards

Use this guide when adding, editing, or evaluating interactive components, forms, animations, typography, touch targets, and visual styling across the application, registry components, examples, and documentation.

This document is the canonical repository standard for user interface conventions. It supersedes older ad-hoc guidance.

---

## Standard Structure: Rule Levels

Every rule in this document is explicitly categorized into one of three levels:
1. **[HARD REQUIREMENT]**: Invariant rule. Must be followed without exception. Violations fail code review.
2. **[STRONG DEFAULT]**: The expected approach for standard use cases. Departures require a clear, documented technical justification in nearby code comments.
3. **[SITUATIONAL GUIDANCE]**: Context-dependent pattern. Choose based on layout constraints, viewport size, or component composition.

---

## 1. Interaction and Primitives

### [HARD REQUIREMENT] Prefer Existing Registry Primitives
- Always search the repository for an existing primitive before introducing raw HTML interactive elements.
- Use `Button`, `Input`, `Textarea`, `Checkbox`, `Select`, `DropdownMenu`, `Popover`, `Tooltip`, `Collapsible`, and `Tabs` instead of raw `<button>`, `<input>`, `<textarea>`, `<select>`, `<details>`, or custom overlay markup.
- In registry examples and documentation previews, always import primitives from `@/registry/base/*` to verify that examples run against the exact public code consumers install.

### [HARD REQUIREMENT] Base UI `render` Prop Composition
- When a Base UI trigger primitive must look or behave like a project button, compose the registry `Button` through Base UI's `render` prop:
  ```tsx
  <ComponentTrigger render={<Button variant="outline" />}>
    Open menu
  </ComponentTrigger>
  ```
- Never write ad-hoc button utility classes (`inline-flex items-center justify-center rounded-md border...`) directly on trigger primitives merely to simulate a button.
- Keep `nativeButton` semantics accurate: if `render` supplies a button, let it remain a button; set `nativeButton={false}` only when rendering an anchor link or non-button element.

### [SITUATIONAL GUIDANCE] Raw HTML Elements
- Raw HTML is strictly reserved for non-interactive structural markup (`h1`–`h6`, `p`, `ul`, `ol`, `li`, `blockquote`, `nav`, `main`, `footer`).
- If native browser behavior is explicitly required for an interactive element (e.g. an invisible native file input trigger), record the reason in a comment.

---

## 2. Forms and Input States

### [HARD REQUIREMENT] Cubby UI 2-2-50 Input State Pattern
All input-like controls (`Input`, `Textarea`, `Select` trigger, `NumberField` group, `Combobox` container, `InputGroup` shell, `InputOTP` slots) follow the 2-2-50 outline pattern:
- **Outline Geometry**: `2px solid` outline with a `2px` offset (`focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/50`).
- **Invalid State Treatment**: When a control is invalid (`aria-invalid="true"` or `data-invalid`), the destructive outline and solid destructive border MUST remain visible even when unfocused:
  ```css
  aria-invalid:border-destructive aria-invalid:outline-2 aria-invalid:outline-offset-2 aria-invalid:outline-destructive/50
  ```
- **Focus Rings on Error**: When focused while invalid, retain the destructive ring (`focus-visible:aria-invalid:border-destructive focus-visible:aria-invalid:outline-destructive/50`).
- **Solid Border Retention**: Always retain the base border (`border-input` or `border-destructive`) beneath the offset outline so the error state remains visually attached to the control.

### [HARD REQUIREMENT] Field Layout and Animated Error Slots
- Layout `Field` in standard block flow using `space-y-2`.
- Form inputs and textareas must be block-level (`block w-full`) so baseline alignment does not create erratic vertical gaps.
- Use `FieldErrorSlot` for error message presentation:
  * Uses CSS grid zero-height interpolation (`interpolate-size: allow-keywords`) to smoothly animate height from `0` to `auto` and opacity from `0` to `1` without JavaScript measurement loops.
  * Respects reduced motion (`motion-reduce:transition-none`).
- Field labels remain in the neutral foreground color (`text-foreground`) even when invalid. Never tint labels red; the destructive treatment belongs on the control and the immediately following error message.

### [HARD REQUIREMENT] Checkbox and RadioGroup Field Conventions
- **Single-line Checkbox Alignment**: A single-line `Checkbox` and its label must share a `20px` line box and remain vertically centered. Reserve top alignment only for multi-line title-plus-description layouts.
- **Checkbox Error Indication**: Style `aria-invalid` on the `Checkbox` box itself (`aria-invalid:border-destructive aria-invalid:outline-destructive/50`), not the label.
- **RadioGroup Error Handling**: Treat a required `RadioGroup` as a single invalid field: expose `aria-invalid` and `aria-describedby` on the `RadioGroup` root, keep option labels neutral, and show a single group-level error message below all options.

### [STRONG DEFAULT] Slider Architecture and Proportions
- Place `SliderLabel` and `SliderValue` in a full-width row above `SliderControl` so labels align cleanly with neighboring form fields.
- The compact slider rail must be flush with the `Slider` control's inline edges. Do not add redundant outer rail insets.
- Size the compact slider visible thumb to `20px` (matching the default `Radio` size) with `shadow-md` elevation so it covers the rail at both endpoints.
- Hover and focus states on thumbs must scale via transforms (`scale-105`), not width/height mutations that distort flex axis alignment.
- Keep scalar form values scalar: normalize single-item arrays `[val]` to `val` before dispatching form updates.

---

## 3. Motion and Animation

### [HARD REQUIREMENT] Reduced Motion Compliance
- Every animation and transition must respect user OS settings via Tailwind `motion-reduce:*` variants (e.g. `motion-reduce:transition-none motion-reduce:transform-none`).
- Never run auto-playing or loop animations when reduced motion is requested.

### [HARD REQUIREMENT] Animated Text Transitions (`TextMorph`)
- Use the registry `TextMorph` component whenever textual content animates.
- Do not introduce ad-hoc `AnimatePresence`, keyed Motion `motion.span`, or character flip scripts for text morphing.
- Keep `autoSize` enabled when changing text width should adapt container bounds; disable it only inside strictly fixed-width layouts.

### [HARD REQUIREMENT] Coordinated Icon and State Transitions (`IconSwap`)
- Use the registry `IconSwap` component whenever an icon transitions to another icon based on state (e.g. copy button idle $\rightarrow$ copied).
- Provide a stable semantic `state` string (`idle`, `loading`, `done`).
- Always add `inline-flex shrink-0` to `IconSwap` so parent layouts remain stable during icon pop-in/pop-out.
- Derive text and icon from the **same single state**. Do not use separate timers or effects for text and icon.
- **Debounced Reset**: For transient confirmation states (e.g. "Copied!"), debounce the reset timer from the latest click. Clear any pending timeout and schedule a new quiet period before resetting to idle. Clean up timeouts on unmount.

### [HARD REQUIREMENT] Measured Bounds Pattern for Container Sizing
When animating container width or height due to dynamic content:
1. Observe an **inner element** at its natural unconstrained size with a `ResizeObserver`.
2. Animate a **separate outer element** to the measured pixel bounds.
3. **Invariant**: Never measure and animate the same element; doing so creates an infinite layout feedback loop.
4. **Zero Guard**: Use the natural `auto` dimension until a positive initial measurement exists to avoid layout flash.

### [HARD REQUIREMENT] Overlay Wipe Animations Inset Bleed
For overlay wipe animations built with `clip-path: inset(...)` (Select, DropdownMenu, Popover, Tooltip):
- Non-collapsing resting edges must use a `-2px` negative bleed inset (`inset(-2px -2px calc(100% + 2px) -2px round 12px)`).
- This prevents box-shadows, glow filters, and rounded borders from being prematurely clipped during open/close sequences.
- Compensate the collapsing edge to `calc(100% + 2px)` so the popup fully closes at zero height.

---

## 4. Touch and Mobile Targets

### [HARD REQUIREMENT] Minimum 44x44px Interactive Bounds
- Standalone interactive elements must maintain a minimum hit area of $44 \times 44\text{ px}$ on touch viewports.
- For compact visual components (e.g. `size-6` or `size-8` buttons, checkboxes, breadcrumb ellipsis triggers), expand the interactive area using the `hitbox` utility classes:
  ```tsx
  <Button size="icon-xs" className="hitbox-4">
    <MoreHorizontalIcon />
  </Button>
  ```
- Never add visual padding to small controls merely to increase their touch target; use `hitbox` to expand invisible click bounds without distorting visual alignment.

### [STRONG DEFAULT] Touch Action Hygiene
- Add `touch-none` or `touch-manipulation` to draggable elements (Sliders, Canvas drawers) and rapid tap controls to prevent mobile browsers from triggering pinch-zoom or scrolling gestures during operation.

---

## 5. Performance and Rendering

### [HARD REQUIREMENT] Transform and GPU Acceleration
- Composite animations using GPU-friendly properties: `transform`, `opacity`, and `clip-path`.
- Apply `transform-gpu` and `will-change-transform` to animated overlay triggers and popup content.
- Avoid animating layout-triggering properties (`width`, `height`, `top`, `left`, `margin`, `padding`) unless using the measured-bounds clip-path pattern.

### [HARD REQUIREMENT] Zero Request-Time Edge Filesystem Operations
- Code executed during Cloudflare Worker SSR or request handling must never import `node:fs`, call `process.cwd()`, or attempt dynamic directory walking.
- Avoid request-time Wasm compilation in Worker rendering paths; use JavaScript-based syntax highlighting or pre-generate static content.

---

## 6. Accessibility (a11y)

### [HARD REQUIREMENT] Accessible Names for Icon Controls
- Every icon-only button or interactive trigger MUST have an accessible name via `aria-label` or visually hidden text:
  ```tsx
  <Button size="icon" aria-label="Copy code">
    <CopyIcon />
  </Button>
  ```

### [HARD REQUIREMENT] Dynamic Status Communication
- Any state-derived text message that updates dynamically (copy feedback, loading counters, form validation errors) must be announced to assistive technologies using `aria-live="polite"` or an appropriate role (`role="alert"` for errors, `role="status"` for progress).

### [HARD REQUIREMENT] Non-Color Error and Status Cues
- Never convey state solely through color. Accompany red error borders with an icon, distinct typography, or explicit error text. Accompany success states with check icons or label updates.

### [HARD REQUIREMENT] Explicit SVG Dimensions for WebKit
- Every custom inline `<svg>` in components and icons MUST specify explicit `width` and `height` attributes or explicit Tailwind `size-*` / `w-* h-*` classes. Unsized SVGs render inconsistently in WebKit / iOS Safari even when `viewBox` is present.

---

## 7. Visual Design and Stacking Layer Scale

### [HARD REQUIREMENT] Canonical Z-Index Stacking Scale
Never use arbitrary high z-indexes (such as `z-[9999]` or `z-100`). All stacking in this repository strictly adheres to the following scale:

| Token | Class | Canonical Usage |
| :--- | :--- | :--- |
| **Local Detail** | `z-10` / `z-20` | Internal component layering, sticky table headers, side rails, sticky columns. |
| **Elevated Preview** | `z-30` | Non-portalled previews, sticky code headers; must stay below app chrome. |
| **App Chrome** | `z-40` | Main application sticky header, mobile navigation backdrop. |
| **Portalled Overlays**| `z-50` | **All portalled overlays**: Tooltips, Dropdown Menus, Popovers, Selects, Dialogs, Drawers. |
| **Open Trigger Exception**| `z-[51]` | **Temporary exception only**: An open trigger that must visually overlap its own integrated `z-50` popup while open. |

### [HARD REQUIREMENT] Overlay Portal Order
- In portalled overlays (`Select`, `DropdownMenu`, `Dialog`), the backdrop element must precede the content container in DOM order within the portal root to maintain proper stacking and click containment.
