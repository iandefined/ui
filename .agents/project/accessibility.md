# Accessibility and Component Standards

Use this guide when adding, editing, auditing, or evaluating interactive components, forms, navigation patterns, focus states, animations, dynamic announcements, and semantic HTML structure across the repository, registry primitives, blocks, and documentation.

This document is the canonical repository standard for accessibility (a11y) conventions. For interaction layout and motion timing, see [interface-and-interaction.md](interface-and-interaction.md). For Base UI composition, see [base-ui-patterns.md](base-ui-patterns.md). For public registry prop typing and portability, see [component-implementation.md](component-implementation.md).

---

## Standard Structure: Rule Levels

Every rule in this document is categorized into one of three levels:
1. **[HARD REQUIREMENT]**: Invariant rule. Must be followed without exception. Violations fail code review and block publication.
2. **[STRONG DEFAULT]**: The expected approach for standard use cases. Departures require clear, documented technical justification in nearby code comments.
3. **[SITUATIONAL GUIDANCE]**: Context-dependent pattern. Choose based on widget type, density constraints, or composition requirements.

---

## 1. Native Elements and Semantic Structure

### [HARD REQUIREMENT] Native Controls Over Custom Rebuilds
- The first rule of ARIA: **never use ARIA when a native semantic element exists**.
- Use `<button>` for actions, `<a href>` for navigation, and native form elements for user input.
- **Never** place `onClick` on a `<div>` or `<span>` to create an interactive element.
- Real navigation links must support `Cmd+click`, `Ctrl+click`, and middle-click. Do not use `<button>` for URL routing unless composed through Base UI's polymorphic `render` or TanStack Router `Link` components.

### [HARD REQUIREMENT] No Nested Interactive Controls
- Never nest interactive controls inside another interactive element (e.g. `<button>` inside `<button>`, `<button>` inside `<a href>`, or `<button>` inside `<div role="button">`).
- Composite controls with removable items (such as `Combobox` chips or `DatePicker` multi-value tags) must structure item removal buttons as sibling elements or standalone toolbar items, never inside a clickable container trigger.

### [SITUATIONAL GUIDANCE] Semantic HTML Landmarks
- Structure pages using semantic HTML5 landmarks: `<header>`, `<nav>`, `<main>`, `<aside>`, and `<footer>`.
- Expose exactly one primary `<main>` landmark per page.
- Do not add redundant ARIA roles to native landmarks (e.g. avoid `<main role="main">` or `<nav role="navigation">`).

---

## 2. Visible Focus Rings and High-Contrast Mode

### [HARD REQUIREMENT] Style `:focus-visible`, Never Bare `:focus`
- Always style `:focus-visible`, not bare `:focus`. Keyboard users must receive a crisp, visible indicator, while mouse/pointer clicks generally should not trigger persistent focus rings.
- **Never** use `outline: none`, `outline-0`, or `ring-0` on an interactive element without an immediate, verified `:focus-visible` replacement on the same element or its integrated shell.

### [HARD REQUIREMENT] The 2-2-50 Focus & Invalid State Outline Pattern
Form inputs, comboboxes, textareas, select triggers, and input groups must follow the repository's 2-2-50 outline pattern:
```tsx
// Standard Focus Ring
className="outline-0 outline-offset-0 outline-transparent focus-visible:border-ring focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/50"

// Invalid State (Preserved Unfocused and Focused)
className="aria-invalid:border-destructive aria-invalid:outline-2 aria-invalid:outline-offset-2 aria-invalid:outline-destructive/50 focus-visible:aria-invalid:border-destructive focus-visible:aria-invalid:outline-destructive/50"
```
- A custom focus ring must maintain at least a `2px` solid perimeter or equivalent visible area. 1px rings (`focus-visible:ring-1`) fail visibility thresholds on high-DPI displays.
- Always retain the base border (`border-input` or `border-destructive`) beneath the offset outline so the boundary remains visually anchored.

### [HARD REQUIREMENT] Forced-Colors Mode (Windows High Contrast) Preservation
- Ensure focus indicators render in forced-colors mode (`@media (forced-colors: active)`).
- Never rely exclusively on background color changes (`focus:bg-accent`) for keyboard focus without an accompanying solid border or outline. Background colors are overridden by the operating system in high-contrast themes.
- When customizing outlines, preserve system tokens: `forced-colors:outline-[Highlight]`.

