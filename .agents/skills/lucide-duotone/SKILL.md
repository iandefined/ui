---
name: lucide-duotone
description: Author polished Lucide-style duotone standalone SVGs using dedicated closed tint geometry and currentColor. Use when creating or refining duotone variant icons for Lucide.
---

# Lucide Duotone Icon Authoring

Guidelines and technical requirements for authoring standalone, high-fidelity duotone variant SVGs from canonical Lucide icons.

## Canonical Asset Format

Every duotone icon must be an entirely standalone, valid SVG document without external CSS classes, runtime scripts, or hard-coded color values.

### Required SVG Structure

```xml
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <!-- 1. Tint Layer (Background / Mass) -->
  <path
    d="..."
    fill="currentColor"
    fill-opacity="0.33"
    stroke="none"
  />

  <!-- 2. Foreground Stroke Layer (Lucide Geometry) -->
  <path d="..." />
</svg>
```

### Core Requirements

1. **Standalone Portability**: The SVG must render identically when embedded inline, loaded via `<img>`, or copied directly into arbitrary HTML/JSX projects.
2. **Dynamic Coloring via `currentColor`**: All color inheritance comes through `currentColor`. Both the 2px foreground strokes and the secondary tint layer automatically adapt to the parent CSS `color`.
3. **No External Stylesheets or Classes**: Never include `class="..."` or `<style>` blocks in the asset file.
4. **Exact Match**: The SVG rendered in the UI preview must be the identical raw string provided to the user when clicking `Copy SVG`.

---

## Duotone Layering Model

### 1. The Tint Layer (Secondary Fill)

- **Default Attributes**:
  ```xml
  fill="currentColor" fill-opacity="0.33" stroke="none"
  ```
- **Dedicated Closed Geometry**: Always construct a deliberate closed shape (`M...Z`) representing the physical mass or surface of the object.
- **Position**: Always place the tint element(s) *before* the foreground stroke elements in DOM order so strokes render sharply over the tint.

### 2. The Critical Rule: Never Blanket Fill

- **DO NOT** add `fill="currentColor"` to the root `<svg>` element.
- **DO NOT** blindly add `fill="currentColor"` or `fill-opacity` to existing Lucide paths.
- **Why**: Lucide paths are authored primarily for strokes. Many Lucide paths are open-ended or visually composed of adjacent segments. Blindly filling them causes:
  - Accidental straight-line closures across open paths (e.g. envelope flap lines, bell clappers, arrows).
  - Darkened seams where stroke and fill overlap unpredictably.
  - Distorted or filled negative space.

### 3. Cutouts and Openings

- When an icon contains an intentional see-through hole (such as the center opening of `map-pin` or a donut shape), combine the outer boundary and inner cutout into a single path using `fill-rule="evenodd"`:
  ```xml
  <path
    d="M...outer...Z M...inner...Z"
    fill-rule="evenodd"
    fill="currentColor"
    fill-opacity="0.33"
    stroke="none"
  />
  ```

### 4. Adjacent Surfaces and Seam Prevention

- Prefer one continuous closed silhouette for connected surfaces.
- If two tint shapes visually meet, overlap them slightly (sub-pixel) to prevent anti-aliasing gaps. Never rely on two mathematically touching edges without overlap.

---

## Prohibited Effects

To preserve the clean Lucide aesthetic:
- **No Gradients**: Never use `<linearGradient>` or `<radialGradient>`.
- **No Shadows / Filters**: Never use `<filter>`, `feDropShadow`, or blur effects.
- **No Decorative Highlights**: Do not introduce faux specular highlights or multiple tint levels.
- **No Hardcoded Hex/RGB**: Never use `#ffffff`, `#000000`, `rgba(...)`, or named colors. Always use `currentColor`.
- **No Arbitrary Opacities**: Stick strictly to `fill-opacity="0.33"` for the secondary tint layer.

---

## Quality & Validation Checklist

Before finalizing any duotone icon, inspect it against the following matrix:

1. **Size Matrix**:
   - [ ] **16px**: Silhouette remains crisp and readable; details do not turn into muddy visual noise.
   - [ ] **20px**: Proportions match standard Lucide density.
   - [ ] **24px**: Canonical design resolution; 2px stroke is perfectly aligned.
   - [ ] **32px**: Clean edges, no anti-aliasing artifacts or unintended gaps.
2. **Color & Theme**:
   - [ ] **Light Mode**: High contrast foreground stroke with subtle, legible tint.
   - [ ] **Dark Mode**: Tint remains clean against dark surfaces without overpowering background.
   - [ ] **Custom CSS Color**: Test with non-neutral `color` (e.g. `text-blue-500`, `color: #e11d48`) to verify both tint and stroke inherit harmoniously.
3. **Geometry Integrity**:
   - [ ] No tint bleed outside foreground strokes.
   - [ ] No accidental fill closures across open stroke endpoints.
   - [ ] All foreground strokes retain `stroke-linecap="round"` and `stroke-linejoin="round"`.
