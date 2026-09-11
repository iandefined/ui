---
name: lucide-duotone
description: >-
  Author and refine standalone Lucide-style duotone SVGs using deliberate secondary
  fill geometry, semantic negative space, and currentColor. Use when creating or
  reviewing duotone variants of canonical Lucide icons.
---

# Lucide Duotone Icon Authoring

Create polished standalone duotone variants of canonical Lucide icons.

The goal is not to fill as much of the icon as possible.

The goal is to preserve Lucide's recognizable stroke language while introducing a clear
secondary visual layer through deliberate filled geometry and intentional negative space.

Core principle:

> **Tint the material. Preserve the void. Keep semantic details primary.**

---

## Design Goals

Every duotone variant should:

- remain immediately recognizable as the canonical Lucide icon
- preserve Lucide's 24×24 composition and 2px stroke language
- use one inherited `currentColor`
- add a coherent secondary visual mass
- preserve whitespace where the object contains openings or cavities
- remain readable at small UI sizes
- feel intentionally designed rather than mechanically filled

Do not redesign the icon simply to make duotone easier.

---

# Canonical Asset Format

Every icon must be a standalone valid SVG.

Do not require:

- external CSS
- CSS classes
- JavaScript
- runtime props
- hard-coded colors
- framework-specific rendering
- gradients
- filters

## Required Root Structure

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
  <!-- Secondary tint geometry -->
  <path
    d="..."
    fill="currentColor"
    fill-opacity="0.33"
    stroke="none"
  />

  <!-- Canonical foreground geometry -->
  <path d="..." />
</svg>
```

---

# Core Requirements

## 1. Standalone Portability

The SVG must work when:

- embedded inline
- loaded through `<img>`
- copied into HTML
- copied into JSX after normal SVG attribute conversion

The asset must not depend on repository-specific styling.

## 2. `currentColor`

All visible color derives from `currentColor`.

Primary layer:

```xml
stroke="currentColor"
```

Secondary layer:

```xml
fill="currentColor"
fill-opacity="0.33"
stroke="none"
```

Never introduce a separate fixed tint color.

## 3. Exact Asset Fidelity

The SVG displayed in the icon catalog must be the exact SVG copied through `Copy SVG`.

Do not maintain separate preview and distribution geometries.

## 4. Lucide Visual Language

Preserve:

- `viewBox="0 0 24 24"`
- 2px foreground strokes
- rounded line caps
- rounded line joins
- simple geometry
- canonical proportions
- canonical orientation
- semantic recognizability

---

# Duotone Layer Model

Treat every icon as three conceptual layers:

1. **Material**
2. **Semantic foreground detail**
3. **Void / negative space**

The agent must identify these before drawing tint geometry.

---

## 1. Material

Material is a physical or visual surface that can naturally carry the secondary tint.

Examples:

- body of a house
- body of a bell
- body of a shield
- folder surface
- envelope surface
- rear panel
- container body
- vehicle body
- document surface

Material is usually eligible for:

```xml
fill="currentColor"
fill-opacity="0.33"
stroke="none"
```

Prefer one coherent material region over many disconnected tint patches.

---

## 2. Semantic Foreground Detail

Foreground details communicate meaning and should normally remain fully opaque.

Examples:

- checkmarks
- plus/minus symbols
- envelope flap lines
- notification indicators
- clock hands
- lock keyholes
- document text lines
- modifiers
- badges
- arrows
- slashes

Do not tint these merely because they are inside the outer silhouette.

Foreground detail should remain visually dominant.

---

## 3. Void / Negative Space

Negative space is part of the icon design.

Do not fill a region just because it lies inside the outer silhouette.

Examples:

- doorway openings
- holes
- sockets
- ring centers
- apertures
- windows that represent an opening
- keyholes
- container mouths
- gaps between separate objects
- intentionally empty interior regions

Core rule:

> **If a region represents empty space rather than material, leave it transparent.**

---

# Deciding Whether to Tint a Region

Before filling any enclosed region, ask these questions in order.

### A. Does this region represent material?

If yes, it is usually tintable.

### B. Does this region represent empty space?

If yes, preserve whitespace.

### C. Is it a foreground symbol or semantic detail?

If yes, keep it primary.

### D. Does tint behind this detail reduce clarity at 16–24px?

If yes, remove the tint behind it.

### E. Is the only reason to fill the region that its strokes happen to enclose an area?

If yes, do not automatically fill it.

### F. Does removing tint improve recognition without destroying the duotone hierarchy?

If yes, preserve the whitespace.

---

# Important Example: House

For the canonical Lucide `house` icon:

- tint the main house body
- keep the door interior transparent
- preserve the original door stroke
- do not tint the door simply because it lies within the outer house silhouette

Correct concept:

```text
house wall = material → tint
door opening = void → whitespace
door outline = semantic structure → primary stroke
```

This principle generalizes to all icons:

> **Tint the material, preserve the void.**

---

# Critical Rule: Never Blanket Fill

Never do this:

```xml
<svg fill="currentColor" ...>
```

Never blindly add:

```xml
fill="currentColor"
```

to existing Lucide paths.

Lucide icons are authored primarily as strokes, not fill silhouettes.

Blind filling can create:

- accidental straight-line closures
- triangular fills
- false surfaces
- blocked negative space
- dark seams
- strange overlaps
- disconnected fill fragments

Always create deliberate secondary geometry.

---

# Tint Geometry

## Dedicated Closed Geometry

Secondary fill geometry should normally be closed.

Prefer:

```xml
<path d="M...Z" />
```

or appropriate simple primitives such as:

```xml
<rect />
<circle />
<ellipse />
<polygon />
```

Do not force an original open Lucide path to behave as a fill.

---

## Preserve Foreground Geometry

Place all secondary geometry before foreground strokes.

```xml
<svg ...>
  <!-- tint -->
  ...

  <!-- foreground -->
  ...