---

## 3. Keyboard Support and Composite Widgets

### [HARD REQUIREMENT] Full Keyboard Operability (APG Patterns)
Every pointer interaction must have an equivalent keyboard path following W3C WAI-ARIA Authoring Practices (APG):
- `Enter` and `Space`: Activate buttons, toggles, checkboxes, and select triggers.
- `Escape`: Closes open popups, dropdowns, dialogs, drawers, and context menus, immediately returning focus to the trigger.
- `Tab` / `Shift+Tab`: Moves focus between distinct widgets and form controls.
- Arrow keys (`ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`): Navigate *within* composite widgets (tabs, menus, radio groups, listboxes).

### [HARD REQUIREMENT] Tabindex Hygiene and Roving Tabindex
- Use only `tabIndex={0}` to place an element into natural tab order.
- Use `tabIndex={-1}` for programmatically focusable items (e.g. inactive items in a roving tabindex composite, or dialog containers).
- **Never** use positive `tabIndex` values (`tabIndex={1}`, etc.), as they corrupt global navigation order.
- Composite widgets (`TabsList`, `RadioGroup`, `DropdownMenuContent`, `ComboboxList`) must implement roving tabindex: the active/selected item receives `tabIndex={0}` and all other items receive `tabIndex={-1}`.

---

## 4. Focus Trapping and Modal Overlays

### [HARD REQUIREMENT] Modal Focus Trap and Background Inactivity
- Modal surfaces (`Dialog`, `Sheet`, full-screen `MobileNav`) must:
  1. Move focus to the first focusable control (or the dialog title/container) upon opening.
  2. Constrain `Tab` and `Shift+Tab` within the modal container.
  3. Mark background content as `inert` while the modal remains open.
  4. Return focus to the invoking trigger element when dismissed.
- Apply `overscroll-behavior: contain` to modal bodies and scrollable viewports so scrolling within the modal does not scroll underlying document content.

### [HARD REQUIREMENT] Pointer and Touch Dismissal
- Modal dialogs, sheets, and popovers must provide an explicit, focusable close button (`DialogClose` / `SheetClose`) with an accessible name.
- Do not rely solely on backdrop clicking or physical `Escape` keys for dismissal, as mobile and touchscreen users lack hardware Escape keys.

---

## 5. Touch Targets and Minimum Hit Areas

### [HARD REQUIREMENT] Minimum 24x24px Level AA Baseline, 44x44px for Touch
- In compliance with WCAG 2.5.8 (Target Size - Minimum), standalone interactive elements must maintain a minimum bounding box of at least $24 \times 24\text{ CSS px}$.
- For touch viewports (coarse pointers), aim for $44 \times 44\text{ px}$ (or $40 \times 40\text{ px}$ on compact desktop viewports).
- For compact visual components (`size-6` or `size-8` buttons, switch tracks, breadcrumb ellipses, icon-xs triggers), expand the interactive area without altering visible layout by using the repository's `hitbox` utilities:
  ```tsx
  <Button size="icon-xs" className="hitbox-4">
    <XIcon />
  </Button>
  ```
- **Never** allow expanded hitboxes to overlap neighboring interactive targets.

### [HARD REQUIREMENT] Touch Action Hygiene: Avoid Indiscriminate `touch-none`
- Never apply `touch-none` to standard buttons, links, or select triggers. `touch-none` prevents mobile browsers from scrolling when a user touches down on a button while flick-scrolling a page.
- Reserve `touch-none` strictly for 2D draggable canvases or slider rails where touch gestures are explicitly captured.
- Use `touch-manipulation` for rapid tap controls to eliminate the 300ms double-tap zoom delay while preserving pinch-zoom and vertical scrolling gestures.

---

## 6. Form Controls, Labels, and Input States

### [HARD REQUIREMENT] Accessible Names on Every Control
- Every input control (`Input`, `Textarea`, `DateInput`, `Select`, `NumberField`, `Slider`) must have an accessible label via `<Label htmlFor="...">` or an enclosing `<Label>`.
- **A placeholder is never a label.** Placeholders disappear on entry, reduce contrast, and are not reliably announced as labels by screen readers.
- When an interactive control is visually label-less (search inputs, icon buttons), supply `aria-label` or visually hidden text (`<span className="sr-only">`).