</svg>
```

Foreground strokes should visually clean up the tint edges.

---

# Cutouts

Use cutouts whenever tint would otherwise occupy semantic whitespace.

## Even-Odd Fill

Preferred pattern:

```xml
<path
  d="
    M...outer silhouette...Z
    M...inner opening...Z
  "
  fill="currentColor"
  fill-opacity="0.33"
  fill-rule="evenodd"
  stroke="none"
/>
```

Typical use cases:

- map pins
- rings
- door openings
- keyholes
- apertures
- hollow shapes
- windows
- container openings

---

## Cutout Boundary Placement

Remember that Lucide strokes are centered on their paths.

When a cutout boundary is covered by a foreground stroke:

- let the cutout reach underneath the stroke centerline
- allow the stroke to cover the tint boundary
- avoid leaving a visible tinted sliver

Do not shrink cutouts merely to avoid overlap.

The foreground stroke should hide the edge.

---

# Seam Prevention

Anti-aliasing gaps are unacceptable.

## Connected Material

If two regions are visually one material surface:

- prefer one combined path
- otherwise overlap the tint shapes slightly

Typical overlap:

```text
0.25–0.5 SVG units
```

Use only enough overlap to remove the seam.

## Tint-to-Stroke Boundaries

The tint should normally extend under the foreground stroke.

Bad:

```text
stroke
| |
  tint begins here
```

This can create a white hairline.

Better:

```text
tint extends beneath stroke
foreground stroke covers tint edge
```

Fix geometry rather than increasing opacity to hide problems.

---

# When to Remove Tint

Tint should be removed when any of these conditions apply.

## Semantic Opening

The region represents a physical opening or empty space.

Examples:

- house door
- keyhole
- ring center
- open container mouth

## Recognition Problem

Tint makes a small feature difficult to identify at 16–24px.

## Hierarchy Problem

Tint causes foreground and background structures to visually merge.

## Excessive Density

Too many adjacent tinted regions create a heavy or muddy icon.

## Artificial Duotone

The tint exists only because the icon "needs something tinted" rather than because the region represents a meaningful secondary surface.

In all of these cases:

> Prefer intentional whitespace over forced tint.

---

# When Not to Remove Tint

Do not create a cutout merely because a line appears inside a filled body.

For example:

- an envelope flap is normally a line drawn over the envelope body
- document text is drawn over paper
- a shield symbol can sit over the shield body
- vehicle panel lines can sit over the vehicle body

Ask whether the region is actually empty.

If it is still physical material, keep the tint underneath.

---

# Mostly Linear Icons

Some Lucide icons have no meaningful filled body.

Examples:

- arrows
- chevrons
- alignment controls
- menu icons
- activity lines
- text formatting controls
- separators

Do not invent arbitrary filled blobs.

A duotone variant may legitimately have very little secondary fill.

If there is no meaningful secondary material:

- preserve the icon mostly as stroke geometry
- or use a secondary stroke only when there is a genuine foreground/background hierarchy

Do not sacrifice clarity just to force visible duotone treatment.

---

# Multiple Objects

When an icon contains multiple objects, use tint to establish hierarchy.

Preferred pattern:

```text
rear/supporting object → secondary tint
front/important object → primary
```

Examples:

- overlapping documents
- users
- layers
- cards
- panels

Do not necessarily tint every object equally.

---

# Modifier Icons

Examples:

- `folder-plus`
- `shield-check`
- `bell-off`
- `calendar-clock`

Preferred approach:

- tint the base object
- keep the modifier primary
- preserve enough whitespace around the modifier for clarity

The modifier is usually the semantic focus and must remain crisp.

---

# Slash / Off Icons

For icons containing a slash:

- tint only meaningful material from the unslashed object
- keep the slash fully primary
- preserve clear contrast behind the slash
- remove tint when necessary so the slash does not disappear into the body

---

# Geometry Modification Policy

The canonical Lucide icon is the visual foundation.

Minimal added or adjusted geometry is permitted when necessary to:

- construct tint surfaces
- create cutouts
- prevent seams
- preserve negative space
- improve small-size clarity

Do not:

- change the overall silhouette
- change orientation
- reposition major features
- redesign semantic details
- change stroke width
- add decorative geometry

Any modification should support the duotone treatment, not create a different icon.

---

# Opacity

Use exactly:

```xml
fill-opacity="0.33"
```

for secondary fills.

Do not vary opacity per icon.

Do not introduce:

```text
0.2
0.25
0.4
0.5
```

without an explicit collection-wide design change.

Consistency across the icon family is more important than optimizing one icon in isolation.

---

# Prohibited Effects

Never use:

- gradients
- shadows
- blur
- filters
- glow
- masks unless absolutely unavoidable
- clipping merely as a shortcut for poor geometry
- hard-coded colors
- CSS classes
- embedded `<style>`
- multiple tint opacity levels
- decorative highlights
- root-level fill
- root-level opacity

Avoid `<defs>` unless the icon genuinely cannot be represented cleanly without it.

Simple geometry is preferred.

---

# Authoring Workflow

For every icon:

## Step 1 — Read the canonical Lucide SVG

Understand the original geometry before creating any fill.

## Step 2 — Identify semantic regions

Classify each meaningful region as:

```text
MATERIAL
FOREGROUND DETAIL
VOID
```

Do this conceptually before drawing.

## Step 3 — Select the secondary mass

Choose the largest meaningful material surface that should carry tint.

Prefer one clear secondary layer.

## Step 4 — Identify cutouts

Remove tint from semantic voids.

Do not wait until visual QA to discover obvious openings.

## Step 5 — Create dedicated closed geometry

Do not repurpose open foreground paths.

## Step 6 — Place tint first

Secondary geometry must render beneath the foreground.

## Step 7 — Restore canonical foreground

Render Lucide's strokes fully opaque above the tint.

## Step 8 — Inspect negative space

Ask:

> Does any tinted region actually represent empty space?

If yes, remove it.

## Step 9 — Inspect at small sizes

Check 16px and 20px before considering the icon finished.

## Step 10 — Simplify

Remove unnecessary tint shapes, points, overlaps, or cutouts.

Use the least geometry needed to express the design correctly.

---

# Decision Hierarchy

When two implementations both appear valid, choose the one that best satisfies these priorities:

1. recognizability
2. semantic correctness
3. clean negative space
4. small-size readability
5. clear primary/secondary hierarchy
6. seam-free geometry
7. minimal SVG complexity

Do not prioritize maximum tint coverage.

---

# Quality Validation

Before finalizing an icon, verify all items below.

## Structure

- [ ] `viewBox="0 0 24 24"`
- [ ] `width="24"`
- [ ] `height="24"`
- [ ] root `fill="none"`
- [ ] root `stroke="currentColor"`
- [ ] `stroke-width="2"`
- [ ] `stroke-linecap="round"`
- [ ] `stroke-linejoin="round"`
- [ ] no required CSS classes
- [ ] no hard-coded colors
- [ ] no root opacity

## Tint

- [ ] tint uses `currentColor`
- [ ] tint uses `fill-opacity="0.33"`
- [ ] tint uses `stroke="none"`
- [ ] tint appears before foreground geometry
- [ ] tint represents actual material
- [ ] tint does not exist merely to increase coverage

## Whitespace

- [ ] semantic openings remain transparent
- [ ] cavities remain readable
- [ ] holes remain open
- [ ] foreground details are not visually buried
- [ ] no interior region is tinted merely because it is enclosed

## Geometry

- [ ] no tint leaks outside the intended silhouette
- [ ] no accidental fill closures
- [ ] no anti-aliasing seams
- [ ] no white hairline gaps
- [ ] tint extends underneath foreground strokes where appropriate
- [ ] connected material reads as one continuous surface

## Size Matrix

Inspect at:

- [ ] 16px
- [ ] 20px
- [ ] 24px
- [ ] 32px

At 16px and 20px specifically verify:

- important negative spaces remain open
- semantic details remain legible
- tint does not turn the icon into a dark blob

## Color Matrix

Test at least:

```css
color: currentColor;
color: #2563eb;
color: #e11d48;
```

Also inspect in both light and dark themes.

---

# Final Review Question

Before accepting an icon, ask:

> If I remove tint from any interior region, does the icon become clearer without losing the intended secondary material layer?

If yes, remove that tint.

The objective is not maximum filling.

The objective is a coherent Lucide duotone system with deliberate material, strong foreground structure, and intentional whitespace.