### [HARD REQUIREMENT] Input Attributes and Paste Preservation
- Supply semantic `type` (`email`, `tel`, `url`, `number`) and `inputmode` (`numeric`, `decimal`) to evoke the appropriate virtual keyboard on mobile devices.
- Include meaningful `autoComplete` attributes on personal data inputs (e.g. `username`, `current-password`, `one-time-code`, `name`, `email`).
- **Never block paste.** Blocking paste degrades security by preventing password managers and credential authenticators from operating.

---

## 7. Errors That Announce and Validation Hygiene

### [HARD REQUIREMENT] Submittable State and Submit Validation
- Keep submit buttons enabled until the user submits the form. Do not disable the submit button while the form is incomplete or invalid, as disabled buttons cannot explain why submission is blocked.
- Upon invalid submission:
  1. Mark failing controls with `aria-invalid="true"`.
  2. Point `aria-describedby` to the ID of the inline error message (`FieldError`).
  3. Move focus to the first invalid control in the form.

### [HARD REQUIREMENT] Reserve `role="alert"` for Untied Critical Errors
- Do **not** place `role="alert"` on inline field error messages that are already bound to their inputs via `aria-describedby`. Assertive alerts interrupt screen reader speech on every keystroke.
- Reserve `role="alert"` exclusively for page-level, untied, critical system error banners.
- Field errors tied to inputs are announced naturally when the user focuses or navigates to the invalid field.

---

## 8. Accessible Names for Icon Controls and Media

### [HARD REQUIREMENT] Accessible Names for Icon-Only Buttons
- Every icon button or graphical trigger must expose an accessible name via `aria-label` or a nested `<span className="sr-only">`:
  ```tsx
  <Button size="icon" aria-label="Copy code to clipboard">
    <CopyIcon aria-hidden="true" />
  </Button>
  ```
- The visible label text must appear within the accessible name (WCAG 2.5.3 Label in Name).
- When buttons delete or remove items from a list, derive the accessible name from the target item (e.g. `aria-label={`Remove ${fileName}`}`), rather than repeating a generic `"Remove"`.

### [HARD REQUIREMENT] Decorative Elements and `aria-hidden` Safety
- Decorative SVGs, icons, and separators must receive `aria-hidden="true"`.
- **Never place `aria-hidden="true"` on a focusable element or a container wrapping screen-reader text.** Doing so hides the interactive element or its label from assistive technology while leaving it reachable via keyboard, creating a ghost stop.

---

## 9. Color Independence and Redundant Cues

### [HARD REQUIREMENT] Never Rely on Color Alone
- Never convey state, availability, or errors solely through color.
- Accompany destructive / invalid input borders with an explicit error message, an icon, or distinctive outline styling.
- Accompany status indicators (such as badge dots or colored pill tags) with semantic visible text (e.g. `"Active"`, `"Offline"`) or an accessible label.
- Date cell unavailable states must combine subdued color with non-color cues (e.g. `data-unavailable:line-through`).

---

## 10. Motion and Vestibular Safety

### [HARD REQUIREMENT] Reduced Motion Compliance
- Every transition and animation must respect user OS settings via Tailwind `motion-reduce:*` variants or `@media (prefers-reduced-motion: no-preference)`.
- Never run auto-playing, looping, or indefinite animations (spinners, skeleton shimmers, marquee tickers) without reduced motion guards.
- Under reduced motion, replace slides, 3D rotations, and large scales with opacity crossfades:
  ```tsx
  className="transition-all duration-200 motion-reduce:transition-none motion-reduce:transform-none"
  ```
- Do not rely on JavaScript prop defaults (`reduceMotion = false`) alone; CSS media query variants ensure immediate, zero-JS compliance.

---

## 11. Live Regions and Dynamic Announcements

### [HARD REQUIREMENT] Polite Dynamic Status Announcements
- Any state-derived update that changes without page navigation (e.g. "Copied to clipboard", search result counts, cart updates) must be communicated via a polite live region:
  ```tsx
  <span className="sr-only" role="status" aria-live="polite">
    {isCopied ? "Copied to clipboard" : ""}
  </span>
  ```
- **Stable Container Requirement**: For reliable announcement across screen readers, the live region container must be mounted in the DOM *before* its text content updates. Inserting a live region simultaneously with its content often fails to trigger announcements.

---

## 12. Alt Text by Purpose

### [HARD REQUIREMENT] Alt Text Rules by Image Purpose
- **Decorative Images**: Use empty alt text (`alt=""`). Never omit the `alt` attribute.
- **Informative Images**: Describe the essential meaning or information conveyed by the image concisely.
- **Functional Images**: Describe the action triggered by the control (e.g. a search icon button uses `aria-label="Search"`, not `"Magnifying glass"`).

---

## 13. Document Structure and Navigation

### [HARD REQUIREMENT] Heading Hierarchy and Single `<h1>`
- Maintain a strictly nested heading outline (`<h1>` followed by `<h2>`, `<h2>` followed by `<h3>`). Never skip heading levels (e.g. `<h1>` directly to `<h3>`) purely for styling; style headings with typography utility classes.
- Every page must contain exactly one `<h1>`.
- Card titles, modal titles, and section headers that represent content sections must render heading elements (`<h3>`, `DialogTitle`, etc.), never unsemantic `<div>` containers.

### [HARD REQUIREMENT] "Skip to Content" Navigation Link
- When repeated navigation, sidebars, or headers precede the main content, a "Skip to content" link must be the very first focusable element in the DOM:
  ```tsx
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:shadow-md focus:outline-2 focus:outline-ring"
  >
    Skip to content
  </a>
  ```

### [HARD REQUIREMENT] Active Navigation Indicators (`aria-current="page"`)
- Navigational sidebars, breadcrumbs, and menus must mark the currently active route or page with `aria-current="page"`. Visual active styling (`data-active="true"`) alone does not announce active status to screen readers.

---

## 14. Reflow, Zoom, and Text Resize

### [HARD REQUIREMENT] 200% Zoom and 320px Reflow
- Pages and components must function without loss of content or functionality at 200% browser zoom and down to 320 CSS pixels wide without horizontal scrolling.
- Text containers must use `min-height` rather than fixed `height` so wrapped text does not overflow its bounds.
- Never disable user pinch-to-zoom in viewport metadata (`user-scalable=no` or `maximum-scale=1` are prohibited).

---

## Pre-Flight Checklist

Before completing interactive component work, verify against this checklist:

| Common Pitfall | Mandatory Fix |
| --- | --- |
| `outline: none` or `ring-0` used to eliminate browser ring | Replace with explicit `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/50`. |
| Custom focus styling disappears in High Contrast mode | Add `forced-colors:outline-[Highlight]` or ensure high-contrast border retention. |
| `touch-none` applied to clickable buttons | Replace with `touch-manipulation` to avoid breaking mobile page scrolling gestures. |
| Button nested inside another button or `<div role="button">` | Separate interactive triggers; composite widgets must use roving tabindex. |
| `aria-hidden="true"` placed on element containing `<span className="sr-only">` | Move `aria-hidden="true"` exclusively to the decorative icon, leaving accessible text reachable. |
| Screen reader gets no confirmation when clicking copy button | Add a stable `<span className="sr-only" role="status" aria-live="polite">` that announces status. |
| 3D rotate / blur transitions executed on reduced motion | Wrap animation presets with `motion-reduce:transition-none motion-reduce:transform-none`. |
| Modal dialog lacks focus trap or dismiss control | Enforce `inert` on background, contain focus within modal, and provide an accessible close button. |
| Icon-only button lacking accessible name | Add descriptive `aria-label` identifying the specific action and target. |
| Navigation link without current page indicator | Add `aria-current="page"` to the active link. |

---

## Verification and Audit Protocol

When evaluating accessibility, conduct a **two-walk verification**:

1. **Keyboard Walk**: Complete every user task using **only** `Tab`, `Shift+Tab`, `Enter`, `Space`, `Escape`, and arrow keys without touching a mouse. Confirm:
   - Visible focus ring is unmistakably present at every stop.
   - Focus never disappears or gets trapped in non-modal content.
   - Escape closes overlays and restores focus to the trigger.
2. **Screen Reader Walk**: Navigate the interface using assistive technology (or inspect computed names/roles in browser accessibility trees). Confirm:
   - Every interactive control has a descriptive name and accurate role.
   - States (`aria-expanded`, `aria-selected`, `aria-checked`, `aria-invalid`, `aria-current`) reflect reality.
   - Dynamic updates trigger polite announcements.
